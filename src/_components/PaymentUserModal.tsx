import React from 'react';

import { Image, Text, View, TouchableHighlight, TextInput, StyleSheet, Linking, Button } from "react-native";

interface IPaymentModal {
    setModal: (e: number) => void;
}


const PaymentUserModal: React.FC<IPaymentModal> = () => {

    return (
        <View>
      <Text>
        Your payment info here!!
      </Text>
    </View>
    )
}

export default PaymentUserModal;