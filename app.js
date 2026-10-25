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
        status: 'ON_SITE',
        nextAvailableDate: '2026-11-02',
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
        status: 'ON_SITE',
        nextAvailableDate: '2026-10-30',
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
      const savedMockBookings = JSON.parse(sessionStorage.getItem('bigboys-mock-bookings') || '[]');
      if (Array.isArray(savedMockBookings)) {
        bookings.push(...savedMockBookings.filter(booking => booking?.isMock === true));
      }
    } catch (error) {
      console.error('Unable to restore mock bookings from this browser session:', error);
      sessionStorage.removeItem('bigboys-mock-bookings');
    }

    const grid = document.querySelector('#listing-grid');
    const equipmentFilter = document.querySelector('#equipment-search');
    const loginView = document.querySelector('#login-view');
    const contractorView = document.querySelector('#contractor-view');
    const ownerView = document.querySelector('#owner-view');
    const adminView = document.querySelector('#admin-view');
    const signInButton = document.querySelector('#sign-in-button');
    const savedLink = document.querySelector('#saved-link');
    const homeAreaInput = document.querySelector('#home-area');
    const nearbyAreasInput = document.querySelector('#nearby-areas');
    const searchForm = document.querySelector('#search-form');
    const dialog = document.querySelector('#equipment-dialog');
    const checkoutDialog = document.querySelector('#checkout-dialog');
    const saved = new Set();
    let activeCategory = 'all';
    let signedInRole = '';
    let pendingListingAction = null;
    let showSaved = false;
    let selectedMachine = null;
    let uploadedPhotos = [];
    let activePhotoIndex = 0;
    let editingEquipmentId = null;
    let activeCheckoutBooking = null;
    let signedInEmail = '';
    let persistedEquipmentLoaded = false;
    let equipmentLoadPromise = Promise.resolve();
    const nearbyCities = {
      tagum: ['panabo', 'davao'],
      panabo: ['tagum', 'davao'],
      davao: ['tagum', 'panabo']
    };

    const normalizeCity = value => value.trim().toLowerCase().replace(/\s+city$/, '').trim();

    function updateContractorHeader() {
      const isContractorSignedIn = signedInRole === 'contractor';
      savedLink.hidden = !isContractorSignedIn;
      signInButton.hidden = isContractorSignedIn;
      document.querySelector('#contractor-view [data-signout]').hidden = !isContractorSignedIn;
    }

    function openSignIn(action = null) {
      pendingListingAction = action;
      document.querySelector('#login-role').value = 'contractor';
      transitionTo(loginView);
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
      const matches = equipment.filter(item => {
        const itemCity = normalizeCity(item.location);
        const searchableType = `${item.type} ${item.name}`.toLowerCase();
        const matchesEquipmentType = selectedEquipmentType === 'all' || searchableType.includes(selectedEquipmentType);
        const matchesCity = !homeArea || itemCity.includes(homeArea) || nearbyCitiesForArea.some(city => itemCity.includes(city));
        return matchesEquipmentType && matchesCity && (activeCategory === 'all' || item.category === activeCategory) && (!showSaved || saved.has(item.id));
      });
      document.querySelector('#equipment-title').textContent = showSaved ? 'Saved equipment' : 'Available machines';
      document.querySelector('#results-count').textContent = `${matches.length} machine${matches.length === 1 ? '' : 's'} listed · availability and rates shown in Philippine pesos`;
      if (!matches.length) {
        const scopeHelp = 'Try another city or equipment type.';
        grid.innerHTML = `<div class="empty-state">No machines match these filters. ${scopeHelp}</div>`;
        return;
      }
      grid.innerHTML = matches.map((item, index) => `
        <article class="equipment-card" style="--card-index:${index}">
          <div class="card-image">
            <img src="${escapeHTML(item.images?.[0] || item.image)}" alt="${escapeHTML(item.type)} available for rent" loading="lazy">
            <span class="badge availability-badge ${item.status === 'ON_SITE' ? 'onsite' : item.status === 'MAINTENANCE' ? 'maintenance' : 'available'}">${item.status === 'ON_SITE' ? `On Site until ${formatAvailabilityDate(item.nextAvailableDate)}` : item.status === 'MAINTENANCE' ? 'Maintenance' : 'Available Now'}</span>
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
            <span class="equipment-tag">${escapeHTML(item.badge)}</span>
            <div class="card-title-row">
              <h3>${escapeHTML(item.name)}</h3>
              <span class="rating"><b>★</b> ${escapeHTML(item.rating)} (${item.reviews})</span>
            </div>
            <div class="card-meta">
              <span>Delivery ${peso(item.baseDeliveryFee)} + ${peso(item.ratePerKm)}/km one way</span>
            </div>
            <div class="card-footer">
              <div class="price"><strong>${peso(item.hourly)}</strong> <small>/ hour</small></div>
              <button class="detail-button" type="button" data-detail="${item.id}">Request machine</button>
            </div>
          </div>
        </article>`).join('');
    }

    function renderBookings() {
      const statusLabels = {
        PENDING_APPROVAL: 'Pending approval',
        AWAITING_PAYMENT: 'Awaiting payment',
        PAID_IN_ESCROW: 'Paid in escrow',
        COMPLETED: 'Completed'
      };
      document.querySelector('#booking-rows').innerHTML = bookings.map(booking => `
        <tr>
          <td>${escapeHTML(booking.machine)}</td>
          <td>${escapeHTML(booking.renter)}</td>
          <td>${escapeHTML(booking.location)}</td>
          <td>${escapeHTML(booking.schedule)}</td>
          <td><span class="status-pill ${booking.status === 'PENDING_APPROVAL' ? 'pending' : booking.status === 'PAID_IN_ESCROW' ? 'onsite' : booking.status === 'COMPLETED' ? 'completed' : ''}">${statusLabels[booking.status]}</span></td>
          <td>${booking.status === 'PENDING_APPROVAL' ? `<button class="approve-booking-button" type="button" data-approve-booking="${booking.id}">Approve booking</button>` : '—'}</td>
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
            nextAvailableDate: availabilityDateISO(record.nextAvailableDate)
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
        sessionStorage.setItem(
          'bigboys-mock-bookings',
          JSON.stringify(bookings.filter(booking => booking.isMock === true))
        );
      } catch (error) {
        console.error('Unable to persist mock bookings for the PayMongo return flow:', error);
        notify('This browser could not save the mock booking for payment return. Keep this tab open until checkout finishes.');
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
          </div>
        </article>`).join('');
    }

    function transitionTo(target) {
      const current = [document.querySelector('#login-view'), document.querySelector('#contractor-view'), document.querySelector('#owner-view'), document.querySelector('#admin-view')].find(view => !view.hidden);
      if (current === target) return;
      if (current) current.hidden = true;
      target.hidden = false;
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
      updateContractorHeader();
      if (role === 'owner') {
        document.querySelector('#owner-account-email').textContent = email;
        document.querySelector('#owner-first-name').textContent = email.split('@')[0].split(/[._-]/)[0] || 'Owner';
        renderOwnerFleet();
        renderBookings();
        equipmentLoadPromise.then(() => loadPersistedBookings('owner'));
      }
      if (role === 'admin') {
        document.querySelector('#admin-account-email').textContent = email;
        loadAdminLedger();
      } else if (role === 'contractor') {
        renderContractorBookings();
        equipmentLoadPromise.then(() => loadPersistedBookings('renter'));
      }
      transitionTo(role === 'owner' ? ownerView : role === 'admin' ? adminView : contractorView);
      const action = pendingListingAction;
      pendingListingAction = null;
      if (role !== 'contractor' || !action) return;
      const machine = equipment.find(entry => entry.id === action.machineId);
      if (!machine) return;
      if (action.type === 'save') {
        saved.add(machine.id);
        document.querySelector('#saved-count').textContent = saved.size;
        render();
        notify(`${machine.name} saved.`);
      } else {
        openBooking(machine);
      }
    }

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
        && booking.status === 'PAID_IN_ESCROW'
        && booking.startDate
        && booking.endDate
      );
      let availabilityError = '';
      if (selectedMachine.status === 'MAINTENANCE') {
        availabilityError = 'This machine is in maintenance and cannot be requested right now.';
      } else if (!startDate || !endDate) {
        availabilityError = 'Choose a start and end date to check availability.';
      } else if (endDate < startDate) {
        availabilityError = 'The end date must be on or after the start date.';
      } else if (
        selectedMachine.status === 'ON_SITE'
        && (!availabilityDateISO(selectedMachine.nextAvailableDate) || startDate < availabilityDateISO(selectedMachine.nextAvailableDate))
      ) {
        availabilityError = selectedMachine.nextAvailableDate
          ? `This machine is on site until ${formatAvailabilityDate(selectedMachine.nextAvailableDate)}. Choose that date or later.`
          : 'This machine is currently on site and its next available date has not been confirmed.';
      } else if (startDate < todayISO()) {
        availabilityError = 'Choose a start date that is today or later.';
      } else if (blockedBookings.some(booking => startDate <= booking.endDate && endDate >= booking.startDate)) {
        availabilityError = 'Those dates overlap with an active on-site booking. Choose different dates.';
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
      startDate.min = todayISO();
      startDate.value = selectedMachine.status === 'ON_SITE' && selectedMachine.nextAvailableDate
        ? availabilityDateISO(selectedMachine.nextAvailableDate)
        : todayISO();
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
        document.querySelector('#saved-count').textContent = saved.size;
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

    signInButton.addEventListener('click', () => openSignIn());
    document.querySelector('#login-back').addEventListener('click', () => {
      pendingListingAction = null;
      transitionTo(contractorView);
    });

    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      showSaved = false;
      document.querySelector('#saved-link').setAttribute('aria-current', 'false');
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
    document.querySelector('#saved-link').addEventListener('click', () => {
      showSaved = !showSaved;
      activeCategory = 'all';
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
        notify(`Booking request added for ${selectedMachine.name}. It is pending owner approval.`);
        dialog.close();
      } catch (error) {
        showBookingError(error.message || 'Unable to create the booking.');
      } finally {
        requestButton.disabled = false;
      }
    });

    document.querySelector('#booking-rows').addEventListener('click', async event => {
      const approveButton = event.target.closest('[data-approve-booking]');
      if (!approveButton) return;
      const booking = bookings.find(item => item.id === Number(approveButton.dataset.approveBooking));
      if (!booking || booking.status !== 'PENDING_APPROVAL') return;
      approveButton.disabled = true;
      try {
        if (booking.apiBookingId) {
          const machine = equipment.find(item => item.id === booking.equipmentId);
          const response = await fetch(`/api/bookings/${encodeURIComponent(booking.apiBookingId)}/approve`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ownerId: machine?.apiOwnerId || 'demo-owner' })
          });
          const result = await readApiResponse(response, 'Unable to approve this booking.');
          booking.status = result.booking.bookingStatus;
        } else {
          booking.status = 'AWAITING_PAYMENT';
          persistMockBookings();
        }
        renderBookings();
        renderContractorBookings();
        notify('Booking approved. The renter can now proceed to payment.');
      } catch (error) {
        notify(error.message || 'Unable to approve this booking.');
        approveButton.disabled = false;
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
        if (activeCheckoutBooking.isMock !== true) {
          showCheckoutMessage('This booking is not linked to a PayMongo-ready API record.', true);
          return;
        }
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
              distanceKm: activeCheckoutBooking.distanceKm
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
      const form = document.querySelector('#owner-form');
      editingEquipmentId = null;
      form.reset();
      uploadedPhotos = [];
      renderPhotoPreviews();
      updatePayoutPreview();
      document.querySelector('#owner-title').textContent = 'List your machine';
      document.querySelector('#machine-submit').textContent = 'Add machine to fleet';
      document.querySelector('#cancel-machine-edit').hidden = true;
    }

    document.querySelector('#fleet-grid').addEventListener('click', event => {
      const editButton = event.target.closest('[data-edit-equipment]');
      if (!editButton) return;
      const machine = equipment.find(item => item.id === Number(editButton.dataset.editEquipment));
      if (!machine) return;
      editingEquipmentId = machine.id;
      const form = document.querySelector('#owner-form');
      form.elements.name.value = machine.name;
      if (![...form.elements.type.options].some(option => option.value === machine.type)) {
        form.elements.type.add(new Option(machine.type, machine.type), 0);
      }
      form.elements.type.value = machine.type;
      form.elements.location.value = machine.location;
      form.elements.hourly.value = machine.hourly;
      form.elements.baseDeliveryFee.value = machine.baseDeliveryFee;
      form.elements.ratePerKm.value = machine.ratePerKm;
      form.elements.specs.value = machine.description;
      uploadedPhotos = getMachinePhotos(machine).slice();
      renderPhotoPreviews();
      document.querySelector('#owner-title').textContent = 'Edit your machine';
      document.querySelector('#machine-submit').textContent = 'Save equipment changes';
      document.querySelector('#cancel-machine-edit').hidden = false;
      updatePayoutPreview();
      document.querySelector('#owner-add-machine').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    document.querySelector('#cancel-machine-edit').addEventListener('click', resetEquipmentForm);

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
      } else {
        equipment.unshift({
          id: Math.max(...equipment.map(item => item.id)) + 1,
          ...updatedFields,
          rating: 'New',
          reviews: 0,
          badge: 'New listing',
          status: 'AVAILABLE',
          nextAvailableDate: null
        });
      }
      resetEquipmentForm();
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

    document.querySelector('#login-form').addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get('email')).trim();
      const role = String(formData.get('role'));
      if (document.querySelector('#remember-me').checked) localStorage.setItem('bigboys-remembered-email', email);
      else localStorage.removeItem('bigboys-remembered-email');
      showWorkspace(role, email);
    });

    document.querySelectorAll('[data-signout]').forEach(button => button.addEventListener('click', () => {
      document.querySelector('#login-password').value = '';
      signedInRole = '';
      pendingListingAction = null;
      showSaved = false;
      updateContractorHeader();
      render();
      transitionTo(contractorView);
    }));

    const rememberedEmail = localStorage.getItem('bigboys-remembered-email');
    homeAreaInput.value = localStorage.getItem('bigboys-home-area') || '';
    if (rememberedEmail) {
      document.querySelector('#login-email').value = rememberedEmail;
      document.querySelector('#remember-me').checked = true;
    }

    updateContractorHeader();
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
