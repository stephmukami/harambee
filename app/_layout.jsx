import 'react-native-url-polyfill/auto'
import React, { useState,useEffect } from "react";
import { Stack, Tabs } from "expo-router";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function RootLayout() {


  const [isAuthenticated, setIsAuthenticated] = useState(null)

   useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("authToken");
      setIsAuthenticated(!!token); // true if token exists
    };
    checkAuth();
  }, []);

  const [fontsLoaded] = useFonts({
    PoppinsRegular: Poppins_400Regular,
    PoppinsBold: Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading</Text>; // Keeps splash visible until fonts load
  }

 



  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* If NOT authenticated → show index */}
        {!isAuthenticated && (
          <>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="firstOnboarding" />
            <Stack.Screen name="secondOnboarding" />
          </>
        )}

        {/* If authenticated → go straight to tabs */}
        {isAuthenticated && (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        )}
      </Stack>
    </SafeAreaProvider>

  );
}