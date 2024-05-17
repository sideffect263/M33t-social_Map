import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions, Pressable, Alert, StatusBar, Platform } from 'react-native';
import React, {useRef, useEffect, useState, useCallback, useContext} from 'react';
import MapView,{Marker, Callout} from 'react-native-maps';
import * as Location from 'expo-location';
import { Link, router, useNavigation } from 'expo-router';
import { Route } from 'expo-router/build/Route';
import { useRoute } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ActivitiesModal from './components/ActivitiesModal';
import NewActModal from './components/NewActModal';
import UserSignModal from './components/UserSignModal';
import HelpModal from './components/HelpModal';





let params:any;
var temparray:any = [];


const statusBarHeight =StatusBar.currentHeight





const Index = () => {//main function


    // variables for index page


  const route = useRoute();//get the route


   if(route.params){//if there are params in the route, set the params to the params variable
    params = route.params
  }

  const navigation = useNavigation();

  const mapRef = useRef<any>();//reference to the map
  const [token, setToken] = useState(-1);//token for user login
  
  const [region, setRegion] = useState({//sets the initial region of the map
    latitude: 32.055931,
    longitude: 34.759475,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [location, setLocation] = useState<any>();//location of the user
  const [errorMsg, setErrorMsg] = useState<string>("");//error message for location
  const[loading, setLoading] = useState(true);//loading screen
  const [userJWT, setUserJWT] = useState();//jwt for user
  const [JWTtoken, setJWTtoken] = useState<string>();//jwt token for user
  const [eventLocations, setEventLocations] = useState<any>();//locations of the events
  const [miniLocations, setMiniLocations] = useState<any>();//locations of the users
  const [activitiesModalIsVisible, setActivitiesModalIsVisible] = useState(false);
  const [newActModalIsVisible, setNewActModalVisible] = useState(false);
  const [userSignModalIsVisible, setUserSignModalVisible] = useState(false);
  const [modalBackCloser, setModalBackCloser] = useState(false);
  const [helpModalIsVisible, setHelpModalVisible] = useState(false);
  const [photoRes, setPhotoRes] = useState('');



  const props = {
    activitiesModalIsVisible: activitiesModalIsVisible,
    setActivitiesModal: setActivitiesModalIsVisible,
    newActModalIsVisible: newActModalIsVisible,
    setNewActModalVisible: setNewActModalVisible,
    userSignModalIsVisible:userSignModalIsVisible,
    setUserSignModalVisible:setUserSignModalVisible,
    helpModalIsVisible: helpModalIsVisible,
    setHelpModalVisible: setHelpModalVisible,
    userToken:JWTtoken,
    setUserToken: setJWTtoken,
    userLocation: location,
    eventsData: eventLocations,
    
  }

  // functions for index page

  const getLocation = async () => {//function to get location of the user
    console.log("get location")
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setRegion({//sets the initial region of the map to the location of the user
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setLoading(false)//stops the loading gif
    console.log(location)
  }

  
  const deleteToken = async () => {//function to delete the token
    console.log("delete token");
    
    try {
        await AsyncStorage.removeItem('meetUpToken').then(() => {
        console.log('token deleted')
        });
    } catch (error) {
        // Error saving data
        console.log(error);
    }
}

  const moodSetPressed = () => {//function for mood button
    console.log("mood button pressed")
    setUserSignModalVisible(true)
  }

  const activitiesPressed = () => {//function for activities button
    console.log("activities button pressed")
    setActivitiesModalIsVisible(true)
  }

  const addNewEvent = () => {//function for add new event button
    console.log("add new event button pressed")
    if(JWTtoken){
      navigation.navigate('CreateEventPage', {userJWT: userJWT, token: JWTtoken})
  }else{
    Alert.alert(
      "Hello user!",
      "You need to login to use this feature!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => navigation.navigate("Login"), style: "default"}
      ],
    );
  }
}

  
  const checkToken = async () => {//function to check if there is a token
    console.log("check token")
    try{
      const value = await AsyncStorage.getItem('meetUpToken')
      if (value !== null){
        setJWTtoken(value)
        console.log("there is a token")
        navigation.setParams({token: value})
        console.log(route.params)

        setToken(1)

        console.log("get user jwt")
        axios.get('https://m33t.app/users/get_user_jwt', {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + value,
          }
        }).then((response) => {
          console.log("response of jwt user in check token")
          if(response.data.msg=="not found"||response.data.msg=="Token has expired"||response.data.msg=="error with jwt authentication"){
            console.log("user not found")
            deleteToken()
            setToken(-1)
            setJWTtoken(undefined)
          }else{
           
          console.log(response.data)
          setUserJWT(response.data) 
          }
        }).catch((error) => {
          console.log("error with jwt authentication")
          console.log(error.response.data)
          deleteToken()
          navigation.setParams({token: "reset"})
          setToken(-1)
          setJWTtoken(undefined)

          
        }
        )
      }
    else{
         console.log("there is no token")
         setToken(0)

      }
    }catch(error){
      console.log("there was a problem with token aquiiring")
      console.log(error)
      deleteToken()
      navigation.setParams({token: "reset"})
      setToken(-1)
      setJWTtoken(undefined)

    }

    console.log("end check token")
  
  }

  const animateCamera = () => {//function to animate the camera to user location
    mapRef.current.animateToRegion({//if this is not the first render and the user its location, the map will animate to the user's location
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  }

  const getAllEventsLocations = async () => {
    console.log("get all events locations")
    axios.get('https://m33t.app/events/get_all', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + params.token,
        }
      }).then((response) => {
      console.log("event location response")
      setEventLocations(response.data)

      }
    ).catch((error) => {
      console.log("error reciving event locations")
      console.log(error.data)
    }
    )


  }

  const findeMeClicked = () => {//function for find me button
    console.log("find me button pressed")
    animateCamera()

  }

  const infoPressed = () => {//function for infoPressed button
    setHelpModalVisible(true)
    setModalBackCloser(true)
    console.log("info button pressed")
    console.log(userJWT)
    console.log(location)
    console.log(JWTtoken)
    
  }

  const userMsgPressed = () => {//function for user message button
    console.log("user message button pressed")
  }

  const EventCallOutPressed = (location:any) => {//function for callout button
    console.log("event callout button pressed")
    console.log(location)

    
  }

  const userCallOutPressed = (location:any) => {//function for callout button
    console.log("user callout button pressed")
    console.log(location)

    if(JWTtoken){
      navigation.navigate('UserProfilePressed', {userJWT: userJWT, token: JWTtoken, location: location})
    }
  }

  const loginPressed = () => {//function for login button
    console.log("login button pressed")

    Alert.alert(
      "Hello user!",
      "You need to login to use this feature!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => navigation.navigate("Login"), style: "default"}
      ],
    );
  }

  const profilePressed = () => {//function for profile button
    console.log("profile button pressed")
    if(userJWT){
      console.log("user jwt is true")
      console.log(userJWT)
    navigation.navigate('UserProfile', {userJWT: userJWT, token: params.token})
    }else{
      Alert.alert(
        "Hello user!",
        "You need to login to use this feature!",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => navigation.navigate("Login"), style: "default"}
        ],
      );

    }
  }

  const mapPressed = () => {//function for map button
    console.log("map button pressed")

  }

  const contactsPressed = () => {//function for contacts button
    console.log("contacts button pressed")
    if(JWTtoken){
      navigation.navigate('ContactsPage', {userJWT: userJWT, token: JWTtoken})
    }
  }

  const markerPressed = (location:any) => {
    console.log("marker pressed");
    console.log(location);
   
  }

  const sendRequests = async () => {
    console.log("send requests")
    await getAllEventsLocations()
    await getAllUserLocation()
  }

  
const sendUserLocation = async () =>{
  console.log("send user location")
  console.log(location)

  if(location)
  axios.post('https://m33t.app/users/update_user_location', {
    lat: (location.coords.latitude),
    alt: (location.coords.longitude),
  },
  {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + params.token,
      }
    }).then((response) => {
    console.log("response - user location sent to server")
    console.log(response.data)
  }
  ).catch((error) => {
    console.log("error in sending user location to server")
    console.log(error.response.data)
  })
}

  const getAllUserLocation = async () =>{
    console.log("get all user location")

    
    if(token) axios.get('https://m33t.app/users/get_all_locations', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + params.token,
        }

      }).then((response) => {
      console.log("all user locations response")
      //transfer dictionary to array
      temparray = []
      for(let key in response.data){
        response.data[key].push(key)
        temparray.push(response.data[key])
      }
      

      setMiniLocations(temparray)
      }
    ).catch((error) => {
      console.log("error in getting all user locations")
      console.log(error.response.data)
      if(error.response.data.msg == "Token has expired"){
        deleteToken()
        setToken(-1)
        setJWTtoken(undefined)
      }
    }
    )
    
}

  //all effect functions for index page

  useEffect(() => {//effect for location, happens when the page is loaded

    console.log("use effect on load - get location - check")
    getLocation();
    const interval = setInterval(() => {
      getLocation();
      if(JWTtoken){
       sendUserLocation()
      }
    }, 180000); // 3 minutes in milliseconds
    return () => {
      clearInterval(interval);
    };
  }, [])

  useEffect (() => {//effect whenever the route changes
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("use effect on route change")
      console.log(params)
      console.log(userJWT)
      //is user logged in?
    
      if(params|| userJWT){
        if(params.token || userJWT){
          if(params.token=="reset"||userJWT=="reset"){
            console.log("login needed")
            setJWTtoken(undefined)
          }else{
          console.log("token is true")
          if(params.userJWT){
            setUserJWT(params.userJWT)
          }else
          if(!userJWT){//if there is no user jwt, get it
            console.log("get user jwt")
            console.log(params.token)
            console.log(token)
            setJWTtoken(params.token)
            
             axios.get('https://m33t.app/users/get_user_jwt', {
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': 'Bearer ' + params.token,
              }
            }).then((response) => {
              console.log("response of jwt user in route change")
              console.log(response.data)
              if(response.data.msg=="not found"){
                console.log("user not found")
                deleteToken()
                setToken(-1)
                setJWTtoken(undefined)
              }else{
                setUserJWT(response.data)
                setToken(1)
  
  
                console.log("before nerwork request")
                console.log(JWTtoken)
                sendRequests()
  
              }
              

            }).catch((error) => {
              console.log("error with jwt authentication on route change")
              console.log(error.response)
              deleteToken()
              setToken(-1)
              setJWTtoken(undefined)
            }
            
            )

          }
       
        }
          setToken(1)
        }


      }else{
        console.log("no params, maybe there is a token")
        console.log(token)
        if(token == -1)
        checkToken();
      }

      if(params)
      if(params.userJWT)
      if(params.token=="reset"||params.token==undefined){
        console.log("login needed")
        setJWTtoken(undefined)
      }else{
        console.log("before nerwork request on regular")
        console.log(JWTtoken)

        sendRequests()
      }
     

      if(params)
        if(params.token){
          console.log(params.token)
          if(params.token =="reset"){
            console.log("reset token")
            deleteToken()
            setToken(0)
            setUserJWT(undefined)
          }
        }

    

    });
    return unsubscribe;
  }

  , [navigation])

  useEffect(() => {//effect for the jwt user
    console.log("use effect on jwt user")
    console.log(userJWT)
    if(userJWT){
      setPhotoRes("https://m33t.app/users/"+userJWT._id+"/photo")
    }
  }
  ,[userJWT])

   

  

//if the loading is true, return the loading screen
  if(loading){
    return(
      <View style={{height:"100%",width:"100%"}}>
        <Image source={require('../assets/gif/town_loading_gif.gif')} style={{height: "100%", width: "100%"}}/>
      </View>
    )
  }



  return (
    <View style={styles.conti}>
      <HelpModal props = {props}/>
      <ActivitiesModal props = {props}/>
      <NewActModal props = {props}/>
      <UserSignModal props = {props}/>
      <MapView
        style={styles.map}
        initialRegion={region}
        ref={mapRef}
        
      >

              {eventLocations &&
            eventLocations.map((location: any) => (
              typeof(location.lat) == "number" && typeof(location.alt) == "number" && location.name && typeof(location.tag) == "object" &&
              <Marker
                coordinate={{ latitude: location.lat, longitude: location.alt }}
                title={location.name}
                description={"description"}
                onPress={() => {
                  console.log("marker pressed");
        
                }}

                
                key={location._id}
                                
              >
                <Image source={location.tag.image} style={styles.markerImg} />
                <Callout onPress={() => EventCallOutPressed(Location)} style={styles.eventCallOutConti}>
                    <Text style={styles.callOutText}>{location.name}</Text>
                </Callout>
              </Marker>
            ))
          }

             {miniLocations &&
            miniLocations.map((location: any) => (
              typeof(location[0][0]) == "number" && typeof(location[0][1]) == "number" && location[2] &&
              <Marker
                coordinate={{ latitude: location[0][0], longitude: location[0][1] }}
                title={location[2]}
                description={"description"}
                onPress={()=>markerPressed(location)}
                key={location[2]}
                
              >
                <Image source={require('../assets/icons/man_icon.png')} style={styles.markerImg} />
                <Callout onPress={() => userCallOutPressed(location)} style={styles.userCallOutConti}>
                  <Text style={styles.imgText}>
                  <Image source={{uri:"https://m33t.app/users/"+location[1]+"/photo"}} style={styles.markerImg} />
                  </Text>
                    <Text style={styles.callOutText}>{location[2]}</Text>
                    <Pressable onPress={() => userMsgPressed()}>
                      <Text style={styles.imgText}>
                      <Image source={require("../assets/icons/conversation_icon.png")} style={styles.markerImg} />
                      </Text>
                    </Pressable>
                </Callout>
              </Marker>
            ))}




      </MapView>

      <View style={styles.lowerButtons}>

      <TouchableOpacity onPress={moodSetPressed} style={styles.lowerButton}>
          <View style={styles.lowerButtonImg}>
            <Image source={require('../assets/icons/mood_icon.png')} style={styles.imgContainer} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={addNewEvent} style={[styles.lowerButton, styles.lowerButtonMid]}>
          <View style={styles.lowerButtonImg}>
            <Image source={require('../assets/icons/plus_icon.png')} style={styles.imgContainer} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={activitiesPressed} style={styles.lowerButton}>
          <View style={styles.lowerButtonImg}>
            <Image source={require('../assets/icons/activity_icon.png')} style={styles.imgContainer} />
          </View>
        </TouchableOpacity>

      </View>

        <TouchableOpacity onPress={findeMeClicked} style={styles.locationIcon}>
          <View style={styles.sideButtonsButtonImg}>
            <Image source={require('../assets/icons/location_icon.png')} style={styles.sideButtonImg} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={infoPressed} style={styles.infoIcon}>
          <View style={styles.sideButtonsButtonImg}>
            <Image source={require('../assets/icons/info_icon.png')} style={styles.sideButtonImg} />
          </View>
        </TouchableOpacity>


        <View style={styles.profileButtons}> 
          {token!=1 &&
            <TouchableOpacity 
            onPress={() => loginPressed()}
             style={styles.profileButton}>

            <View style={styles.profileButtonImg}>
            <Image source={require('../assets/icons/profile_image.png')} style={styles.highButtonImg}/>
            </View>
            </TouchableOpacity>
          }
          {token==1 &&
            <TouchableOpacity onPress={profilePressed} style={styles.profileButton}>
            <View style={styles.profileButtonImg}>
            <Image source={{uri:photoRes}} style={styles.highButtonImg}/>
            </View>
            </TouchableOpacity>
          }
            <TouchableOpacity onPress={mapPressed} style={styles.profileButton}>
            <View style={[styles.profileButtonImg, styles.highlightedButton]}>
            <Image source={require('../assets/icons/map_icon.png')} style={styles.highButtonImg}/>
            </View>
            </TouchableOpacity>
           
           <TouchableOpacity onPress={contactsPressed} style={styles.profileButton}>
            <View style={styles.profileButtonImg}>
            <Image source={require('../assets/icons/conversation_icon.png')} style={styles.highButtonImg}/>
            </View>
            </TouchableOpacity>
          </View>



    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },

  conti:{
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },

  eventCallOutConti:{
    width: 150,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    borderColor: 'black',
    
  },

  userCallOutConti:{
    width: 240,
    height: 55,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  callOutText:{
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },

  lowerButtons:{
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    width: '95%',
    height: 80,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 1,
    bottom: "5%",
    alignSelf: 'center',
  
  },

  sideButtonImg:{
    resizeMode: 'contain',
    height: 50,
    width: 50,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: 'white',
  },

  imgContainer:{
    resizeMode: 'contain',
    height: 50,
    width: 50,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lowerButtonImg:{ 
    borderWidth: 1,
    flex: 1,
    maxWidth:60,
    minWidth: 60,
    maxHeight: 60,
    minHeight: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C5D9E2',
    opacity: 1,
    //make some shadow
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 7,
  },

  lowerButtonMid:{
    top: -30,
  },

  markerImg:{
    
    resizeMode: 'contain',
    height: 40,
    width: 40,
    zIndex: 4,    
    borderRadius: 100,
  },

  imgText:{

    ...Platform.select({
      ios:{},
      android:{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: 60,
      },
    }),

   
  },

  lowerButton:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  locationIcon:{
    position: 'absolute',
    bottom: "34%",
    right: 10,
    width: 65,
    height: 65,
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    zIndex: 1,
  },

  infoIcon:{
    position: 'absolute',
    bottom: "22%",
    right: 10,
    width: 65,
    height: 65,
    borderRadius: 40,
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    zIndex: 1,
  },

  
  sideButtonsButton:{
    top: 0, // adjust as needed
    left: 0, // adjust as needed
    height: '100%',
    width: '80%',
    marginVertical: 15,
    borderRadius: 30,
    },
  
    sideButtonsButtonImg:{
      resizeMode: 'contain',
      height: '100%',
      width: '100%',
  
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
    profileButton:{
      flex: 1,
      height: 50,
      maxWidth: 50,
      marginHorizontal: 10,
      width: '100%',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      
      
    },
  
    highButtonImg:{
      resizeMode: 'contain',
      height: 50,
      width: 50,
      borderColor: "transparent",
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      backgroundColor: 'white',
  
    },
  
    highlightedButton:{
      borderWidth: 4,
      borderRadius: 100,
  
      borderColor: "lightgreen",
      shadowColor: 'gray',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.9,
      shadowRadius: 7,
  
    },
  
    profileButtonImg:{
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      flex: 1,
      
    },
  


});

export default Index