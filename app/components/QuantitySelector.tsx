import React, { useState } from 'react';
import { PanResponder, View, StyleSheet, GestureResponderEvent, PanResponderGestureState } from 'react-native';

interface Position {
  x: number;
  y: number;
}

const QuantitySelector = ({props}: {props: any}) => {

  const setCircleSize = props.setCircleSize;
  const [buttonSize, setButtonSize] = useState(50);
  const [buttonPosition, setButtonPosition] = useState<Position>({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState<Position>({ x: 100, y: 1000 });
  const [scale, setScale] = useState(1);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      setInitialPosition({ x: gestureState.x0, y: gestureState.y0 });
    },
    onPanResponderMove: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      console.log('gestureState', gestureState);
      const dx = gestureState.moveX;
      const dy = gestureState.moveY;
      const distance = Math.sqrt(((dx * dx + dy * dy)));
      console.log('distance', distance);
      const scaleFactor = -420 + distance   ; // Adjust this value to control the size increase/decrease rate
      console.log('scaleFactor', scaleFactor);
      setButtonSize(scaleFactor);
      setScale(((scaleFactor)/8)-5);
      let fValue = Math.min(Math.floor(scale), 25);
      fValue = Math.max(fValue, 1);
      setCircleSize(fValue);
      console.log('scaleFactor', scale);
      setButtonPosition({ x: gestureState.moveX, y: gestureState.moveY });
    },
    onPanResponderRelease: () => {
      setButtonPosition({ x: 100, y: 100 });
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.button,
          { width: scale<20 ? buttonSize: 200, height: scale<20 ? buttonSize: 200, transform: [] },
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: 'rgba(4, 150, 255,0.6)',
    borderRadius: 100,
  },
});

export default QuantitySelector;