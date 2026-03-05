import { LocaleProvider } from '@/context/LocaleContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import 'react-native-reanimated';

// Suppress known dev-only errors on Android
LogBox.ignoreLogs([
  'InvocationTargetException',
  'Unable to activate keep awake',
  'Unable to deactivate keep awake',
]);

export default function RootLayout() {
  return (
    <LocaleProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="recipe/[id]" />
      </Stack>
      <StatusBar style="light" />
    </LocaleProvider>
  );
}
