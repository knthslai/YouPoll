import { Animated, StyleSheet } from 'react-native';
import { useState, useEffect, ReactNode } from 'react';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  }
});
export default ({ children }: { children: ReactNode }) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: false
        }),
        Animated.timing(animation, {
          toValue: 2,
          duration: 5000,
          useNativeDriver: false
        }),
        Animated.timing(animation, {
          toValue: 3,
          duration: 5000,
          useNativeDriver: false
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: false
        })
      ])
    ).start();
  }, []);

  const bgStyle = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1, 2, 3],
      outputRange: ['#ffa63d', '#ff3d77', '#338aff', '#3cf0c5']
    })
  };

  return (
    <Animated.View style={[styles.container, bgStyle]}>
      {children}
    </Animated.View>
  );
};
