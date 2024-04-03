import Matter from 'matter-js';
import React from 'react';
import { View, Image } from 'react-native';

const Dragon = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

    const xBody = props.body.position.x - widthBody / 2;
    const yBody = props.body.position.y - heightBody / 2;

    // Calculate the increased size
    const increasedWidth = widthBody * 1.2;
    const increasedHeight = heightBody * 1.2;

    return (
        <View style={{
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: increasedWidth, // Increase the width
            height: increasedHeight, // Increase the height
            overflow: 'hidden', // Ensure the image doesn't overflow its container
        }}>
            <Image
                source={require('../assets/dragon1.png')} // Adjust the path accordingly
                style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
            />
        </View>
    );
}

export default (world, color, pos, size) => {
    const initialDragon = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        { label: 'Dragon' }
    );
    Matter.World.add(world, initialDragon);

    return {
        body: initialDragon,
        color,
        pos,
        renderer: <Dragon />
    };
}
