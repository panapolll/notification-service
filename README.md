# 🔔 Fruit Shop — Notification Service

NestJS microservice สำหรับจัดการ in-app notifications รองรับระบบ e-commerce

## ✨ Features

- ดูแจ้งเตือนของตัวเอง (pagination + filter by type)
- นับจำนวนที่ยังไม่อ่าน
- Mark as read / mark all as read
- ลบแจ้งเตือน
- Admin สร้างแจ้งเตือนให้ user
- Admin broadcast ไปหลาย user พร้อมกัน
- JWT authentication (ใช้ secret ร่วมกับ Auth Service)

## 🛠️ Tech Stack

| Layer     | Technology         |
| --------- | ------------------ |
| Framework | NestJS             |
| Database  | MongoDB + Mongoose |
| Auth      | JWT + Passport     |
| Language  | TypeScript         |

## 🏗️ Architecture

```
Fruit Shop Ecosystem
  ├── Auth Service        → ออก JWT
  ├── Commerce API        → order / payment events
  └── Notification Service (:3001)  ← this repo
        └── MongoDB (notifications)
```

## 🔗 Related Repositories

| Service      | Repository                                                              |
| ------------ | ----------------------------------------------------------------------- |
| Frontend     | [fruit-shop-frontend](https://github.com/panapolll/fruit-shop-frontend) |
| API Gateway  | [Api-Gateway](https://github.com/panapolll/Api-Gateway)                 |
| Auth Service | [Auth-Service](https://github.com/panapolll/Auth-Service)               |
| Commerce API | [commerce-api](https://github.com/panapolll/commerce-api)               |

## 🚀 Getting Started

```bash
git clone https://github.com/panapolll/notification-service.git
cd notification-service
yarn install
cp .env.example .env
yarn start:dev
```

## ⚙️ Environment Variables

| Variable     | Description               | Example                                   |
| ------------ | ------------------------- | ----------------------------------------- |
| `MONGO_URI`  | MongoDB connection string | `mongodb://localhost:27017/notifications` |
| `JWT_SECRET` | ต้องตรงกับ Auth Service   | `your-shared-secret`                      |
| `PORT`       | Server port               | `3001`                                    |

## 📡 API Endpoints

### User (JWT required)

| Method | Endpoint                       | Description                         |
| ------ | ------------------------------ | ----------------------------------- |
| GET    | `/notifications/me`            | ดูแจ้งเตือน (`?page=&limit=&type=`) |
| GET    | `/notifications/unread-count`  | จำนวนที่ยังไม่อ่าน                  |
| PATCH  | `/notifications/:id/read`      | mark as read                        |
| PATCH  | `/notifications/mark-all-read` | อ่านทั้งหมด                         |
| DELETE | `/notifications/:id`           | ลบแจ้งเตือน                         |

### Admin (JWT + role admin)

| Method | Endpoint                   | Description                               |
| ------ | -------------------------- | ----------------------------------------- |
| POST   | `/notifications`           | สร้าง `{ userId, title, message, type? }` |
| POST   | `/notifications/broadcast` | `{ notification, userIds[] }`             |
| GET    | `/notifications/admin/all` | ดูทั้งหมด (`?userId=`)                    |

## 📋 Notification Types

`payment_success` · `payment_failed` · `order_placed` · `order_shipped` · `order_delivered` · `order_cancelled` · `promotion` · `system`

## 🐳 Docker

```bash
docker build -t notification-service .
docker run -p 3001:3001 --env-file .env notification-service
```

## 👨‍💻 Author

Portfolio project — microservices e-commerce notification system.
