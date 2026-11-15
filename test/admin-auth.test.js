import assert from 'node:assert/strict';
import { once } from 'node:events';
import test from 'node:test';
import { createApp } from '../src/app.js';

test('admin ledger requires a server-verified admin session', async t => {
  const originalEnvironment = {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET,
    NODE_ENV: process.env.NODE_ENV
  };
  process.env.ADMIN_EMAIL = 'admin@bigboys.com';
  process.env.ADMIN_PASSWORD = 'test-admin-password';
  process.env.ADMIN_SESSION_SECRET = 'test-session-signing-secret-with-32-chars';
  process.env.NODE_ENV = 'test';

  const app = createApp({ booking: { findMany: async () => [] } });
  const server = app.listen(0);
  await once(server, 'listening');
  t.after(async () => {
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    for (const [key, value] of Object.entries(originalEnvironment)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

  const origin = `http://127.0.0.1:${server.address().port}`;
  const denied = await fetch(`${origin}/api/admin/transactions`);
  assert.equal(denied.status, 401);

  const invalidLogin = await fetch(`${origin}/api/auth/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@bigboys.com', password: 'incorrect' })
  });
  assert.equal(invalidLogin.status, 401);

  const login = await fetch(`${origin}/api/auth/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@bigboys.com', password: 'test-admin-password' })
  });
  assert.equal(login.status, 200);
  const cookie = login.headers.get('set-cookie')?.split(';', 1)[0];
  assert.ok(cookie?.startsWith('bigboys_admin_session='));

  const ledger = await fetch(`${origin}/api/admin/transactions`, {
    headers: { Cookie: cookie }
  });
  assert.equal(ledger.status, 200);
  assert.deepEqual(await ledger.json(), { transactions: [] });
});
