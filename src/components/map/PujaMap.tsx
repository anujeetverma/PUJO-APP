import React from "react";
import MapView, { Marker, UrlTile, Region, PROVIDER_DEFAULT } from "react-native-maps";
import { Pandal } from "../../types";

interface PujaMapProps {
  region: Region;
  pandals: Pandal[];
  onPandalPress: (pandal: Pandal) => void;
}

export function PujaMap({ region, pandals, onPandalPress }: PujaMapProps) {
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{ flex: 1 }}
      initialRegion={region}
      mapType="none"
      // Explicit Booleans to prevent crashes
      showsUserLocation={true}
      showsMyLocationButton={true}
      // Click handler
      onPress={() => onPandalPress(null as any)}
    >
      <UrlTile
        urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
        flipY={false} // <--- Explicit Boolean
      />

      {pandals.map((pandal, index) => (
        <Marker
          key={`${pandal.id}-${index}`}
          coordinate={pandal.location}
          onPress={(e) => {
            e.stopPropagation();
            onPandalPress(pandal);
          }}
        />
      ))}
    </MapView>
  );
}