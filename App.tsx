import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { AppRoutes } from './src/routes/app.routes';
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AppRoutes />
      <StatusBar style="auto" />
    </View>
  );
}
