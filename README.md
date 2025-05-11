# WeatherWave

A modern weather dashboard built with performance, accessibility, and user experience in mind. WeatherWave provides real-time and forecasted weather data for cities around the world using the OpenWeatherMap API.

Live Demo: [Visit App](https://) <!-- Add deployed Vercel link here -->

---

## 📌 Features

- 🌍 Real-time weather and 5-day forecast
- 📍 Auto-detect user's location on first load
- 🔍 Smart city search with autocomplete and recent history
- ⭐ Favorite locations with quick access
- 🌙 Light/Dark theme toggle
- 📱 Fully responsive and mobile-friendly layout
- 📡 Error handling and user-friendly notifications

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Frontend UI:** [Mantine UI](https://mantine.dev/)
- **State Management:** [Jotai](https://jotai.org/)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **API Integration:** [Axios](https://axios-http.com/)
- **Weather API:** [OpenWeatherMap](https://openweathermap.org/api)
- **Icons:** Tabler Icons

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yomiblack/weatherwave.git
cd weatherwave
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🧠 Architecture & Logic

- **Weather API Requests** are modularized via Axios in `/app/api/weather.js`.
- **User Location** is obtained using the Geolocation API with fallback to Lagos, Nigeria.
- **Forecast Data** is processed with timezone awareness and transformed for cleaner UI rendering.
- **State Management** uses Jotai for location selection and global state sharing.
- **Error Handling** includes fallback UI with Mantine Notification component.

---

## 🧪 Testing & Optimization

- Fully responsive with `AppShell` layout from Mantine
- Input fields with `Autocomplete` and keyboard navigation
- Accessible components with proper ARIA props
- Code split for performance

---

## 📁 Folder Structure

```bash
/components       # Reusable UI components
/hooks            # Custom hooks
/helpers            # API logic and helpers
/state            # Jotai atoms
/pages            # Next.js routing
/public           # Static assets
```

---

## 🧑‍💼 Author

**Yomiblack**
[GitHub](https://github.com/yomiblack)

---

## 📄 License

This project is licensed under the MIT License. Feel free to fork and contribute.
