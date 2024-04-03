import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import SplashScreen from './components/SplashScreen';
import entities from './entities';
import Physics from './physics';

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowSplash(false), 3000); // Display splash screen for 3000 milliseconds
  }, []);

  // Function to handle starting or restarting the game
  const handleStartGame = () => {
    setCurrentPoints(0);
    setRunning(true);
    setGameOver(false);
    gameEngine.swap(entities());
  };

  // Function to handle ending the game
  const handleGameOver = () => {
    setRunning(false);
    setGameOver(true);
    gameEngine.stop();
  };

  return (
    <>
      {showSplash ? (
        <ImageBackground source={require('./assets/dragonru.png')} style={{ flex: 1 }}>
          <SplashScreen onHide={() => setShowSplash(false)} />
        </ImageBackground>
      ) : (
        <ImageBackground source={require('./assets/floor.jpg')} style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20 }}>{currentPoints}</Text>
            <GameEngine
              ref={(ref) => { setGameEngine(ref); }}
              systems={[Physics]}
              entities={entities()}
              running={running}
              onEvent={(e) => {
                switch (e.type) {
                  case 'game_over':
                    handleGameOver();
                    break;
                  case 'new_point':
                    setCurrentPoints((prevPoints) => prevPoints + 1);
                    break;
                }
              }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            >
              <StatusBar style="auto" hidden={true} />
            </GameEngine>

            {!running && !gameOver ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
                  onPress={handleStartGame}
                >
                  <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
                    START
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {!running && gameOver ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
                  onPress={handleStartGame}
                >
                  <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
                    RESTART
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </ImageBackground>
      )}
    </>
  );
}
