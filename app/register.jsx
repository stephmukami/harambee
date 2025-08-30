import { StyleSheet, Text, View, TextInput, TouchableOpacity,Alert } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../assets/theme'
import { supabase } from '../services/supabase'
import { useRouter } from 'expo-router';

const Register = () => {

  const router = useRouter()
  const [loading,setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const [passwordError,setPasswordError] = useState("")

  const handleInputChange = (name, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  const isFormValid = 
  userDetails.firstName.trim() !== "" &&
  userDetails.lastName.trim() !== "" &&
  userDetails.email.trim() !== "" &&
  userDetails.password.length >= 6

 

  const handleSubmit = async () => {
    if (!isFormValid) {
      Alert.alert("Error", "Please fill in all fields correctly")
      return
    }

    console.log("user details submitted:", userDetails)
    const { email, password, firstName, lastName } = userDetails
    
    setLoading(true) // Enable loading state
    
    try {
      // Sign up a user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            email
          }
        }
      })

      if (error) {
        console.error("Error creating user:", error.message)
        Alert.alert("Sign Up Error", error.message)
        return
      }

      console.log("sign up response:", data)

      // Insert users after sign up
      if (data?.user) {
        const { error: insertError } = await supabase.from("users").insert([
          { 
            id: data.user.id, 
            first_name: firstName, 
            last_name: lastName,
            email: email
          }
        ])
        
        if (insertError) {
          console.error("Error inserting user into users table:", insertError.message)
          Alert.alert("Database Error", "User created but profile setup failed: " + insertError.message)
          return
        }

        // Success - clear form and navigate
        Alert.alert("Success", "User created successfully", [
          {
            text: "OK",
            onPress: () => router.push("/login")
          }
        ])

        setUserDetails({
          firstName: "",
          lastName: "",
          email: "",
          password: ""
        })
      } else {
        console.log("No user data returned from signup")
        Alert.alert("Error", "User creation failed - no user data returned")
      }
    } catch (err) {
      console.error("Unexpected error:", err)
      Alert.alert("Error", "An unexpected error occurred: " + err.message)
    } finally {
      setLoading(false) // Disable loading state
    }
  }

 


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your account</Text>

      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={userDetails.firstName}
        onChangeText={(text) => handleInputChange("firstName", text)}
        placeholder="Enter your first name"
        required 
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={userDetails.lastName}
        onChangeText={(text) => handleInputChange("lastName", text)}
        placeholder="Enter your last name"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={userDetails.email}
        onChangeText={(email) => handleInputChange("email", email)}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={userDetails.password}
        onChangeText={(password) =>{ 
          handleInputChange("password", password)
          if(password.length < 6){
            setPasswordError("Password must be at least 6 characters")
          }else{
            setPasswordError("")
          }
        }}
        placeholder="Enter your password"
        secureTextEntry
      />

      {passwordError ? <Text style={{color: "red"}}>{passwordError}</Text> : null}

      <TouchableOpacity 
        style={[styles.button, !isFormValid && { opacity: 0.5 }]} 
        disabled={!isFormValid} 
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>{loading ? "Signing up..." : "Sign Up"}</Text>
    </TouchableOpacity>

    </View>
  )
}

export default Register

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
    borderBottomColor: COLORS.blackText,
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




