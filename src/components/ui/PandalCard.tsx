/* src/components/ui/PandalCard.tsx*/

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Pandal } from '../../types';
import { COLORS } from '../../styles/theme';
import { useAppStore } from '../../store/useAppStore';

import { pandalCardStyles as styles } from '../../styles/PandalCard.styles';;

interface PandalCardProps {
  pandal: Pandal;
  onClose: () => void;
}

export function PandalCard({ pandal, onClose }: PandalCardProps) {
  const { selectedPandals, togglePandalSelection } = useAppStore();
  const isSelected = selectedPandals.some((p) => p.id === pandal.id);

  return (
    <View style={styles.card}>
      {/* Image Section */}
      <Image source={{ uri: pandal.image }} style={styles.image} />

      {/* Info Section */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{pandal.name}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeBtn}>✕</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {pandal.description}
        </Text>

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.button, isSelected ? styles.btnSelected : styles.btnAdd]}
          onPress={() => togglePandalSelection(pandal)}
        >
          <Text style={styles.btnText}>
            {isSelected ? "Remove from Route" : "Add to Route"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
