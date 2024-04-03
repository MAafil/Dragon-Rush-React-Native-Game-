import Matter from 'matter-js';
import React from 'react';
import { ImageBackground, View } from 'react-native';

const Obstacle = ({ body, color }) => {
    const { position, bounds } = body;
    const width = bounds.max.x - bounds.min.x;
    const height = bounds.max.y - bounds.min.y;

    return (
        <View style={{
            position: 'absolute',
            left: position.x - width / 2,
            top: position.y - height / 2,
            width: width,
            height: height,
        }}>
            <ImageBackground 
                source={require('../assets/obstacle.png')} 
                style={{ width: '100%', height: '100%' }}
                //resizeMode="stretch" 
                resizeMode="cover" 
            >
            </ImageBackground>
        </View>
    );
};

export default (world, label, color, pos, size) => {
    const initialObstacle = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label,
            isStatic: true,
        }
    );
    Matter.World.add(world, initialObstacle);

    return {
        body: initialObstacle,
        color,
        pos,
        renderer: <Obstacle />,
    };
};
