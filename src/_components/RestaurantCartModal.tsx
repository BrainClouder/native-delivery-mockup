import React from 'react';
import { View, Text, ScrollView, Image, TouchableHighlight, Button, BackHandler, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';

interface IRestaurantCart {
    setModal: (e: number) => void;
}

const RestaurantCartModal: React.FC<IRestaurantCart> = ({setModal}) => {
    return (
        <View>
            <Text>
                Item chart
            </Text>
            <Button title="checkout" onPress={() => console.log('haha')}/>
            <Button title="go back" onPress={() => setModal(-1)}/>
        </View>
    )
}

export default RestaurantCartModal;