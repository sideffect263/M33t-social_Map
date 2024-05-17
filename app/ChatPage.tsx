import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { Link,useLocalSearchParams, useGlobalSearchParams, router, useNavigation } from 'expo-router';
import axios from 'axios';


let msgPath= 'https://1kmxtph7-5000.euw.devtunnels.ms/messages/'
let tempmsg={
  _id:1,
  text: 'Hello developer',
  createdAt: new Date(),
  user: {
    _id: 2,
    name: 'React Native',
    avatar: 'https://placeimg.com/140/140/any',
  },
}

const ChatPage = () => {

    console.log("ChatPage")
    const [messages, setMessages] = useState<any>([])


    const getMessages = async () => {
        console.log("getMessages")
        try {
          axios.get(msgPath).then((response) => {
            console.log("res")
            console.log(response.data)
            setMessages((previousMessages: any | any) =>
            GiftedChat.append(previousMessages, messages),
          )
          })
        } catch (error) {
          console.error(error)

        }
      }

      const sendMessages = async () => {
        console.log("setMessages")
        try {
          axios.post('https://backend-scne.onrender.com/messages/4/5?message=asdsad',{
            message:'hello'
          }).then((response) => {
            console.log("res")
            console.log(response.data)
          })
        } catch (error) {
          console.error(error)

        }
      }


    useEffect(() => {
        console.log("useEffect")
        console.log(messages)
        getMessages()
        


    
    }, [])
    
  
    const onSend = useCallback((messages:IMessage[] = []) => {
        console.log("onSend")
        console.log(messages)
        sendMessages()
      setMessages((previousMessages: any | any) =>
        GiftedChat.append(previousMessages, messages),
      )
    }, [])


    const params = useLocalSearchParams();
    console.log(params)

  


  return (
    <View style={styles.mainConti}>
    <Text>Chat Page</Text>
     <View style={styles.chatConti}>
        
      <GiftedChat
      
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />


    </View>
    </View>
  )

}

const styles = StyleSheet.create({
  mainConti: {
    top: -200,
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chatConti:{
    flex: 1,
    height: '70%',
    width: '70%',
    backgroundColor: 'white',
  },
})



export default ChatPage