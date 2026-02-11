import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, Linking, Platform } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';
import { useAppStore } from '../store/useAppStore';
import { routeScreenStyles as styles } from '../styles/RouteScreen.styles';
import { Pandal } from '../types';
import { getOptimizedRoute } from '../services/osrm';

export default function RouteScreen() {
  const mapRef = useRef<MapView>(null);
  const { selectedPandals } = useAppStore();

  const [orderedPandals, setOrderedPandals] = useState<Pandal[]>([]);
  const [routeCoordinates, setRouteCoordinates] = useState<{latitude: number; longitude: number}[]>([]);
  const [tripInfo, setTripInfo] = useState<{ duration: number; distance: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<Pandal | null>(null);

  // 1. Get User Location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Allow location access to start the route from your position.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const myLocationPandal: Pandal = {
        id: 'user-loc',
        name: '📍 My Current Location',
        description: 'Start Point',
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        image: '',
      };

      setUserLocation(myLocationPandal);
      setOrderedPandals([myLocationPandal, ...selectedPandals]);
    })();
  }, [selectedPandals]);

  // Zoom map logic
  useEffect(() => {
    if (orderedPandals.length > 0 && mapRef.current) {
      const allPoints = orderedPandals.map(p => p.location);
      mapRef.current.fitToCoordinates(allPoints, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [orderedPandals]);

  // 2. NEW FUNCTION: Open Google/Apple Maps
  const openMapsNavigation = (lat: number, lng: number, label: string) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const labelEncoded = encodeURIComponent(label);

    let url: string;
    if (Platform.OS === 'ios') {
      // Apple Maps
      url = `maps:0,0?q=${labelEncoded}@${latLng}`;
    } else {
      // Google Maps (Android) - Starts Navigation Mode
      url = `google.navigation:q=${latLng}`;
    }

    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open map application.');
    });
  };

  const handleOptimize = async () => {
    if (!userLocation) {
      Alert.alert("Waiting for location...", "Please wait while we fetch your GPS location.");
      return;
    }

    setIsLoading(true);
    // Combine User Location + Selected Pandals
    const fullRouteList = [userLocation, ...selectedPandals];
    const result = await getOptimizedRoute(fullRouteList);

    if (result) {
      setOrderedPandals(result.optimizedPandals);
      setRouteCoordinates(result.roadCoordinates);
      setTripInfo({
        duration: result.duration,
        distance: result.distance
      });
    } else {
      Alert.alert("Error", "Could not calculate route.");
    }
    setIsLoading(false);
  };

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins} min`;
  };

  const formatDistance = (meters: number) => {
    return `${(meters / 1000).toFixed(1)} km`;
  };

  if (selectedPandals.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.headerText}>No Pandals Selected!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* MAP */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          showsUserLocation={true}
        >
          <Polyline
            coordinates={routeCoordinates.length > 0 ? routeCoordinates : orderedPandals.map(p => p.location)}
            strokeColor="#d32f2f"
            strokeWidth={4}
          />

          {orderedPandals.map((pandal, index) => (
            <Marker
              key={`${pandal.id}-${index}`}
              coordinate={pandal.location}
              zIndex={index + 1}
              tracksViewChanges={false}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <View style={[
                styles.markerContainer,
                pandal.id === 'user-loc' ? { backgroundColor: '#2196F3', borderColor: 'white' } : {}
              ]}>
                <Text style={styles.markerText}>
                  {pandal.id === 'user-loc' ? '📍' : index + 1}
                </Text>
              </View>
            </Marker>
          ))}
        </MapView>
      </View>

      {/* LIST */}
      <View style={styles.listContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
          <Text style={styles.headerText}>Trip Plan</Text>

          {tripInfo && (
            <View style={localStyles.badge}>
              <Text style={localStyles.badgeText}>
                🚗 {formatDuration(tripInfo.duration)} • {formatDistance(tripInfo.distance)}
              </Text>
            </View>
          )}
        </View>

        <FlatList
          data={orderedPandals}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item, index }) => (
            <View style={[
              styles.pandalItem,
              item.id === 'user-loc' ? { backgroundColor: '#e3f2fd', borderColor: '#bbdefb' } : {}
            ]}>
              <Text style={[
                styles.pandalNumber,
                item.id === 'user-loc' ? { backgroundColor: '#2196F3' } : {}
              ]}>
                {item.id === 'user-loc' ? '📍' : index + 1}
              </Text>

              <View style={{ flex: 1 }}>
                <Text style={styles.pandalName}>{item.name}</Text>
                <Text style={{ fontSize: 12, color: '#666' }}>
                  {index === 0 ? "🏁 Start Here" : `Stop #${index}`}
                </Text>
              </View>

              {/* ✅ NEW: Navigation Button (Only for Pandals, not User Location) */}
              {item.id !== 'user-loc' && (
                <TouchableOpacity
                  style={styles.navButton}
                  onPress={() => openMapsNavigation(item.location.latitude, item.location.longitude, item.name)}
                >
                  <Text style={styles.navButtonText}>Navigate ↗</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />

        <TouchableOpacity
          style={styles.optimizeButton}
          onPress={handleOptimize}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.optimizeText}>
              ⚡ Optimize Route from My Location
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  badge: {
    backgroundColor: '#ffebee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  badgeText: {
    color: '#c62828',
    fontWeight: 'bold',
    fontSize: 14,
  }
});