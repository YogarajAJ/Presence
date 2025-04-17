import 'react-native-url-polyfill/auto';
import 'react-native-polyfill-globals/auto';
import 'web-streams-polyfill';

import { Redirect } from 'expo-router';
import { useAuthStore } from '../store/authStore';

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  // Redirect to the appropriate screen based on auth status
  return <Redirect href={isAuthenticated ? "/(tabs)" : "/login"} />;
}