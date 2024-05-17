import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput,FlatList, TouchableOpacity,useWindowDimensions,Modal,  StyleSheet, ImageBackground,ScrollView, SafeAreaView, StatusBar, Pressable, Alert } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';



const statusBarHeight =StatusBar.currentHeight

const activities = [
    {
        'id': 1,
        'name': 'sport',
        'image': require('../assets/icons/sports_icon.png')
    },
    {
        'id': 2,
        'name': 'music',
        'image': require('../assets/icons/music_icon.png')
    },
    {
        'id': 3,
        'name': 'food',
        'image': require('../assets/icons/food_icon.png')
    },
    {
        'id': 4,
        'name': 'art',
        'image': require('../assets/icons/art_icon.png')
    },
    {
        'id': 5,
        'name': 'dance',
        'image': require('../assets/icons/dance_icon.png')
    },
    {
        'id': 6,
        'name': 'nature',
        'image': require('../assets/icons/nature_icon.png')
    },
    {
        'id': 7,
        'name': 'entertainment',
        'image': require('../assets/icons/entertainment_icon.png')
    },
    {
        'id': 8,
        'name': 'travel',
        'image': require('../assets/icons/travel_icon.png')
    },
    {
        'id': 9,
        'name': 'education',
        'image': require('../assets/icons/education_icon.png')
    },
    {
        'id': 10,
        'name': 'social',
        'image': require('../assets/icons/social_icon.png')
    },
    {
        'id': 11,
        'name': 'relax',
        'image': require('../assets/icons/relax_icon.png')
    },
    {
        'id': 12,
        'name': 'work',
        'image': require('../assets/icons/work_icon.png')
    },
    {
        'id': 13,
        'name': 'shopping',
        'image': require('../assets/icons/shopping_icon.png')
    },
    {
        'id': 14,
        'name': 'party',
        'image': require('../assets/icons/party_icon.png')
    },
    {
        'id': 15,
        'name': 'other',
        'image': require('../assets/icons/other_icon.png')
    },
]

const singleToPairs = (arr1:any) => {
    console.log("start single to pairs")
    //takes an array of data and converts it into pairs of two
    let tempArray = []
   
        for(let i=0; i<arr1.length; i+=2){
            let tempDict:any = {}


            
            tempDict["item1"] = arr1[i];
            if(i+1 >= arr1.length){
                break;
            }
            tempDict["item2"] = arr1[i+1];
            tempArray.push(tempDict);
        }

        return tempArray;
    }

    const activitiesInPairs = singleToPairs(activities)



const CreateEventPage = ({route}: {route: any},{navigation}:{navigation:any}) => {
    

    const token = route.params.token;
    const params = route.params;


    
    
    
    

    const mapNavigation = useNavigation();





    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const {height, width} = useWindowDimensions();
    const [selectedEmote, setSelectedEmote] = useState<any>(null);
    const [selectedActivity, setSelectedActivity] = useState<any>(null);
    const [eventName , setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventLocation, setEventLocation] = useState('Choose Location');
    const [modalVisible, setModalVisible] = useState(false);
    const mapRef = useRef<any>();
    const [tempLocation, setTempLocation] = useState<any>(null);
    const [eventCords, setEventCords] = useState<any>(null);
    const [eventAddress, setEventAddress] = useState('');
    const [modalBackCloser, setModalBackCloser] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [initialRegion, setInitialRegion] = useState<any>({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });


    useEffect(() => {
        console.log('create event Screen');

        mapNavigation.setOptions({
            headerShown: false,
        });

        if(route.params){
            console.log('route params');
            let tempParams = route.params;
            console.log(tempParams);
            if(tempParams.userName){
                console.log('username set');
                console.log(tempParams.userName);
                setUsername(tempParams.userName);   
                console.log('userId set');
                console.log(tempParams.userId);
                setUserId(tempParams.userId);
                
            }
            if(tempParams.location){
                console.log('location set');
                console.log(tempParams.location); 
                setInitialRegion(
                    {
                        latitude: tempParams.location.latitude,
                        longitude: tempParams.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                     
                    }
                );
            }
        }
        

    }, []);

    const backPressed = () => {
        console.log('Back Pressed');
        mapNavigation.navigate('Index');
    }

    const nextScreen = () => {
        console.log("next screen")
        console.log(username);
        console.log(userId);
        console.log(token);
        if(!eventCords)
            {
                console.log('no location');
                Alert.alert('No location selected', 'Please select a location for the event');
            }
            if(!selectedActivity)
            {
                console.log('no activity');
                Alert.alert('No activity selected', 'Please select an activity');
            }
            else addEvent();

    }

    const addEvent = () => {
        console.log('add event');
        axios.post('https://m33t.app/events/create', {
            name:eventName,
            time: "temp time",
            location: "temp location",
            lat: eventCords.latitude,
            alt: eventCords.longitude,
            address: "temp address",
            tag:selectedActivity
    }, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'user_id':userId,
             
        }
    }).then((response) => {
        console.log(response);
        mapNavigation.navigate('Index');
    }
    ).catch((error) => {
        console.log(error.response.data);
    });
    }

    

    const chooseLocationPressed = () => {
        console.log('choose location pressed');
        setModalVisible(true);

    }

    const activityPressed = (activity:any) => {
        console.log('activity pressed');
        setSelectedActivity(activity);
    }

      
    return (

        <SafeAreaView style={styles.main}>

            
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>

                    <Pressable style={styles.modalBackcloserConti} onPress={() => setModalVisible(!modalVisible)}>
                        <Pressable  style={styles.modalConti}>
                            <MapView
                                style={{width: '100%', height: '100%'}}
                                initialRegion={initialRegion}
                                region={eventCords}
                                ref={mapRef}
                                maxZoomLevel={15}

                                onPress={
                                    (event) => {
                                        console.log(event.nativeEvent.coordinate);
                                        setEventCords(event.nativeEvent.coordinate);
                                        setTempLocation(event.nativeEvent.coordinate);
                                        mapRef.current.animateToRegion({
                                            latitude: event.nativeEvent.coordinate.latitude,
                                            longitude: event.nativeEvent.coordinate.longitude,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }, 2000);
                                    }
                                }
                            >
                                {tempLocation && (
                                    <Marker
                                    coordinate={tempLocation}
                                    title={"Event Location"}
                                    description={"Event Location"}
                                    />
                                )}
                            </MapView>
                            <View style={styles.streetSearch}>
                                <GooglePlacesAutocomplete
                                    placeholder='Search'
                                    minLength={2} // minimum length of text to search
                                    onFail={error => console.error(error)}
                                    styles={
                                        {
                                            container: {
                                                flex: 1,
                                              },
                                              textInputContainer: {
                                                flexDirection: 'row',
                                              },
                                              textInput: {
                                                backgroundColor: '#FFFFFF',
                                                height: 44,
                                                borderRadius: 5,
                                                paddingVertical: 5,
                                                paddingHorizontal: 10,
                                                fontSize: 15,
                                                flex: 1,
                                              },
                                              poweredContainer: {
                                                justifyContent: 'flex-end',
                                                alignItems: 'center',
                                                borderBottomRightRadius: 5,
                                                borderBottomLeftRadius: 5,
                                                borderColor: '#c8c7cc',
                                                borderTopWidth: 0.5,
                                              },
                                              powered: {},
                                              listView: {},
                                              row: {
                                                backgroundColor: '#FFFFFF',
                                                padding: 13,
                                                height: 44,
                                                flexDirection: 'row',
                                              },
                                              separator: {
                                                height: 0.5,
                                                backgroundColor: '#c8c7cc',
                                              },
                                              description: {},
                                              loader: {
                                                flexDirection: 'row',
                                                justifyContent: 'flex-end',
                                                height: 20,
                                              },


                                            
                                        }
                                    }
                                    
                                    fetchDetails={true}
                                    onPress={(data, details = null) => {
                                        // 'details' is provided when fetchDetails = true
                                        console.log(data, details);
                                        setEventLocation(data.description);
                                        mapRef.current.animateToRegion({
                                            latitude: details.geometry.location.lat,
                                            longitude: details.geometry.location.lng,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }, 2000);
                                        
                                        
                                    }}
                                    query={{
                                        key: 'AIzaSyAhhCqKwjy2YKGjrZ3r40vIMNa6E_X6m_4',
                                        language: 'en',
                                        components: 'country:il',
                                    }}
                                />
                                
                                </View>
                        </Pressable>

                        </Pressable>


                </Modal>

              <View style={styles.header}>
                    <TouchableOpacity onPress={backPressed} style={styles.backButton}>
                        <Text style={styles.headerText}>חזור</Text>
                        </TouchableOpacity>
                </View>

                <View style={styles.body}>

                    <View style={styles.navSlider}>

                        <View style={styles.navBox1}>

                            </View>
                        <View style={styles.navBox2}>

                            </View>
                        <View style={styles.navBox2}>

                            </View>

                    </View>

                    <View style={styles.helloConti}>

                        <Text style={styles.helloText}>Hey  {params.userJWT.name}</Text>
                        <Text style={styles.helloText}>What activity are you up for?</Text>

                        </View>

                        <View style={styles.moodImgSelectorConti}>
                          
                                <FlatList
                                    data={activitiesInPairs}
                                    renderItem={({item}) => (
                                        <View style={styles.itemsHolder}>
                                            <TouchableOpacity style={styles.item} onPress={()=> activityPressed(item.item1)}>
                                                <ImageBackground source={item.item1.image} style={styles.image} />
                                                <Text>{item.item1.name}</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={()=> activityPressed(item.item2)} style={styles.item}>
                                                <ImageBackground source={item.item2.image} style={styles.image} />
                                                <Text>{item.item2.name}</Text>
                                            </TouchableOpacity>

                                            </View>
                                    )}
                                    keyExtractor={(item) => item.item1.id}
                                    horizontal={true}
                                />
                            
                          
                        </View>

                        <View style={styles.eventSetting}>
                            <View style={styles.eventName}>
                                <TextInput style={styles.textInputStyle} value={eventName} onChangeText={setEventName} placeholder='Event name' />
                                </View>
                                <Text>When and where</Text>

                                <View style={styles.eventWandW}>
                                    <View style={styles.datePicker}>
                                        
                                        
                                        </View>
                                        <View style={styles.locationPicker}>
                                            <Pressable onPress={chooseLocationPressed} style={styles.imageBlock}>
                                                <ImageBackground source={require('../assets/icons/location_check_icon.png')} style={styles.image} />
                                                <Text>{eventLocation}</Text>
                                            </Pressable>
                                            </View>
                                    </View>
                                </View>

                        <View style={styles.moodButtons}>

                            <TouchableOpacity onPress={()=> nextScreen()} style={styles.skipButton}>
                                <Text style={styles.whiteText}>דלג</Text>
                            </TouchableOpacity>

                            <Pressable onPress={()=> nextScreen()} style={styles.nextButton}>
                                <Text style={styles.blackText}>הבא</Text>
                                </Pressable>

                            </View>

                </View>

            </SafeAreaView>
  
    );
};


const vari=1
const styles = StyleSheet.create({
  
        main:{
            flex:1,
            backgroundColor:'#B3B5BB'
        },

        modalBackcloserConti:{
            flex: 1,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },

        modalConti:{
            height: '50%',
            width: '80%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: 40,
            marginHorizontal: 10,
        },

        streetSearch:{
            width: '100%',
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 0,
        },

        itemsHolder:{
            flex: 1,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'column',
            borderColor:'white',
            backgroundColor: 'transparent',
            borderRadius: 40,
            marginHorizontal: 10,
        },

        
        item:{
            width:100,
            height:80,
            backgroundColor: 'white',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
           
        
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
            backgroundColor: 'transparent',
            borderRadius: 40,
            top: 0,
            
            
        },

        headerText:{
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 10,
            height: 50,
            width: 100,
        },

        backButton:{
            height: 50,
            width: 100,
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            marginLeft: '10%',
            borderRadius: 40,
            backgroundColor: 'transparent',
        },

        conditionalHighlight:{
            shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,
              elevation: 7,
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

        navBox1:{
            flex: 1,

            borderWidth: 2,
            backgroundColor: 'white',
            borderColor: 'white',
            marginHorizontal: 10,
            borderRadius: 40,

        },

        navBox2:{
            borderRadius: 40,
            flex: 1,
            marginHorizontal: 10,
            borderWidth: 2,
            backgroundColor: 'gray',
            borderColor: 'gray',
        },

        helloConti:{
            flex: 2,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderColor:'white',
            backgroundColor: 'transparent',
            borderRadius: 40,
        },

        helloText:{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#000100',
        },

        carouselConti:{
    
        },

        moodImgSelectorConti:{
            flex: 5,
            borderWidth: 2,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderColor:'white',
            backgroundColor: 'transparent',
        },

        skipButton:{
            flex: 1,
            width: '75%',
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            borderRadius: 40,
            marginVertical: 15,
            backgroundColor: 'black',
            borderColor: 'white',
        },

        nextButton:{
            flex: 1,
            width: '75%',
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            borderRadius: 40,
            marginVertical: 15,
            backgroundColor: 'white',
        },

        image:{
            resizeMode: 'contain',
            width: 60,
            height: 60,
        },

        eventSetting:{
            flex: 5,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderColor:'white',
            backgroundColor: 'transparent',
            borderRadius: 40,
            top: 0,
            borderWidth: 2,
        },

        eventName:{
            flex: 2,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderColor:'white',
            backgroundColor: 'transparent',
            borderRadius: 40,
            top: 0,
        },

        textInputStyle:{
            height: 40,
            width: '80%',
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderRadius: 40,
            borderColor: 'black',
            backgroundColor: 'white',
            fontSize: 18,
            textAlign: 'center',
        },

        eventWandW:{
            flex: 2,
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
            borderWidth: 2,
        },

        datePicker:{
            flex: 1,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderColor:'white',
            backgroundColor: 'transparent',
            borderRadius: 40,
            top: 0,
        },

        locationPicker:{
            flex: 1,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderColor:'white',
            backgroundColor: 'transparent',
            borderRadius: 40,
            top: 0,
        },

        imageBlock:{
            flex: 1,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderColor:'white',
            backgroundColor: 'transparent',
            borderRadius: 40,
            top: 0,
        },


        moodButtons:{
            flex: 3,
            width: '100%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            borderColor:'white',
            backgroundColor: 'transparent',
            borderRadius: 40,
            top: 0,
        },

        blackText:{
            fontSize: 24,
            fontWeight: 'bold',
            color: 'black',
        },

        whiteText:{
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
        },
});



export default CreateEventPage;
