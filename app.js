const demoDateAfterDays = days => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
const equipment = [
      {
        id: 1,
        name: 'Komatsu PC200 Excavator',
        type: 'Excavator',
        category: 'earthmoving',
        location: 'Panabo City',
        hourly: 1250,
        baseDeliveryFee: 2500,
        ratePerKm: 55,
        rating: '4.9',
        reviews: 18,
        badge: 'Popular',
        isFeatured: true,
        boostRegion: 'Davao Region',
        status: 'AVAILABLE',
        nextAvailableDate: null,
        image: 'https://www.truck1.ph/img/xxl/37129/Hot-Sale-20-Ton-Crawler-Excavator-Komatsu-Pc200-6-Pc200-7-Pc200-8-Original-From-Japan-For-Sale-In-Shanghai-China_37129_1244976858879.jpg',
        description: 'A dependable 20-ton excavator for road works, drainage, and site preparation. Delivery can be arranged with the yard.'
      },
      {
        id: 2,
        name: 'JCB 3CX Backhoe Loader',
        type: 'Backhoe',
        category: 'earthmoving',
        location: 'Metro Manila',
        hourly: 980,
        baseDeliveryFee: 1800,
        ratePerKm: 48,
        rating: '5.0',
        reviews: 12,
        badge: 'Available today',
        isFeatured: false,
        status: 'ON_SITE',
        nextAvailableDate: demoDateAfterDays(3),
        image: 'https://img.linemedia.com/img/s/construction-equipment-backhoe-loader-JCB-3CX---1750127843896797091_big--25061705291025888300.jpg',
        description: 'A versatile backhoe for trenching, loading, and utility work. Includes a standard bucket and operator-ready cab.'
      },
      {
        id: 3,
        name: 'CAT 320D Hydraulic Excavator',
        type: 'Excavator',
        category: 'earthmoving',
        location: 'Panabo City',
        hourly: 1450,
        baseDeliveryFee: 2800,
        ratePerKm: 58,
        rating: '4.8',
        reviews: 26,
        badge: 'Great value',
        isFeatured: true,
        boostRegion: 'Davao Region',
        status: 'AVAILABLE',
        nextAvailableDate: null,
        image: 'https://image.made-in-china.com/229f0j00GapfBVgMvhuN/WeChat-20240623183902-mp4.webp',
        description: 'A full-size excavator for large digging jobs and site work. Confirm bucket size and delivery cost with the owner.'
      },
      {
        id: 4,
        name: 'SANY SY35U Mini Excavator',
        type: 'Excavator',
        category: 'earthmoving',
        location: 'Davao City',
        hourly: 720,
        baseDeliveryFee: 1300,
        ratePerKm: 42,
        rating: '4.7',
        reviews: 9,
        badge: 'Tight access',
        isFeatured: false,
        status: 'AVAILABLE',
        nextAvailableDate: null,
        image: 'https://www.sanyamerica.com/wp-content/uploads/2021/06/SY35_Cab.webp',
        description: 'Compact zero-tail excavator for property development, landscaping, and urban utility work.'
      },
      {
        id: 5,
        name: 'Isuzu Giga 10-Wheeler Dump Truck',
        type: 'Dump truck',
        category: 'site',
        location: 'Tagum City',
        hourly: 1250,
        baseDeliveryFee: 1200,
        ratePerKm: 38,
        rating: '4.9',
        reviews: 7,
        badge: 'Well maintained',
        isFeatured: false,
        status: 'ON_SITE',
        nextAvailableDate: demoDateAfterDays(6),
        image: 'https://eastpacificmotors.com/wp-content/uploads/2015/12/101_0229.jpg',
        description: 'A 10-wheeler tipper for hauling aggregate, soil, and construction debris. Confirm load limits and trip schedule with the owner.'
      },
      {
        id: 6,
        name: 'SANY SY215C',
        type: 'Excavator',
        category: 'site',
        location: 'General Santos City',
        hourly: 1600,
        baseDeliveryFee: 3200,
        ratePerKm: 65,
        rating: '4.8',
        reviews: 14,
        badge: 'Site ready',
        isFeatured: false,
        status: 'AVAILABLE',
        nextAvailableDate: null,
        image: 'https://www.philmotors.com/preview-small/Philippines-1207-2102091.jpg',
        description: 'Reliable.'
      },
      {
        id: 7,
        name: 'CAT D6 Bulldozer',
        type: 'Bulldozer',
        category: 'earthmoving',
        location: 'Tagum City',
        hourly: 1850,
        baseDeliveryFee: 3500,
        ratePerKm: 70,
        rating: '4.9',
        reviews: 21,
        badge: 'Fleet favorite',
        isFeatured: false,
        status: 'AVAILABLE',
        nextAvailableDate: null,
        image: 'https://mcdowellequipment.com/wp-content/uploads/2024/07/20240709_124304-scaled.jpg',
        description: 'A tracked bulldozer for clearing, pushing, and rough grading, available for regional delivery.'
      },
      {
        id: 8,
        name: 'Volvo EC210 Excavator',
        type: 'Excavator',
        category: 'earthmoving',
        location: 'Davao City',
        hourly: 1380,
        baseDeliveryFee: 2700,
        ratePerKm: 56,
        rating: '4.8',
        reviews: 15,
        badge: 'Ready to work',
        isFeatured: false,
        status: 'AVAILABLE',
        nextAvailableDate: null,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL3gWQcq8v4vLpBA3vTjrUYZO-2fXxjVoCBMBH8v6K7F6lZr2-fOjmxz9R&s=10',
        description: 'A mid-size hydraulic excavator for earthmoving, drainage, and general construction jobs.'
      }
    ];

    const bookings = [
      {
        id: 1,
        equipmentId: 1,
        machine: 'Komatsu PC200 Excavator',
        renter: 'A. Bautista Construction',
        location: 'North Industrial District',
        schedule: 'Oct 28 · 8:00 AM',
        status: 'PENDING_APPROVAL'
      },
      {
        id: 2,
        equipmentId: 2,
        machine: 'JCB 3CX Backhoe Loader',
        renter: 'Northline Builders',
        location: 'Riverside Development Site',
        schedule: 'Oct 30 · 7:30 AM',
        startDate: '2026-10-30',
        endDate: '2026-11-01',
        status: 'PAID_IN_ESCROW'
      },
      {
        id: 3,
        equipmentId: 3,
        machine: 'CAT 320D Hydraulic Excavator',
        renter: 'Prime Works Group',
        location: 'West Ring Road Project',
        schedule: 'Oct 01 · 9:00 AM',
        status: 'COMPLETED'
      }
    ];

    try {
      const savedMockBookings = JSON.parse(localStorage.getItem('bigboys-mock-bookings') || '[]');
      if (Array.isArray(savedMockBookings)) {
        bookings.push(...savedMockBookings.filter(booking => booking?.isMock === true));
      }
    } catch (error) {
      console.error('Unable to restore mock bookings from this browser session:', error);
      localStorage.removeItem('bigboys-mock-bookings');
    }

    const grid = document.querySelector('#listing-grid');
    const equipmentFilter = document.querySelector('#equipment-search');
    const loginView = document.querySelector('#login-view');
    const contractorView = document.querySelector('#contractor-view');
    const ownerView = document.querySelector('#owner-view');
    const adminView = document.querySelector('#admin-view');
    const signInButton = document.querySelector('#sign-in-button');
    const appHeader = document.querySelector('#app-header');
    const appTopbar = document.querySelector('#app-topbar');
    const mobileMenuToggle = document.querySelector('#mobile-menu-toggle');
    const renterNavLinks = document.querySelector('#renter-nav-links');
    const ownerNavLinks = document.querySelector('#owner-nav-links');
    const accountEmail = document.querySelector('#account-email');
    const signOutButton = document.querySelector('#app-signout-button');
    const brandModeLabel = document.querySelector('#brand-mode-label');
    const ownerModeSwitch = document.querySelector('#owner-mode-switch');
    const renterModeSwitch = document.querySelector('#renter-mode-switch');
    const homeAreaInput = document.querySelector('#home-area');
    const nearbyAreasInput = document.querySelector('#nearby-areas');
    const searchForm = document.querySelector('#search-form');
    const dialog = document.querySelector('#bookingModal');
    const checkoutDialog = document.querySelector('#checkout-dialog');
    const editEquipmentDialog = document.querySelector('#edit-equipment-dialog');
    const ownerForm = document.querySelector('#owner-form');
    const ownerFormSlot = document.querySelector('#owner-form-slot');
    const editFormSlot = document.querySelector('#edit-form-slot');
    const saved = new Set();
    const accountMenus = [...document.querySelectorAll('[data-account-menu]')];
    let notifications = [];
    let activeCategory = 'all';
    let signedInRole = '';
    let pendingListingAction = null;
    let showSaved = false;
    let selectedMachine = null;
    let uploadedPhotos = [];
    let activePhotoIndex = 0;
    let editingEquipmentId = null;
    let activeCheckoutBooking = null;
    let activeFeatureMachine = null;
    let signedInEmail = '';
    let contextualSignIn = false;
    let persistedEquipmentLoaded = false;
    let equipmentLoadPromise = Promise.resolve();
    const nearbyCities = {
      tagum: ['panabo', 'davao'],
      panabo: ['tagum', 'davao'],
      davao: ['tagum', 'panabo']
    };
    const davaoRegionCities = new Set([
      'davao', 'tagum', 'panabo', 'samal', 'mati', 'digos',
      'malita', 'malalag', 'santa cruz', 'magsaysay', 'bansalan',
      'matanao', 'hagonoy', 'padada', 'sulop', 'mabini', 'lupon',
      'banaybanay', 'baganga', 'cateel', 'caraga', 'manay',
      'tarragona', 'monkayo', 'nabunturan', 'compostela', 'maco',
      'mawab', 'new bataan', 'laak', 'maragusan', 'pantukan',
      'kapalong', 'asuncion', 'san isidro', 'talaingod'
    ]);
    const davaoRegionAreas = new Set([
      'davao del norte', 'davao del sur', 'davao oriental',
      'davao occidental', 'davao de oro'
    ]);

    const normalizeCity = value => value.trim().toLowerCase().replace(/\s+city$/, '').trim();
    const isDavaoRegionQuery = value => isDavaoRegionCityQuery(value)
      || isDavaoRegionWideQuery(value);
    const isDavaoRegionCityQuery = value => davaoRegionCities.has(normalizeCity(value));
    const isDavaoRegionWideQuery = value => {
      const location = normalizeCity(value);
      return location === 'davao region'
        || location === 'region xi'
        || location === 'region 11'
        || davaoRegionAreas.has(location);
    };
    const isDavaoRegionListing = item => item.boostRegion === 'Davao Region'
      || davaoRegionCities.has(normalizeCity(item.location));

    function loadSavedEquipment() {
      try {
        const stored = JSON.parse(localStorage.getItem('bigboys-saved-equipment') || '[]');
        if (!Array.isArray(stored)) throw new TypeError('Saved equipment data must be an array.');
        for (const id of stored) {
          if (Number.isInteger(id) && equipment.some(machine => machine.id === id)) saved.add(id);
        }
      } catch (error) {
        console.error('Unable to restore saved equipment:', error);
        localStorage.removeItem('bigboys-saved-equipment');
      }
    }

    function loadFeaturedEquipment() {
      try {
        const stored = JSON.parse(localStorage.getItem('bigboys-featured-equipment') || '[]');
        if (!Array.isArray(stored)) throw new TypeError('Featured equipment data must be an array.');
        for (const feature of stored) {
          if (!Number.isInteger(feature?.id) || typeof feature.boostRegion !== 'string') continue;
          const machine = equipment.find(item => item.id === feature.id);
          if (!machine) continue;
          if (feature.expiresAt && Date.parse(feature.expiresAt) <= Date.now()) continue;
          Object.assign(machine, {
            isFeatured: true,
            boostRegion: feature.boostRegion,
            featureExpiresAt: feature.expiresAt || null
          });
        }
      } catch (error) {
        console.error('Unable to restore featured equipment:', error);
        localStorage.removeItem('bigboys-featured-equipment');
      }
    }

    function loadLocalEquipment() {
      try {
        const stored = JSON.parse(localStorage.getItem('bigboys-owner-equipment') || '[]');
        if (!Array.isArray(stored)) throw new TypeError('Owner equipment data must be an array.');
        for (const item of stored) {
          if (!item || item.localOnly !== true || !Number.isInteger(item.id) || typeof item.name !== 'string') continue;
          if (equipment.some(machine => machine.id === item.id || machine.name === item.name)) continue;
          equipment.push(item);
        }
      } catch (error) {
        console.error('Unable to restore locally saved owner equipment:', error);
        localStorage.removeItem('bigboys-owner-equipment');
      }
    }

    function persistLocalEquipment() {
      try {
        localStorage.setItem('bigboys-owner-equipment', JSON.stringify(equipment.filter(item => item.localOnly === true)));
      } catch (error) {
        console.error('Unable to save locally managed owner equipment:', error);
        notify('Owner equipment could not be stored in this browser.');
      }
    }

    function persistFeaturedEquipment(machine) {
      try {
        const featuredMachines = equipment
          .filter(item => item.isFeatured)
          .map(item => ({ id: item.id, boostRegion: item.boostRegion, expiresAt: item.featureExpiresAt || null }));
        localStorage.setItem('bigboys-featured-equipment', JSON.stringify(featuredMachines));
      } catch (error) {
        console.error('Unable to save featured equipment:', error);
        notify(`${machine.name} was featured, but the preference could not be saved in this browser.`);
      }
    }

    function isCurrentlyFeatured(machine) {
      return machine.isFeatured === true
        && (!machine.featureExpiresAt || Date.parse(machine.featureExpiresAt) > Date.now());
    }

    function persistSavedEquipment() {
      try {
        localStorage.setItem('bigboys-saved-equipment', JSON.stringify([...saved]));
      } catch (error) {
        console.error('Unable to save equipment preferences:', error);
        notify('Saved equipment could not be stored in this browser.');
      }
    }

    function loadNotifications() {
      try {
        const stored = JSON.parse(localStorage.getItem('bigboys-notifications') || '[]');
        if (!Array.isArray(stored)) throw new TypeError('Notification data must be an array.');
        notifications = stored.filter(item =>
          item
          && typeof item.id === 'string'
          && ['owner', 'renter'].includes(item.recipientRole)
          && typeof item.message === 'string'
          && typeof item.read === 'boolean'
        ).slice(0, 100);
      } catch (error) {
        console.error('Unable to restore notifications:', error);
        localStorage.removeItem('bigboys-notifications');
      }
    }

    function persistNotifications() {
      try {
        localStorage.setItem('bigboys-notifications', JSON.stringify(notifications));
      } catch (error) {
        console.error('Unable to save notifications:', error);
        notify('Notifications could not be stored in this browser.');
      }
    }

    function activeNotificationRole() {
      return ownerView.hidden ? 'renter' : 'owner';
    }

    function visibleNotifications() {
      const role = activeNotificationRole();
      return notifications.filter(item =>
        item.recipientRole === role
        && (role === 'owner' || !item.recipientEmail || item.recipientEmail === signedInEmail)
      );
    }

    function renderAccountMenus() {
      const roleNotifications = visibleNotifications();
      const unreadCount = roleNotifications.filter(item => !item.read).length;
      const badgeCount = unreadCount + saved.size;
      for (const menu of accountMenus) {
        const badge = menu.querySelector('[data-menu-badge]');
        badge.textContent = badgeCount > 99 ? '99+' : String(badgeCount);
        badge.hidden = badgeCount === 0;
        badge.setAttribute('aria-label', `${unreadCount} unread notifications and ${saved.size} saved machines`);

        const notificationList = menu.querySelector('[data-notification-list]');
        notificationList.innerHTML = roleNotifications.length
          ? roleNotifications.map(item => `
            <button type="button" class="notification-item ${item.read ? '' : 'unread'}" data-notification-id="${escapeHTML(item.id)}"${item.bookingId !== undefined ? ` data-booking-id="${escapeHTML(String(item.bookingId))}"` : ''}${item.apiBookingId ? ` data-api-booking-id="${escapeHTML(String(item.apiBookingId))}"` : ''}>
              <span>${escapeHTML(item.message)}</span>
              ${item.bookingId !== undefined ? '<small class="notification-action-hint">Open booking</small>' : ''}
              <small>${new Date(item.createdAt).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' })}</small>
            </button>`).join('')
          : '<p class="popover-empty">No notifications yet.</p>';
        menu.querySelectorAll('[data-saved-tab-count]').forEach(count => { count.textContent = String(saved.size); });
        const savedList = menu.querySelector('[data-saved-list]');
        const savedMachines = equipment.filter(machine => saved.has(machine.id));
        savedList.innerHTML = savedMachines.length
          ? savedMachines.map(machine => `
            <article class="saved-item">
              <div><strong>${escapeHTML(machine.name)}</strong><small>${escapeHTML(machine.location)} · ${peso(machine.hourly)}/hr</small></div>
              <div class="saved-item-actions">
                <button class="popover-action primary" type="button" data-saved-book="${machine.id}">Request Booking</button>
                <button class="popover-action" type="button" data-saved-remove="${machine.id}">Remove</button>
              </div>
            </article>`).join('')
          : '<p class="popover-empty">No saved equipment yet.</p>';
      }
    }

    function addNotification(recipientRole, message, recipientEmail = '', bookingId = null, apiBookingId = null) {
      notifications.unshift({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        recipientRole,
        recipientEmail,
        message,
        ...(bookingId === null ? {} : { bookingId }),
        ...(apiBookingId === null ? {} : { apiBookingId }),
        read: false,
        createdAt: new Date().toISOString()
      });
      notifications = notifications.slice(0, 100);
      persistNotifications();
      renderAccountMenus();
    }

    function updateAppHeader() {
      const isContractorSignedIn = signedInRole === 'contractor';
      signInButton.hidden = isContractorSignedIn;
      signOutButton.hidden = !isContractorSignedIn;
      ownerModeSwitch.hidden = !isContractorSignedIn || !ownerView.hidden;
      renterModeSwitch.hidden = !isContractorSignedIn || ownerView.hidden;
      renterNavLinks.hidden = !ownerView.hidden;
      ownerNavLinks.hidden = ownerView.hidden;
      accountEmail.hidden = !isContractorSignedIn;
      accountEmail.textContent = isContractorSignedIn ? signedInEmail : '';
      brandModeLabel.textContent = ownerView.hidden ? 'Equipment rental' : 'Fleet portal';
      accountMenus.forEach(menu => {
        menu.hidden = !isContractorSignedIn;
        if (!isContractorSignedIn) {
          menu.querySelector('[data-menu-popover]').hidden = true;
          menu.querySelector('[data-menu-bell]').setAttribute('aria-expanded', 'false');
        }
      });
      renderAccountMenus();
    }

    function openSignIn(action = null) {
      pendingListingAction = action;
      contextualSignIn = Boolean(action);
      loginView.classList.toggle('is-contextual', contextualSignIn);
      document.querySelector('#login-message').hidden = true;
      if (contextualSignIn) {
        loginView.hidden = false;
        document.querySelector('#login-email').focus();
      } else {
        transitionTo(loginView);
      }
    }

    const peso = amount => `₱${Number(amount).toLocaleString('en-PH')}`;
    async function readApiResponse(response, fallbackMessage) {
      const responseText = await response.text();
      let result;
      try {
        result = responseText ? JSON.parse(responseText) : null;
      } catch {
        throw new Error(`${fallbackMessage} The server returned invalid JSON (HTTP ${response.status}).`);
      }
      if (!result || typeof result !== 'object') {
        throw new Error(`${fallbackMessage} The server returned an empty response (HTTP ${response.status}).`);
      }
      if (!response.ok) {
        throw new Error(result.error || `${fallbackMessage} (HTTP ${response.status}).`);
      }
      return result;
    }
    const todayISO = () => {
      const today = new Date();
      return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    };
    const availabilityDateISO = date => date ? String(date).slice(0, 10) : '';
    const dayAfterISO = date => {
      const dateValue = new Date(`${availabilityDateISO(date)}T00:00:00.000Z`);
      dateValue.setUTCDate(dateValue.getUTCDate() + 1);
      return dateValue.toISOString().slice(0, 10);
    };
    const formatBookingDate = date => new Date(`${date}T00:00:00`).toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const firstBookableDate = machine => {
      const returnDate = availabilityDateISO(machine.nextAvailableDate);
      return machine.status === 'ON_SITE' && returnDate && returnDate >= todayISO()
        ? dayAfterISO(returnDate)
        : todayISO();
    };
    const formatAvailabilityDate = date => {
      if (!date) return 'date to be confirmed';
      return new Date(`${availabilityDateISO(date)}T00:00:00`).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
    };
    function getBookingFinancials(machine, hours, distance) {
      const rentalCost = hours * machine.hourly;
      const travelCharge = distance * 2 * machine.ratePerKm;
      const grossTotal = rentalCost + machine.baseDeliveryFee + travelCharge;
      const platformFeeRetained = grossTotal * 0.08;
      return {
        rentalCost,
        travelCharge,
        grossTotal,
        platformFeeRetained,
        ownerNetPayout: grossTotal - platformFeeRetained
      };
    }
    const escapeHTML = value => {
      const element = document.createElement('span');
      element.textContent = String(value);
      return element.innerHTML;
    };

    function render() {
      const selectedEquipmentType = equipmentFilter.value;
      const homeArea = normalizeCity(homeAreaInput.value);
      const nearbyCitiesForArea = nearbyAreasInput.checked ? nearbyCities[homeArea] || [] : [];
      const isRegionalSearch = isDavaoRegionQuery(homeArea);
      const matches = equipment.filter(item => {
        const itemCity = normalizeCity(item.location);
        const searchableType = `${item.type} ${item.name}`.toLowerCase();
        const matchesEquipmentType = selectedEquipmentType === 'all' || searchableType.includes(selectedEquipmentType);
        const matchesCity = !homeArea
          || (isDavaoRegionWideQuery(homeArea) && isDavaoRegionListing(item))
          || (isRegionalSearch && isCurrentlyFeatured(item) && item.boostRegion === 'Davao Region')
          || itemCity.includes(homeArea)
          || nearbyCitiesForArea.some(city => itemCity.includes(city));
        return matchesEquipmentType && matchesCity && (activeCategory === 'all' || item.category === activeCategory) && (!showSaved || saved.has(item.id));
      }).sort((left, right) => isRegionalSearch
        ? Number(isCurrentlyFeatured(right)) - Number(isCurrentlyFeatured(left))
        : 0);
      document.querySelector('#equipment-title').textContent = showSaved ? 'Saved equipment' : 'Available machines';
      document.querySelector('#results-count').textContent = `${matches.length} machine${matches.length === 1 ? '' : 's'} listed · availability and rates shown in Philippine pesos`;
      if (!matches.length) {
        const scopeHelp = 'Try another city or equipment type.';
        grid.innerHTML = `<div class="empty-state">No machines match these filters. ${scopeHelp}</div>`;
        return;
      }
      grid.innerHTML = matches.map((item, index) => `
        <article class="equipment-card ${isCurrentlyFeatured(item) ? 'featured' : ''}" style="--card-index:${index}">
          <div class="card-image">
            <img src="${escapeHTML(item.images?.[0] || item.image)}" alt="${escapeHTML(item.type)} available for rent" loading="lazy">
            <span class="badge availability-badge ${item.status === 'ON_SITE' && availabilityDateISO(item.nextAvailableDate) ? 'onsite' : item.status === 'MAINTENANCE' ? 'maintenance' : 'available'}">${item.status === 'ON_SITE' && !availabilityDateISO(item.nextAvailableDate)
              ? 'On site · Return date to be confirmed'
              : item.status === 'ON_SITE'
                ? `On site until ${formatAvailabilityDate(item.nextAvailableDate)} • Pre-bookable starting ${formatBookingDate(dayAfterISO(item.nextAvailableDate))}`
                : item.status === 'MAINTENANCE'
                  ? 'Maintenance'
                  : 'Available Now'}</span>
            <button
              class="save-button ${saved.has(item.id) ? 'saved' : ''}"
              type="button"
              data-save="${item.id}"
              aria-label="${saved.has(item.id) ? 'Remove from' : 'Add to'} saved equipment"
              aria-pressed="${saved.has(item.id)}"
            >${saved.has(item.id) ? '♥' : '♡'}</button>
          </div>
          <div class="card-body">
            <div class="card-type">${escapeHTML(item.type)} · ${escapeHTML(item.location)}</div>
            <div class="card-title-row">
              <h3>${escapeHTML(item.name)}</h3>
              <div class="card-title-meta">${isCurrentlyFeatured(item) ? '<span class="featured-badge">FEATURED</span>' : ''}<span class="rating"><b>★</b> ${escapeHTML(item.rating)} (${item.reviews})</span></div>
            </div>
            <div class="card-meta">
              <span>Delivery ${peso(item.baseDeliveryFee)} + ${peso(item.ratePerKm)}/km one way</span>
            </div>
            <div class="card-footer">
              <div class="price"><strong>${peso(item.hourly)}</strong> <small>/ hour</small></div>
              <button class="detail-button" type="button" data-detail="${item.id}">Request Booking</button>
            </div>
          </div>
        </article>`).join('');
    }

    function renderBookings() {
      const statusLabels = {
        PENDING_APPROVAL: 'Pending approval',
        AWAITING_PAYMENT: 'Awaiting payment',
        PAID_IN_ESCROW: 'Paid in escrow',
        COMPLETED: 'Completed',
        DECLINED: 'Declined'
      };
      document.querySelector('#booking-rows').innerHTML = bookings.map(booking => `
        <tr>
          <td>${escapeHTML(booking.machine)}</td>
          <td>${escapeHTML(booking.renter)}</td>
          <td>${escapeHTML(booking.location)}</td>
          <td>${escapeHTML(booking.schedule)}</td>
          <td><span class="status-pill ${booking.status === 'PENDING_APPROVAL' ? 'pending' : booking.status === 'PAID_IN_ESCROW' ? 'onsite' : booking.status === 'COMPLETED' ? 'completed' : booking.status === 'DECLINED' ? 'declined' : ''}">${statusLabels[booking.status] || escapeHTML(booking.status)}</span></td>
          <td>${booking.status === 'PENDING_APPROVAL' ? `<div class="booking-actions"><button class="approve-booking-button" type="button" data-approve-booking="${booking.id}">Approve</button><button class="decline-booking-button" type="button" data-decline-booking="${booking.id}">Decline</button></div>` : '—'}</td>
        </tr>`).join('');
    }

    async function loadPersistedEquipment() {
      if (window.location.protocol === 'file:') return;
      try {
        const response = await fetch('/api/equipment');
        const result = await readApiResponse(response, 'Unable to load equipment from the booking API.');
        for (const record of result.equipment || []) {
          const machine = equipment.find(item => item.name === record.name);
          if (!machine) continue;
          Object.assign(machine, {
            apiEquipmentId: record.id,
            apiOwnerId: record.ownerId,
            hourly: Number(record.hourlyRate),
            baseDeliveryFee: Number(record.baseDeliveryFee),
            ratePerKm: Number(record.ratePerKm),
            status: record.status,
            nextAvailableDate: availabilityDateISO(record.nextAvailableDate),
            isFeatured: record.isFeatured === true && (!record.featureExpiresAt || Date.parse(record.featureExpiresAt) > Date.now()),
            boostRegion: record.boostRegion || null,
            featureExpiresAt: record.featureExpiresAt || null
          });
        }
        persistedEquipmentLoaded = true;
        render();
        renderOwnerFleet();
      } catch (error) {
        console.error('Unable to load persisted equipment:', error);
        notify('Booking API unavailable. Using local mock equipment and checkout.');
      }
    }

    function mergePersistedBookings(records) {
      for (const record of records) {
        const localMachine = equipment.find(item => item.apiEquipmentId === record.equipmentId);
        const bookingId = bookings.find(item => item.apiBookingId === record.id)?.id
          ?? Math.max(0, ...bookings.map(item => typeof item.id === 'number' ? item.id : 0)) + 1;
        const startDate = availabilityDateISO(record.startDate);
        const endDate = availabilityDateISO(record.endDate);
        const booking = {
          id: bookingId,
          apiBookingId: record.id,
          equipmentId: localMachine?.id ?? record.equipmentId,
          renterId: record.renterId,
          renterEmail: record.renterId,
          renter: record.renterId,
          machine: record.equipment?.name || localMachine?.name || 'Equipment booking',
          location: localMachine?.location || '',
          schedule: startDate && endDate ? `${startDate} – ${endDate} · ${record.rentalHours} hours` : `${record.rentalHours} hours`,
          startDate,
          endDate,
          rentalHours: record.rentalHours,
          distanceKm: Number(record.distanceKm),
          baseDeliveryFee: Number(record.baseDeliveryFee),
          financials: {
            rentalCost: Number(record.rentalCost),
            baseDelivery: Number(record.baseDeliveryFee),
            travelCharge: Number(record.travelCharge),
            grossTotal: Number(record.grossTotal),
            platformFeeRetained: Number(record.platformFeeRetained),
            ownerNetPayout: Number(record.ownerNetPayout)
          },
          status: record.bookingStatus
        };
        const existingIndex = bookings.findIndex(item => item.apiBookingId === record.id);
        if (existingIndex === -1) bookings.unshift(booking);
        else bookings[existingIndex] = booking;
      }
    }

    async function loadPersistedBookings(role) {
      if (window.location.protocol === 'file:' || !persistedEquipmentLoaded) return;
      const ownerId = equipment.find(item => item.apiOwnerId)?.apiOwnerId;
      const query = role === 'owner'
        ? `ownerId=${encodeURIComponent(ownerId || 'demo-owner')}`
        : `renterId=${encodeURIComponent(signedInEmail)}`;
      try {
        const response = await fetch(`/api/bookings?${query}`);
        const result = await readApiResponse(response, 'Unable to load your bookings.');
        mergePersistedBookings(result.bookings || []);
        renderBookings();
        renderContractorBookings();
      } catch (error) {
        console.error('Unable to load persisted bookings:', error);
        notify(error.message || 'Unable to load your bookings.');
      }
    }

    function getBookingSnapshot(booking) {
      if (booking.financials) return booking.financials;
      const machine = equipment.find(item => item.id === booking.equipmentId);
      if (!machine) return { rentalCost: 0, travelCharge: 0, grossTotal: 0, platformFeeRetained: 0, ownerNetPayout: 0 };
      return getBookingFinancials(machine, booking.rentalHours || 8, booking.distanceKm || 10);
    }

    function persistMockBookings() {
      try {
        localStorage.setItem(
          'bigboys-mock-bookings',
          JSON.stringify(bookings.filter(booking => booking.isMock === true))
        );
      } catch (error) {
        console.error('Unable to persist mock bookings:', error);
        notify('This browser could not save the mock booking or its payment status.');
      }
    }

    function persistBookingPaymentState(booking) {
      try {
        const paymentState = JSON.parse(localStorage.getItem('bigboys-payment-state') || '{}');
        const key = booking.apiBookingId || booking.mockBookingId;
        if (!key) return;
        paymentState[key] = { status: booking.status, updatedAt: new Date().toISOString() };
        localStorage.setItem('bigboys-payment-state', JSON.stringify(paymentState));
      } catch (error) {
        console.error('Unable to persist booking payment state:', error);
        notify('Payment was confirmed, but its local status could not be saved.');
      }
    }

    function renderContractorBookings() {
      const section = document.querySelector('#contractor-checkouts');
      const list = document.querySelector('#checkout-booking-list');
      const renterBookings = bookings.filter(booking => booking.renterEmail === signedInEmail);
      section.hidden = renterBookings.length === 0;
      list.innerHTML = renterBookings.map(booking => {
        const isReadyForPayment = booking.status === 'AWAITING_PAYMENT';
        const label = booking.status === 'PENDING_APPROVAL'
          ? 'Pending owner approval'
          : booking.status === 'AWAITING_PAYMENT'
            ? 'Payment due'
            : booking.status === 'PAID_IN_ESCROW'
              ? 'Paid in escrow'
              : booking.status === 'DECLINED'
                ? 'Declined'
                : 'Completed';
        return `
          <article class="checkout-booking-card">
            <div><span class="section-kicker">${escapeHTML(label)}</span><h3>${escapeHTML(booking.machine)}</h3><p>${escapeHTML(booking.schedule)} · ${escapeHTML(booking.location)}</p></div>
            <div class="checkout-booking-total"><span>Total</span><strong>${peso(getBookingSnapshot(booking).grossTotal)}</strong></div>
            ${isReadyForPayment ? `<button class="owner-submit" type="button" data-open-checkout="${booking.id}">Continue to checkout</button>` : ''}
          </article>`;
      }).join('');
    }

    function renderAdminLedger() {
      const paidBookings = bookings.filter(booking => booking.status === 'PAID_IN_ESCROW');
      const totals = paidBookings.reduce((sum, booking) => {
        const financials = getBookingSnapshot(booking);
        sum.gross += financials.grossTotal;
        sum.platform += financials.platformFeeRetained;
        sum.owner += financials.ownerNetPayout;
        return sum;
      }, { gross: 0, platform: 0, owner: 0 });
      document.querySelector('#ledger-gross-total').textContent = peso(totals.gross);
      document.querySelector('#ledger-platform-total').textContent = peso(totals.platform);
      document.querySelector('#ledger-owner-total').textContent = peso(totals.owner);
      document.querySelector('#ledger-count').textContent = `${paidBookings.length} paid transaction${paidBookings.length === 1 ? '' : 's'}`;
      document.querySelector('#ledger-rows').innerHTML = paidBookings.length
        ? paidBookings.map(booking => {
          const financials = getBookingSnapshot(booking);
          return `<tr>
            <td>${escapeHTML(booking.apiBookingId || `BK-${String(booking.id).padStart(4, '0')}`)}</td>
            <td>${escapeHTML(booking.machine)}</td>
            <td>${peso(financials.grossTotal)}</td>
            <td>${peso(financials.platformFeeRetained)}</td>
            <td>${peso(financials.ownerNetPayout)}</td>
            <td><span class="status-pill onsite">PAID_IN_ESCROW</span></td>
          </tr>`;
        }).join('')
        : '<tr><td colspan="6" class="ledger-empty">No paid escrow transactions yet.</td></tr>';
    }

    async function loadAdminLedger() {
      renderAdminLedger();
      if (window.location.protocol === 'file:') return;
      try {
        const response = await fetch('/api/admin/transactions');
        const result = await readApiResponse(response, 'Unable to load transaction records.');
        const transactions = result.transactions || [];
        const totals = transactions.reduce((sum, transaction) => {
          sum.gross += Number(transaction.grossCollected);
          sum.platform += Number(transaction.platformFeeRetained);
          sum.owner += Number(transaction.ownerNetPayout);
          return sum;
        }, { gross: 0, platform: 0, owner: 0 });
        document.querySelector('#ledger-gross-total').textContent = peso(totals.gross);
        document.querySelector('#ledger-platform-total').textContent = peso(totals.platform);
        document.querySelector('#ledger-owner-total').textContent = peso(totals.owner);
        document.querySelector('#ledger-count').textContent = `${transactions.length} paid transaction${transactions.length === 1 ? '' : 's'}`;
        document.querySelector('#ledger-rows').innerHTML = transactions.length
          ? transactions.map(transaction => `<tr>
            <td>${escapeHTML(transaction.bookingId)}</td>
            <td>${escapeHTML(transaction.equipmentName)}</td>
            <td>${peso(transaction.grossCollected)}</td>
            <td>${peso(transaction.platformFeeRetained)}</td>
            <td>${peso(transaction.ownerNetPayout)}</td>
            <td><span class="status-pill onsite">${escapeHTML(transaction.bookingStatus)}</span></td>
          </tr>`).join('')
          : '<tr><td colspan="6" class="ledger-empty">No paid escrow transactions yet.</td></tr>';
      } catch (error) {
        console.error('Unable to load persisted admin ledger:', error);
        notify('Could not load the persisted ledger. Showing demo transactions instead.');
      }
    }

    function renderOwnerFleet() {
      const fleet = document.querySelector('#fleet-grid');
      document.querySelector('#fleet-count').textContent = `${equipment.length} machines in roster`;
      fleet.innerHTML = equipment.map((item, index) => `
        <article class="fleet-card" style="--card-index:${index}">
          <img class="fleet-thumb" src="${escapeHTML(item.images?.[0] || item.image)}" alt="${escapeHTML(item.type)}">
          <div class="fleet-info">
            <h3>${escapeHTML(item.name)}</h3>
            <span class="fleet-meta">${escapeHTML(item.location)} · ${peso(item.hourly)}/hr</span>
            <span class="fleet-status ${item.status === 'ON_SITE' ? 'on-rent' : item.status === 'MAINTENANCE' ? 'maintenance' : ''}">${item.status === 'ON_SITE' ? `On site until ${formatAvailabilityDate(item.nextAvailableDate)}` : item.status === 'MAINTENANCE' ? 'Maintenance' : 'Available now'}</span>
            <span class="fleet-meta">${peso(item.baseDeliveryFee)} delivery · ${peso(item.ratePerKm)}/km</span>
            <button class="fleet-edit-button" type="button" data-edit-equipment="${item.id}">Edit equipment</button>
            <button class="feature-boost-button" type="button" data-feature-equipment="${item.id}" ${isCurrentlyFeatured(item) ? 'disabled' : ''}>${isCurrentlyFeatured(item) ? 'FEATURED' : 'Boost / Feature · ₱299'}</button>
          </div>
        </article>`).join('');
    }

    function openFeatureCheckout(machine) {
      if (!machine) return;
      if (isCurrentlyFeatured(machine)) {
        notify(`${machine.name} is already featured.`);
        return;
      }
      activeFeatureMachine = machine;
      document.querySelector('#feature-checkout-machine').textContent = machine.name;
      document.querySelector('#feature-checkout-message').hidden = true;
      document.querySelector('#feature-checkout-message').textContent = '';
      document.querySelector('#feature-checkout-button').disabled = false;
      document.querySelector('#feature-checkout-dialog').showModal();
    }

    async function beginFeatureCheckout() {
      const machine = activeFeatureMachine;
      if (!machine) return;
      const button = document.querySelector('#feature-checkout-button');
      const message = document.querySelector('#feature-checkout-message');
      button.disabled = true;
      try {
        if (window.location.protocol === 'file:') {
          throw new Error('To pay for a listing boost, start the API with `npm start` and open http://localhost:3000.');
        }
        const apiEquipmentId = machine.apiEquipmentId || `local-${machine.id}`;
        const response = await fetch(`/api/equipment/${encodeURIComponent(apiEquipmentId)}/feature-checkout-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ownerId: machine.apiOwnerId || 'demo-owner',
            localEquipment: machine.apiEquipmentId ? undefined : {
              name: machine.name,
              hourlyRate: machine.hourly,
              baseDeliveryFee: machine.baseDeliveryFee,
              ratePerKm: machine.ratePerKm,
              status: machine.status,
              nextAvailableDate: machine.nextAvailableDate
            }
          })
        });
        const result = await readApiResponse(response, 'Unable to start listing feature checkout.');
        if (result.featured) {
          machine.isFeatured = true;
          machine.boostRegion = result.equipment.boostRegion;
          machine.featureExpiresAt = result.equipment.featureExpiresAt;
          persistFeaturedEquipment(machine);
          render();
          renderOwnerFleet();
          document.querySelector('#feature-checkout-dialog').close();
          notify(`${machine.name} is now featured.`);
          return;
        }
        if (!result.checkout_url) throw new Error('The payment service did not return a checkout URL.');
        localStorage.setItem('bigboys-feature-return', JSON.stringify({
          machineId: machine.id,
          apiEquipmentId,
          ownerId: machine.apiOwnerId || 'demo-owner'
        }));
        window.location.href = result.checkout_url;
      } catch (error) {
        message.textContent = error.message || 'Unable to start listing feature checkout.';
        message.hidden = false;
        button.disabled = false;
      }
    }

    function transitionTo(target) {
      const views = [loginView, contractorView, ownerView, adminView];
      if (views.every(view => view === target ? !view.hidden : view.hidden)) return;
      for (const view of views) {
        if (view !== target) view.hidden = true;
      }
      loginView.classList.remove('is-contextual');
      target.hidden = false;
      appHeader.hidden = target !== contractorView && target !== ownerView;
      updateAppHeader();
      target.classList.remove('view-entering');
      void target.offsetWidth;
      target.classList.add('view-entering');
      target.addEventListener('animationend', event => {
        if (event.target === target) target.classList.remove('view-entering');
      }, { once: true });
      window.scrollTo(0, 0);
    }

    function showWorkspace(role, email) {
      signedInRole = role;
      signedInEmail = email;
      updateAppHeader();
      if (role === 'admin') {
        document.querySelector('#admin-account-email').textContent = email;
        loadAdminLedger();
      } else {
        renderContractorBookings();
        equipmentLoadPromise.then(() => loadPersistedBookings('renter'));
      }
      transitionTo(role === 'admin' ? adminView : contractorView);
      const action = pendingListingAction;
      pendingListingAction = null;
      if (role !== 'contractor' || !action) return;
      const machine = equipment.find(entry => entry.id === action.machineId);
      if (!machine) return;
      if (action.type === 'save') {
        saved.add(machine.id);
        persistSavedEquipment();
        renderAccountMenus();
        render();
        notify(`${machine.name} saved.`);
      } else {
        openBooking(machine);
      }
    }

    function showOwnerDashboard() {
      if (signedInRole !== 'contractor') return;
      setMobileNavOpen(false);
      document.querySelector('#owner-first-name').textContent = signedInEmail.split('@')[0].split(/[._-]/)[0] || 'Owner';
      renderOwnerFleet();
      renderBookings();
      equipmentLoadPromise.then(() => loadPersistedBookings('owner'));
      transitionTo(ownerView);
      renderAccountMenus();
    }

    ownerModeSwitch.addEventListener('click', showOwnerDashboard);
    renterModeSwitch.addEventListener('click', () => {
      if (signedInRole === 'contractor') {
        transitionTo(contractorView);
        renderAccountMenus();
      }
    });

    function openCheckout(booking) {
      activeCheckoutBooking = booking;
      const isMockCheckout = booking.isMock === true;
      const financials = getBookingSnapshot(booking);
      document.querySelector('#checkout-mode-label').textContent = 'Secure checkout · PayMongo Sandbox';
      document.querySelector('#checkout-security-note').textContent = isMockCheckout
        ? 'Mock equipment uses the real PayMongo Sandbox when served by the API. The offline simulator below does not process a payment.'
        : 'Payments are processed in PayMongo Sandbox. Never enter real payment details in sandbox mode.';
      document.querySelector('#paymongo-checkout-button').textContent = 'Continue to PayMongo Sandbox';
      document.querySelector('#simulate-payment-button').hidden = !isMockCheckout;
      document.querySelector('#simulate-payment-button').textContent = isMockCheckout
        ? 'Offline mock: mark paid'
        : 'Simulate successful payment';
      document.querySelector('#checkout-machine').textContent = `${booking.machine} · ${booking.schedule}`;
      document.querySelector('#checkout-rental').textContent = peso(financials.rentalCost);
      document.querySelector('#checkout-delivery').textContent = peso(booking.baseDeliveryFee ?? equipment.find(item => item.id === booking.equipmentId)?.baseDeliveryFee ?? 0);
      document.querySelector('#checkout-travel').textContent = peso(financials.travelCharge);
      document.querySelector('#checkout-total').textContent = peso(financials.grossTotal);
      document.querySelector('#checkout-message').hidden = true;
      document.querySelector('#checkout-message').textContent = '';
      checkoutDialog.showModal();
    }

    function showCheckoutMessage(message, isError = false) {
      const messageElement = document.querySelector('#checkout-message');
      messageElement.textContent = message;
      messageElement.classList.toggle('error', isError);
      messageElement.hidden = false;
    }

    function showBookingError(message) {
      const availabilityMessage = document.querySelector('#booking-availability');
      availabilityMessage.textContent = message;
      availabilityMessage.classList.add('error');
      availabilityMessage.hidden = false;
    }

    function updateEstimate() {
      if (!selectedMachine) return;
      const hours = Math.max(1, Number(document.querySelector('#booking-hours').value) || 1);
      const distance = Math.max(0, Number(document.querySelector('#booking-miles').value) || 0);
      const financials = getBookingFinancials(selectedMachine, hours, distance);
      document.querySelector('#calc-hours').textContent = hours;
      document.querySelector('#calc-rate').textContent = peso(selectedMachine.hourly);
      document.querySelector('#calc-rental').textContent = peso(financials.rentalCost);
      document.querySelector('#calc-mobilization').textContent = peso(selectedMachine.baseDeliveryFee);
      document.querySelector('#calc-distance').textContent = distance;
      document.querySelector('#calc-mile-rate').textContent = peso(selectedMachine.ratePerKm);
      document.querySelector('#calc-mileage').textContent = peso(financials.travelCharge);
      document.querySelector('#calc-total').textContent = peso(financials.grossTotal);

      const startDate = document.querySelector('#booking-start-date').value;
      const endDate = document.querySelector('#booking-end-date').value;
      const requestButton = document.querySelector('#request-button');
      const availabilityMessage = document.querySelector('#booking-availability');
      const blockedBookings = bookings.filter(booking =>
        booking.equipmentId === selectedMachine.id
        && ['PENDING_APPROVAL', 'AWAITING_PAYMENT', 'PAID_IN_ESCROW'].includes(booking.status)
        && booking.startDate
        && booking.endDate
      );
      let availabilityError = '';
      const returnDate = availabilityDateISO(selectedMachine.nextAvailableDate);
      const minimumStartDate = firstBookableDate(selectedMachine);
      if (selectedMachine.status === 'MAINTENANCE') {
        availabilityError = 'This machine is in maintenance and cannot be requested right now.';
      } else if (!startDate || !endDate) {
        availabilityError = 'Choose a start and end date to check availability.';
      } else if (endDate < startDate) {
        availabilityError = 'The end date must be on or after the start date.';
      } else if (selectedMachine.status === 'ON_SITE' && !returnDate) {
        availabilityError = 'This machine is currently on site and its return date has not been confirmed.';
      } else if (startDate < minimumStartDate) {
        availabilityError = selectedMachine.status === 'ON_SITE'
          ? `This machine is on site until ${formatAvailabilityDate(returnDate)}. Pre-booking starts ${formatBookingDate(minimumStartDate)}.`
          : `Choose a start date that is ${formatBookingDate(minimumStartDate)} or later.`;
      } else if (blockedBookings.some(booking => startDate <= booking.endDate && endDate >= booking.startDate)) {
        availabilityError = 'Those dates overlap with another booking request. Choose different dates.';
      }
      availabilityMessage.textContent = availabilityError;
      availabilityMessage.classList.remove('error');
      availabilityMessage.hidden = !availabilityError;
      requestButton.disabled = Boolean(availabilityError);
    }

    function getMachinePhotos(machine) {
      return machine.images?.length ? machine.images : [machine.image];
    }

    function updateDialogPhoto() {
      const photos = getMachinePhotos(selectedMachine);
      const hasMultiplePhotos = photos.length > 1;
      document.querySelector('#dialog-image').src = photos[activePhotoIndex];
      document.querySelector('#dialog-image').alt = `${selectedMachine.type} photo ${activePhotoIndex + 1} of ${photos.length}`;
      document.querySelector('#dialog-photo-count').textContent = `${activePhotoIndex + 1} / ${photos.length}`;
      document.querySelector('#dialog-photo-count').hidden = !hasMultiplePhotos;
      document.querySelectorAll('.gallery-nav').forEach(button => { button.hidden = !hasMultiplePhotos; });
    }

    function openBooking(machine) {
      selectedMachine = machine;
      activePhotoIndex = 0;
      updateDialogPhoto();
      document.querySelector('#dialog-type').textContent = `${machine.type} · ${machine.location} · ${peso(machine.hourly)}/hour`;
      document.querySelector('#dialog-title').textContent = machine.name;
      document.querySelector('#dialog-description').textContent = machine.description;
      document.querySelector('#booking-hours').value = 8;
      document.querySelector('#booking-miles').value = 10;
      const startDate = document.querySelector('#booking-start-date');
      const endDate = document.querySelector('#booking-end-date');
      startDate.min = firstBookableDate(selectedMachine);
      startDate.value = startDate.min;
      endDate.min = startDate.value;
      endDate.value = startDate.value;
      updateEstimate();
      dialog.showModal();
    }

    function notify(message) {
      const toast = document.querySelector('#toast');
      toast.textContent = message;
      toast.classList.add('show');
      window.clearTimeout(notify.timeout);
      notify.timeout = window.setTimeout(() => toast.classList.remove('show'), 2600);
    }

    document.querySelector('.categories').addEventListener('click', event => {
      const button = event.target.closest('[data-category]');
      if (!button) return;
      activeCategory = button.dataset.category;
      document.querySelectorAll('.category').forEach(category => {
        const isActive = category === button;
        category.classList.toggle('active', isActive);
        category.setAttribute('aria-pressed', String(isActive));
      });
      showSaved = false;
      render();
    });

    grid.addEventListener('click', event => {
      const saveButton = event.target.closest('[data-save]');
      const detailButton = event.target.closest('[data-detail]');
      if (saveButton) {
        const id = Number(saveButton.dataset.save);
        if (!signedInRole) {
          openSignIn({ type: 'save', machineId: id });
          return;
        }
        if (saved.has(id)) saved.delete(id); else saved.add(id);
        persistSavedEquipment();
        renderAccountMenus();
        render();
        return;
      }
      const card = event.target.closest('.equipment-card');
      if (card) {
        const machineId = Number(detailButton?.dataset.detail || card.querySelector('[data-detail]').dataset.detail);
        if (!signedInRole) {
          openSignIn({ type: 'details', machineId });
          return;
        }
        openBooking(equipment.find(entry => entry.id === machineId));
      }
    });

    accountMenus.forEach(menu => menu.addEventListener('click', async event => {
      const bell = event.target.closest('[data-menu-bell]');
      if (bell) {
        const opening = menu.querySelector('[data-menu-popover]').hidden;
        accountMenus.forEach(otherMenu => {
          otherMenu.querySelector('[data-menu-popover]').hidden = otherMenu !== menu || !opening;
          otherMenu.querySelector('[data-menu-bell]').setAttribute('aria-expanded', String(otherMenu === menu && opening));
        });
        if (opening) selectMenuTab(menu, 'notifications');
        return;
      }

      const tab = event.target.closest('[data-menu-tab]');
      if (tab) {
        selectMenuTab(menu, tab.dataset.menuTab);
        return;
      }

      if (event.target.closest('[data-mark-read]')) {
        const visibleIds = new Set(visibleNotifications().map(item => item.id));
        notifications = notifications.map(item => visibleIds.has(item.id) ? { ...item, read: true } : item);
        persistNotifications();
        renderAccountMenus();
        return;
      }

      const notification = event.target.closest('[data-notification-id]');
      if (notification) {
        const selectedNotification = notifications.find(item => item.id === notification.dataset.notificationId);
        notifications = notifications.map(item => item.id === notification.dataset.notificationId ? { ...item, read: true } : item);
        persistNotifications();
        renderAccountMenus();
        if (selectedNotification?.recipientRole === 'renter' && selectedNotification.bookingId !== undefined) {
          if (selectedNotification.apiBookingId && window.location.protocol !== 'file:') {
            await loadPersistedBookings('renter');
          }
          const booking = bookings.find(item => selectedNotification.apiBookingId
            ? String(item.apiBookingId) === String(selectedNotification.apiBookingId)
            : String(item.id) === String(selectedNotification.bookingId));
          if (booking?.status === 'AWAITING_PAYMENT') {
            menu.querySelector('[data-menu-popover]').hidden = true;
            menu.querySelector('[data-menu-bell]').setAttribute('aria-expanded', 'false');
            openCheckout(booking);
          } else {
            notify('This booking is not ready for payment yet.');
          }
        }
        return;
      }

      const removeSaved = event.target.closest('[data-saved-remove]');
      if (removeSaved) {
        saved.delete(Number(removeSaved.dataset.savedRemove));
        persistSavedEquipment();
        renderAccountMenus();
        render();
        return;
      }

      const bookSaved = event.target.closest('[data-saved-book]');
      if (bookSaved) {
        const machine = equipment.find(item => item.id === Number(bookSaved.dataset.savedBook));
        menu.querySelector('[data-menu-popover]').hidden = true;
        menu.querySelector('[data-menu-bell]').setAttribute('aria-expanded', 'false');
        if (machine) openBooking(machine);
        return;
      }
    }));

    function selectMenuTab(menu, selectedTab) {
      menu.querySelectorAll('[data-menu-tab]').forEach(tab => {
        const active = tab.dataset.menuTab === selectedTab;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-selected', String(active));
      });
      menu.querySelectorAll('[data-menu-panel]').forEach(panel => {
        panel.hidden = panel.dataset.menuPanel !== selectedTab;
      });
    }

    function setMobileNavOpen(isOpen) {
      appTopbar.classList.toggle('mobile-menu-open', isOpen);
      mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
      mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    }

    mobileMenuToggle.addEventListener('click', () => {
      setMobileNavOpen(!appTopbar.classList.contains('mobile-menu-open'));
    });
    document.querySelectorAll('#mobile-nav-drawer .nav-links a').forEach(link => {
      link.addEventListener('click', () => setMobileNavOpen(false));
    });
    signInButton.addEventListener('click', () => {
      setMobileNavOpen(false);
      openSignIn();
    });
    ownerModeSwitch.addEventListener('click', () => setMobileNavOpen(false));
    renterModeSwitch.addEventListener('click', () => setMobileNavOpen(false));
    signOutButton.addEventListener('click', () => setMobileNavOpen(false));

    document.addEventListener('click', event => {
      if (event.target.closest('[data-account-menu]')) return;
      accountMenus.forEach(menu => {
        menu.querySelector('[data-menu-popover]').hidden = true;
        menu.querySelector('[data-menu-bell]').setAttribute('aria-expanded', 'false');
      });
      if (!event.target.closest('#app-topbar')) setMobileNavOpen(false);
    });

    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      accountMenus.forEach(menu => {
        menu.querySelector('[data-menu-popover]').hidden = true;
        menu.querySelector('[data-menu-bell]').setAttribute('aria-expanded', 'false');
      });
      setMobileNavOpen(false);
    });

    window.addEventListener('storage', event => {
      if (event.key === 'bigboys-saved-equipment') {
        saved.clear();
        loadSavedEquipment();
        renderAccountMenus();
        render();
      } else if (event.key === 'bigboys-notifications') {
        loadNotifications();
        renderAccountMenus();
      }
    });

    document.querySelector('#login-back').addEventListener('click', () => {
      pendingListingAction = null;
      contextualSignIn = false;
      transitionTo(contractorView);
    });
    document.querySelector('#login-close').addEventListener('click', () => {
      if (!contextualSignIn) {
        pendingListingAction = null;
        transitionTo(contractorView);
        return;
      }
      pendingListingAction = null;
      contextualSignIn = false;
      loginView.classList.remove('is-contextual');
      loginView.hidden = true;
    });
    document.querySelector('#admin-portal-link').addEventListener('click', event => {
      event.preventDefault();
      openSignIn();
      document.querySelector('#login-email').value = 'admin@bigboys.com';
      document.querySelector('#login-password').focus();
    });

    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      showSaved = false;
      render();
      document.querySelector('#equipment').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    equipmentFilter.addEventListener('change', () => { showSaved = false; render(); });
    homeAreaInput.addEventListener('input', () => {
      localStorage.setItem('bigboys-home-area', homeAreaInput.value.trim());
      showSaved = false;
      render();
    });
    nearbyAreasInput.addEventListener('change', () => {
      showSaved = false;
      render();
    });
    document.querySelector('#reset-link').addEventListener('click', () => {
      activeCategory = 'all'; showSaved = false; equipmentFilter.value = 'all'; homeAreaInput.value = ''; nearbyAreasInput.checked = false; localStorage.removeItem('bigboys-home-area');
      document.querySelectorAll('.category').forEach((button, index) => { button.classList.toggle('active', index === 0); button.setAttribute('aria-pressed', String(index === 0)); });
      render();
    });
    document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    document.querySelector('#booking-hours').addEventListener('input', updateEstimate);
    document.querySelector('#booking-miles').addEventListener('input', updateEstimate);
    document.querySelector('#booking-start-date').addEventListener('change', event => {
      document.querySelector('#booking-end-date').min = event.target.value || todayISO();
      updateEstimate();
    });
    document.querySelector('#booking-end-date').addEventListener('change', updateEstimate);
    document.querySelector('#request-button').addEventListener('click', async event => {
      updateEstimate();
      if (!selectedMachine || document.querySelector('#request-button').disabled) return;
      const requestButton = event.currentTarget;
      requestButton.disabled = true;
      const hours = Number(document.querySelector('#booking-hours').value);
      const startDate = document.querySelector('#booking-start-date').value;
      const endDate = document.querySelector('#booking-end-date').value;
      try {
        await equipmentLoadPromise;
        const distanceKm = Number(document.querySelector('#booking-miles').value);
        const financials = getBookingFinancials(selectedMachine, hours, distanceKm);
        const isFuturePreBooking = startDate > todayISO();
        if (persistedEquipmentLoaded && selectedMachine.apiEquipmentId) {
          const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              equipmentId: selectedMachine.apiEquipmentId,
              renterId: signedInEmail,
              rentalHours: hours,
              distanceKm,
              startDate,
              endDate
            })
          });
          const result = await readApiResponse(response, 'Unable to create the booking.');
          mergePersistedBookings([{
            ...result.booking,
            equipment: { id: selectedMachine.apiEquipmentId, name: selectedMachine.name }
          }]);
        } else {
          const financials = getBookingFinancials(selectedMachine, hours, distanceKm);
          const start = new Date(`${startDate}T00:00:00`).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
          const end = new Date(`${endDate}T00:00:00`).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
          bookings.push({
            id: Math.max(0, ...bookings.map(booking => typeof booking.id === 'number' ? booking.id : 0)) + 1,
            isMock: true,
            mockBookingId: `mock-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            equipmentId: selectedMachine.id,
            renterId: signedInEmail,
            renterEmail: signedInEmail,
            renter: signedInEmail.split('@')[0],
            machine: selectedMachine.name,
            location: 'Project site',
            schedule: `${start}${startDate === endDate ? '' : ` – ${end}`} · ${hours} hours`,
            startDate,
            endDate,
            rentalHours: hours,
            distanceKm,
            baseDeliveryFee: selectedMachine.baseDeliveryFee,
            financials: {
              ...financials,
              baseDelivery: selectedMachine.baseDeliveryFee
            },
            status: 'PENDING_APPROVAL'
          });
          persistMockBookings();
        }
        renderBookings();
        renderContractorBookings();
        const bookingStatus = isFuturePreBooking ? 'Pending Future Pre-Booking · ' : '';
        const notification = `${bookingStatus}Booking Pending Owner Approval: ${selectedMachine.name} · ${hours} hrs · ${formatBookingDate(startDate)}–${formatBookingDate(endDate)} · Total ${peso(Math.round(financials.grossTotal * 100) / 100)}`;
        addNotification('owner', notification);
        addNotification('renter', notification, signedInEmail);
        notify('Booking request sent to owner!');
        dialog.close();
      } catch (error) {
        showBookingError(error.message || 'Unable to create the booking.');
      } finally {
        requestButton.disabled = false;
      }
    });

    document.querySelector('#booking-rows').addEventListener('click', async event => {
      const approveButton = event.target.closest('[data-approve-booking]');
      const declineButton = event.target.closest('[data-decline-booking]');
      if (!approveButton && !declineButton) return;
      const bookingId = Number(approveButton?.dataset.approveBooking || declineButton?.dataset.declineBooking);
      const booking = bookings.find(item => item.id === bookingId);
      if (!booking || booking.status !== 'PENDING_APPROVAL') return;
      const decision = approveButton ? 'approve' : 'decline';
      const actionButton = approveButton || declineButton;
      actionButton.disabled = true;
      try {
        if (booking.apiBookingId) {
          const machine = equipment.find(item => item.id === booking.equipmentId);
          const response = await fetch(`/api/bookings/${encodeURIComponent(booking.apiBookingId)}/${decision}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ownerId: machine?.apiOwnerId || 'demo-owner' })
          });
          const result = await readApiResponse(response, `Unable to ${decision} this booking.`);
          booking.status = result.booking.bookingStatus;
        } else {
          booking.status = decision === 'approve' ? 'AWAITING_PAYMENT' : 'DECLINED';
          persistMockBookings();
        }
        renderBookings();
        renderContractorBookings();
        const machineName = booking.machine;
        if (decision === 'approve') {
          addNotification('renter', `Booking Approved - Tap to Pay: Your request for ${machineName} has been confirmed by the owner`, booking.renterEmail, booking.id, booking.apiBookingId || null);
          notify('Booking approved. The renter can now proceed to payment.');
        } else {
          addNotification('renter', `Booking Declined: Your request for ${machineName} was declined by the owner`, booking.renterEmail);
          notify('Booking declined. The renter has been notified.');
        }
      } catch (error) {
        notify(error.message || `Unable to ${decision} this booking.`);
        actionButton.disabled = false;
      }
    });

    document.querySelector('#checkout-booking-list').addEventListener('click', event => {
      const button = event.target.closest('[data-open-checkout]');
      if (!button) return;
      const booking = bookings.find(item => item.id === Number(button.dataset.openCheckout));
      if (booking?.status === 'AWAITING_PAYMENT') openCheckout(booking);
    });

    document.querySelector('#checkout-close').addEventListener('click', () => checkoutDialog.close());
    checkoutDialog.addEventListener('click', event => {
      if (event.target === checkoutDialog) checkoutDialog.close();
    });
    document.querySelector('#paymongo-checkout-button').addEventListener('click', async event => {
      const button = event.currentTarget;
      if (!activeCheckoutBooking) return;
      const apiBookingId = activeCheckoutBooking.apiBookingId;
      if (!apiBookingId) {
        button.disabled = true;
        try {
          if (window.location.protocol === 'file:') {
            throw new Error('To open PayMongo Sandbox, start the API with `npm start` and use http://localhost:3000. The offline mock option remains available below.');
          }
          const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              mock: true,
              bookingId: activeCheckoutBooking.mockBookingId,
              equipmentId: activeCheckoutBooking.equipmentId,
              rentalHours: activeCheckoutBooking.rentalHours,
              distanceKm: activeCheckoutBooking.distanceKm,
              equipmentName: activeCheckoutBooking.machine,
              hourlyRate: equipment.find(item => item.id === activeCheckoutBooking.equipmentId)?.hourly,
              baseDeliveryFee: activeCheckoutBooking.baseDeliveryFee,
              ratePerKm: equipment.find(item => item.id === activeCheckoutBooking.equipmentId)?.ratePerKm
            })
          });
          const result = await readApiResponse(response, 'Unable to start PayMongo checkout.');
          if (!result.checkout_url) throw new Error('The payment service did not return a checkout URL.');
          window.location.href = result.checkout_url;
        } catch (error) {
          showCheckoutMessage(error.message || 'Unable to reach PayMongo Sandbox.', true);
        } finally {
          button.disabled = false;
        }
        return;
      }

      button.disabled = true;
      try {
        const detailsResponse = await fetch(`/api/bookings/${encodeURIComponent(apiBookingId)}/checkout-details`);
        const detailsResult = await readApiResponse(detailsResponse, 'Unable to load the database booking.');
        const apiBooking = detailsResult.booking;
        if (apiBooking.bookingStatus !== 'AWAITING_PAYMENT') {
          throw new Error('The database booking must be approved and awaiting payment before checkout.');
        }
        document.querySelector('#checkout-machine').textContent = `${apiBooking.equipmentName} · ${apiBooking.rentalHours} hours · ${apiBooking.distanceKm} km`;
        document.querySelector('#checkout-rental').textContent = peso(apiBooking.rentalCost);
        document.querySelector('#checkout-delivery').textContent = peso(apiBooking.baseDeliveryFee);
        document.querySelector('#checkout-travel').textContent = peso(apiBooking.travelCharge);
        document.querySelector('#checkout-total').textContent = peso(apiBooking.grossTotal);

        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId: apiBookingId })
        });
        const result = await readApiResponse(response, 'Unable to start PayMongo checkout.');
        if (!result.checkout_url) throw new Error('The payment service did not return a checkout URL.');
        window.location.href = result.checkout_url;
      } catch (error) {
        showCheckoutMessage(error.message || 'Unable to reach the booking API.', true);
      } finally {
        button.disabled = false;
      }
    });

    document.querySelector('#simulate-payment-button').addEventListener('click', async event => {
      const button = event.currentTarget;
      const booking = activeCheckoutBooking;
      if (!booking || booking.status !== 'AWAITING_PAYMENT') return;
      const apiBookingId = booking.apiBookingId;
      button.disabled = true;
      try {
        if (apiBookingId) {
          const response = await fetch(`/api/bookings/${encodeURIComponent(apiBookingId)}/simulate-payment`, {
            method: 'POST'
          });
          await readApiResponse(response, 'Unable to simulate sandbox payment.');
        }
        booking.status = 'PAID_IN_ESCROW';
        persistMockBookings();
        const machine = equipment.find(item => item.id === booking.equipmentId);
        if (machine) {
          machine.status = 'ON_SITE';
          machine.nextAvailableDate = booking.endDate || null;
        }
        render();
        renderOwnerFleet();
        renderBookings();
        renderContractorBookings();
        renderAdminLedger();
        const paymentMessage = booking.isMock
          ? 'Offline mock checkout complete. No payment was processed; the local booking is now PAID_IN_ESCROW.'
          : 'Sandbox payment simulation succeeded. The booking is now PAID_IN_ESCROW.';
        showCheckoutMessage(paymentMessage);
        notify(booking.isMock ? 'Offline mock payment simulation complete.' : 'Sandbox payment simulation successful.');
        window.setTimeout(() => checkoutDialog.close(), 1100);
      } catch (error) {
        showCheckoutMessage(error.message || 'Unable to complete the sandbox simulation.', true);
      } finally {
        button.disabled = false;
      }
    });

    function renderPhotoPreviews() {
      const preview = document.querySelector('#photo-previews');
      preview.classList.toggle('visible', uploadedPhotos.length > 0);
      preview.innerHTML = uploadedPhotos.map((photo, index) => `
        <div class="photo-preview-item">
          <img src="${escapeHTML(photo)}" alt="Selected machine photo ${index + 1}">
          ${index === 0 ? '<span class="photo-cover-label">Cover</span>' : ''}
          <button class="photo-remove" type="button" data-remove-photo="${index}" aria-label="Remove photo ${index + 1}">&times;</button>
        </div>`).join('');
    }

    document.querySelector('#machine-photo').addEventListener('change', event => {
      uploadedPhotos.forEach(photo => URL.revokeObjectURL(photo));
      const files = Array.from(event.target.files).slice(0, 8);
      uploadedPhotos = files.map(file => URL.createObjectURL(file));
      renderPhotoPreviews();
      if (event.target.files.length > 8) notify('Only the first 8 photos were added.');
    });

    document.querySelector('#photo-previews').addEventListener('click', event => {
      const button = event.target.closest('[data-remove-photo]');
      if (!button) return;
      const [removedPhoto] = uploadedPhotos.splice(Number(button.dataset.removePhoto), 1);
      URL.revokeObjectURL(removedPhoto);
      renderPhotoPreviews();
    });

    function resetEquipmentForm() {
      editingEquipmentId = null;
      ownerForm.reset();
      uploadedPhotos = [];
      renderPhotoPreviews();
      updatePayoutPreview();
      document.querySelector('#owner-title').textContent = 'List your machine';
      document.querySelector('#machine-submit').textContent = 'Add machine to fleet';
      document.querySelector('#cancel-machine-edit').hidden = true;
      document.querySelector('#delete-machine-button').hidden = true;
      document.querySelector('#edit-feature-section').hidden = true;
      document.querySelector('#edit-feature-button').disabled = false;
    }

    document.querySelector('#fleet-grid').addEventListener('click', event => {
      const featureButton = event.target.closest('[data-feature-equipment]');
      if (featureButton) {
        openFeatureCheckout(equipment.find(item => item.id === Number(featureButton.dataset.featureEquipment)));
        return;
      }
      const editButton = event.target.closest('[data-edit-equipment]');
      if (!editButton) return;
      const machine = equipment.find(item => item.id === Number(editButton.dataset.editEquipment));
      if (!machine) return;
      editingEquipmentId = machine.id;
      ownerForm.elements.name.value = machine.name;
      if (![...ownerForm.elements.type.options].some(option => option.value === machine.type)) {
        ownerForm.elements.type.add(new Option(machine.type, machine.type), 0);
      }
      ownerForm.elements.type.value = machine.type;
      ownerForm.elements.location.value = machine.location;
      ownerForm.elements.hourly.value = machine.hourly;
      ownerForm.elements.baseDeliveryFee.value = machine.baseDeliveryFee;
      ownerForm.elements.ratePerKm.value = machine.ratePerKm;
      ownerForm.elements.specs.value = machine.description;
      uploadedPhotos = getMachinePhotos(machine).slice();
      renderPhotoPreviews();
      document.querySelector('#owner-title').textContent = 'Edit your machine';
      document.querySelector('#machine-submit').textContent = 'Save equipment changes';
      document.querySelector('#cancel-machine-edit').hidden = false;
      document.querySelector('#delete-machine-button').hidden = false;
      document.querySelector('#edit-feature-section').hidden = false;
      document.querySelector('#edit-feature-button').dataset.featureEquipment = String(machine.id);
      document.querySelector('#edit-feature-button').disabled = isCurrentlyFeatured(machine);
      document.querySelector('#edit-feature-button').textContent = isCurrentlyFeatured(machine) ? 'FEATURED' : 'Boost / Feature';
      updatePayoutPreview();
      editFormSlot.append(ownerForm);
      editEquipmentDialog.showModal();
    });
    document.querySelector('#cancel-machine-edit').addEventListener('click', () => editEquipmentDialog.close());
    document.querySelector('#edit-equipment-close').addEventListener('click', () => editEquipmentDialog.close());
    document.querySelector('#edit-feature-button').addEventListener('click', event => {
      openFeatureCheckout(equipment.find(item => item.id === Number(event.currentTarget.dataset.featureEquipment)));
    });
    document.querySelector('#feature-checkout-button').addEventListener('click', beginFeatureCheckout);
    document.querySelector('#feature-checkout-close').addEventListener('click', () => document.querySelector('#feature-checkout-dialog').close());
    document.querySelector('#feature-checkout-dialog').addEventListener('click', event => {
      if (event.target === event.currentTarget) event.currentTarget.close();
    });
    editEquipmentDialog.addEventListener('close', () => {
      ownerFormSlot.append(ownerForm);
      if (editingEquipmentId !== null) resetEquipmentForm();
    });
    document.querySelector('#delete-machine-button').addEventListener('click', () => {
      const machine = equipment.find(item => item.id === editingEquipmentId);
      if (!machine) return;
      const confirmed = window.confirm(`Are you sure you want to permanently remove ${machine.name} from your fleet? This action cannot be undone.`);
      if (!confirmed) return;
      const machineIndex = equipment.findIndex(item => item.id === machine.id);
      if (machineIndex < 0) {
        notify('This listing could not be found and was not removed.');
        return;
      }
      equipment.splice(machineIndex, 1);
      persistLocalEquipment();
      if (saved.delete(machine.id)) persistSavedEquipment();
      resetEquipmentForm();
      editEquipmentDialog.close();
      renderAccountMenus();
      render();
      renderOwnerFleet();
      notify(`${machine.name} was removed from your fleet.`);
    });

    function updatePayoutPreview() {
      const hourly = Number(document.querySelector('#machine-hourly').value) || 0;
      const baseDeliveryFee = Number(document.querySelector('#machine-delivery').value) || 0;
      const ratePerKm = Number(document.querySelector('#machine-distance-rate').value) || 0;
      const estimated = getBookingFinancials({ hourly, baseDeliveryFee, ratePerKm }, 8, 10);
      document.querySelector('#payout-preview-total').textContent = peso(hourly > 0 ? estimated.ownerNetPayout : 0);
    }
    ['machine-hourly', 'machine-delivery', 'machine-distance-rate'].forEach(id => {
      document.querySelector(`#${id}`).addEventListener('input', updatePayoutPreview);
    });

    document.querySelector('#owner-form').addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const name = String(formData.get('name')).trim();
      const type = String(formData.get('type'));
      const location = String(formData.get('location'));
      const specs = String(formData.get('specs') || '').trim();
      const editingMachine = editingEquipmentId === null ? null : equipment.find(item => item.id === editingEquipmentId);
      const isEditing = editingMachine !== null;
      const machinePhotos = uploadedPhotos.length
        ? [...uploadedPhotos]
        : editingMachine
          ? getMachinePhotos(editingMachine)
          : [equipment[0].image];
      const updatedFields = {
        name,
        type,
        category: ['Excavator', 'Backhoe', 'Loader'].includes(type) ? 'earthmoving' : 'site',
        location,
        hourly: Number(formData.get('hourly')),
        baseDeliveryFee: Number(formData.get('baseDeliveryFee')),
        ratePerKm: Number(formData.get('ratePerKm')),
        image: machinePhotos[0],
        images: machinePhotos,
        description: specs || `${type} available for rent from a ${location} equipment yard.`
      };
      if (isEditing) {
        Object.assign(editingMachine, updatedFields);
        if (editingMachine.localOnly) persistLocalEquipment();
      } else {
        equipment.unshift({
          id: Math.max(...equipment.map(item => item.id)) + 1,
          ...updatedFields,
          rating: 'New',
          reviews: 0,
          badge: 'New listing',
          localOnly: true,
          isFeatured: false,
          status: 'AVAILABLE',
          nextAvailableDate: null
        });
        persistLocalEquipment();
      }
      resetEquipmentForm();
      if (editEquipmentDialog.open) editEquipmentDialog.close();
      activeCategory = 'all';
      render();
      renderOwnerFleet();
      notify(isEditing ? `${name} details updated.` : `${name} is now listed in the marketplace.`);
      document.querySelector('#fleet').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.querySelector('#previous-photo').addEventListener('click', () => {
      const photos = getMachinePhotos(selectedMachine);
      activePhotoIndex = (activePhotoIndex - 1 + photos.length) % photos.length;
      updateDialogPhoto();
    });
    document.querySelector('#next-photo').addEventListener('click', () => {
      const photos = getMachinePhotos(selectedMachine);
      activePhotoIndex = (activePhotoIndex + 1) % photos.length;
      updateDialogPhoto();
    });

    document.querySelector('#login-form').addEventListener('submit', async event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get('email')).trim();
      const password = String(formData.get('password'));
      const isAdminEmail = email.toLowerCase() === 'admin@bigboys.com';
      const message = document.querySelector('#login-message');
      let role = 'contractor';
      if (isAdminEmail) {
        try {
          if (window.location.protocol === 'file:') {
            throw new Error('Admin sign-in requires the API server. Open the app at http://localhost:3000.');
          }
          const response = await fetch('/api/auth/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          const result = await readApiResponse(response, 'Unable to sign in to the admin portal.');
          if (result.role !== 'admin') {
            throw new Error('The admin sign-in service returned an invalid account role.');
          }
          role = result.role;
        } catch (error) {
          message.textContent = error.message || 'Unable to sign in to the admin portal.';
          message.hidden = false;
          return;
        }
      }
      message.hidden = true;
      if (document.querySelector('#remember-me').checked) localStorage.setItem('bigboys-remembered-email', email);
      else localStorage.removeItem('bigboys-remembered-email');
      contextualSignIn = false;
      showWorkspace(role, email);
    });

    document.querySelectorAll('[data-signout]').forEach(button => button.addEventListener('click', async () => {
      if (signedInRole === 'admin' && window.location.protocol !== 'file:') {
        try {
          const response = await fetch('/api/auth/admin/logout', { method: 'POST' });
          if (!response.ok) throw new Error(`Admin sign-out failed (HTTP ${response.status}).`);
        } catch (error) {
          notify(error.message || 'Unable to sign out of the admin portal.');
        }
      }
      document.querySelector('#login-password').value = '';
      signedInRole = '';
      signedInEmail = '';
      pendingListingAction = null;
      contextualSignIn = false;
      showSaved = false;
      updateAppHeader();
      render();
      transitionTo(contractorView);
    }));

    const rememberedEmail = localStorage.getItem('bigboys-remembered-email');
    homeAreaInput.value = localStorage.getItem('bigboys-home-area') || '';
    loadSavedEquipment();
    loadLocalEquipment();
    loadFeaturedEquipment();
    loadNotifications();
    if (rememberedEmail) {
      document.querySelector('#login-email').value = rememberedEmail;
      document.querySelector('#remember-me').checked = true;
    }

    updateAppHeader();
    renderAccountMenus();
    render();
    renderBookings();
    renderOwnerFleet();
    updatePayoutPreview();
    equipmentLoadPromise = loadPersistedEquipment();
    const loadingScreen = document.querySelector('#loading-screen');
    const loaderDelay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 180 : 760;
    window.setTimeout(() => {
      loadingScreen.classList.add('is-gone');
      window.setTimeout(() => { loadingScreen.hidden = true; }, 380);
    }, loaderDelay);
    const paymentReturn = new URLSearchParams(window.location.search).get('payment');
    if (paymentReturn === 'submitted') {
      notify('PayMongo returned you to the marketplace. Payment is confirmed only after the verified webhook updates the booking.');
      const returnedBookingId = new URLSearchParams(window.location.search).get('bookingId');
      if (returnedBookingId) {
        const checkPaymentStatus = async remainingChecks => {
          try {
            const response = await fetch(`/api/bookings/${encodeURIComponent(returnedBookingId)}/checkout-details`);
            const result = await readApiResponse(response, 'Unable to check payment status.');
            if (result.booking.bookingStatus === 'PAID_IN_ESCROW') {
              notify('Payment confirmed. Your booking is now paid in escrow.');
              const localBooking = bookings.find(booking => booking.apiBookingId === returnedBookingId);
              if (localBooking) {
                localBooking.status = 'PAID_IN_ESCROW';
                persistBookingPaymentState(localBooking);
                renderContractorBookings();
                renderAdminLedger();
              }
              return;
            }
            if (remainingChecks > 0) {
              window.setTimeout(() => checkPaymentStatus(remainingChecks - 1), 2000);
            } else {
              notify('Payment confirmation is still processing. Check your booking again shortly.');
            }
          } catch (error) {
            notify(error.message || 'Unable to check payment status.');
          }
        };
        checkPaymentStatus(5);
      }
    } else if (paymentReturn === 'cancelled') {
      notify('Checkout was cancelled. Your booking is still awaiting payment.');
    } else if (paymentReturn === 'mock_submitted') {
      const returnedBookingId = new URLSearchParams(window.location.search).get('bookingId');
      const localBooking = bookings.find(booking => booking.mockBookingId === returnedBookingId);
      if (!localBooking) {
        notify('PayMongo returned, but this tab no longer has the mock booking. Start a new request to continue testing.');
      } else {
        const checkMockPaymentStatus = async remainingChecks => {
          try {
            const response = await fetch(`/api/mock-checkouts/${encodeURIComponent(returnedBookingId)}/status`);
            const result = await readApiResponse(response, 'Unable to verify the PayMongo Sandbox payment.');
            if (result.bookingStatus === 'PAID_IN_ESCROW') {
              localBooking.status = 'PAID_IN_ESCROW';
              persistBookingPaymentState(localBooking);
              const machine = equipment.find(item => item.id === localBooking.equipmentId);
              if (machine) {
                machine.status = 'ON_SITE';
                machine.nextAvailableDate = localBooking.endDate || null;
              }
              persistMockBookings();
              render();
              renderOwnerFleet();
              renderContractorBookings();
              renderBookings();
              renderAdminLedger();
              notify('PayMongo Sandbox confirmed payment. The mock booking is now paid in escrow.');
              return;
            }
            if (remainingChecks > 0) {
              window.setTimeout(() => checkMockPaymentStatus(remainingChecks - 1), 2000);
            } else {
              notify('Payment confirmation is still processing. Check the booking again shortly.');
            }
          } catch (error) {
            notify(error.message || 'Unable to verify the PayMongo Sandbox payment.');
          }
        };
        checkMockPaymentStatus(5);
      }
    } else if (paymentReturn === 'mock_cancelled') {
      notify('PayMongo checkout was cancelled. Your mock booking is still awaiting payment.');
    }
    if (paymentReturn === 'feature_submitted') {
      try {
        const pendingFeature = JSON.parse(localStorage.getItem('bigboys-feature-return') || 'null');
        const returnedEquipmentId = new URLSearchParams(window.location.search).get('equipmentId');
        if (!pendingFeature || String(pendingFeature.apiEquipmentId) !== String(returnedEquipmentId)) {
          throw new Error('The listing boost could not be matched to this checkout return.');
        }
        const confirmFeaturePayment = async remainingChecks => {
          try {
            const response = await fetch(`/api/equipment/${encodeURIComponent(pendingFeature.apiEquipmentId)}/feature-status?ownerId=${encodeURIComponent(pendingFeature.ownerId)}`);
            const result = await readApiResponse(response, 'Unable to verify listing boost payment.');
            if (result.featured === true) {
              const machine = equipment.find(item => item.id === pendingFeature.machineId);
              if (!machine) throw new Error('The featured listing is no longer in the current equipment catalog.');
              machine.isFeatured = true;
              machine.boostRegion = result.equipment.boostRegion;
              machine.featureExpiresAt = result.equipment.featureExpiresAt;
              persistFeaturedEquipment(machine);
              render();
              renderOwnerFleet();
              localStorage.removeItem('bigboys-feature-return');
              notify(`${machine.name} is featured in Davao Region for 30 days.`);
              return;
            }
            if (remainingChecks > 0) {
              window.setTimeout(() => confirmFeaturePayment(remainingChecks - 1), 2000);
            } else {
              notify('Listing boost payment is still processing. The feature will activate after PayMongo confirms payment.');
            }
          } catch (error) {
            notify(error.message || 'Unable to verify listing boost payment.');
          }
        };
        confirmFeaturePayment(5);
      } catch (error) {
        console.error('Unable to verify listing feature return:', error);
        notify(error.message || 'Unable to verify listing boost payment.');
      }
    } else if (paymentReturn === 'feature_cancelled') {
      localStorage.removeItem('bigboys-feature-return');
      notify('Listing boost checkout was cancelled. The listing was not featured.');
    }
