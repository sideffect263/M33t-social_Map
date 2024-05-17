import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Alert, StyleSheet, ImageBackground,ScrollView, SafeAreaView, StatusBar } from 'react-native';
import axios from 'axios';


const statusBarHeight =StatusBar.currentHeight




const Login = () => {



    const navigation = useNavigation();


    

    

  
useEffect(() => {
    console.log('Login Screen');

    navigation.setOptions({
        headerShown: false,
    });
}
, []);


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const textInputFocus = () => {
        console.log('Text Input Focused');
    }


    const handleLogin = () => {
        console.log('Username:', username);
        console.log('Password:', password);
        loginSession();

        
    }

    const backPressed = () => {
        console.log('Back Pressed');
        router.back();
    }


    const registerPressed = () => {
        console.log('Register Pressed');
        navigation.navigate('Registration');
    }


    const storeData = async (token: string) => {
        console.log("store token");
        console.log(token);
        try {
          await AsyncStorage.setItem('meetUpToken', token).then(() => {
          console.log("token stored");
          let temptoken = token;
          console.log(temptoken);
          console.log(username);
          
          navigation.navigate('Index', {token: temptoken, username: username});
                  });
        } catch (error) {
          // Error saving data
          console.log(error);
        }
      }

    const loginSession = () => {
        console.log("log in session");
        axios.post('https://m33t.app/users/login', {
          email: (username),
          password:(password),
          
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            
        })
        .then(function (response:any) {
          console.log(response.data);
          console.log("login success");
          console.log(response.data.access_token);
          
          storeData(response.data.access_token);


        })
        .catch(function (error:any): any {
            console.log(error.response);
            console.log("login failed");
        });
        
  
      }
    return (
        <SafeAreaView style={styles.safeConti}>
            <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.scrollContiConti} style={styles.scrollConti}>
        <ImageBackground  source={require('../assets/images/city_night_1_image.png')} resizeMode='cover' style={styles.main}>
        <TouchableOpacity onPress={backPressed} style={styles.header}>
                    <Text style={styles.headerText}>חזור</Text>
                </TouchableOpacity>
        <View style={styles.mainConti}>
         <Text style={styles.headline1}>חבר</Text> 
         <Text style={styles.headline2}>הת</Text>   
          </View>

        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="שם משתמש או מייל"
                    placeholderTextColor="#888"
                    selectionColor={'lightgreen'}
                    onFocus={textInputFocus}
                    autoCapitalize='none'
                    autoCorrect={false}
                    
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="סיסמא"
                    textAlign='right'
                    textAlignVertical='center'
                    placeholderTextColor="#888"
                    secureTextEntry={true}
                    autoCapitalize='none'
                    autoCorrect={false}
                    
                    onChangeText={(text) => setPassword(text)}
                />

                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.link}>המשך</Text>
                </TouchableOpacity>
              
            </View>
            <View style={{flex:1,flexDirection: 'row', alignItems: 'center'}}>
  <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
  <View>
    <Text style={{width: 50, textAlign: 'center', color:'black', fontSize:24}}>או</Text>
  </View>
  <View style={{flex: 1, height: 1, backgroundColor: 'white'}} />
</View>
                <View style={styles.Buttons}>
               
                <TouchableOpacity onPress={registerPressed} style={styles.button}>
                    <Text style={styles.link}>הרשמה</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> console.log("forgot pass")} style={styles.button}>
                    <Text style={styles.link}>שכחתי סיסמא</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ImageBackground>
        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 8,
        width: '90%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        alignSelf: 'center',
        borderWidth:2,
        borderColor:'lightyellow',
        borderRadius: 40, 
        
        marginBottom: '5%',
    },
    safeConti: {
        height: '100%', 
        width: '100%',
        flexDirection: 'column',
       
    },
    header: {
        height: 50,
        marginHorizontal: '10%',
        width: '20%',
        margin:'5%',
        display: 'flex',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        borderColor:'white',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderRadius: 40,
        top: statusBarHeight,
        
    },

    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'lightyellow',
    },
    scrollConti: {
   
        backgroundColor: 'transparent',
        flexDirection: 'column',
        },

    scrollContiConti: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderColor:'white',

        flex: 1,
    },

    break: {
    },

    Buttons: {
        flex: 2,
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderColor:'white',
        
    },

    button: {
        backgroundColor: 'lightyellow',
        padding: 10,
        borderRadius: 20,
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        marginVertical: 40,
    },
    mainConti: {
        width: '80%',
        flex:1,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',
        borderColor:'white',
    },
    main: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        borderColor: 'black',
    },
    headline1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'lightblue',
    },
    headline2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    inputContainer: {
        flex: 2,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 12,
        fontSize: 18,
        marginVertical: 20,
        backgroundColor: 'white',


    },
    link: {
        color: 'black',
        fontSize: 20,
        
    },
});

export default Login;


