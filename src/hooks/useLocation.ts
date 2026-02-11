// src/hooks/useLocation.ts
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Region } from "react-native-maps";
import { DEFAULT_REGION } from "../config/constants";

export function useLocation() {
  const [region, setRegion] = useState<Region | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location denied. Showing default area.");
        setRegion(DEFAULT_REGION);
        return;
      }

      try {
        const loc = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch {
        setError("Could not fetch GPS");
        setRegion(DEFAULT_REGION);
      }
    })();
  }, []);

  return { region, error };
}