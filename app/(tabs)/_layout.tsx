import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';


import { HapticTab } from '@Global/components/haptic-tab';
import { IconSymbol } from '@Global/components/ui/icon-symbol';

export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FF6B35',
          tabBarInactiveTintColor: '#B3ACA7',
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Inter_600SemiBold',
            marginBottom: 5,
          },
          tabBarStyle: Platform.OS === 'web' ? {
              backgroundColor: '#ffffff',
              borderTopWidth: 0,
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
              borderRadius: 24,
              height: 74,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.05,
              shadowRadius: 15,
              elevation: 10,
              zIndex: 1000,
            } : {
              backgroundColor: '#ffffff',
              borderTopWidth: 1,
              borderTopColor: '#f3f4f6',
              height: Platform.OS === 'ios' ? 95 : 85, // Un poco mas de alto para las etiquetas
              paddingBottom: Platform.OS === 'ios' ? 30 : 10,
              paddingTop: 10,
              elevation: 15,
              zIndex: 1000,
            },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Descubrir',
            tabBarIcon: ({ color }) => <IconSymbol size={32} name="flame.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore" // Cambiado de explore a explore/matches si es el caso, pero el archivo actual dice explore
          options={{
            title: 'Matches',
            tabBarIcon: ({ color }) => <IconSymbol size={32} name="heart.fill" color={color} />,
          }}
        />
      </Tabs>
  );
}