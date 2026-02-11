/* src/styles/RouteFab.styles.ts */

import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from './theme';




export const RouteFabStyles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 30, // Position above the bottom edge
    right: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 8, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 100, // Ensure it sits on top of the map
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});