import { View, Text,  Image, Pressable, StyleSheet, ImageBackground, Platform, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { Header } from '@react-navigation/stack'

const UserProfilePressed = ({route}: {route: any}) => {

    const navigation = useNavigation()
    const statusBarHeight =StatusBar.currentHeight



    const userJWT = route.params.userJWT
    const token = route.params.token;
    const location = route.params.location;

    const goBack = () => {
        console.log("goBack")
        navigation.goBack()
    }

    useEffect(() => {
        console.log("UserProfilePressed")

        console.log("userJWT: ", userJWT)
        console.log("token: ", token)
        console.log("location: ", location)

        navigation.setOptions({
            title:"hello",
            headerShown: false,

          
                
        })
    }, [])

    return (
        <ImageBackground imageStyle={styles.image} source={{uri:"https://m33t.app/users/"+location[1]+"/photo"}} style={styles.container}>
           <View style={styles.box1}>
            <Pressable onPress={goBack} style={styles.returnBox}>
                <Image source={require('../assets/icons/left_arrow_icon.png')} style={{width: 30, height: 30}}/>

            </Pressable>

            <View style={styles.blankBox}>

            </View>
            <View style={styles.blankBox}>
                
            </View>

            </View>

            <View style={styles.box2}>
                <View style={styles.row1}>
                <Text style={styles.userTextL}>{location[2]}</Text>
                <Text style={styles.userTextR}>24</Text>
                </View>
                <View style={styles.row2}>
                <Text style={styles.userText}>describtion about the user</Text>
                </View>

            </View>

            <View style={styles.box3}>

                </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    box1: {
        flex: 6,
        backgroundColor: 'transparent',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: "9%",
        marginLeft: "15%",
        ... Platform.select({
            ios:{},
            android:{
                marginTop: StatusBar.currentHeight
            }
        })
    },

    returnBox: {
        flex:1,
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(204, 227, 222, 0.5)',
        borderWidth: 0.2,
        borderColor: 'black',
        borderRadius: 50,
        marginTop:"2%",
    },

    button: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },

    blankBox: {
        flex: 3,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    },

    row1: {
        flex: 2,
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    row2: {
        flex: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    box2: {
        flex: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 0.8,
    },

    box3: {
        flex: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        
        
       
    },
    userTextL: {
        fontSize: 22,
        textAlign: 'left',
        width: '80%',
        color: 'black'
    },

    userTextR: {
        fontSize: 22,
        textAlign: 'right',
        width: '20%',
        color: 'black'
    },

    userText: {
        fontSize: 22,
        textAlign: 'center',
        width: '100%',
        color: 'black'
    },

    text: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold'
    }
})

export default UserProfilePressed