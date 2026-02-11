import { Pandal } from '../types';

const OSRM_BASE_URL = 'https://router.project-osrm.org';

interface OSRMResponse {
  code: string;
  trips?: {
    geometry: {
      coordinates: [number, number][]; // [lon, lat]
    };
    duration: number;
    distance: number;
  }[];
  waypoints?: {
    waypoint_index: number; // Optimized order index
  }[];
}

/**
 * Sends coordinates to OSRM's "Trip" service.
 * FIXED: roundtrip=false (One-way trip, no loop back to start)
 */
export async function getOptimizedRoute(pandals: Pandal[]) {
  if (pandals.length < 2) return null;

  // 1. Format coordinates: "lon,lat;lon,lat;..."
  const coordinatesString = pandals
    .map(p => `${p.location.longitude},${p.location.latitude}`)
    .join(';');

  // 2. Build URL
  // source=first: We start at the first selected pandal
  //roundtrip=false: We END at the last pandal (don't return to start)
  const url = `${OSRM_BASE_URL}/trip/v1/driving/${coordinatesString}?overview=full&geometries=geojson&source=first&roundtrip=false`;

  try {
    const response = await fetch(url);
    const data: OSRMResponse = await response.json();

    if (data.code !== 'Ok' || !data.trips || data.trips.length === 0) {
      console.error("OSRM Optimization Failed:", data);
      return null;
    }

    const trip = data.trips[0];

    // 3. Extract the geometry (Flip [lon, lat] -> [lat, lon])
    const roadCoordinates = trip.geometry.coordinates.map(([lon, lat]) => ({
      latitude: lat,
      longitude: lon,
    }));

    // 4. Reorder the pandals based on OSRM result
    if (!data.waypoints || data.waypoints.length !== pandals.length) {
      console.warn("Waypoint mismatch. Returning original order.");
      return {
        roadCoordinates,
        optimizedPandals: pandals,
        distance: trip.distance,
        duration: trip.duration,
      };
    }

    // OSRM waypoints are returned in original order.
    // waypoint_index tells us the optimized position.
    const optimizedPandals = data.waypoints
      .map((wp, originalIndex) => ({
        originalIndex,
        optimizedIndex: wp.waypoint_index,
      }))
      .sort((a, b) => a.optimizedIndex - b.optimizedIndex)
      .map(item => pandals[item.originalIndex]);

    return {
      roadCoordinates,
      optimizedPandals,
      distance: trip.distance,
      duration: trip.duration,
    };

  } catch (error) {
    console.error("OSRM Network Error:", error);
    return null;
  }
}