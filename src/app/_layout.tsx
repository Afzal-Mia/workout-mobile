import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AppProvider } from '../providers/AppProvider';
import { useAuthStore } from '../store/useAuthStore';
import '../../global.css';

function AuthObserver() {
  const segments = useSegments();
  const router = useRouter();
  const { isAuthenticated, _hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!_hasHydrated) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to the login page.
      router.replace('/auth');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect away from the login page.
      router.replace('/(tabs)/home');
    }
  }, [isAuthenticated, _hasHydrated, segments, router]);

  return null;
}

export default function RootLayout() {
  return (
    <AppProvider>
      <AuthObserver />
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </AppProvider>
  );
}
