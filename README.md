# MonitorGunung.com - Environmental Surveillance Platform

A high-end environmental surveillance platform for monitoring deforestation and land clearing in West Java, Indonesia using Sentinel-2 satellite data.

## 🌟 Mission

**Who**: Built for environmental activists, government forestry departments, and regional observers in West Java, Indonesia.

**What**: A Regional Satellite Monitoring Dashboard that detects deforestation and land clearing on mountains in real-time using Sentinel-2 satellite data.

**Where**: Focused on the West Java (Jawa Barat) region, mapping mountains like Gunung Baleendah, Manglayang, Gede, Tangkuban Perahu, and more.

**When**: Provides 2019 baseline archives and 2024+ current comparisons to track forest loss over years or weeks.

**Why**: To prevent illegal land clearing and forest fires by providing early warning signals before the damage becomes irreversible.

**How**: By visualizing satellite data through an interactive regional map (Main Dashboard) and a deep-dive split-screen comparison engine (Detail Page).

## 🚀 Features

### Main Dashboard (/)
- **Regional Map Hub**: Interactive Leaflet map with Esri WorldImagery satellite tiles and CartoDB labels
- **Smart Markers**: Color-coded markers (Red for Critical, Yellow for Warning, Green for Stable)
- **Pulse Alert**: Red pulse animation for mountains with activity detected in the last 7 days
- **Executive KPI Cards**:
  - Total Forest Loss YoY with sparkline chart
  - Alert Center with critical alert count
  - Regional Health Score (Grade A-F) with progress bar
- **Destruction Trend Chart**: Line chart showing forest coverage from 2019-2024
- **Chronological Logs Table**: Recent activity logs with timestamps and status badges
- **Sidebar Navigation**: Quick search, navigation links, and alert notifications

### Detail Page (/mountain/[id])
- **Split-Screen Comparison**: 2019 baseline vs 2024 current satellite imagery
- **Change Detection Metrics**: Forest loss, NDVI scores, and percentage changes
- **Timeline Controls**: Interactive slider to view historical data from 2019-2024
- **Historical Charts**: Forest coverage and NDVI trend visualization
- **Alert Information**: Detailed status and recommended actions
- **Key Metrics Cards**: Forest loss, NDVI score, active alerts, current coverage

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5+ with App Router
- **Language**: TypeScript for type safety
- **Runtime**: React 19.2+
- **Styling**: Tailwind CSS + Shadcn/UI components
- **Maps**: Leaflet with Esri WorldImagery and CartoDB tiles
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Database**: Modular data structure ready for Supabase/PostgreSQL integration

## ⚡ Recent Updates

**January 2025**: Upgraded to Next.js 15 and React 19
- ✅ Next.js 15.5.10 with Turbopack stability
- ✅ React 19.2.4 with React Compiler support
- ✅ Enhanced performance and faster HMR
- ✅ Zero breaking changes required
- 📄 See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for details

## 📦 Installation

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## 🗺️ Mountains Monitored

1. **Gunung Baleendah** (Bandung Regency) - Critical Status
2. **Gunung Manglayang** (Bandung) - Warning Status
3. **Gunung Gede** (Bogor) - Stable Status
4. **Gunung Papandayan** (Garut) - Warning Status
5. **Gunung Ciremai** (Cirebon) - Stable Status
6. **Gunung Tangkuban Perahu** (Subang) - Critical Status
7. **Gunung Burangrang** (Purwakarta) - Warning Status
8. **Gunung Salak** (Bogor) - Stable Status

## 📊 Data Structure

All data is centralized in `/constants/data.ts` for easy replacement with real API integration:

- `mountains`: Array of mountain objects with coordinates, status, and metrics
- `alertLogs`: Chronological activity logs for the last 30 days
- `historicalData`: Forest coverage trends from 2019-2024
- `calculateMetrics()`: Function to compute regional health scores

## 🎨 Design System

- **Color Palette**: Dark mode with Slate/Zinc (#0f172a, #1e293b, #334155)
- **Status Colors**: 
  - Critical: Rose (#ef4444)
  - Warning: Amber (#f59e0b)
  - Stable: Emerald (#10b981)
- **Typography**: Clean, modern sans-serif with hierarchy
- **Components**: Reusable Shadcn/UI components with consistent styling

## 🔄 Future Enhancements

- Real-time Sentinel-2 satellite data integration via API
- Supabase/PostgreSQL database connection
- User authentication and role-based access
- Email/SMS alerts for critical deforestation events
- Export functionality for reports (PDF/Excel)
- Mobile app companion
- Multi-language support (Indonesian, English)

## 📝 License

Private - Environmental Protection Initiative

## 👥 Contact

For inquiries about environmental monitoring in West Java, please contact local forestry departments or environmental organizations.

---

**Built with 💚 for the environment and the future of West Java's forests**
