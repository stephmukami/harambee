import { View, Text, StyleSheet ,Pressable,Image,Dimensions} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS,FONTS } from '../assets/theme';
const { width } = Dimensions.get("window")
import HarambeeLogo from "../assets/images/harambee-logo.svg"
export default function HomeScreen() {

  const router = useRouter()

  return (



       <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("../assets/images/harambee-logo.png")}
      />

      <Text style={styles.clincher}>Every transaction with ease.</Text>

      {/* Pagination dots */}
      
      <View style={styles.dots}>
        
        <View style={[styles.dot, styles.activeDot]} />

         <Pressable onPress={() => router.push("/firstOnboarding")}>
            <View style={styles.dot} />
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

  );
}

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
  clincher: {
    textAlign: "center",
    color: "#444", // grey text
    fontWeight: "600",
    marginBottom: 40,
  },
  dots: {
    flexDirection: "row",
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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


