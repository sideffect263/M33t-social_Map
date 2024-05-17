import React, {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image} from 'react-native';



const HelpModal = ({props}: {props: any} ) => {

  const setIsVisible = props.setHelpModalVisible;
  const isVisible = props.helpModalIsVisible;


    const closeModal = () => {
      console.log("close help modal");
      setIsVisible(false);
      
    }
  return (
    
      <Modal
        animationType="fade"
        onLayout={()=>console.log("layout")}
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsVisible(!isVisible);
        }}>



        <View style={styles.centeredView}>{/*this is the container for the modal*/}
          <View style={styles.modalView}>{/*this is the container for the modal*/}

          <View style={styles.block1}>
            </View>

            <View style={styles.block2}>
              <Text style={styles.textStyle}>welcome to M33t</Text>
              <Text style={styles.textStyle}>here you can meet or chat with new people in a safe manner</Text>
              <Text style={styles.textStyle}>this app is still in develpment stages</Text>
            </View>

            <View style={styles.block3}>
              <Text style={styles.textStyle}>you'r true location is never shown to the other users</Text>
              <Text style={styles.textStyle}>if you ever need any help just press the -i- icon again</Text>
            </View>
            <View style={styles.block4}>
              <Text style={styles.textStyle}>if you are logged in, you can add a new event</Text>
              </View>

            <Pressable 
              style={styles.block5}
              onPress={closeModal}>
                
            <Text style={styles.textStyle}>CLOSE</Text>  


            </Pressable>


          </View>
        </View>
      </Modal>
      );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height:'100%',
    width:'100%',
    top: 0,
    position: 'absolute', 
    backgroundColor:"rgba(0,0,0,0.65)",

    
  },
  modalView: {
    width:'100%',
    height:'100%',
    display: 'flex',

  },

  block1:{
    flex: 1.5,
    width: '100%',
  },
  block2:{
    flex: 8,
    width: '100%',
    justifyContent: 'space-around',
  },
  block3:{
    flex: 4,
    width: '80%',
    marginLeft: '5%',
    justifyContent: 'space-around',

  },
  block4:{
    flex: 2,
    width: '100%',
    justifyContent: 'center',
  },

  block5:{
    flex: 1,
    borderWidth: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,100,0.5)',
  },


  modalContent:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 1,
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
    borderRadius: 100,
    width: 50,  
    height: 50,
    marginTop: 100,
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
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default HelpModal;