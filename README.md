# PUJO-APP
A React Native (Expo) based Puja Route Planner app that optimizes pandal visits using OSRM Trip API, starting from the user’s live location.
# 🏮 Pujo Route Planner App

A React Native (Expo) mobile app that helps users plan and optimize Durga Puja pandal visits based on their **current GPS location**.

The app uses the **OSRM Trip API (TSP optimization)** to generate the shortest possible route between selected pandals.

---

## 🚀 Features

- 📍 Live GPS location detection
- 🗺 Interactive map using react-native-maps
- 🔢 Numbered route markers
- ⚡ Route optimization using OSRM Trip API
- 🚗 Distance and duration calculation
- 📋 Ordered trip plan list view
- 🎯 User location always fixed as start point

---

## 🛠 Tech Stack

- React Native (Expo)
- TypeScript
- Zustand (State Management)
- react-native-maps
- OSRM Public Routing API
- Expo Location

---

## 🧠 How It Works

1. User selects pandals from Home screen
2. App fetches user’s live GPS location
3. Selected pandals + user location are sent to OSRM Trip API
4. OSRM optimizes waypoint order (TSP logic)
5. App:
   - Keeps user location as fixed start
   - Reorders remaining pandals
   - Displays optimized route on map
   - Shows trip duration & distance

---

## 📂 Project Structure
src/
├── components/
│   ├── map/
│   │   ├── PujaMap.tsx
│   │   ├── CustomMarker.tsx
│   │   └── MapControls.tsx
│   ├── ui/
│   │   ├── PandalCard.tsx
│   │   └── RouteFab.tsx
├── screens/
│   ├── HomeScreen.tsx
│   └── RouteScreen.tsx
├── navigation/
│   └── RootNavigator.tsx
├── services/
│   └── osrm.ts
├── store/
│   └── useAppStore.ts
├── data/
│   ├── pandalData.ts
│   └── mockPandals.ts
├── styles/
│   ├── HomeScreen.styles.ts
│   ├── RouteScreen.styles.ts
│   ├── PandalCard.styles.ts
│   ├── RouteFab.styles.ts
│   └── theme.ts
├── hooks/
│   └── useLocation.ts
└── types/
└── index.ts


---

## ⚙️ Installation

Clone the repo:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name


Install dependencies:
npm install

Start Expo:
npx expo start
```
🌍 OSRM Configuration

The app uses the public OSRM Trip API:
https://router.project-osrm.org/trip/v1/driving/

Optimization parameters used:
	•	source=any
	•	roundtrip=true
	•	geometries=geojson

⸻

📸 Screenshots
<img width="563" height="1218" alt="Screenshot 2026-02-11 at 12 14 03" src="https://github.com/user-attachments/assets/72684ec2-3875-432f-a050-32f559c28848" />


<img width="563" height="1218" alt="Screenshot 2026-02-11 at 11 14 10" src="https://github.com/user-attachments/assets/c7743860-415b-434f-b759-289b34c60bc1" />


⸻

📌 Future Improvements
	•	Walking mode support
	•	Traffic-aware routing
	•	Route caching
	•	Offline map support
	•	Dynamic clustering for large pandal lists
	•	Backend-based routing for production use

⸻

⚠️ Disclaimer

This project uses the public OSRM server for routing.
For production-scale usage, a self-hosted OSRM instance is recommended.

⸻

👨‍💻 Author
 
Anujeet Verma
IIIT Kalyani
BTech Computer Science Student

