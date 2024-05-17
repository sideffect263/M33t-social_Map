import { View, Text, Image, ScrollView, SafeAreaView, StyleSheet, StatusBar,useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Link,useLocalSearchParams, useGlobalSearchParams, router, useNavigation } from 'expo-router';



const msgs = [
    {
        _id: 1,
        text: 'Hello developer',
        createdAt: "2021-08-01T00:00:00Z",
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }
    },]

const userData:any=[
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
    {
        name: "John Doe",
        msgs:msgs
    },
]



const ContactsPage = ({route}: {route: any}) => {


    
    console.log("ContactsPage")

    const userJWT = route.params.userJWT;
    const token = route.params.token;


    const mapNavigation = useNavigation();
    const {height, width} = useWindowDimensions();

    
    const contactsPressed = () =>{
      console.log("contacts pressed")

    }

    const profilePressed = () => {
      console.log("profile PRESSED")

      mapNavigation.navigate('UserProfile',{userJWT: userJWT, token: token});
    }

    const mapPressed = () =>{
      console.log('map pressed')
      mapNavigation.navigate('Index',{userJWT: userJWT, token: token});

    }
  
    useEffect(() => {

      

        mapNavigation.setOptions({
  
          header : () => (
            <View style={styles.profileButtons}> 
             <TouchableOpacity onPress={profilePressed} style={styles.profileButton}>
            <View style={styles.profileButtonImg}>
            <Image source={require('../assets/icons/profile_image.png')} style={styles.highButtonImg}/>
            </View>
            </TouchableOpacity>
           
            <TouchableOpacity onPress={mapPressed} style={styles.profileButton}>
            <View style={[styles.profileButtonImg]}>
            <Image source={require('../assets/icons/map_icon.png')} style={styles.highButtonImg}/>
            </View>
            </TouchableOpacity>
             
              <TouchableOpacity onPress={contactsPressed} style={styles.profileButton}>
            <View style={[styles.profileButtonImg, styles.highlightedButton]}>
            <Image source={require('../assets/icons/conversation_icon.png')} style={styles.highButtonImg}/>
            </View>
            </TouchableOpacity>
            </View>
          ),
          
        });
      }
      , []);
  
  
const item = ({item, index}:{item:any, index:number}) => {
  return (
      <Image source={item.image} style={{width: 60, height: 60, borderRadius: 100, margin: 10, marginVertical:10}} />
  )
}



    
    
    

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
           
        </View>
        
      
    <ScrollView contentContainerStyle={styles.scrollViewConti} style={styles.scrollView}>

        {
            userData.map((user:any)=>{
                return (
                    <TouchableOpacity
                    key={user}
                    onPress={() => {
                        mapNavigation.navigate('components/ChatPage', { user: user })
                    }
                    }
                     style={styles.contactContilink}>

                        <View style={styles.contactConti}>

                        <Text style={styles.text}>{user.name}</Text>

                        </View>
                    </TouchableOpacity>
                )
            })
        }
    </ScrollView>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: (StatusBar.currentHeight ?? 0) * 2,
    flex: 1,
    backgroundColor: 'lightpink',
  },
  header:{
    width: "100%",
    height: 70,
    marginTop: "15%",
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    zIndex: 3,
    top: "9%",
  },
  scrollView: {
    marginTop: "38%",
    backgroundColor: 'lightpink',
    borderRadius: 10,
  },
  scrollViewConti:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    padding: 10,
    backgroundColor: 'lightpink',
  },
  text: {
    fontSize: 22,
    margin: 10,
    textAlign: 'left',
  },
  carouselConti:{
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    borderRadius: 100,

},
  contactContilink:{
    height: 50,
    width: '90%',
    display: 'flex',
    margin: 10,
    },
  contactConti:{
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
 
    },
    
  profileButton:{
    flex: 1,
    height: 50,
    maxWidth: 50,
    marginHorizontal: 10,
    width: '100%',
    borderWidth: 0,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    
    
  },

  
  profileButtonImg:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    
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

      friendCircle:{
        flex: 1,
        borderWidth: 1,
      },
    
      highlightedButton:{
        borderWidth: 3,
        borderColor: "lightgreen",
        shadowColor: 'gray',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.9,
        shadowRadius: 7,
        borderRadius: 100,
    
      },
    
})

export default ContactsPage