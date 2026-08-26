import { Doctor, TimeSlot, ConsultationBooking, AyurvedaCategory } from '@features/consultation/types';
import { Product, ProductCategory } from '@features/shop/types';
import { HealthRecord, HealthRecordType } from '@features/health-records/types';

// Deterministic Seeded Pseudo-Random Generator (Mulberry32)
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST_NAMES = [
  'Aarav', 'Ananya', 'Aditi', 'Advait', 'Bhavna', 'Chetan', 'Devika', 'Divya',
  'Gautam', 'Gayatri', 'Harish', 'Ishaan', 'Janaki', 'Kalyan', 'Kavita', 'Madhav',
  'Meera', 'Naveen', 'Nandini', 'Pranav', 'Pooja', 'Raghav', 'Radhika', 'Rohit',
  'Siddharth', 'Sneha', 'Tanvi', 'Tarun', 'Uma', 'Varun', 'Vandana', 'Yash',
  'Abhinav', 'Archana', 'Bhargav', 'Chinmay', 'Deepak', 'Girish', 'Hemant', 'Kiran'
];

const LAST_NAMES = [
  'Sharma', 'Varma', 'Nambiar', 'Joshi', 'Deshmukh', 'Bhattacharya', 'Iyer',
  'Kulkarni', 'Patel', 'Menon', 'Nair', 'Shastri', 'Pandey', 'Gupta', 'Chaturvedi',
  'Tripathi', 'Dwivedi', 'Goswami', 'Acharya', 'Pillai', 'Rao', 'Reddy', 'Hegde'
];

const AYURVEDA_CATEGORIES: AyurvedaCategory[] = [
  'General Ayurveda',
  'Panchakarma',
  'Kayachikitsa (Internal Medicine)',
  'Dravyaguna (Herbal Medicine)',
  'Shalya Tantra (Surgical & Marma)',
  'Stri Roga & Prasuti (Women Health)',
  'Kaumarbhritya (Pediatrics)',
  'Rasayana & Agada (Rejuvenation & Detox)',
];

const HOSPITALS = [
  'Amrutam Ayurvedic Wellness & Research Center',
  'Kottakkal Arya Vaidya Sala Clinic',
  'National Institute of Ayurveda Hospital',
  'All India Institute of Ayurveda',
  'Patanjali Yogpeeth Healthcare',
  'Kerala Ayurvedic Heritage Sanctuary',
  'Sreedhareeyam Ayurvedic Eye Care',
  'Vaidyaratnam Oushadhasala',
];

const DOCTOR_AVATARS = [
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1594824813628-874d1a5fb18c?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80',
];

const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Chyawanprash & Rasayana',
  'Herbal Oils & Ghee',
  'Digestive Care & Churnas',
  'Skin & Hair Wellness',
  'Immunity & Vitality',
  'Stress & Sleep Support',
  'Joint & Pain Relief',
];

const BRANDS = ['Amrutam', 'Kottakkal', 'Kerala Ayurveda', 'Baidyanath', 'Dabur', 'Himalaya', 'Zandu'];

const PRODUCT_BASE_ITEMS = [
  { name: 'Kuntal Care Hair Oil & Scalp Elixir', cat: 'Skin & Hair Wellness' as ProductCategory, price: 699 },
  { name: 'Gold-Infused Chyawanprash Rasayana', cat: 'Chyawanprash & Rasayana' as ProductCategory, price: 1299 },
  { name: 'Kumkumadi Miracle Face Serum', cat: 'Skin & Hair Wellness' as ProductCategory, price: 1499 },
  { name: 'Orthokey Joint Pain Relief Oil', cat: 'Joint & Pain Relief' as ProductCategory, price: 890 },
  { name: 'Triphala Digestive Detox Churna', cat: 'Digestive Care & Churnas' as ProductCategory, price: 349 },
  { name: 'Ashwagandha Vitality & Calm Tablets', cat: 'Stress & Sleep Support' as ProductCategory, price: 499 },
  { name: 'Mahanarayan Abhyanga Body Oil', cat: 'Joint & Pain Relief' as ProductCategory, price: 549 },
  { name: 'Brahmi Cognitive & Memory Enhancer', cat: 'Immunity & Vitality' as ProductCategory, price: 450 },
  { name: 'Amrutam Skikey Malt for Immunity', cat: 'Immunity & Vitality' as ProductCategory, price: 799 },
  { name: 'Shatavari Hormonal Balance Ghrita', cat: 'Chyawanprash & Rasayana' as ProductCategory, price: 850 },
  { name: 'Bhringraj Intensive Hair Growth Oil', cat: 'Skin & Hair Wellness' as ProductCategory, price: 620 },
  { name: 'Avipattikar Churna for Acidity & Pitta', cat: 'Digestive Care & Churnas' as ProductCategory, price: 299 },
  { name: 'Shallaki Pain & Arthritis Capsules', cat: 'Joint & Pain Relief' as ProductCategory, price: 580 },
  { name: 'Tagar Restful Sleep & Calming Elixir', cat: 'Stress & Sleep Support' as ProductCategory, price: 650 },
  { name: 'Neem & Turmeric Blood Purifier Syrup', cat: 'Skin & Hair Wellness' as ProductCategory, price: 380 },
  { name: 'Chitrakadi Vati Ama Digestant', cat: 'Digestive Care & Churnas' as ProductCategory, price: 310 },
  { name: 'Gokshura Kidney & Urinary Tonic', cat: 'Immunity & Vitality' as ProductCategory, price: 420 },
  { name: 'Nalpamaradi Skin Brightening Thailam', cat: 'Skin & Hair Wellness' as ProductCategory, price: 750 },
  { name: 'Guggulu Cholesterol & Joint Care', cat: 'Joint & Pain Relief' as ProductCategory, price: 510 },
  { name: 'Chandanadi Cooling Herbal Bath Oil', cat: 'Skin & Hair Wellness' as ProductCategory, price: 590 },
];

const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1512290900672-1f4869502660?auto=format&fit=crop&w=400&q=80',
];

const RECORD_TYPES: HealthRecordType[] = ['Lab Report', 'Prescription', 'Consultation', 'Vaccination', 'Allergy'];

const DIAGNOSES = [
  'Pitta Imbalance & Mild Gastritis',
  'Vata Aggravation & Joint Stiffness',
  'Digestive Ama & Slow Metabolism',
  'Kapha Dusti & Sinus Congestion',
  'Stress-Induced Vata Disturbance',
  'Dry Skin & Scalp Pitta Flare',
  'Insomnia with Elevated Rajas',
  'Cervical & Lumbar Spasm (Kati Graha)',
];

const MEDICINES = [
  'Amrutam Kuntal Care Malt (2 tsp twice daily with milk)',
  'Triphala Churna (1 tsp at bedtime with warm water)',
  'Ashwagandha Tablet (500mg morning and night)',
  'Mahanarayan Oil (Gentle abhyanga over affected joints)',
  'Kumkumadi Tailam (3 drops before sleeping)',
  'Avipattikar Churna (half tsp before meals)',
  'Brahmi Vati (1 tablet after lunch)',
];

// Generator
function buildSampleDatasets() {
  const prng = mulberry32(108);
  const randInt = (min: number, max: number) => Math.floor(prng() * (max - min + 1)) + min;
  const randItem = <T>(arr: T[]): T => arr[Math.floor(prng() * arr.length)];

  // 1. Generate 120 Doctors
  const doctors: Doctor[] = [];
  for (let i = 1; i <= 120; i++) {
    const category = randItem(AYURVEDA_CATEGORIES);
    const experience = randInt(3, 35);
    const rating = Number((4.1 + prng() * 0.89).toFixed(1));
    const fee = randInt(4, 25) * 100;
    const firstName = randItem(FIRST_NAMES);
    const lastName = randItem(LAST_NAMES);

    doctors.push({
      id: `doc_${i}`,
      name: `Dr. ${firstName} ${lastName}`,
      avatarUrl: DOCTOR_AVATARS[(i - 1) % DOCTOR_AVATARS.length],
      specialization: category.split(' (')[0],
      ayurvedaCategory: category,
      experienceYears: experience,
      rating: rating,
      reviewCount: randInt(35, 1450),
      consultationFee: fee,
      currency: 'INR',
      qualifications: ['BAMS', 'MD (Ayurveda)', experience > 15 ? 'PhD (Ayur)' : 'PG Diploma in Panchakarma'],
      languages: ['English', 'Hindi', randItem(['Sanskrit', 'Malayalam', 'Marathi', 'Gujarati', 'Tamil'])],
      about: `Senior Ayurvedic Practitioner with ${experience} years of clinical expertise specializing in authentic classical therapies, pulse diagnosis (Nadi Pariksha), and holistic wellness.`,
      isAvailableToday: prng() > 0.35,
      hospitalAffiliation: randItem(HOSPITALS),
      availableSlotCount: randInt(4, 12),
      createdAt: '2026-01-01T00:00:00.000Z',
    });
  }

  // 2. Generate 120 Products
  const products: Product[] = [];
  for (let i = 1; i <= 120; i++) {
    const base = PRODUCT_BASE_ITEMS[(i - 1) % PRODUCT_BASE_ITEMS.length];
    const brand = randItem(BRANDS);
    const discount = randInt(10, 35);
    const originalPrice = Math.round(base.price * (1 + (i % 10) * 0.05));
    const price = Math.round(originalPrice * (1 - discount / 100));
    const rating = Number((3.9 + prng() * 1.09).toFixed(1));
    const batchNum = Math.floor((i - 1) / PRODUCT_BASE_ITEMS.length) + 1;
    const productName = batchNum === 1 ? base.name : `${base.name} (Batch #${batchNum})`;

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
      ratingCount: randInt(25, 2100),
      inStock: prng() > 0.08,
      stockQuantity: randInt(10, 450),
      imageUrl: PRODUCT_IMAGES[(i - 1) % PRODUCT_IMAGES.length],
      thumbnailUrl: PRODUCT_IMAGES[(i - 1) % PRODUCT_IMAGES.length],
      description: `Authentic Ayurvedic formulation by ${brand} prepared using pure traditional herbs. Restores doshic equilibrium and supports natural vitality.`,
      ingredients: ['Pure Ashwagandha', 'Amla Extract', 'Brahmi', 'Shilajit', 'Kumkumadi Keshara', 'Organic Sesame Oil'],
      benefits: ['Boosts Immunity & Energy', 'Promotes Healthy Digestion', '100% Herbal & Chemical Free', 'Authentic GMP Certified'],
      dosage: '1 to 2 tablespoons daily with lukewarm water or warm milk as directed by your Vaidya.',
      volumeOrWeight: `${randItem([100, 200, 250, 500])}ml / g`,
      tags: [base.cat.split(' ')[0], brand, 'Organic', 'Herbal', 'Ayurveda'],
      createdAt: '2026-01-01T00:00:00.000Z',
    });
  }

  // 3. Generate 100 Health Records
  const records: HealthRecord[] = [];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = [2026, 2025, 2024];

  for (let i = 1; i <= 100; i++) {
    const year = randItem(years);
    const monthIdx = randInt(0, 11);
    const month = months[monthIdx];
    const day = String(randInt(1, 28)).padStart(2, '0');
    const monthNumber = String(monthIdx + 1).padStart(2, '0');
    const dateStr = `${year}-${monthNumber}-${day}`;
    const type = randItem(RECORD_TYPES);
    const firstName = randItem(FIRST_NAMES);
    const lastName = randItem(LAST_NAMES);
    const hospital = randItem(HOSPITALS);
    const diagnosis = randItem(DIAGNOSES);

    records.push({
      id: `rec_${i}`,
      title: `${type} — ${diagnosis.split('&')[0].trim()}`,
      type: type,
      date: dateStr,
      doctorName: `Dr. ${firstName} ${lastName}`,
      facilityName: hospital,
      notes: `Clinical evaluation conducted. Patient showed signs of ${diagnosis}. Prescribed classical Ayurvedic herbs and lifestyle regimen.`,
      tags: [type, year.toString(), month, 'Ayurveda', 'Vaidya Consultation'],
      attachments: [
        {
          id: `att_${i}_1`,
          fileName: `${type.toLowerCase().replace(/\s+/g, '_')}_${year}_${day}.pdf`,
          fileType: prng() > 0.5 ? 'pdf' : 'image',
          fileSizeFormatted: `${(0.8 + prng() * 3.5).toFixed(1)} MB`,
          thumbnailUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=150&q=80',
          fullUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
        },
      ],
      year: year,
      month: month,
      diagnoses: [diagnosis],
      prescribedMedicines: [randItem(MEDICINES), randItem(MEDICINES)],
      createdAt: `${dateStr}T10:00:00.000Z`,
    });
  }

  records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { doctors, products, records };
}

const datasets = buildSampleDatasets();

export const SAMPLE_DOCTORS: Doctor[] = datasets.doctors;
export const SAMPLE_PRODUCTS: Product[] = datasets.products;
export const SAMPLE_HEALTH_RECORDS: HealthRecord[] = datasets.records;

export function generateDoctorSlots(doctorId: string): TimeSlot[] {
  const dates = ['2026-08-27 (Today)', '2026-08-28 (Tomorrow)', '2026-08-29'];
  const times = ['09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '02:30 PM', '04:00 PM', '05:30 PM'];

  const slots: TimeSlot[] = [];
  dates.forEach((dateStr, dIdx) => {
    times.forEach((timeStr, tIdx) => {
      slots.push({
        id: `slot_${doctorId}_${dIdx}_${tIdx}`,
        doctorId,
        date: dateStr,
        time: timeStr,
        timestamp: Date.now() + dIdx * 86400000 + tIdx * 3600000,
        isBooked: tIdx === 1,
        isExpired: false,
      });
    });
  });

  return slots;
}
