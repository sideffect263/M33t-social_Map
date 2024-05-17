import { View, Text, StyleSheet, ScrollView, Image,ImageBackground ,TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity,StatusBar,FlatList, Platform, Modal, Alert, Pressable,TextInput } from 'react-native'
import React, {useRef, useEffect, useState} from 'react';
import { Link, useNavigation, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import fs from 'fs';
import DateTimePicker from '@react-native-community/datetimepicker';





const statusBarHeight =StatusBar.currentHeight



const UserProfile = ({route}: {route: any}) => {


    const navigation = useNavigation();


    const userJWT = route.params.userJWT;

    const [age, setAge] = useState(0);
    const token = route.params.token;

    const logout = () => {
        console.log("logout");


    }


    const deleteToken = async () => {
        console.log("delete token");
        
        try {
            await AsyncStorage.removeItem('meetUpToken').then(() => {
              navigation.navigate('Index', {token:"reset"});
            console.log('token deleted')
            });
        } catch (error) {
            // Error saving data
            console.log(error);
        }
    }



    const contactsPressed = () =>{
        console.log("contacts pressed")

  
      }
  
      const profilePressed = () => {
        console.log("profile PRESSED")
  
      }
  
      const mapPressed = () =>{
        console.log('map pressed')
        navigation.navigate('Index',{userJWT: userJWT, token: token});
  
      }

      const settingPressed = () => {
        console.log("setting pressed")
        navigation.navigate('Setting',{userJWT: userJWT, token: token});
      }

      const [modalVisible, setModalVisible] = useState(false);

      const [userNewName, setUserNewName] = useState('');
      const [password, setPassword] = useState('');
      const [userDescription, setUserDescription] = useState('');
      const [userImage, setUserImage] = useState(require('../assets/icons/profile_image.png'));

      
  const [image, setImage] = useState<any>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 2],
      
      quality: 1,
      
    });

    console.log(result);

    if (!result.canceled) {
      console.log("image selected");
      setImage(result);
      console.log(image);
      setUserImage({uri: result.assets[0].uri});
      
    }
  };




    useEffect(() => {//this is the header of the page
      


        navigation.setOptions({
  
          header : () => (
            <View style={styles.profileButtons}> 
            <TouchableOpacity onPress={profilePressed} style={[styles.highlightedButton]}>
           <View style={styles.profileButtonImg}>
           <Image source={{uri:"https://m33t.app/users/"+route.params.userJWT._id+"/photo"}} style={styles.highButtonImg}/>
           </View>
           </TouchableOpacity>
          
           <TouchableOpacity onPress={mapPressed} style={styles.profileButton}>
           <View style={[styles.profileButtonImg]}>
           <Image source={require('../assets/icons/map_icon.png')} style={styles.highButtonImg}/>
           </View>
           </TouchableOpacity>
            
             <TouchableOpacity onPress={contactsPressed} style={styles.profileButton}>
           <View style={[styles.profileButtonImg]}>
           <Image source={require('../assets/icons/conversation_icon.png')} style={styles.highButtonImg}/>
           </View>
           </TouchableOpacity>
           </View>
          ),

          
        Animation: 'slide_from_left',

        });
      }
      , []);
      

      const editProfilePressed = () => {
        console.log("edit profile pressed");
        setModalVisible(true);
      }

      
      const editPhoto = () => {
        const formData = new FormData();
        const imgData = {
          uri: image.assets[0].uri,
          type: 'image/jpeg',
          name: 'photo',
        };

        const uri = image.assets[0].uri;

        fetch(uri)
        .then(res => res.blob())
        .then(blob=> {
          console.log("blob");
          console.log(blob);
          formData.append('photo', uri, 'photo.jpg');
        })
        .catch(error => {
          console.log("error in blob");
          console.log(error);
        });

        formData.append('_id', userJWT._id);
        console.log("form data");

        axios.post('https://m33t.app/users/update/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
            }

            
        })
        .then(function (response) {
            console.log("response of image update");
            console.log(response.data);
    
    
        })
        .catch(function (error) {
          console.log("error in image update");
          console.log(error.response.data);
        });
        
    
      }
      const saveChanges = () => {
        console.log("save changes");
        if(image == null){
          console.log("no image")
        }else{
          console.log("image selected")
          editPhoto()

        }
        setModalVisible(false);
      }


      useEffect   (() => {
        console.log("user profile page")
        console.log(token)
        console.log(userJWT)

        setAge(2024 - parseInt(userJWT.date_of_birth.substring(0,4)));
        console.log("age");
        console.log(age);
      }
      , []);

      useEffect(() => {//for image change
        console.log("image changed")
        console.log(image)
      }, [image]);


      
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContiConti} style={styles.scrollConti}>
      <Modal
        animationType="fade"
        
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <SafeAreaView style={styles.centeredView}>
          <Pressable style={styles.modalBackCloser} onPress={() => setModalVisible(!modalVisible)}>
            </Pressable>
          <Pressable style={styles.modalView}>
            <ScrollView automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.scrollConti} style={styles.scrollConti}>

            {/** this is the modal of edit user profile */}

          
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View style={styles.innerModal}>

                  <View style={styles.profileImageChange}>
                        <ImageBackground imageStyle={styles.image} source={{uri:"https://m33t.app/users/"+userJWT._id+"/photo"}} style={styles.image}>

                        <Pressable onPress={pickImage} style={styles.profileImageChangeButton}>
                          <Image source={require('../assets/icons/change_photo_icon.png')} style={styles.image}></Image>
                        </Pressable>


                        </ImageBackground>
                 </View>              

              <TextInput
                style={styles.input}
                textAlign='right'
                
                placeholder="שם"
                placeholderTextColor="black"
                selectionColor={'lightgreen'}
                onChangeText={(text) => setUserNewName(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="סיסמא"
                textAlign='right'
                textAlignVertical='center'
                placeholderTextColor="black"
                onChangeText={(text) => setPassword(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="תיאור"
                textAlign='right'
                textAlignVertical='center'
                placeholderTextColor="black"
                onChangeText={(text) => setPassword(text)}/>


            <Pressable style={styles.saveChangesButton} onPress={saveChanges}>
                <Text style={styles.text}>שמור</Text>
              </Pressable>


              </View>
              </TouchableWithoutFeedback>


      


            </ScrollView>

          </Pressable>
        </SafeAreaView>
      </Modal>
      
      <View style={styles.box1}>
       

        <View style={styles.infoContainer}>
            <View style={styles.userName}>
                <Text style={styles.UserProfileText}>{userJWT.name}</Text>
                <Text style={styles.textAge}> {age}</Text>
                </View>

            <View style={styles.descreption}>
                <Text style={styles.text}>{userJWT.description}</Text>
                </View>
        </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.textLine}>
            <TouchableOpacity style={styles.textR}>
            <Text style={styles.textC}>כל האירועים +</Text>
            </TouchableOpacity>
            <View style={styles.textL}>
            <Text style={styles.textReg}>האירועים שלך</Text>
            </View>
          </View>
          <View style={styles.eventsConti}>


            </View>

            <View style={styles.userButtons}>
                <TouchableOpacity style={styles.button} onPress={editProfilePressed}>
                    <Text style={styles.text}>Edit profile</Text>
                    <Image source={require('../assets/icons/plus_icon.png')} style={styles.image}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={settingPressed} style={styles.button}>
                    <Text style={styles.text}>Setting</Text>
                </TouchableOpacity>
            
                <TouchableOpacity onPress={deleteToken} style={styles.button}>
                    <Text style={styles.text}>log out</Text>
                </TouchableOpacity>
           </View>


        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {

      
      flex: 1,
      marginTop: 110,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 9,
      elevation: 10,  
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    profileImage: {
        flex: 3,
        marginTop: '5%',
        flexDirection: 'column',
        top:'-20%',
        width:'40%',
        borderRadius:20,
        backgroundColor:'#FFCAB1'
    },
    profileImageChange: {
        height: 160,
         width:160,
         marginBottom: '25%',
        borderRadius:20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageChangeButton: {
      height: 60,
      width: 60,  
      borderRadius: 100,
      borderWidth: 2,
      borderColor: 'black',
      left: '70%',	
      top: '70%',
      backgroundColor: 'white',

    },
    innerModal:{
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      backgroundColor: 'transparent',
    },


    editName: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 1,
    },

    input: {
        width: '50%',
        height: 65,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'black',
        marginVertical: '5%',
        textAlign: 'center',
        fontSize: 18,
        padding: 15,
    },

    saveChangesButton:{
        width: '30%',
        height: 50,
        backgroundColor: 'lightblue',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '5%',
    },



    flatConti:{
      flex: 4,
      width: '100%',
      height: '100%',
      borderWidth: 1,
    },
    eventsConti:{
      flex:4,
      marginTop: '5%',
      width: '78%',
      flexDirection: 'row',
      borderWidth: 1,
    },

    event1:{
      flex: 1,
      borderRadius: 15,
      borderWidth: 1,
      height: '100%',
      marginRight: '4%',
    },

    event2:{
      flex: 1,
      borderRadius: 15,
      borderWidth: 1,
      height: '100%',
      marginLeft: '4%',
    },
    userButtons: {
        flex: 6,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: '10%',
    },
    itemEvent:{
      flex: 1,
      borderRadius: 5,
      borderWidth: 1,
      height: '100%',
    },
     userName: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
    },
    textAge: {
        color: 'white',
        fontSize: 24,
    },

    descreption: {
        width: '100%',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
       },

    button:{
      flex: 1,
      borderWidth: 0.75,
      width: '80%',
      borderRadius: 20,
      marginVertical: '2%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'center',
      borderColor:'0,0,0,0.1',
      flexDirection: 'row',
      
    },

    textLine: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-around',
        width: '80%',
        height: '100%',
        marginTop: '5%',
    },

    textR: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'transparent',
    },

    textL: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'transparent',
    },

    
  profileButton:{
    flex: 1,
    height: 50,
    maxWidth: 50,
    marginHorizontal: 10,
    width: '100%',
    borderWidth: 3,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor:'black',
    
    
  },

  
  profileButtonImg:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    
    maxHeight: 50,
    
    
  },
  
  profileButtons:{
    backgroundColor: 'white',
    position: 'absolute',
    width: '100%',
    height: 80,
    top: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',

  },


    highButtonImg:{
        padding: 10,
        resizeMode: 'contain',
        height: 50,
        width: 50,
        borderWidth: 2,
        borderColor: "transparent",
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: 'white',
    
      },
    
      highlightedButton:{
        borderWidth: 3,
        borderColor: "green",
        shadowColor: 'gray',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.9,
        shadowRadius: 7,
        borderRadius: 100,
    
      },

      box1:{
        flex: 2,
        marginTop: '15%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        width: '80%',
        borderRadius: 20,
        backgroundColor: '#69A2B0',
        borderWidth: 0.5,
      },
    footer:{
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '5%',
        
    },

    image: {
        margin:'1%',
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        borderRadius: 20,

    },

    infoContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-around',
        flexDirection: 'column',
    },

    text: {
        color: '#000',
        fontSize: 20,
        marginLeft: '5%',
    },
    textC:{
      color:'blue',
      fontSize: 18,
      textAlign: 'left',
    },
    textReg:{
      color:'black',
      fontSize: 18,
      textAlign: 'right',
    },
    UserProfileText: {
        color: '#000',
        fontSize: 24,
    },
   
  
    centeredView: {
      flex: 8,
      alignItems: 'center',
      maxHeight: '100%',
      width: '100%',
      backgroundColor: 'transparent',      

    },
    modalBackCloser:{
      flex: 1,
      width: '100%',
      backgroundColor:'transparent',
    },
    modalView: {
      flex: 11,
      borderWidth: 1,
      height:'100%',
      width: '100%',
      backgroundColor: 'rgba(250,250,250,0.9)',
      margin: 20,
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
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

  scrollConti: {
   flex: 1,
   width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    },
  
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },

    

    
    });



export default UserProfile