import React from 'react';
import { View, Text, ScrollView, Image, TouchableHighlight, Button, BackHandler, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { TmainState } from '../../store/actions/main';

interface ICartButton {
    setModal: (e: number) => void;
    restCart: any;
}

const CartButton: React.FC<ICartButton> = ({ setModal, restCart }) => {
    if (restCart.length !== 0) {
        let total = 0;
        for (const element in restCart) {
            total = restCart[element].priceTotal + total
        }
        return (
            <View style={{
                position: 'absolute', top: '10%', right: '10%',
            }}>
                {/* <View style={{flexDirection: 'row', backgroundColor: 'crimson'}}>
                    <Text>
                        {restCart.length} units, 
                    </Text>
                    <Text>
                    total: ${total}
                    </Text>
                </View> */}
                <Button title={`🛒 ${restCart.length} total: $${total}`} 
                color="rebeccapurple" onPress={() => setModal(1)} />
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