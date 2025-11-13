import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to login page on app start
  // After successful login, user will be redirected to /tabs
  return <Redirect href="/login" />;
}
