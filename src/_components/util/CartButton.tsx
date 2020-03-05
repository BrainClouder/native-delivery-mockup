import React from 'react';
import { View, Text, ScrollView, Image, TouchableHighlight, Button, BackHandler, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { TmainState, TcartList } from '../../store/actions/main';

interface ICartButton {
    setModal: (e: number) => void;
    restCart: TcartList;
}

const CartButton: React.FC<ICartButton> = ({ setModal, restCart }) => {
    if (restCart.length !== 0) {
        let total = 0;
        for (const element in restCart) {
            total = restCart[element].price * restCart[element].units + total
        }
        return (
            <View style={{
                position: 'absolute', top: '10%', right: '10%',
            }}>
                <Button title={`🛒 ${restCart.length} item, subtotal: $${total}`} 
                color="royalblue" onPress={() => setModal(1)} />
            </View>
        )
    } else {
        return (<>
        </>);
    }
}

const mapStateToProps = (state: TmainState) => {
    const t = state;
    return {
        restCart: t.cartList
    }
}

export default connect(mapStateToProps)(CartButton);