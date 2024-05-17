import React, {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text,FlatList, Pressable, View} from 'react-native';



const ActivitiesModal = ({props}: {props: any} ) => {

  const isVisible = props.activitiesModalIsVisible;
  const setIsVisible = props.setActivitiesModal;
  const eventsData = props.eventsData;

    const closeModal = () => {
      console.log("close");
      setIsVisible(false);
      
    }
  return (
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsVisible(!isVisible);
        }}>
        <Pressable onPress={closeModal} style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>All events</Text>
            <View style={{flex:1,borderWidth:1,width:"100%"}}>
            <FlatList
              data={eventsData}
              renderItem={({item}) => (
                
                <View  style={{flex:1,flexDirection:'row',justifyContent:'space-around',borderWidth:1, }}>
                  <Text>{item.name}</Text>
                  <Text>{item.time}</Text>
                  <Text>{item.location}</Text>
                </View>
                
              )}
              keyExtractor={item => item.id}
            />
              </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
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
    height:'70%',

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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop:'4%',
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 24,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default ActivitiesModal;