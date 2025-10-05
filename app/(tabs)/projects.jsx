import { StyleSheet, Text, View,Dimensions,FlatList,Pressable,TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { COLORS } from '../../assets/theme'
import { supabase } from '../../services/supabase';
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';


const projects = () => {

  const router = useRouter()

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
        <View style={styles.projectNameEdit}>
        <Text style={styles.projectName}>{item.project_name}</Text>
        <Pressable onPress={() => router.push(`/editProject/${item.project_id}`)}>
          <AntDesign name="edit" size={20} color="black" />
        </Pressable>
        </View>
        <Text style={styles.projectDescription}>{item.description}</Text>
        <Text style={styles.creationDate}>Created at: {item.created_at}</Text>
        
      </View>
    </View>
  )

  return (
     <View style={styles.container}>
        <Text style={styles.title}>View all your projects</Text>

            {/* Add a Project*/}
              <TouchableOpacity style={styles.addProject} onPress={()=> router.push("/createProject")}>
        
                <TouchableOpacity   style={styles.statBox} onPress={()=>toggleActiveTab("deposits")}>
                 
                 <Text style={styles.addProjectText}>Add a project</Text>
                  
                </TouchableOpacity >
        
                <View style={styles.statDivider} />
                    <FontAwesome6 name="add" size={18} color="white" />
                    
              </TouchableOpacity>

        {projects.length > 0 ? (
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
        ):(
        <Text style={styles.noProjects}>No projects added</Text>
        )
        
      }
                      

  
       
  
  
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
        height:screenHeight,
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
    addProject:{
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    marginTop: "auto",
    backgroundColor: "white",
    borderRadius: 6,
    height:35,
    paddingVertical: 2,
    alignItems: "center",
    backgroundColor:COLORS.primaryBlue,
    color:COLORS.white,
    marginBottom:30,
   
  },
  addProjectText:{
    color:COLORS.white,
    fontWeight:600
  },
    projectNameEdit: {
    flexDirection: "row",
    justifyContent:"space-between",
    flex:1,
    width:screenWidth * 0.7
  },
    creationDate: {
    color: "#555",
    fontSize: 14,
    fontWeight:400,
    marginBottom:3
  },
  noProjects: {
    color: "#555",
    fontSize: 16,
    fontWeight:400,
    marginTop:6,
    textAlign:"center"
  }
})