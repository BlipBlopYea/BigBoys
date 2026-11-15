import { createHmac, timingSafeEqual } from 'node:crypto';
import { Router } from 'express';
import { ApiError } from './bookings.js';

const SESSION_COOKIE = 'bigboys_admin_session';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

function getAdminEmail() {
  return (process.env.ADMIN_EMAIL || 'admin@bigboys.com').trim().toLowerCase();
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new ApiError(503, 'Admin authentication is not configured. Set ADMIN_SESSION_SECRET to a random value of at least 32 characters.');
  }
  return secret;
}

function signPayload(payload, secret) {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function getSessionCookie(req) {
  const cookieHeader = req.headers.cookie || '';
  const cookie = cookieHeader.split(';').map(value => value.trim()).find(value => value.startsWith(`${SESSION_COOKIE}=`));
  return cookie?.slice(SESSION_COOKIE.length + 1) || '';
}

function hasValidAdminSession(req) {
  const token = getSessionCookie(req);
  if (!token) return false;
  const [encodedPayload, suppliedSignature, extra] = token.split('.');
  if (!encodedPayload || !suppliedSignature || extra !== undefined) return false;
  const secret = getSessionSecret();
  const expectedSignature = Buffer.from(signPayload(encodedPayload, secret), 'base64url');
  const receivedSignature = Buffer.from(suppliedSignature, 'base64url');
  if (expectedSignature.length !== receivedSignature.length || !timingSafeEqual(expectedSignature, receivedSignature)) {
    return false;
  }
  try {
    const session = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
    return session.email === getAdminEmail() && Number.isFinite(session.expiresAt) && session.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export function requireAdmin(req, res, next) {
  try {
    if (!hasValidAdminSession(req)) {
      throw new ApiError(401, 'Admin authentication is required.');
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export function createAdminAuthRouter() {
  const router = Router();

  router.post('/admin/login', (req, res, next) => {
    try {
      const configuredPassword = process.env.ADMIN_PASSWORD;
      if (!configuredPassword) {
        throw new ApiError(503, 'Admin authentication is not configured. Set ADMIN_PASSWORD in the server environment.');
      }
      const secret = getSessionSecret();
      const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
      const password = typeof req.body?.password === 'string' ? req.body.password : '';
      const suppliedPassword = Buffer.from(password);
      const expectedPassword = Buffer.from(configuredPassword);
      const passwordMatches = suppliedPassword.length === expectedPassword.length
        && timingSafeEqual(suppliedPassword, expectedPassword);
      if (email !== getAdminEmail() || !passwordMatches) {
        throw new ApiError(401, 'The admin email or password is incorrect.');
      }
      const payload = Buffer.from(JSON.stringify({
        email,
        expiresAt: Date.now() + SESSION_DURATION_MS
      })).toString('base64url');
      const token = `${payload}.${signPayload(payload, secret)}`;
      res.cookie(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api',
        maxAge: SESSION_DURATION_MS
      });
      return res.json({ email, role: 'admin' });
    } catch (error) {
      return next(error);
    }
  });

  router.post('/admin/logout', (req, res) => {
    res.clearCookie(SESSION_COOKIE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api'
    });
    res.status(204).end();
  });

  return router;
}
