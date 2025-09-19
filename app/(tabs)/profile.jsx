import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from "react";
import { COLORS } from "../../assets/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const profile = () => {

    const handleLogout = async () => {
  await AsyncStorage.removeItem("authToken");
  router.replace("/index"); // back to login
};

    return (
        <View style={styles.depositWithdrawalNav}>
            <Text style={styles.sectionTitle}>User Name</Text>
            <Pressable style={styles.viewMoreBtn}>
                <Text onPress={() => handleLogout()} style={styles.viewMore}>Log Out </Text>
            </Pressable>
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
    sectionTitle: {
        fontWeight: "600",
        fontSize: 16,
        marginBottom: 10,
    },
    viewMoreBtn: {
        backgroundColor: COLORS.secondaryYellow,
        width: 90,
        margin: 8,
        borderRadius: 7

    },
})