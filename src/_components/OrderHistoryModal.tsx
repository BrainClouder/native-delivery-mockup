import React from 'react';

import { Image, Text, View, TouchableHighlight, TextInput, StyleSheet, Linking, Button } from "react-native";

interface IOrderHistory {
    setModal: (e: number) => void;
}

const OrderHistoryModal: React.FC<IOrderHistory> = () => {

    return (
        <View>
      <Text>
        Orders
      </Text>
    </View>
    )
}

export default OrderHistoryModal;