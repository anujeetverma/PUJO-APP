import React, { useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { PujaMap } from '../components/map/PujaMap';
import { PandalCard } from '../components/ui/PandalCard';
import { RouteFab } from '../components/ui/RouteFab';
import { PANDALS } from '../data/pandalData';
import { Pandal } from '../types';
import { homeStyles } from '../styles/HomeScreen.styles';
import { COLORS } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

export default function HomeScreen() {
  const { region, error } = useLocation();
  const [selectedPandal, setSelectedPandal] = useState<Pandal | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!region) {
    return (
      <View style={homeStyles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={homeStyles.loadingText}>Locating you...</Text>
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      {/* 2. Map Component (Cleaned up) */}
      <PujaMap
        region={region}
        pandals={PANDALS}
        onPandalPress={setSelectedPandal}
      />

      {/* 3. Pandal Card (Show if selected) */}
      {selectedPandal && (
        <PandalCard
          pandal={selectedPandal}
          onClose={() => setSelectedPandal(null)}
        />
      )}

      {/* 4. FAB Button (Show if NO card is selected) */}
      {!selectedPandal && (
        <RouteFab onPress={() => navigation.navigate('Route')} />
      )}

      {error && (
        <View style={homeStyles.errorContainer}>
          <Text style={homeStyles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}