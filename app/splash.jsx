import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { COLORS } from '../assets/theme'

const splash = () => {
  return (
    <View>
      <Image style={styles.logo} source={require("../assets/images/harambee-logo.png")}/>
      <Text style={ styles.clincher}>Every transaction with ease.</Text>

    </View>
  )
}

export default splash

const styles = StyleSheet.create({
   header:{
    textAlign:"center",
    color:COLORS.primaryBlue
  },
  clincher:{
    textAlign:"center",
    color:COLORS.greyText
  },
  logo:{
    width:"screen",
    height:"screen"

  }

})