import { Redirect } from 'expo-router';
import { useAuthStore } from '../store/useAuthStore';

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);

  // Wait for AsyncStorage to hydrate before redirecting
  if (!_hasHydrated) return null;

  return isAuthenticated ? <Redirect href="/home" /> : <Redirect href="/auth" />;
}
