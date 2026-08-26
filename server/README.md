# Amrutam Ayurvedic Mock REST API Server

High-performance mock backend for the Amrutam Ayurvedic Super App assignment, simulating enterprise scale datasets:

- **5,000 Doctors** with slot scheduling, conflict detection, and booking management
- **20,000 Products** with multi-filtering, sorting, and pagination
- **10,000 Health Records** with timeline grouping and attachments

## Running the Server

```bash
cd server
npm start
```

## Endpoints

- `GET /health`: Server health check and dataset metrics
- `GET /api/v1/doctors`: Paginated doctors with filters (`search`, `category`, `minRating`, `minExperience`, `maxFee`, `availableTodayOnly`, `sortBy`)
- `GET /api/v1/doctors/:id`: Single doctor profile
- `GET /api/v1/doctors/:id/slots`: Available slots for upcoming 5 days
- `POST /api/v1/consultations`: Create booking (with slot conflict & expiry checks)
- `DELETE /api/v1/consultations/:id`: Cancel booking
- `GET /api/v1/consultations/upcoming`: List active bookings
- `GET /api/v1/products`: Paginated products (30/page) with filters (`search`, `category`, `brand`, `minPrice`, `maxPrice`, `minRating`, `sortBy`)
- `GET /api/v1/products/:id`: Product details
- `GET /api/v1/health-records`: Paginated records with filters (`search`, `type`, `year`, `tag`)
- `GET /api/v1/health-records/:id`: Single health record details
