/**
 * A thin wrapper around react-native-toast-message that mirrors the
 * sonner-native API shape (toast.success / toast.error / toast.info).
 * Drop-in replacement: just change imports from 'sonner-native' to
 * '../../lib/toast' (adjust relative path as needed).
 */
import Toast from 'react-native-toast-message';

export const toast = {
  success: (message: string, title?: string) => {
    Toast.show({
      type: 'success',
      text1: title ?? 'Success',
      text2: message,
      visibilityTime: 3000,
      position: 'top',
    });
  },

  error: (message: string, title?: string) => {
    Toast.show({
      type: 'error',
      text1: title ?? 'Error',
      text2: message,
      visibilityTime: 4000,
      position: 'top',
    });
  },

  info: (message: string, title?: string) => {
    Toast.show({
      type: 'info',
      text1: title ?? 'Info',
      text2: message,
      visibilityTime: 3000,
      position: 'top',
    });
  },
};
