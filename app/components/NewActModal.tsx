import React, {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Image} from 'react-native';



const NewActModal = ({props}: {props: any} ) => {

  const isVisible = props.newActModalIsVisible;
  const setIsVisible = props.setNewActModalVisible;


    const closeModal = () => {
      console.log("close");
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
          setIsVisible(!isVisible);
        }}>



        <View style={styles.centeredView}>{/*this is the container for the modal*/}
          <View style={styles.modalView}>{/*this is the container for the modal*/}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}>
                
             <Image 
              source={require('../../assets/icons/close_icon.png')}
              style={styles.buttonCloseImage}
              />
              


            </Pressable>

            <View style={styles.modalContent}>

              

              </View>

          </View>
        </View>
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
    
    height:'30%',

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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default NewActModal;