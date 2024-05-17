import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text,Linking, TextInput, TouchableOpacity, StyleSheet, ImageBackground,ScrollView, SafeAreaView, StatusBar, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';


const statusBarHeight =StatusBar.currentHeight


const Registration = ({route}: {route: any},{navigation}:{navigation:any}) => {

console.log('Registration Screen');


const createTwoButtonAlert = (errorMsg: string) =>
    Alert.alert('Registration issue', errorMsg, [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);


const mapNavigation = useNavigation();


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [userTandC, setUserTandC] = useState(false);

  const storeData = async (token: string) => {
    console.log("store token");
    
    console.log(token);
    try {
      await AsyncStorage.setItem('meetUpToken', token);
      mapNavigation.navigate('Index', {token: token, username:username});
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  }
  


  const loginSession = () => {
    console.log("registraion session");
    axios.post('https://m33t.app/users/register', {
      name:username,
      email:username,
      password:password,
      phone:'000000000',
      description:"Hey ! i'm here to meet new people and have fun",
      date_of_birth:'2000-01-01',
      lat:50.8503,
      alt:4.3517,
    },
    {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        
    })
    .then(function (response) {
        console.log("response");
        console.log(response.data);
        console.log(response.data['access_token']);
        storeData(response.data['access_token']); 

    })
    .catch(function (error) {
      console.log(error.response.data);
      createTwoButtonAlert(error.response.data['msg'])
    });
    

  }
  const handleRegistration = () => {
    console.log('Register');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('TandC:', userTandC);

    if(!userTandC){
        createTwoButtonAlert('Please accept the Terms and Conditions');
        return;
        }

    loginSession();
  }

  const userTandCChecked = () => {
    setUserTandC(!userTandC);
  }

  const tandcReadPressed = () => {
    console.log('Terms and Conditions Pressed');
    Linking.openURL('https://m33t.webflow.io/q-a');
    
  }


  useEffect(() => {

    mapNavigation.setOptions({
        headerShown: false,
    });
    

}, []);

const backPressed = () => {
  console.log('Back Pressed');
  //go back just one screen
  mapNavigation.navigate('Login');
}


  return (
    <SafeAreaView style={styles.safeConti}>
        <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.scrollContiConti} style={styles.scrollConti}>
    <ImageBackground  source={require('../assets/images/city_night_1_image.png')} resizeMode='cover' style={styles.main}>
    <TouchableOpacity onPress={backPressed} style={styles.header}>
                <Text style={styles.headerText}>חזור</Text>
            </TouchableOpacity>
    <View style={styles.mainConti}>
     <Text style={styles.headline1}>רשם</Text> 
     <Text style={styles.headline2}>הי</Text>   
      </View>

    <View  style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              onChangeText={(text) => setUsername(text)}
              autoCapitalize='none'
              autoCorrect={false}
                    

            />
            <TextInput
             style={styles.input}
             placeholder="Password"
             placeholderTextColor="#888"
             secureTextEntry={true}
             onChangeText={(text) => setPassword(text)}
             autoCapitalize='none'
             autoCorrect={false}
                    
            />
             <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor="#888"
                    secureTextEntry={true}
                    autoCapitalize='none'
                    autoCorrect={false}
                    
                />
        </View>

                {/* TERMS AND CONDISTIONS*/}
                <View style={styles.row}>
                  <View style={styles.checkBoxConti}>
                   <Checkbox
                        value={userTandC}
                         color={'lightblue'}
                            onValueChange={userTandCChecked}
                     />
                     </View>
                     

                     <View style={styles.TandCConti}>
                   <Text style={styles.TandCText}>I agree to the </Text>
                   <Text onPress={tandcReadPressed} style={styles.TandCHighlightedText}>Terms and Conditions</Text>
                   <Text style={styles.TandCText}> and </Text>
                    <Text onPress={tandcReadPressed} style={styles.TandCHighlightedText}>Privacy Policy</Text>
                    </View>
               </View>

                

           <TouchableOpacity onPress={handleRegistration} style={styles.buttonRegister}>
                <Text style={styles.registerText}>Create an account</Text>
            </TouchableOpacity>
          
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
checkBoxConti: {
    flex: 1,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
},

TandCConti: {
    flex: 4,
    display: 'flex',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: 'white',
    textAlign: 'center',
},
  

headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'lightyellow',
},
scrollConti: {

    backgroundColor: 'black',
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

row:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 20,
    maxHeight: '12%',
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 20,
    
    maxWidth: '95%',


},

buttonRegister: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'beige',
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

registerText: {
    color: 'lightyellow',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
},

TandCText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    borderColor: 'white',
},

TandCHighlightedText: {
    color: 'lightblue',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',

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
    flex: 1,
    width: '100%',
    maxHeight: '40%',
    justifyContent: 'space-around',

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

export default Registration;
