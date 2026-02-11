import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useAppStore } from '../../store/useAppStore';

// ✅ CORRECT: Import 'RouteFabStyles' and rename it to 'styles' for easier use
import { RouteFabStyles as styles } from '../../styles/RouteFab.styles';

interface RouteFabProps {
  onPress: () => void;
}

export function RouteFab({ onPress }: RouteFabProps) {
  const { selectedPandals } = useAppStore();

  if (selectedPandals.length === 0) return null;

  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.text}>
        View Route ({selectedPandals.length}) ➝
      </Text>
    </TouchableOpacity>
  );
}