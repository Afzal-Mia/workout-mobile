import React, { useState } from 'react';
import { Tabs, usePathname, useRouter } from 'expo-router';
import { View, TextInput, TouchableOpacity, Text, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheet } from '../../components/ui/BottomSheet';
import { ResetPasswordForm } from '../../components/auth/ResetPasswordForm';

export default function TabLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  // Check if we are on the home screen to show search
  // In Expo Router (tabs) group, the path for home.tsx is /home
  const isHome = pathname === '/home';

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    router.replace('/auth');
  };

  return (
    <View className="flex-1 bg-background">
      {/* Custom Header */}
      <SafeAreaView className="bg-white shadow-xl" edges={['top']}>
        <View className="h-20 px-4 flex-row items-center justify-between">
          {/* Left Logo/Icon */}
          <View className="w-10">
            <Ionicons name="fitness" size={28} color="#237227" />
          </View>

          {/* Center: Search Input (Home only) */}
          <View className="flex-1 px-4">
            {isHome ? (
              <View className="flex-row items-center bg-white rounded-xl px-3 py-2 border border-primary">
                <Ionicons name="search" size={18} color="#71717a" />
                <TextInput
                  placeholder="Search Workouts..."
                  placeholderTextColor="#717a77ff"
                  className="flex-1 ml-2 text-foreground text-sm"
                  style={{ paddingVertical: 0 }}
                />
              </View>
            ) : (
              <Text className="text-lg font-bold text-foreground text-center capitalize">
                {pathname.replace('/', '') || 'WorkOut'}
              </Text>
            )}
          </View>

          {/* Right: Profile Image with Dropdown Trigger */}
          <TouchableOpacity
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 rounded-full overflow-hidden border border-border bg-muted items-center justify-center active:opacity-70"
          >
            {user?.profileImage ? (
              <Image source={{ uri: user.profileImage }} className="w-full h-full" />
            ) : (
              <Ionicons name="person" size={20} color="#71717a" />
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Dropdown Menu Overlay */}
      {isDropdownOpen && (
        <View className="absolute top-0 left-0 right-0 bottom-0 z-40">
          <Pressable
            className="flex-1"
            onPress={() => setIsDropdownOpen(false)}
          />
          <View
            className="absolute right-4 bg-white border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
            style={{ top: 100, width: 220 }}
          >
            <TouchableOpacity
              className="px-4 py-4 border-b border-border flex-row items-center active:bg-muted"
              onPress={() => { setIsDropdownOpen(false); router.push('/profile'); }}
            >
              <Ionicons name="person-outline" size={20} color="#171717" />
              <Text className="text-foreground font-semibold ml-3">Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="px-4 py-4 border-b border-border flex-row items-center active:bg-muted"
              onPress={() => { setIsDropdownOpen(false); setIsResetPasswordOpen(true); }}
            >
              <Ionicons name="key-outline" size={20} color="#171717" />
              <Text className="text-foreground font-semibold ml-3">Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="px-4 py-4 flex-row items-center active:bg-muted"
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color="#ef4444" />
              <Text className="text-destructive font-semibold ml-3">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e4e4e7',
            height: 70,
            paddingBottom: 12,
            paddingTop: 8,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          tabBarActiveTintColor: '#237227', // primary green
          tabBarInactiveTintColor: '#71717a', // muted gray
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? "stats-chart" : "stats-chart-outline"} size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      <BottomSheet isVisible={isResetPasswordOpen} onClose={() => setIsResetPasswordOpen(false)}>
        <ResetPasswordForm onSuccess={() => setIsResetPasswordOpen(false)} />
      </BottomSheet>
    </View>
  );
}
