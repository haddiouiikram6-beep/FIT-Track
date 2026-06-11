import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#2865f1'
      }}>


        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: ({ color, size }) => (
              <Ionicons name='home-outline' size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen

          name="history"
          options={{
            drawerLabel: 'profile',
            title: 'profile',
            drawerIcon: ({ color, size }) => (
              <Ionicons name='images-outline' size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen

          name="session"
          options={{
            drawerLabel: 'session GPS',
            title: 'session GPS',
            drawerIcon: ({ color, size }) => (
              <Ionicons name='location-outline' size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
