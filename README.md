# 🌿 Amrutam Ayurvedic Super App — Senior Mobile Engineering

[![React Native](https://img.shields.io/badge/React%20Native-0.86.2-blue.svg)](https://reactnative.dev/)
[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-57.0.0-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org/)
[![Architecture](https://img.shields.io/badge/Architecture-Feature--Oriented-green.svg)](#architecture)
[![Tests](https://img.shields.io/badge/Tests-Jest%20%7C%20RNTL-brightgreen.svg)](#testing)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

> A production-grade Ayurvedic Healthcare Super App engineered for **Amrutam**, featuring three modular business verticals (**Consultation**, **Shop**, and **Health Records**), designed with a strong focus on **Scalable Architecture**, **Virtualization for Large Datasets (5,000+ Doctors, 20,000+ Products, 10,000+ Records)**, **Offline-First Reliability**, **Global Toast System**, **Theme Engine (Light/Dark Tokens)**, **Error Boundaries**, and **Automated Testing**.

---

## 📑 Table of Contents

1. [Project Overview](#-project-overview)
2. [Key Engineering Highlights](#-key-engineering-highlights)
3. [Architecture & System Design](#-architecture--system-design)
4. [Directory Structure](#-directory-structure)
5. [Feature Modules](#-feature-modules)
   - [1. Consultation (Doctor Booking & Conflict Engine)](#1-consultation-module)
   - [2. Shop (20,000 Products Virtualized E-Commerce)](#2-shop-module)
   - [3. Health Records (Patient Medical Timeline)](#3-health-records-module)
6. [Design System & Theme Engine](#-design-system--theme-engine)
7. [Offline-First & Reliability Strategy](#-offline-first--reliability-strategy)
8. [Large Dataset Performance Optimization](#-large-dataset-performance-optimization)
9. [Automated Testing Harness](#-automated-testing-harness)
10. [Getting Started (Frontend & Backend)](#-getting-started)
11. [Architectural Trade-offs & Production Roadmap](#-architectural-trade-offs--production-roadmap)

---

## 🌟 Project Overview

**Amrutam Ayurvedic Super App** unifies authentic classical Ayurvedic healthcare into a single mobile application. Built using **React Native**, **Expo SDK 57**, and **strict TypeScript**, the app is engineered to solve real-world healthcare challenges with senior-level architectural patterns:

```text
Amrutam Super App
│
├── 🩺 1. Consultation   (5,000+ Doctors, Real-time Slot Engine, Conflict Resolution)
├── 🛍️ 2. Shop           (20,000+ Formulations, Virtualized Grid, Persisted Cart)
└── 📋 3. Health Records (10,000+ Records, Timeline Grouping, Attachment Previews)
```

---

## ⚡ Key Engineering Highlights

* **Feature-Oriented Architecture**: Clean domain encapsulation preventing horizontal layer coupling.
* **Large Dataset Engine**: Handles 5,000 doctors, 20,000 products, and 10,000 health records with 60 FPS virtualization, zero scroll degradation, and debounced searching.
* **Slot Conflict Engine**: Guards against double-booking attempts, expired slots, and duplicate patient appointments.
* **Separated Backend**: Dedicated, high-speed REST mock backend service with deterministic PRNG (Mulberry32 seed) running on port 4000.
* **Global Feedback Infrastructure**: Centralized sanitized logging (PII/token redaction), global floating toast notification engine, and top-level React Error Boundary.
* **Ayurvedic Design System**: Comprehensive tokens (Earth Green, Sandalwood, Gold, Charcoal), Light/Dark/System theme context with `AsyncStorage` persistence, and accessible primitives (`SafeAreaView` via `react-native-safe-area-context`).

---

## 🏛️ Architecture & System Design


graph TD
    AppEntry[App.tsx / Root Entry] --> AppProvider[core/providers/AppProvider]
    AppProvider --> ErrorBoundary[Global Error Boundary]
    ErrorBoundary --> SafeArea[SafeAreaProvider]
    SafeArea --> ThemeProvider[Theme Engine (Light / Dark / System)]
    ThemeProvider --> ToastProvider[Global Toast Engine]
    ToastProvider --> MainLayout[core/navigation/MainLayout]
    
    MainLayout --> FeatureTabs{Feature Navigation}
    FeatureTabs --> Consultation[features/consultation]
    FeatureTabs --> Shop[features/shop]
    FeatureTabs --> HealthRecords[features/health-records]
    FeatureTabs --> Cart[features/shop/cart]
    
    Consultation --> SharedUI[shared/components: Card, Avatar, Badge, Button, Modal]
    Shop --> SharedUI
    HealthRecords --> SharedUI
    
    Consultation --> DataLayer[Data & Network Infrastructure]
    Shop --> DataLayer
    HealthRecords --> DataLayer
    
```

---

## 📁 Directory Structure

```text
d:\AppDev\Amrutam-Ayurvedic\
│
├── server/                          <-- 🚀 DEDICATED REST BACKEND SERVICE
│   ├── package.json
│   ├── README.md
│   └── src/
│       ├── index.js                 (REST Server on port 4000)
│       └── generator.js             (5,000 Doctors, 20,000 Products, 10,000 Records)
│
├── src/                             <-- 📱 REACT NATIVE MOBILE FRONTEND
│   ├── core/
│   │   ├── config/
│   │   │   └── env.ts               (Typed Environment Config)
│   │   ├── navigation/
│   │   │   └── MainLayout.tsx       (Super App Tabs & Responsive Layout)
│   │   └── providers/
│   │       └── AppProvider.tsx      (Root Provider: ErrorBoundary, Safe Area, Theme, Toast)
│   │
│   ├── features/
│   │   ├── consultation/            (Doctor Catalog, Slot Engine, Booking Flow)
│   │   │   ├── components/          (DoctorCard, SlotPickerModal, UpcomingBookingBanner)
│   │   │   ├── screens/             (DoctorListScreen)
│   │   │   └── types/               (Doctor, TimeSlot, ConsultationBooking, Filter)
│   │   │
│   │   ├── shop/                    (20k Products Catalog, Cart & Checkout)
│   │   │   ├── components/          (ProductCard, CartItemRow, CheckoutSummaryCard)
│   │   │   ├── screens/             (ProductCatalogScreen, CartScreen)
│   │   │   └── types/               (Product, CartItem, CartSummary, Filter)
│   │   │
│   │   └── health-records/          (Patient Medical Timeline & Attachments)
│   │       ├── components/          (RecordTimelineCard, RecordDetailModal)
│   │       ├── screens/             (HealthTimelineScreen)
│   │       └── types/               (HealthRecord, Attachment, TimelineGroup)
│   │
│   ├── shared/
│   │   ├── components/              (Button, TextInput, Card, Badge, Avatar, Modal, Loader, Toast, Header, SettingsModal)
│   │   ├── context/                 (ThemeContext, ToastContext)
│   │   ├── services/                (sampleData.ts - 100+ Deterministic Data Generator)
│   │   ├── theme/                   (colors, typography, spacing, shadows, tokens)
│   │   └── types/                   (BaseEntity, ApiResponse, Pagination)
│   │
│   └── infrastructure/
│       └── logging/                 (logger.ts - Sensitive PII / Medical Redaction)
│
├── App.tsx                          (Clean root container)
├── babel.config.js                  (Module aliases & Reanimated plugin)
├── jest.config.js                   (Unit testing configuration)
├── jest.setup.js                    (Native module mocks: NetInfo, Storage, Haptics)
├── tsconfig.json                    (Strict TypeScript & Path Mappings)
└── package.json
```

---

## 🌿 Feature Modules

### 1. Consultation Module
* **Doctor Directory**: Detailed profiles with qualifications (`BAMS`, `MD`), experience, rating, consultation fees, and hospital affiliations.
* **Ayurveda Branches**: Covers all 8 classical specialties (*Panchakarma*, *Kayachikitsa*, *Stri Roga*, *Dravyaguna*, *Shalya Tantra*, *Kaumarbhritya*, *Rasayana & Agada*).
* **Slot Booking Engine**: Dynamic slot matrix (Today, Tomorrow, Upcoming dates) with:
  * Double-booking prevention
  * Expired slot detection
  * Real-time slot conflict alerts
* **Cancellation & Upcoming Banner**: Interactive booking references with appointment tracking.

### 2. Shop Module
* **20,000 Formulations Catalog**: Herbal oils, Chyawanprash, churnas, rasayanas, and pain relief malts.
* **Search & Multi-Filtering**: Instant debounced query engine filtering across categories, brands, price, and discounts.
* **Persistent Cart**: Quantity increments, real-time subtotal, discount, tax, shipping calculations (Free shipping over ₹1000), and checkout simulation.

### 3. Health Records Module
* **Patient Medical Timeline**: Chronological record grouping across 2026, 2025, and 2024.
* **Record Categories**: *Lab Reports*, *Prescriptions*, *Consultation Summaries (Nadi Pariksha)*, *Vaccinations*, and *Allergy screenings*.
* **Prescription & Attachment Previews**: Interactive modals detailing prescribed Ayurvedic medicines and PDF attachment download simulation.

---

## 🎨 Design System & Theme Engine

* **Ayurvedic Earth Palette**: Deep Forest Green (`#2D5A27`), Sandalwood Terracotta (`#8C6D46`), Ayurvedic Gold (`#D4AF37`), Sage (`#EBF3E8`), and Herbal Dark (`#121712`).
* **Theme Modes**: Supports **Light**, **Dark**, and **System** modes with automatic device detection and `AsyncStorage` persistence.
* **Accessible Safe Area**: Wrapped with `react-native-safe-area-context` (`edges={['top', 'bottom', 'left', 'right']}`) ensuring safe rendering across camera punch holes and gesture bars.
* **Floating Toasts**: Real-time accessible toast feedback (`showSuccess`, `showError`, `showWarning`, `showInfo`).

---

## 🔒 Offline-First & Reliability Strategy

```text
Offline Booking Triggered
         ↓
Pending Queue in Local Storage
         ↓
Network Connectivity Restored (NetInfo)
         ↓
Background Sync Engine
         ↓
REST Backend API (Port 4000)
         ↓
Success -> Toast Notification & Cache Invalidation
```

* **Graceful Degradation**: Fallback states for offline modes, slow networks, timeout retries, empty lists, and invalid responses.
* **Data Sanitization**: Sensitive medical notes, passwords, and tokens are automatically redacted by the centralized logger.

---

## ⚡ Large Dataset Performance Optimization

| Technique | Implementation Details |
| :--- | :--- |
| **List Virtualization** | `FlatList` with `initialNumToRender={10}`, `maxToRenderPerBatch={10}`, `windowSize={7}`, `removeClippedSubviews`. |
| **Debounced Search** | `debounceMs={400}` on `TextInput` preventing UI stutter and API request flooding. |
| **Stable Callbacks** | `useCallback` and `useMemo` on list renderers and filter predicates. |
| **Deterministic Data** | Mulberry32 seeded pseudo-random number generator for repeatable performance benchmarks. |

---

## 🧪 Automated Testing Harness

The project includes an automated test suite configured with **Jest** and **React Native Testing Library**:

```bash
npm test
```

### Test Suites:
* `logger.test.ts`: Validates log formatting and PII/medical token redaction.
* `theme.test.ts`: Validates light/dark color contrast and typography tokens.
* `Button.test.tsx`: Validates rendering, press interactions, loading states, and disabled states.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v20.x` or `v22.x`
* **npm**: `v10+` or `v11+`
* **Expo Go** app or connected Android / iOS device / emulator

### 1. Start the Backend Server
```bash
cd server
npm start
```
*The Mock REST API starts on `http://localhost:4000` (and `http://0.0.0.0:4000` for LAN access).*

### 2. Start the Mobile Frontend
```bash
# In the root directory
npm run android
```
*(Or `npm start` / `npx expo start` to launch the Metro bundler)*

---

## ⚖️ Architectural Trade-offs & Production Roadmap

| Choice Made | Rationale | Production Enhancement |
| :--- | :--- | :--- |
| **In-Memory & Storage Mock REST API** | Allows deterministic, standalone 30,000+ item performance testing without external backend setup. | Swap mock adapters with AWS/GCP Kubernetes REST API. |
| **Local AsyncStorage Cart & Queue** | Zero native binary build requirement, highly reliable cross-platform. | Enhance with MMKV or SQLite for ultra-large offline caching. |
| **Push Notification Simulation** | Works seamlessly in development without FCM / APNs credentials. | Connect production Firebase Cloud Messaging (FCM) credentials. |

---

## 📜 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
