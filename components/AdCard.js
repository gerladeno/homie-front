
import React, { Component } from 'react';
import { Colors, View, Card, CardProps, Button, Text } from 'react-native-ui-lib';

const cardImage = require('../assets/demo/1.jpg');

export default function AdCard(props) {
  
  const { username } = props.card
  return (
    <View >
      <Card >
        <Card.Section imageSource={cardImage} imageStyle={{ height: '90%' }} />
        <Card.Section paddingH-20
          content={[
            { text: username, text70: true, $textDefault: true },
            { text: 'join now', text90: true, $textDisabled: true }
          ]}
        />
      </Card>
    </View>
  );
};