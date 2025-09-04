import { StyleSheet, Text, View, TextInput, TouchableOpacity,Alert } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../assets/theme'
import { supabase } from '../services/supabase'
import { useRouter } from 'expo-router';


const createProject = () => {

const router = useRouter()
const [loading,setLoading] = useState(false)

const [projectDetails, setProjectDetails] = useState({
projectName: "",
goal:"",

})

 const [nameError,setNameError] = useState("")

 const handleInputChange = (name,value)=>{
    setProjectDetails((prev)=>(
        {
            ...prev,
            [name]:value
        }
    ))
 }
    
 const isFormValid = projectDetails.projectName.trim() !== ""

 const handleSubmit = async () =>{
    if(!isFormValid){
        Alert.alert("Error","Please add a project name")
        return
    }
    console.log("project details",projectDetails)
    setLoading(true)
    try{
        const user = (await supabase.auth.getUser()).data.user
        if(!user){
            Alert.alert("Error","You must be logged in to create a projecr")
            return
        }

        const {data,error} = await supabase
        .from("projects")
        .insert([

            {
            project_name: projectDetails.projectName,
            project_goal: projectDetails.goal ? Number(projectDetails.goal) : null,
            user_id: user.id,
            created_at: new Date().toISOString().split("T")[0]
            }
           
        ])
        .select()
        if (error) throw error

        console.log("Project created",data)
        Alert.alert("Success", "Project created successfully")

        setProjectDetails({
            projectName: "",
            goal:"",

        })

// Navigate (optional)
    router.push("/projects");

        

    }catch(error){
        console.error("error creating project",error)
        Alert.alert("Error", error.message);
    }
 }


  return (
       <View style={styles.container}>
          <Text style={styles.title}>Create your project</Text>
    
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={projectDetails.projectName}
            onChangeText={(text) => 
                {handleInputChange("projectName", text)

                if(projectDetails.projectName.length < 1){
                    setNameError("Enter a valid name")
                }else{
                    setNameError("")
                }}

            }
            placeholder="Enter a name for your project"
            required 
          />
    
          <Text style={styles.label}>Goal</Text>
          <TextInput
            style={styles.input}
            value={projectDetails.goal}
            onChangeText={(text) => handleInputChange("goal", text)}
            placeholder="Set an optional goal"
          />
    
       
    
   
    
          {nameError ? <Text style={{color: "red"}}>{nameError}</Text> : null}
    
          <TouchableOpacity 
            style={[styles.button, !isFormValid && { opacity: 0.5 }]} 
            disabled={!isFormValid} 
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>{loading ? "Submitting..." : "Submit"}</Text>
        </TouchableOpacity>
    
        </View>
  )
}

export default createProject

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
