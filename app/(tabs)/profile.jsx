import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState, useEffect } from "react";
import { COLORS } from "../../assets/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';

const profile = () => {

    const router = useRouter();
    const [firstName, setFirstName] = useState("");


    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const storedName = await AsyncStorage.getItem("first_name");
                if (storedName) {
                    setFirstName(storedName);
                }
            } catch (error) {
                console.error("Error fetching user name:", error);
            }
        };

        fetchUserName();
    }, []);
    const handleLogout = async () => {
        await AsyncStorage.removeItem("authToken");
        router.replace("/login"); // back to login
    };

    return (

        <View style={styles.parentContainer}>
            <View style={styles.depositWithdrawalNav}>
                <Text style={styles.sectionTitle}>{firstName || "User name"}</Text>
                <Pressable style={styles.logOutBtn}>
                    <Text onPress={() => handleLogout()} style={styles.logOutText}>Log Out </Text>
                </Pressable>
            </View>
        </View>

    )
}

export default profile

const styles = StyleSheet.create({
    depositWithdrawalNav: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"

    },
    parentContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50

    },
    sectionTitle: {
        fontWeight: "600",
        fontSize: 16,
        marginBottom: 10,
    },
    logOutBtn: {
        backgroundColor: COLORS.secondaryYellow,
        width: 90,
        height: 30,
        margin: 8,
        borderRadius: 7,
        color: COLORS.white,
        flexDirection: "row",
        alignItems: "center",
         justifyContent: "center",

    }, logOutText: {
        color: COLORS.white,
        fontWeight: "600",
        textAlign:"center"
    },
})