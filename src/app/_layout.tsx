import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AppProvider } from '../providers/AppProvider';
import { useAuthStore } from '../store/useAuthStore';
import '../../global.css';

function AuthObserver() {
  const segments = useSegments();
  const router = useRouter();
  const { isAuthenticated, _hasHydrated } = useAuthStore();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!_hasHydrated) return;
    if (!rootNavigationState?.key) return;

    const currentSegments = segments as string[];
    const inAuthGroup = currentSegments[0] === 'auth';

    const performRedirect = () => {
      // Handle root index page redirection
      if (currentSegments.length === 0) {
        if (isAuthenticated) {
          router.replace('/(tabs)/home');
        } else {
          router.replace('/auth');
        }
        return;
      }

      if (!isAuthenticated && !inAuthGroup) {
        // Redirect to the login page.
        router.replace('/auth');
      } else if (isAuthenticated && inAuthGroup) {
        // Redirect away from the login page.
        router.replace('/(tabs)/home');
      }
    };

    // Use a small timeout to push the navigation call to the next event loop tick.
    // This guarantees that the layout has finished mounting its native views.
    const timeoutId = setTimeout(performRedirect, 0);
    return () => clearTimeout(timeoutId);
  }, [isAuthenticated, _hasHydrated, segments, router, rootNavigationState]);

  return null;
}

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <AuthObserver />
      <StatusBar style="auto" />
    </AppProvider>
  );
}

