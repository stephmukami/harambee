import { Stack } from "expo-router";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function RootLayout() {

    const [fontsLoaded] = useFonts({
    PoppinsRegular: Poppins_400Regular,
    PoppinsBold: Poppins_700Bold,
  });

    if (!fontsLoaded) {
    return <Text>Loading</Text>; // Keeps splash visible until fonts load
  }

  return (
    <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="firstOnboarding" />
          <Stack.Screen name="secondOnboarding" />
          <Stack.Screen name="homePage" />

        </Stack>
      </SafeAreaProvider>
  
  );
}