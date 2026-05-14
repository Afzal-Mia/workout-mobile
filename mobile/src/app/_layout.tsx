import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '../providers/AppProvider';
import '../../global.css';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </AppProvider>
  );
}
