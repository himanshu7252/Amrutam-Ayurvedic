const http = require('http');
const url = require('url');
const { MockDataGenerator } = require('./generator');

const PORT = process.env.PORT || 4000;
const generator = new MockDataGenerator(108);

console.log('⚡ Initializing high-performance deterministic datasets in server...');
console.time('Dataset Generation');
const DOCTORS = generator.generateDoctors(5000);
const PRODUCTS = generator.generateProducts(20000);
const HEALTH_RECORDS = generator.generateHealthRecords(10000);
const CONSULTATIONS = [];
const BOOKED_SLOTS = new Set();
console.timeEnd('Dataset Generation');
console.log(`✅ Server Loaded: 5,000 Doctors | 20,000 Products | 10,000 Health Records`);

function sendJSON(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    });
    return res.end();
  }

  // Health check
  if (pathname === '/health' || pathname === '/') {
    return sendJSON(res, 200, {
      status: 'UP',
      app: 'Amrutam Ayurvedic Mock REST Backend Server',
      datasets: {
        doctors: DOCTORS.length,
        products: PRODUCTS.length,
        healthRecords: HEALTH_RECORDS.length,
        consultations: CONSULTATIONS.length,
      },
      timestamp: new Date().toISOString(),
    });
  }

  // 1. DOCTORS ENDPOINTS
  if (pathname === '/api/v1/doctors' && method === 'GET') {
    let filtered = [...DOCTORS];
    const { search, category, minRating, minExperience, maxFee, availableTodayOnly, sortBy, page = 1, limit = 20 } = query;

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialization.toLowerCase().includes(q) ||
          d.ayurvedaCategory.toLowerCase().includes(q) ||
          d.hospitalAffiliation.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'All') {
      filtered = filtered.filter((d) => d.ayurvedaCategory === category);
    }

    if (minRating) {
      filtered = filtered.filter((d) => d.rating >= parseFloat(minRating));
    }

    if (minExperience) {
      filtered = filtered.filter((d) => d.experienceYears >= parseInt(minExperience, 10));
    }

    if (maxFee) {
      filtered = filtered.filter((d) => d.consultationFee <= parseInt(maxFee, 10));
    }

    if (availableTodayOnly === 'true') {
      filtered = filtered.filter((d) => d.isAvailableToday);
    }

    // Sorting
    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'experience') {
      filtered.sort((a, b) => b.experienceYears - a.experienceYears);
    } else if (sortBy === 'fee_asc') {
      filtered.sort((a, b) => a.consultationFee - b.consultationFee);
    } else if (sortBy === 'fee_desc') {
      filtered.sort((a, b) => b.consultationFee - a.consultationFee);
    }

    const p = parseInt(page, 10);
    const l = parseInt(limit, 10);
    const startIndex = (p - 1) * l;
    const paginated = filtered.slice(startIndex, startIndex + l);

    return sendJSON(res, 200, {
      success: true,
      data: paginated,
      page: p,
      limit: l,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / l),
      hasMore: startIndex + l < filtered.length,
    });
  }

  // Doctor Details & Doctor Slots
  const doctorMatch = pathname.match(/^\/api\/v1\/doctors\/([^/]+)(\/slots)?$/);
  if (doctorMatch && method === 'GET') {
    const doctorId = doctorMatch[1];
    const isSlots = Boolean(doctorMatch[2]);
    const doctor = DOCTORS.find((d) => d.id === doctorId);

    if (!doctor) {
      return sendJSON(res, 404, { success: false, message: `Doctor with id ${doctorId} not found` });
    }

    if (isSlots) {
      const slots = generator.generateDoctorSlots(doctorId).map((s) => ({
        ...s,
        isBooked: s.isBooked || BOOKED_SLOTS.has(s.id),
      }));
      return sendJSON(res, 200, { success: true, data: slots });
    }

    return sendJSON(res, 200, { success: true, data: doctor });
  }

  // Bookings / Consultations
  if (pathname === '/api/v1/consultations' && method === 'POST') {
    try {
      const body = await parseBody(req);
      const { doctorId, slotId, date, time, slotTimestamp, patientNotes } = body;

      if (!doctorId || !slotId) {
        return sendJSON(res, 400, { success: false, message: 'doctorId and slotId are required' });
      }

      // Conflict validation: Expired slot
      if (slotTimestamp && slotTimestamp < Date.now()) {
        return sendJSON(res, 409, {
          success: false,
          code: 'SLOT_EXPIRED',
          message: 'Selected consultation slot is expired. Please select an upcoming slot.',
        });
      }

      // Conflict validation: Double booking check
      if (BOOKED_SLOTS.has(slotId)) {
        return sendJSON(res, 409, {
          success: false,
          code: 'SLOT_ALREADY_BOOKED',
          message: 'This slot was just booked by another patient. Please choose another time.',
        });
      }

      const doctor = DOCTORS.find((d) => d.id === doctorId);
      const booking = {
        id: `book_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        bookingReference: `AMR-AYUR-${Math.floor(100000 + Math.random() * 900000)}`,
        doctorId,
        doctorName: doctor ? doctor.name : 'Vaidya Specialist',
        doctorSpecialization: doctor ? doctor.specialization : 'Ayurveda',
        doctorAvatarUrl: doctor ? doctor.avatarUrl : '',
        slotId,
        date: date || new Date().toISOString().split('T')[0],
        time: time || '10:00 AM',
        slotTimestamp: slotTimestamp || Date.now() + 3600000,
        feePaid: doctor ? doctor.consultationFee : 500,
        status: 'upcoming',
        patientNotes: patientNotes || '',
        syncStatus: 'synced',
        createdAt: new Date().toISOString(),
      };

      BOOKED_SLOTS.add(slotId);
      CONSULTATIONS.unshift(booking);

      return sendJSON(res, 201, {
        success: true,
        message: 'Consultation booked successfully with ' + booking.doctorName,
        data: booking,
      });
    } catch (e) {
      return sendJSON(res, 500, { success: false, message: 'Invalid JSON payload' });
    }
  }

  // Upcoming consultations
  if (pathname === '/api/v1/consultations/upcoming' && method === 'GET') {
    return sendJSON(res, 200, {
      success: true,
      data: CONSULTATIONS.filter((c) => c.status === 'upcoming'),
    });
  }

  // Cancel consultation
  const cancelMatch = pathname.match(/^\/api\/v1\/consultations\/([^/]+)$/);
  if (cancelMatch && method === 'DELETE') {
    const bookingId = cancelMatch[1];
    const booking = CONSULTATIONS.find((c) => c.id === bookingId);
    if (!booking) {
      return sendJSON(res, 404, { success: false, message: 'Booking not found' });
    }
    booking.status = 'cancelled';
    BOOKED_SLOTS.delete(booking.slotId);
    return sendJSON(res, 200, { success: true, message: 'Consultation cancelled successfully', data: booking });
  }

  // 2. PRODUCTS ENDPOINTS (20,000 Products with Virtualized Search / Filtering / Pagination)
  if (pathname === '/api/v1/products' && method === 'GET') {
    let filtered = [...PRODUCTS];
    const { search, category, brand, minPrice, maxPrice, minRating, inStockOnly, sortBy, page = 1, limit = 30 } = query;

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'All') {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (brand && brand !== 'All') {
      filtered = filtered.filter((p) => p.brand === brand);
    }

    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= parseInt(minPrice, 10));
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseInt(maxPrice, 10));
    }

    if (minRating) {
      filtered = filtered.filter((p) => p.rating >= parseFloat(minRating));
    }

    if (inStockOnly === 'true') {
      filtered = filtered.filter((p) => p.inStock);
    }

    if (sortBy === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating_desc') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popularity') {
      filtered.sort((a, b) => b.ratingCount - a.ratingCount);
    }

    const p = parseInt(page, 10);
    const l = parseInt(limit, 10);
    const startIndex = (p - 1) * l;
    const paginated = filtered.slice(startIndex, startIndex + l);

    return sendJSON(res, 200, {
      success: true,
      data: paginated,
      page: p,
      limit: l,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / l),
      hasMore: startIndex + l < filtered.length,
    });
  }

  // Product Details
  const productMatch = pathname.match(/^\/api\/v1\/products\/([^/]+)$/);
  if (productMatch && method === 'GET') {
    const prodId = productMatch[1];
    const product = PRODUCTS.find((p) => p.id === prodId);
    if (!product) {
      return sendJSON(res, 404, { success: false, message: `Product ${prodId} not found` });
    }
    return sendJSON(res, 200, { success: true, data: product });
  }

  // 3. HEALTH RECORDS ENDPOINTS (10,000 Records)
  if (pathname === '/api/v1/health-records' && method === 'GET') {
    let filtered = [...HEALTH_RECORDS];
    const { search, type, year, tag, page = 1, limit = 20 } = query;

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.doctorName?.toLowerCase().includes(q) ||
          r.facilityName?.toLowerCase().includes(q) ||
          r.notes.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (type && type !== 'All') {
      filtered = filtered.filter((r) => r.type === type);
    }

    if (year && year !== 'All') {
      filtered = filtered.filter((r) => r.year === parseInt(year, 10));
    }

    if (tag && tag !== 'All') {
      filtered = filtered.filter((r) => r.tags.includes(tag));
    }

    const p = parseInt(page, 10);
    const l = parseInt(limit, 10);
    const startIndex = (p - 1) * l;
    const paginated = filtered.slice(startIndex, startIndex + l);

    return sendJSON(res, 200, {
      success: true,
      data: paginated,
      page: p,
      limit: l,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / l),
      hasMore: startIndex + l < filtered.length,
    });
  }

  // Health record by ID
  const recordMatch = pathname.match(/^\/api\/v1\/health-records\/([^/]+)$/);
  if (recordMatch && method === 'GET') {
    const recId = recordMatch[1];
    const record = HEALTH_RECORDS.find((r) => r.id === recId);
    if (!record) {
      return sendJSON(res, 404, { success: false, message: `Health record ${recId} not found` });
    }
    return sendJSON(res, 200, { success: true, data: record });
  }

  // Not Found
  return sendJSON(res, 404, { success: false, message: `Route ${method} ${pathname} not found` });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🌿 Amrutam Ayurvedic Mock REST API Server Running!`);
  console.log(`🚀 Port: ${PORT}`);
  console.log(`🌐 Local: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
