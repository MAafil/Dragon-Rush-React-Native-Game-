import React, { useEffect } from 'react';
import { Animated, ImageBackground, StyleSheet, Text, View } from 'react-native';

const SplashScreen = ({ onHide }) => {
  const opacity = new Animated.Value(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 2000, // Splash screen disappears after 2000 milliseconds
        useNativeDriver: true,
      }).start(() => {
        onHide && onHide(); // Callback to notify that the splash screen has been hidden
      });
    }, 1000); // Show splash screen for 1000 milliseconds

    return () => clearTimeout(timer); // Clear the timer on unmount
  }, []);

  return (
    <Animated.View style={{ opacity, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ImageBackground source={require('../assets/dragonru.png')} style={styles.background} resizeMode="cover">
        {/* <Text style={styles.text}>Dragon Rush</Text> */}
        {/* <View style={styles.footer}>
          <Text style={styles.footerText}>Game Developed by Mahammad Aafil</Text>
        </View> */}
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // text: {
  //   fontSize: 40,
  //   fontWeight: 'bold',
  //   color: 'white',
  //   textShadowColor: 'black',
  //   textShadowOffset: { width: 2, height: 2 },
  //   textShadowRadius: 5,
  //   marginBottom: 20, // Adjusted margin bottom for spacing
  // },
  // footer: {
  //   position: 'absolute',
  //   bottom: 20,
  //   width: '100%',
  //   alignItems: 'center',
  // },
  // footerText: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: 'white',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background to enhance visibility
  //   padding: 10, // Added padding for better readability
  // },
});

export default SplashScreen;
