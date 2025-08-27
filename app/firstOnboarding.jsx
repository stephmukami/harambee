import { StyleSheet, Text, View,Dimensions,Image,Pressable } from 'react-native'
import React from 'react'
import { COLORS } from '../assets/theme'
const { width } = Dimensions.get("window")
import { useRouter } from 'expo-router';


const router = useRouter()
const firstOnboarding = () => {
  return (
    
           <View style={styles.container}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("../assets/images/wallet.png")}
          />
    
          <Text style={styles.explainer}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, perspiciatis!</Text>
    
          {/* Pagination dots */}
          <View style={styles.dots}>

            <Pressable onPress={() => router.push("/")}>
                <View style={styles.dot} />
            </Pressable>

             

              <Pressable onPress={() => router.push("/firstOnboarding")}>
                  <View style={[styles.dot, styles.activeDot]}/>
              </Pressable>

              <Pressable onPress={() => router.push("/secondOnboarding")}>
                <View style={styles.dot} />
              </Pressable>

            
          </View>
    
          {/* Sign Up Button */}
          <Pressable style={styles.button} onPress={() => router.push("/register")}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
    
          {/* Log In Link */}
          <Text style={styles.loginLink} onPress={() => router.push("/login")}>
            Have an account? <Text style={{ fontWeight: "600" }}>Log in.</Text>
          </Text>
        </View>
  )
}

export default firstOnboarding


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.7,
    height: width * 0.8,
    marginBottom: 20,
  },
  explainer: {
    textAlign: "center",
    color: "#444", // grey text
    fontWeight: "400",
    marginBottom: 40,
  },
  dots: {
    flexDirection: "row",
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "100%",
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.primaryBlue, // primary blue
  },
  button: {
    backgroundColor: COLORS.primaryBlue,
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  loginLink: {
    color: COLORS.primaryBlue,
    fontSize: 14,
    textAlign: "center",
  },
});

