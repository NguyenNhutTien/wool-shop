# Wool Shop - Website Bán Sản Phẩm Len Thủ Công

Dự án MERN stack (MongoDB + Express + React + Node.js) cho website bán sản phẩm len thủ công như móc khóa, gấu bông.

## 🎯 Tổng quan

**Mục tiêu**: MVP bán hàng không cần thanh toán online (đặt hàng qua form, xác nhận qua Zalo/điện thoại).

**Kiến trúc**: Monorepo với 2 thư mục `server` và `client`

## 🏗️ Tech Stack

### Backend (`/server`)
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB với Mongoose
- **Validation**: Zod
- **Security**: Helmet, CORS
- **Development**: ts-node-dev, ESLint, Prettier

### Frontend (`/client`)
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (cart), React Query (server state)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📁 Cấu trúc thư mục

```
wool-shop/
├── server/                 # Backend API
│   ├── src/
│   │   ├── controllers/    # Controllers xử lý request
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Utilities
│   │   ├── app.ts          # Express app setup
│   │   └── index.ts        # Server entry point
│   ├── scripts/
│   │   └── seed.ts         # Seed data script
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   │   └── admin/      # Admin components
│   │   ├── pages/          # Page components
│   │   │   └── admin/      # Admin pages
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # API client
│   │   ├── types/          # TypeScript types
│   │   ├── constants/      # Constants & i18n text
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env.example
├── package.json            # Root package.json
├── setup.sh               # Quick setup script
├── test-admin.sh          # Admin panel test script
└── README.md
```

## 🚀 Chạy dự án local

### Cách 1: Sử dụng script tự động

```bash
# Clone repository (nếu từ git)
git clone <repository-url>
cd wool-shop

# Chạy script setup
./setup.sh

# Cập nhật MongoDB URI trong server/.env
# Sau đó seed dữ liệu mẫu
npm run seed

# Chạy development servers
npm run dev
```

### Cách 2: Test admin panel

```bash
# Chạy script test admin (bao gồm setup và seed data)
./test-admin.sh
```

### Cách 3: Setup thủ công

#### 1. Cài đặt dependencies

```bash
# Cài đặt dependencies root
npm install

# Cài đặt cho server
cd server
npm install

# Cài đặt cho client
cd ../client
npm install
cd ..
```

#### 2. Cấu hình environment

```bash
# Server
cp server/.env.example server/.env
# Sửa MONGODB_URI trong server/.env

# Client  
cp client/.env.example client/.env
# Sửa VITE_API_BASE_URL trong client/.env (nếu cần)
```

#### 3. Seed dữ liệu mẫu

```bash
npm run seed
```

#### 4. Chạy development

```bash
# Chạy cả server và client cùng lúc
npm run dev

# Hoặc chạy riêng lẻ:
# Terminal 1 - Server
npm run dev:server

# Terminal 2 - Client  
npm run dev:client
```

**URLs:**
- Server: http://localhost:5000
- Client: http://localhost:5173
- Admin Panel: http://localhost:5173/admin/login
- API Health Check: http://localhost:5000/health

## 🎨 Chức năng chính

### 🏠 Trang chủ (`/`)
- Hero section với câu chuyện thương hiệu
- Giới thiệu về sản phẩm len thủ công
- Hiển thị sản phẩm nổi bật
- Responsive design với màu sắc pastel

### 🛍️ Danh sách sản phẩm (`/products`)
- Grid responsive (2-4 cột tùy màn hình)
- Tìm kiếm theo tên/mô tả
- Lọc theo tags/danh mục
- Pagination
- Loading skeleton

### 📱 Chi tiết sản phẩm (`/products/:slug`)
- Gallery ảnh với thumbnail
- Thông tin chi tiết (tên, giá, mô tả, tags)
- Chọn số lượng và thêm vào giỏ
- Sản phẩm liên quan
- SEO friendly URLs

### 🛒 Đặt hàng (`/order`)
- Hiển thị giỏ hàng
- Form thông tin khách hàng
- Tính tổng tiền tự động
- Validation form phía client và server
- Thông báo thành công

### 📞 Liên hệ (`/contact`)
- Form liên hệ với validation
- Thông tin liên hệ (phone, Zalo, email)
- Giờ làm việc
- FAQ cơ bản

## 🔐 Admin Panel

### 🚪 Đăng nhập Admin (`/admin/login`)
- Form đăng nhập đơn giản
- **Demo credentials:**
  - Username: `admin`
  - Password: `admin123`
- Protected routes với localStorage

### 📊 Dashboard (`/admin`)
- Thống kê tổng quan (sản phẩm, đơn hàng, tin nhắn)
- Danh sách đơn hàng gần đây
- Cards thống kê với icons

### 📦 Quản lý sản phẩm (`/admin/products`)
- Danh sách sản phẩm với ảnh, giá, tags
- Tìm kiếm sản phẩm
- Thêm sản phẩm mới (modal form)
- Sửa sản phẩm (modal form)
- Xóa sản phẩm (với xác nhận)
- Upload multiple images (URLs)

### 🛒 Quản lý đơn hàng (`/admin/orders`)
- Danh sách đơn hàng với thông tin khách hàng
- Lọc theo trạng thái (mới, đã xác nhận, đã hủy)
- Tìm kiếm theo tên, SĐT, mã đơn hàng
- Cập nhật trạng thái đơn hàng
- Xem chi tiết đơn hàng (modal)
- Thông tin khách hàng và sản phẩm

### 💬 Quản lý tin nhắn (`/admin/contacts`)
- Danh sách tin nhắn liên hệ
- Tìm kiếm tin nhắn
- Xem chi tiết tin nhắn (modal)
- Xóa tin nhắn
- Quick actions: Gọi điện, Zalo

### 🎨 Tính năng Admin
- Responsive design cho mobile/tablet
- Loading states và error handling
- Toast notifications
- Sidebar navigation với active states
- Protected routes
- Logout functionality

## 🔧 API Endpoints

### Products
- `GET /api/products` - Lấy danh sách sản phẩm (có filter, search, pagination)
- `GET /api/products/:slug` - Lấy sản phẩm theo slug
- `GET /api/products/tags` - Lấy tất cả tags
- `GET /api/products/:id/related` - Lấy sản phẩm liên quan
- `POST /api/products` - Tạo sản phẩm mới (admin)
- `PUT /api/products/:id` - Cập nhật sản phẩm (admin)
- `DELETE /api/products/:id` - Xóa sản phẩm (admin)

### Orders
- `POST /api/orders` - Tạo đơn hàng mới
- `GET /api/orders/:id` - Lấy đơn hàng theo ID
- `GET /api/orders` - Lấy danh sách đơn hàng (admin)
- `PATCH /api/orders/:id/status` - Cập nhật trạng thái (admin)

### Contacts
- `POST /api/contacts` - Tạo tin nhắn liên hệ
- `GET /api/contacts` - Lấy danh sách tin nhắn (admin)
- `GET /api/contacts/:id` - Lấy tin nhắn theo ID (admin)
- `DELETE /api/contacts/:id` - Xóa tin nhắn (admin)

## 🗄️ Database Models

### Product
```typescript
{
  _id: ObjectId,
  name: string,
  slug: string,
  price: number,
  images: string[],
  tags: string[],
  description: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```typescript
{
  _id: ObjectId,
  items: [{
    productId: ObjectId,
    quantity: number
  }],
  customer: {
    name: string,
    phone: string,
    address?: string
  },
  note?: string,
  status: 'new' | 'confirmed' | 'cancelled',
  totalAmount: number,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact
```typescript
{
  _id: ObjectId,
  name: string,
  phone: string,
  message: string,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deploy

### Backend (Render/Railway/Fly.io)

1. **Tạo MongoDB Atlas database**
   - Đăng ký tại [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Tạo cluster và lấy connection string

2. **Deploy server với environment variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wool-shop
   PORT=5000
   CLIENT_ORIGIN=https://your-frontend-domain.com
   NODE_ENV=production
   ```

3. **Build command:** `npm run build`
4. **Start command:** `npm start`

### Frontend (Vercel/Netlify)

1. **Deploy client với environment variable:**
   ```
   VITE_API_BASE_URL=https://your-backend-domain.com/api
   ```

2. **Build command:** `npm run build`
3. **Output directory:** `dist`

### 📋 Checklist sau deploy

- [ ] Test GET /api/products
- [ ] Test tạo order mới
- [ ] Test form liên hệ
- [ ] Test admin login
- [ ] Test admin CRUD operations
- [ ] Kiểm tra CORS hoạt động
- [ ] Test responsive trên mobile
- [ ] Kiểm tra SEO meta tags
- [ ] Test loading performance

## 🛠️ Development

### Thêm sản phẩm mới

1. **Qua Admin Panel:**
   - Đăng nhập `/admin/login` (admin/admin123)
   - Vào "Sản phẩm" → "Thêm sản phẩm"
   - Điền form và lưu

2. **Qua MongoDB Compass/Atlas:**
   - Kết nối đến database
   - Thêm document vào collection `products`

3. **Qua seed script:**
   - Sửa file `server/scripts/seed.ts`
   - Chạy `npm run seed`

### Code Quality

```bash
# Lint code
npm run lint

# Fix lint issues
npm run lint:fix

# Format code với Prettier
npx prettier --write .
```

### Debugging

- Server logs: Check terminal running `npm run dev:server`
- Client errors: Check browser DevTools console
- API testing: Use Postman/Insomnia với endpoints trên
- Database: Use MongoDB Compass để xem data
- Admin panel: Check browser DevTools Network tab

## 🎨 Customization

### Thay đổi màu sắc
- Sửa file `client/tailwind.config.js`
- Cập nhật color palette trong `theme.extend.colors`

### Thêm ngôn ngữ
- Cập nhật `client/src/constants/index.ts`
- Thêm object TEXT cho ngôn ngữ mới
- Tạo hook `useLanguage` để switch

### Thêm tính năng thanh toán
- Tích hợp Stripe/PayPal
- Thêm payment status vào Order model
- Cập nhật order flow

### Thêm authentication thật cho admin
- Tích hợp JWT tokens
- Tạo User model
- Thêm middleware authentication
- Hash passwords với bcrypt

## 🐛 Troubleshooting

### Lỗi kết nối MongoDB
```bash
# Kiểm tra connection string
echo $MONGODB_URI

# Test connection
mongosh "your-connection-string"
```

### Lỗi CORS
- Kiểm tra `CLIENT_ORIGIN` trong server/.env
- Đảm bảo frontend URL đúng

### Admin panel không load
- Kiểm tra browser console errors
- Verify API endpoints hoạt động
- Check localStorage cho auth state

### Build errors
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Clear build folders
rm -rf server/dist client/dist
npm run build
```

## 📝 License

MIT License - xem file LICENSE để biết thêm chi tiết.

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📞 Support

Nếu gặp vấn đề, hãy tạo issue trên GitHub hoặc liên hệ qua email.
