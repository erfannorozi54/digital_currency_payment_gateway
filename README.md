# 💎 درگاه پرداخت ارز دیجیتال

یک درگاه پرداخت مدرن و امن برای تراکنش‌های اتریوم با استفاده از Next.js، Web3، و WalletConnect.

## ✨ ویژگی‌ها

- 🔐 **امنیت بالا**: تراکنش‌های رمزنگاری شده و امن
- ⚡ **سرعت بالا**: پردازش سریع تراکنش‌ها
- 🌐 **پشتیبانی از WalletConnect**: اتصال آسان به کیف پول‌های مختلف
- 📱 **طراحی واکنش‌گرا**: سازگار با موبایل، تبلت و دسکتاپ
- 🎨 **رابط کاربری مدرن**: طراحی زیبا با Glassmorphism
- 🔄 **نمایش قیمت لحظه‌ای**: بروزرسانی خودکار قیمت اتریوم

## 🚀 شروع کار

### پیش‌نیازها

- Node.js 18.0 یا بالاتر
- npm یا yarn

### نصب

1. کلون کردن مخزن:
```bash
git clone <repository-url>
cd my-app
```

2. نصب وابستگی‌ها:
```bash
npm install
```

3. تنظیم متغیرهای محیطی:
```bash
cp .env.example .env
```

سپس فایل `.env` را با مقادیر مورد نیاز خود پر کنید.

4. اجرای سرور توسعه:
```bash
npm run dev
```

5. باز کردن [http://localhost:3000](http://localhost:3000) در مرورگر

## 🛠️ تکنولوژی‌های استفاده شده

- **Framework**: Next.js 14
- **Styling**: CSS Modules
- **Web3**: Wagmi, RainbowKit, Ethers.js
- **Database**: Better-SQLite3
- **QR Code**: qrcode.react
- **Fonts**: Vazirmatn (فارسی)

## 📦 ساختار پروژه

```
my-app/
├── app/                    # صفحات و مسیرها
│   ├── api/               # API Routes
│   ├── payment/           # صفحه پرداخت
│   └── page.js            # صفحه اصلی
├── components/            # کامپوننت‌های قابل استفاده مجدد
│   ├── FilterAnimation.js # انیمیشن پس‌زمینه
│   ├── GatewayCreationForm.js
│   ├── navbar.js
│   └── priceHolder.js
├── actions/               # Server Actions
├── utils/                 # توابع کمکی
└── public/               # فایل‌های استاتیک
```

## 🎨 ویژگی‌های UI/UX

- **Glassmorphic Design**: طراحی مدرن با افکت شیشه‌ای
- **Gradient Accents**: استفاده از گرادیان‌های زیبا
- **Smooth Animations**: انیمیشن‌های روان و حرفه‌ای
- **Loading States**: نمایش وضعیت بارگذاری
- **Error Handling**: مدیریت خطاها با پیام‌های واضح
- **Responsive Design**: سازگار با تمام اندازه‌های صفحه

## 🔧 اسکریپت‌ها

- `npm run dev` - اجرای سرور توسعه
- `npm run build` - ساخت برای محیط تولید
- `npm start` - اجرای سرور تولید
- `npm run lint` - بررسی کد با ESLint

## 📝 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 🤝 مشارکت

مشارکت‌ها، گزارش مشکلات و درخواست‌های ویژگی استقبال می‌شوند!

---

ساخته شده با ❤️ برای جامعه Web3
