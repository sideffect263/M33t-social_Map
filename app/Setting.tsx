import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text,Image, TextInput, TouchableOpacity,useWindowDimensions,  StyleSheet, ImageBackground,ScrollView, SafeAreaView, StatusBar, Pressable } from 'react-native';
import axios from 'axios';


const statusBarHeight =StatusBar.currentHeight




const Setting = ({route}: {route: any}) => {

    const navigation = useNavigation();
    


    let token = route.params.token;

    useEffect(() => {
        console.log('Setting Screen');

        navigation.setOptions({
            headerShown: false,
        });

      

    }, []);



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {height, width} = useWindowDimensions();
    const [selectedEmote, setSelectedEmote] = useState(null);


    const backPressed = () => {
        console.log('Back Pressed');
        router.back();

    }


    const deleteUser = () => {
        console.log('Delete User');
        axios.delete('https://m33t.app/users/delete?user_id=661fe401b2b26b9109c5aa33', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then((response) => {
            console.log(response);
            router.navigate('Login');
        }
        ).catch((error) => {
            console.log(error.response.data);
        });

        
    }
      
    return (

        <View style={styles.main}>

              <View style={styles.header}>
                    <TouchableOpacity onPress={backPressed} style={styles.backButton}>

                    <Image source={require('../assets/icons/left_arrow_icon.png')}  style={{height: 30, width: 30, resizeMode: 'contain'}} />
                        </TouchableOpacity>

                        <View style={styles.settingCap}>
                            <Text style={styles.headerText}>Setting</Text>
                            </View>
                </View>

                <View style={styles.body}>
                    <View style={styles.textLine}>
                        <Text style={styles.headerText}>Account</Text>
                        </View>

                        <View style={styles.accountConti}>
                            <TouchableOpacity style={styles.accountItem}>
                                <Image source={require('../assets/icons/user_icon.png')}  style={{height: 30, width: 30, resizeMode: 'contain'}} />
                                <Text style={styles.blackText}>Personal and account information</Text>
                                <Image source={require('../assets/icons/sp_right_arrow.png')}  style={{height: 30, width: 30, resizeMode: 'contain'}} />
                                </TouchableOpacity>
                            <TouchableOpacity style={styles.accountItem}>
                                <Image source={require('../assets/icons/shield_icon.png')}  style={{height: 30, width: 30, resizeMode: 'contain'}} />
                                <Text style={styles.blackText}>Security and Password</Text>
                                <Image source={require('../assets/icons/sp_right_arrow.png')}  style={{height: 30, width: 30, resizeMode: 'contain'}} />
                                </TouchableOpacity>
                                </View>
                                <View style={styles.textLine}>
                        <Text style={styles.headerText}>Prefrences</Text>
                        </View>
                        <View style={styles.prefrencesConti}>
                            <TouchableOpacity style={styles.accountItem}>
                                <Image source={require('../assets/icons/notification_icon.png')}  style={{height: 30, width: 30, resizeMode: 'contain'}} />
                                <Text style={styles.blackText}>Notifications</Text>
                                <Image source={require('../assets/icons/sp_right_arrow.png')}  style={{height: 30, width: 30, resizeMode: 'contain'}} />
                                </TouchableOpacity>
                            <TouchableOpacity style={styles.accountItem}>
                                <Image source={require('../assets/icons/darkMode_icon.png')}  style={{height: 30, width: 30, resizeMode: 'contain'}} />
                                <Text style={styles.blackText}>Dark mode</Text>
                                <Image source={require('../assets/icons/sp_right_arrow.png')}  style={{height: 30, width: 30, resizeMode: 'contain'}} />
                                </TouchableOpacity>
                                </View>

                                <Pressable onPress={deleteUser} style={styles.logOutConti}>
                                    <Image source={require('../assets/icons/logout_icon.png')}  style={{height: 30, width: 30, resizeMode: 'contain', left:"10%",position:'absolute'}} />
                                    <Text style={styles.whiteText}>Delete user</Text>
                                    </Pressable>



                </View>

            </View>
  
    );
};


const styles = StyleSheet.create({
  
        main:{
            flex:1,
            backgroundColor:'#B3B5BB'
        },

        
        item:{
             borderWidth: 2,
             marginHorizontal: 10,
             height: 250,
        },
        header: {
            flex: 1,
            width: '100%',
            marginTop:'15%',
            display: 'flex',
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignContent: 'center',
            flexDirection: 'row',
            borderColor:'white',
            backgroundColor: 'white',
            borderRadius: 0,
            top: 0,
            
            
        },

        headerText:{
            fontSize: 24,
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',

        },

        backButton:{
            flex: 1,
            zIndex: 1,
            width: '10%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderColor:'black',
            backgroundColor: 'transparent',
            borderRadius: 12,
            borderWidth: 2,
            position: 'absolute',
            left: "7%",
        },

        settingCap:{
            flex: 3,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderColor:'white',
            backgroundColor: 'transparent',
            borderRadius: 40,
            top: 0,
        },

       

        body:{
            flex: 13,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            alignSelf: 'center',
            borderColor:'lightyellow',
            borderRadius: 40, 
            marginBottom: '5%',
        },

        textLine:{
            flex: 1,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            borderColor:'black',
            backgroundColor: 'transparent',
            borderRadius: 40,
            marginLeft: '5%',
            
            marginTop: "10%",

        },
        

        accountConti:{
            flex: 3,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderColor:'white',
            backgroundColor: 'white',
            borderRadius: 10,
            top: 0,
        },

        prefrencesConti:{
            flex: 3,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderColor:'white',
            backgroundColor: 'white',
            borderRadius: 10,
            top: 0,
        },

        accountItem:{
            flex: 1,
            width: '90%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            borderColor:'black',
            backgroundColor: 'transparent',
            marginVertical: "5%",
        },

        navSlider:{
            flex: 0.5,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderColor:'white',
            backgroundColor: 'transparent',
            borderRadius: 40,
            top: 0,
        },

        logOutConti:{
            flex: 1,
            width: '90%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderColor:'black',
            backgroundColor: 'lightcoral',
            borderRadius: 10,
            marginVertical: "15%",
        },

       
        image:{
            height: 120,
            width: 120,
            overflow: 'hidden',
            backgroundColor: 'transparent',
            resizeMode: 'contain',
        },
      
        blackText:{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'black',
        },

        whiteText:{
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
        },
});



export default Setting;
