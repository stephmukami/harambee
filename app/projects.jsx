import { StyleSheet, Text, View,Dimensions,FlatList } from 'react-native'
import React, { useEffect,useState } from 'react'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { COLORS } from '../assets/theme'
import { supabase } from '../services/supabase';
const { width ,height} = Dimensions.get("window")


const projects = () => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async ()=>{
    setLoading(true)
    const {data,error} = await supabase
    .from("projects")
    .select("project_id, project_name,description,created_at")

    if(error){
      console.error("Error fetching projects",error)
    }else{
      setProjects(data)
    }
    setLoading(false)
  }

  useEffect(()=>{
    fetchProjects()
  },[])


    const renderItem = ({ item }) => (
    <View style={styles.projectTab}>
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons
          name="projector-screen-variant-outline"
          size={24}
          color="black"
        />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.projectName}>{item.project_name}</Text>
        <Text style={styles.projectDescription}>{item.description}</Text>
        <Text style={styles.creationDate}>Created at: {item.created_at}</Text>
        
      </View>
    </View>
  )

  return (
     <View style={styles.container}>
        <Text style={styles.title}>View all your projects</Text>
                      
                 <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={(item) => item.project_id.toString()}
        refreshing={loading}
        onRefresh={() => {
          // pull to refresh
          (async () => {
            const { data, error } = await supabase
              .from("projects")
              .select("project_id, project_name, created_by, description, created_at");
            if (!error) setProjects(data);
          })();
        }}
      />
  
       
  
  
      </View>
  )
}

export default projects

const styles = StyleSheet.create({
      container: {
        backgroundColor: COLORS.offWhite,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height:height,
      },
    title:{
      marginTop:50,
      marginBottom:10,
      padding:10,
      textAlign:"center",
      fontSize:20,
      fontWeight:500,
      color:COLORS.primaryBlue
    },
    flatListParent:{
    },
      iconCircle: {
    width: 55,
    height: 55,
    borderRadius: "100%",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
    projectTab: {
    flexDirection: "row",
    gap:10,
    backgroundColor: "white",
    padding: 15,
    height:100,
    borderBottomWidth:1,
    borderBottomColor:COLORS.blackBorder
  }, 
   projectName: {
    fontWeight: "800",
    marginBottom:7
  },  
    creationDate: {
    color: "#555",
    fontSize: 14,
    fontWeight:400,
    marginBottom:3
  }
})