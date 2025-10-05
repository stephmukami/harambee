import { Tabs } from "expo-router";
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";



export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#F5A227",
            }}
        >
            <Tabs.Screen
                name="homePage"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Foundation name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="projects"
                options={{
                    title: "Projects",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="projector-screen-variant-outline" size={24} color={color} />

                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
