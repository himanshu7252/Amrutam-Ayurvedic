// Deterministic Seeded Pseudo-Random Number Generator (PRNG - Mulberry32)
function mulberry32(seed) {
  return function () {
    var t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST_NAMES = [
  'Aarav', 'Ananya', 'Aditi', 'Advait', 'Bhavna', 'Chetan', 'Devika', 'Divya',
  'Gautam', 'Gayatri', 'Harish', 'Ishaan', 'Janaki', 'Kalyan', 'Kavita', 'Madhav',
  'Meera', 'Naveen', 'Nandini', 'Pranav', 'Pooja', 'Raghav', 'Radhika', 'Rohit',
  'Siddharth', 'Sneha', 'Tanvi', 'Tarun', 'Uma', 'Varun', 'Vandana', 'Yash'
];

const LAST_NAMES = [
  'Sharma', 'Varma', 'Nambiar', 'Joshi', 'Deshmukh', 'Bhattacharya', 'Iyer',
  'Kulkarni', 'Patel', 'Menon', 'Nair', 'Shastri', 'Pandey', 'Gupta', 'Chaturvedi',
  'Tripathi', 'Dwivedi', 'Goswami', 'Acharya', 'Pillai', 'Rao', 'Reddy', 'Hegde'
];

const AYURVEDA_CATEGORIES = [
  'General Ayurveda',
  'Panchakarma',
  'Kayachikitsa (Internal Medicine)',
  'Dravyaguna (Herbal Medicine)',
  'Shalya Tantra (Surgical & Marma)',
  'Stri Roga & Prasuti (Women Health)',
  'Kaumarbhritya (Pediatrics)',
  'Rasayana & Agada (Rejuvenation & Detox)'
];

const HOSPITALS = [
  'Amrutam Ayurvedic Wellness & Research Center',
  'Kottakkal Arya Vaidya Sala Clinic',
  'National Institute of Ayurveda Hospital',
  'All India Institute of Ayurveda',
  'Patanjali Yogpeeth Healthcare',
  'Kerala Ayurvedic Heritage Sanctuary',
  'Sreedhareeyam Ayurvedic Eye Care',
  'Vaidyaratnam Oushadhasala'
];

const PRODUCT_CATEGORIES = [
  'Chyawanprash & Rasayana',
  'Herbal Oils & Ghee',
  'Digestive Care & Churnas',
  'Skin & Hair Wellness',
  'Immunity & Vitality',
  'Stress & Sleep Support',
  'Joint & Pain Relief'
];

const BRANDS = [
  'Amrutam',
  'Kottakkal',
  'Kerala Ayurveda',
  'Baidyanath',
  'Dabur',
  'Himalaya Wellness',
  'Zandu Ayurveda',
  'Patanjali'
];

const PRODUCT_BASE_NAMES = [
  { name: 'Kuntal Care Hair Oil & Scalp Elixir', cat: 'Skin & Hair Wellness', price: 699 },
  { name: 'Gold-Infused Chyawanprash Rasayana', cat: 'Chyawanprash & Rasayana', price: 1299 },
  { name: 'Triphala Digestive Detox Powder', cat: 'Digestive Care & Churnas', price: 349 },
  { name: 'Kumkumadi Ayurvedic Miracle Face Oil', cat: 'Skin & Hair Wellness', price: 1499 },
  { name: 'Ashwagandha Vitality & Stress Tablets', cat: 'Stress & Sleep Support', price: 499 },
  { name: 'Mahanarayan Joint Pain Relief Oil', cat: 'Joint & Pain Relief', price: 549 },
  { name: 'Brahmi Cognitive & Memory Enhancer', cat: 'Immunity & Vitality', price: 450 },
  { name: 'Amrutam Skikey Malt for Immunity', cat: 'Immunity & Vitality', price: 799 },
  { name: 'Shatavari Hormonal Balance Ghrita', cat: 'Chyawanprash & Rasayana', price: 850 },
  { name: 'Bhringraj Intensive Hair Growth Oil', cat: 'Skin & Hair Wellness', price: 620 },
  { name: 'Avipattikar Churna for Acidity & Pitta', cat: 'Digestive Care & Churnas', price: 299 },
  { name: 'Shallaki Pain & Arthritis Capsules', cat: 'Joint & Pain Relief', price: 580 },
  { name: 'Tagar Restful Sleep & Calming Elixir', cat: 'Stress & Sleep Support', price: 650 },
  { name: 'Neem & Turmeric Blood Purifier Syrup', cat: 'Skin & Hair Wellness', price: 380 },
  { name: 'Chitrakadi Vati Ama Digestant', cat: 'Digestive Care & Churnas', price: 310 },
  { name: 'Gokshura Kidney & Urinary Tonic', cat: 'Immunity & Vitality', price: 420 },
  { name: 'Nalpamaradi Skin Brightening Thailam', cat: 'Skin & Hair Wellness', price: 750 },
  { name: 'Guggulu Cholesterol & Joint Care', cat: 'Joint & Pain Relief', price: 510 },
  { name: 'Chandanadi Cooling Herbal Bath Oil', cat: 'Skin & Hair Wellness', price: 590 },
  { name: 'Amrutam Orthokey Gold Pain Oil', cat: 'Joint & Pain Relief', price: 890 }
];

const RECORD_TYPES = [
  'Lab Report',
  'Prescription',
  'Consultation',
  'Vaccination',
  'Allergy'
];

const DIAGNOSES = [
  'Pitta Imbalance & Mild Gastritis',
  'Vata Aggravation & Joint Stiffness',
  'Digestive Ama & Slow Metabolism',
  'Kapha Dusti & Sinus Congestion',
  'Stress-Induced Vata Disturbance',
  'Dry Skin & Scalp Pitta Flare',
  'Insomnia with Elevated Rajas',
  'Cervical & Lumbar Spasm (Kati Graha)'
];

const MEDICINES = [
  'Amrutam Kuntal Care Malt (2 tsp twice daily with milk)',
  'Triphala Churna (1 tsp at bedtime with warm water)',
  'Ashwagandha Tablet (500mg morning and night)',
  'Mahanarayan Oil (Gentle abhyanga over affected joints)',
  'Kumkumadi Tailam (3 drops before sleeping)',
  'Avipattikar Churna (half tsp before meals)',
  'Brahmi Vati (1 tablet after lunch)'
];

class MockDataGenerator {
  constructor(seed = 108) {
    this.random = mulberry32(seed);
  }

  randInt(min, max) {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  randItem(array) {
    return array[Math.floor(this.random() * array.length)];
  }

  generateDoctors(count = 5000) {
    const doctors = [];
    const avatars = [
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1594824813628-874d1a5fb18c?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80'
    ];

    for (let i = 1; i <= count; i++) {
      const category = this.randItem(AYURVEDA_CATEGORIES);
      const experience = this.randInt(3, 35);
      const rating = Number((4.0 + this.random() * 0.99).toFixed(1));
      const fee = this.randInt(4, 25) * 100;
      const firstName = this.randItem(FIRST_NAMES);
      const lastName = this.randItem(LAST_NAMES);

      doctors.push({
        id: `doc_${i}`,
        name: `Dr. ${firstName} ${lastName}`,
        avatarUrl: avatars[(i - 1) % avatars.length],
        specialization: category.split(' (')[0],
        ayurvedaCategory: category,
        experienceYears: experience,
        rating: rating,
        reviewCount: this.randInt(25, 1250),
        consultationFee: fee,
        currency: 'INR',
        qualifications: ['BAMS', 'MD (Ayurveda)', experience > 15 ? 'PhD (Ayur)' : 'PG Diploma in Panchakarma'],
        languages: ['English', 'Hindi', this.randItem(['Sanskrit', 'Malayalam', 'Marathi', 'Gujarati', 'Tamil'])],
        about: `Senior Ayurvedic Practitioner with ${experience} years of clinical expertise specializing in authentic classical therapies, pulse diagnosis (Nadi Pariksha), and holistic wellness.`,
        isAvailableToday: this.random() > 0.35,
        hospitalAffiliation: this.randItem(HOSPITALS),
        availableSlotCount: this.randInt(4, 12),
        createdAt: '2026-01-01T00:00:00.000Z'
      });
    }
    return doctors;
  }

  generateDoctorSlots(doctorId) {
    const dates = [];
    const today = new Date();
    for (let d = 0; d < 5; d++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + d);
      dates.push(nextDate.toISOString().split('T')[0]);
    }

    const times = [
      '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '02:00 PM', '02:30 PM', '03:00 PM', '04:00 PM', '05:00 PM', '05:30 PM'
    ];

    const slots = [];
    dates.forEach((dateStr, dIdx) => {
      times.forEach((timeStr, tIdx) => {
        const isBooked = this.random() < 0.25;
        const [timePart, meridiem] = timeStr.split(' ');
        const [hoursStr, minsStr] = timePart.split(':');
        let hours = parseInt(hoursStr, 10);
        if (meridiem === 'PM' && hours !== 12) hours += 12;
        if (meridiem === 'AM' && hours === 12) hours = 0;
        
        const slotDate = new Date(`${dateStr}T00:00:00`);
        slotDate.setHours(hours, parseInt(minsStr, 10), 0, 0);

        slots.push({
          id: `slot_${doctorId}_${dIdx}_${tIdx}`,
          doctorId,
          date: dateStr,
          time: timeStr,
          timestamp: slotDate.getTime(),
          isBooked,
          isExpired: slotDate.getTime() < Date.now()
        });
      });
    });

    return slots;
  }

  generateProducts(count = 20000) {
    const products = [];
    const images = [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1512290900672-1f4869502660?auto=format&fit=crop&w=400&q=80'
    ];

    for (let i = 1; i <= count; i++) {
      const base = PRODUCT_BASE_NAMES[(i - 1) % PRODUCT_BASE_NAMES.length];
      const brand = this.randItem(BRANDS);
      const discount = this.randInt(5, 35);
      const originalPrice = Math.round(base.price * (1 + (i % 15) * 0.05));
      const price = Math.round(originalPrice * (1 - discount / 100));
      const rating = Number((3.8 + this.random() * 1.19).toFixed(1));
      const batchNum = Math.floor((i - 1) / PRODUCT_BASE_NAMES.length) + 1;
      const productName = batchNum === 1 ? `${base.name}` : `${base.name} - Batch #${batchNum}`;

      products.push({
        id: `prod_${i}`,
        name: productName,
        sku: `AMR-${100000 + i}`,
        category: base.cat,
        brand: brand,
        price: price,
        originalPrice: originalPrice,
        discountPercentage: discount,
        rating: rating,
        ratingCount: this.randInt(15, 2400),
        inStock: this.random() > 0.08,
        stockQuantity: this.randInt(10, 450),
        imageUrl: images[(i - 1) % images.length],
        thumbnailUrl: images[(i - 1) % images.length],
        description: `Authentic Ayurvedic formulation by ${brand} prepared using pure traditional herbs. Restores doshic equilibrium and supports natural vitality.`,
        ingredients: ['Pure Ashwagandha', 'Amla Extract', 'Brahmi', 'Shilajit', 'Kumkumadi Keshara', 'Organic Sesame Oil'],
        benefits: ['Boosts Immunity & Energy', 'Promotes Healthy Digestion', '100% Herbal & Chemical Free', 'Authentic GMP Certified'],
        dosage: '1 to 2 tablespoons daily with lukewarm water or warm milk as directed by your Vaidya.',
        volumeOrWeight: `${this.randItem([100, 200, 250, 500])}ml / g`,
        tags: [base.cat.split(' ')[0], brand, 'Organic', 'Herbal', 'Ayurveda'],
        createdAt: '2026-01-01T00:00:00.000Z'
      });
    }
    return products;
  }

  generateHealthRecords(count = 10000) {
    const records = [];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = [2024, 2025, 2026];

    for (let i = 1; i <= count; i++) {
      const year = this.randItem(years);
      const monthIdx = this.randInt(0, 11);
      const month = months[monthIdx];
      const day = String(this.randInt(1, 28)).padStart(2, '0');
      const monthNumber = String(monthIdx + 1).padStart(2, '0');
      const dateStr = `${year}-${monthNumber}-${day}`;
      const type = this.randItem(RECORD_TYPES);
      const firstName = this.randItem(FIRST_NAMES);
      const lastName = this.randItem(LAST_NAMES);
      const hospital = this.randItem(HOSPITALS);
      const diagnosis = this.randItem(DIAGNOSES);

      const attachments = [
        {
          id: `att_${i}_1`,
          fileName: `${type.toLowerCase().replace(/\s+/g, '_')}_${year}_${day}.pdf`,
          fileType: this.random() > 0.5 ? 'pdf' : 'image',
          fileSizeFormatted: `${(0.8 + this.random() * 3.5).toFixed(1)} MB`,
          thumbnailUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=150&q=80',
          fullUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80'
        }
      ];

      records.push({
        id: `rec_${i}`,
        title: `${type} — ${diagnosis.split('&')[0].trim()}`,
        type: type,
        date: dateStr,
        doctorName: `Dr. ${firstName} ${lastName}`,
        facilityName: hospital,
        notes: `Clinical evaluation conducted. Patient showed signs of ${diagnosis}. Prescribed classical Ayurvedic herbs and lifestyle regimen.`,
        tags: [type, year.toString(), month, 'Ayurveda', 'Vaidya Consultation'],
        attachments: attachments,
        year: year,
        month: month,
        diagnoses: [diagnosis],
        prescribedMedicines: [this.randItem(MEDICINES), this.randItem(MEDICINES)],
        createdAt: `${dateStr}T10:00:00.000Z`
      });
    }

    records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return records;
  }
}

module.exports = { MockDataGenerator };
