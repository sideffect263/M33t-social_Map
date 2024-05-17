import React, { useState, useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';

const ExpandableComponent = () => {
  const [expanded, setExpanded] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(animationValue, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightAnimation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand}>
        <Text style={styles.header}>Click to Expand</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.content, { height: heightAnimation }]}>
        <Text>This is the expandable content.</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    overflow: 'hidden',
  },
});

export default ExpandableComponent;