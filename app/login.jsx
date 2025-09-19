import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert } from 'react-native'
import React, {useState} from 'react'
import { COLORS } from '../assets/theme'
import { supabase } from '../services/supabase'
import { useRouter } from 'expo-router';

const login = () => {

  const router = useRouter()
  const [loginDetails,setLoginDetails] = useState({
    email:"",
    password:""
  })
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
  setLoading(true)
  const { error } = await supabase.auth.signInWithPassword({
    // set to login details object
    email: email,
    password: password,
  })

    if (error) Alert.alert(error.message)
    setLoading(false)
  
}

  const handleInputChange = (name,value) =>{
    setLoginDetails((prev)=>(
      {
        ...prev,
        [name]:value
      }
    ))
  }

    const isFormValid = 
  loginDetails.password.trim() !== "" &&
  loginDetails.email.trim() !== "" 
  


    const handleSubmit = async () => {
    console.log("user details submitted:", loginDetails)
    const {email,password} = loginDetails
    setLoading(true)

    const{data,error} = await supabase.auth.signInWithPassword({
      email,
      password
    })

    console.log("data success login",data)
    setLoading(false)

    if(error){
      Alert.alert("Login failed",error.message)
      console.error("Login error",error)

    }else{


          Alert.alert("Success", "Log in successfull", [
          {
            text: "OK",
            onPress: () => router.push("/homePage")
          }
        ])
         // Save session to storage
    const { access_token, refresh_token, user } = data.session;
    await AsyncStorage.setItem("authToken", access_token);
    await AsyncStorage.setItem("refreshToken", refresh_token);
    await AsyncStorage.setItem("user", JSON.stringify(user))

    

    setLoginDetails({
    email:"",
    password:""
  })
    }

  }

  return (
     <View style={styles.container}>
          <Text style={styles.title}>Welcome Back !</Text>
    
      
    
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={loginDetails.email}
            onChangeText={(email) => handleInputChange("email", email)}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
    
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={loginDetails.password}
            onChangeText={(password) => handleInputChange("password", password)}
            placeholder="Enter your password"
            secureTextEntry
          />
    
             <TouchableOpacity 
                style={[styles.button, !isFormValid && { opacity: 0.5 }]} 
                disabled={!isFormValid} 
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>{loading ? "Logging in..." : "Log In"}</Text>
            </TouchableOpacity>

        </View>
  )
}

export default login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: COLORS.blackText
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.blackBorder,
    marginBottom: 20,
    paddingVertical: 8,
    fontSize: 16
  },
  button: {
    backgroundColor: COLORS.secondaryYellow, 
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600"
  }
})


