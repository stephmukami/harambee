import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Pressable, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabase'
import { COLORS } from '../../assets/theme'
import { useRouter } from 'expo-router'
import { useLocalSearchParams } from "expo-router"
import AntDesign from '@expo/vector-icons/AntDesign';
const { width: screenWidth, } = Dimensions.get("window");


const EditProject = () => {

  const router = useRouter()
  const { id } = useLocalSearchParams()

  const [newProjectDetails, setNewProjectDetails] = useState({
    projectName: "",
    goal: "",
    description: ""
  })

  const [prevProjectDetails, setPrevProjectDetails] = useState({
    projectName: "",
    goal: "",
    description: ""
  })

  const [loading, setLoading] = useState(false)

  const handleInputChange = (name, value) => {
    setNewProjectDetails((prev) => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  const fetchPrevProjectDetails = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("projects")
      .select("project_id, project_name,description,created_at")
      .eq("project_id", id)
      .single()

    if (error) {
      console.error("Error fetching project", error)
    } else {
      console.log("prev project", data)
      //dont need to store the previous data just hook it up to the new inputs which can be editted 
      setNewProjectDetails({
        projectName: data.project_name || "",
        goal: data.goal?.toString() || "no set goal ",
        description: data.description || ""
      })
    }
    setLoading(false)
  }

  const handleSubmit = async () => {
    if (!isFormValid) {
      Alert.alert("Error", "Please add a project name")
      return
    }
    setLoading(true)
    try {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) {
        Alert.alert("Error", "You must be logged in to edit a project")
        return
      }

      const { data, error } = await supabase
        .from("projects")
        .update({
          project_name: newProjectDetails.projectName,
          description: newProjectDetails.description,
          project_goal: newProjectDetails.goal ? Number(newProjectDetails.goal) : null,
          //updated_at:new Date().toISOString()
        })
        .eq("project_id", id)
        .eq("user_id", user.id)
        .select();

      if (error) throw error;

      console.log("Project updated", data);
      Alert.alert("Success", "Project updated successfully");

      router.push("/projects");

    } catch (error) {
      console.error("Error editting project", error)
    }
  }

  const handleDelete = async () => {
    try {
      setLoading(true);
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) {
        Alert.alert("Error", "You must be logged in to delete a project");
        return;
      }

      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("project_id", id)   // delete by id
        .eq("user_id", user.id); // extra safety: only delete if project belongs to user

      if (error) throw error;

      Alert.alert("Success", "Project deleted successfully");
      router.push("/projects"); // navigate back to projects list

    } catch (error) {
      console.error("Error deleting project", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };


  const isFormValid = newProjectDetails.projectName.trim() !== "" ||
    prevProjectDetails.projectName.trim() !== ""

  useEffect(() => {
    if (id) fetchPrevProjectDetails()
  }, [id])


  return (
    <View style={styles.container}>
      <View style={styles.editDelete}>
        <Text style={styles.title}>Edit Project Details</Text>
        <Pressable style={styles.iconBackground} onPress={handleDelete}>
          <AntDesign name="delete" size={20} color="black" />
        </Pressable>
      </View>


      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={newProjectDetails.projectName}
        onChangeText={(text) => {
          handleInputChange("projectName", text)
        }
        }
        placeholder="Enter a name for your project"
        required
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={newProjectDetails.description}
        onChangeText={(text) => handleInputChange("description", text)}
        placeholder="Briefly explain your project"
      />

      <Text style={styles.label}>Goal</Text>
      <TextInput
        style={styles.input}
        value={newProjectDetails.goal || 0}
        onChangeText={(text) => handleInputChange("goal", text)}
        placeholder="Set an optional goal"
      />






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

export default EditProject


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
  },
  editDelete: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth * 0.7,
    borderColor: "000"
  },
  iconBackground: {
    width: 50,
    height: 50,
    borderRadius: "100%",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  }
})