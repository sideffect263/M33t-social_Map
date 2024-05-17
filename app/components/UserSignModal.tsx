import React, {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from 'expo-router';


const UserSignModal = ({props}: {props: any} ) => {

  const navigation = useNavigation();

  const isVisible = props.userSignModalIsVisible;
  const setIsVisible = props.setUserSignModalVisible;
  const setModalBackCloser = props.setModalBackCloser;
  const location = props.location;



  const signIn = () => {
    console.log("sign in");
    console.log(location);
    setIsVisible(false);
    setModalBackCloser(false);

  }

    const closeModal = () => {
      console.log("close");
      console.log(location);
      setIsVisible(false);
      
    }

    const wholeModal = () => {
      console.log("whole modal");
      setIsVisible(false);
    }
  return (
    
      <Modal
        animationType="slide"
        onLayout={()=>console.log("layout")}
        transparent={true}
        visible={isVisible}
        
        
        onRequestClose={() => { 
          Alert.alert('Modal has been closed.');
          setIsVisible(false);
        }}>



        <Pressable onPress={wholeModal} style={styles.centeredView}>{/*this is the container for the modal*/}
          <Pressable style={styles.modalView}>{/*this is the container for the modal*/}
           
            <View style={styles.modalContent}>
              <View style={styles.modal1}>
              <Text style={styles.modalText}>Not yet...</Text>
              <Image source={require('../../assets/icons/work-in-progress.png')} style={{width: 100, height: 100, resizeMode:'contain'}}/>
              <Text style={styles.modalText}></Text>
              <Text style={styles.modalText}>But be sure to check in again!</Text>
              </View>

              

              </View>

          </Pressable>
        </Pressable>
      </Modal>
      );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    
  },
  modalView: {
    width:'100%',
    
    height:'40%',

    margin: 0,
    backgroundColor: 'white',
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

  modalContent:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 50,
    padding: '5%',
  },

  modal1:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

    signInButton:{
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    minWidth: '80%',

  },


  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    top: -70,
    borderRadius: 100,
  },

  buttonCloseImage:{
    resizeMode: 'contain',
    width: 35,
    height: 35,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 25,
  },
  modalText: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default UserSignModal;