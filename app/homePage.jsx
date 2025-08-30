import { StyleSheet, Text, View, Pressable, FlatList,Dimensions } from "react-native";
import React from "react";
import { COLORS } from "../assets/theme";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
const { width } = Dimensions.get("window")

const HomePage = () => {
  const deposits = [
    { id: "1", amount: 2330, date: "12/2/2025 1.00 PM", ref: "APP/MPESA TR1RQQQX" },
    { id: "2", amount: 2330, date: "12/2/2025 1.00 PM", ref: "APP/MPESA TR1RQQQX" },
  ];

  

  return (
    <View style={styles.container}>


      {/* Project Card */}
      <LinearGradient
          colors={["#F37335", "#FDC830"]} // gradient colors
          start={{ x: 0, y: 0 }} // left
          end={{ x: 1, y: 0 }}   // right
          style={styles.projectCard}
        >
          <Text style={styles.projectTitle}>Project Krypton</Text>
          <Text style={styles.projectBalance}>KES 20,000</Text>
    </LinearGradient>

      {/* Deposits / Withdrawals */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <View style={styles.dollar}>
              <FontAwesome5 name="money-bill-alt" size={16} color="gray" />
          </View>
          
          <View>
            <Text style={styles.statLabel}>Deposits</Text>
            <Text style={styles.statValue}>1234</Text>
          </View>
          
        </View>

        <View style={styles.statDivider} />
              <View style={styles.statBox}>
          <View style={styles.dollar}>
              <FontAwesome5 name="money-bill-alt" size={16} color="gray" />
          </View>
          
          <View>
            <Text style={styles.statLabel}>Withdrawals</Text>
            <Text style={styles.statValue}>1234</Text>
          </View>
          
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>

      {/* Pagination Dots */}
      <View style={styles.dots}>
        <View style={[styles.dot, styles.activeDot]} />
        <Pressable>
          <View style={styles.dot} />
        </Pressable>
       
      </View>

      {/* Deposits List */}
      <Text style={styles.sectionTitle}>Deposits</Text>
      <FlatList
        data={deposits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.depositItem}>
            <View style={styles.iconCircle}>
              <FontAwesome5 name="coins" size={20} color="gray" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.depositAmount}>Ksh {item.amount}</Text>
              <Text style={styles.depositDate}>{item.date}</Text>
              <Text style={styles.depositRef}>{item.ref}</Text>
            </View>
          </View>
        )}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <AntDesign name="home" size={24} color="black" />
          <Text>Home</Text>
        </Pressable>

        <Pressable style={styles.navItem}>
          <MaterialCommunityIcons name="projector-screen-variant-outline" size={24} color="black" />
          <Text>Projects</Text>
        </Pressable>

        <Pressable style={styles.navItem}>
          <MaterialIcons name="person" size={24} color="black" />
          <Text>Profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgGrey,
    padding: 20,
  },
  projectCard: {
    // backgroundColor: "#f7931a",
 
    borderRadius: 12,
    height:150,
    alignItems: "center",
    paddingVertical: 25,
    marginBottom: 20,
    marginTop: 30,
  },
  projectTitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 5,
  },
  projectBalance: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 15,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  dollar:{
    position:"relative",
    bottom:6
  },
  statBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    gap:14
  },
  statLabel: {
    color: "#666",
    fontSize: 14,
    marginTop: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#ddd",
    height: 40,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 15,
  },
  progressFill: {
    width: "60%",
    height: "100%",
    backgroundColor: "#f7931a",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#f7931a",
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
  },
  depositItem: {
    flexDirection: "row",
    // alignItems: "flex-start",
    gap:10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    height:100
  },
  iconCircle: {
    width: 55,
    height: 55,
    borderRadius: "100%",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  depositAmount: {
    fontWeight: "600",
    marginBottom:7
  },
  depositDate: {
    color: "#555",
    fontSize: 12,
    marginBottom:3
  },
  depositRef: {
    color: "#999",
    fontSize: 12,
    fontWeight:450
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    marginTop: "auto",
  },
  navItem: {
    alignItems: "center",
  },
});
