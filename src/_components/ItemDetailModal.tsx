import React from 'react';
import { View, Text, ScrollView, Image, TouchableHighlight, Button, BackHandler, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { TmainState, ACTIONS } from '../store/actions/main';

interface IitemModal {
    itemSelected: { name: string, desc: string, prices: any[] };
    setModal: (e: number) => void;
    addToCart: (e: any) => void;
}

const ItemDetailModal: React.FC<IitemModal> = ({ itemSelected, addToCart, setModal }) => {
    const [optionsArray] = React.useState(() => {
        const optArray: [string, number][] = [];
        const number = Math.floor(Math.random() * 10);
        for (let i = 0; i <= number; i++) {
            const randomOpt = ['nurja', 'ajram', 'eg', 'lorem', 'nurum', 'inkan', 'cerum']
            [Math.floor(Math.random() * 7)]
            optArray.push([randomOpt, Math.floor(Math.random() * 5 + 1)]);
        }
        return optArray;
    });
    const [optItem, setOpt]: [any, any] = React.useState([]);
    // const [optCount, setOptCount]: [number[], any] = React.useState([]);
    const [totalPrice, setTotal] = React.useState(itemSelected.prices[0]);
    const [observation, setObservation] = React.useState('');
    const [quantity, setQuantity] = React.useState(1);

    const handlerAddOpt = (opt: any) => {
        const a = [...optItem];
        a.push(opt);
        setOpt(a);
        setTotal(totalPrice + opt[1])
    }

    const handlerRemoveOpt = (opt: any) => {
        const a = [...optItem];
        a.splice(a.indexOf(opt), 1);
        setOpt(a);
        setTotal(totalPrice - opt[1])
    }
    const handlerAddToCart = () => {
        addToCart({
            name: itemSelected.name,
            desc: itemSelected.desc,
            price: totalPrice,
            units: quantity,
            opts: optItem,
            comment: observation,
        });
        setModal(-1);
    }

    return (
        <View style={styles.modalContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.modalTitle}>Item Details</Text>
            </View>
            <View style={styles.innerContainer}>
                <View style={styles.itemNameContainer}>
                    <Text style={styles.baseModalText}>
                        {itemSelected.name} for ${itemSelected.prices[0].toFixed(2)}
                    </Text>
                </View>
                <Text style={[styles.baseModalText, styles.description]}>
                    {itemSelected.desc}
                </Text>
                <View style={styles.listContainer}>
                    <Text style={styles.baseModalText}>
                        {optionsArray.length > 0 ? 'Addons:' : 'Sorry, no options :('}
                    </Text>
                    <View style={{ backgroundColor: '#dedede', alignSelf: 'center', borderRadius: 10, padding: 8 }}>
                        {
                            optionsArray.map((opt: [string, number]) => <TouchableHighlight
                                onPress={() => optItem.indexOf(opt) === -1 ? handlerAddOpt(opt) : handlerRemoveOpt(opt)}>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignContent: 'center'
                                }}>
                                    <View style={{
                                        backgroundColor: optItem.indexOf(opt) !== -1 ? 'royalblue' : 'white',
                                        borderColor: optItem.indexOf(opt) !== -1 ? '#333' : '#666',
                                        borderWidth: 2,
                                        borderRadius: 50,
                                        height: 15,
                                        width: 15,
                                    }}>
                                    </View>
                                    <Text style={[styles.baseModalText, { marginHorizontal: 8 }]}>
                                        {opt[0]} for ${opt[1].toFixed(2)}
                                    </Text>
                                </View>
                            </TouchableHighlight>)}
                    </View>
                </View>

                <View>
                    <Text style={styles.baseModalText}>
                        Anything else?
                    </Text>
                    <TextInput style={styles.textInputRoot} multiline value={observation} onChangeText={setObservation} />
                </View>
                <View style={{ flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.baseModalText}>
                        Unit price: ${itemSelected.prices[0].toFixed(2)}
                    </Text>
                    <Text style={styles.baseModalText}>
                        Total: ${(totalPrice * quantity).toFixed(2)}
                    </Text>
                    <View style={{}}>
                        <Text style={styles.baseModalText}>
                            Units:
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ alignItems: 'center', opacity: quantity > 1 ? 1 : 0.4 }}>
                                <Button title="➖" color={quantity <= 1 ? 'dimgray' : 'royalblue'} onPress={() => quantity <= 1 ? '' : setQuantity(quantity - 1)} />
                            </View>
                            <Text style={[styles.baseModalText, { margin: 32, fontSize: 20 }]}>
                                {quantity}
                            </Text>
                            <View style={{ alignItems: 'center' }}>
                                <Button title="➕" color="royalblue" onPress={() => setQuantity(quantity + 1)} />
                            </View>
                        </View>

                    </View>
                </View>
                <View style={{
                    alignItems: 'center'
                }}>
                    <Button title="Add to cart" onPress={handlerAddToCart} color="crimson" />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    baseModalText: {
        color: '#333',
        textAlign: 'center',
        margin: 2,
        fontSize: 14
    },
    modalTitle: {
        color: '#eee',
        textAlign: 'center',
    },
    listContainer: {
        alignItems: 'stretch',
        margin: 4,
    },
    titleContainer: {
        backgroundColor: '#black',
        width: '100%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    description: {
        opacity: 0.8,
        fontSize: 12,
    },
    modalContainer: {
        width: '100%',
        alignItems: 'center'
    },
    innerContainer: {
        padding: 8
    },
    textInputRoot: {
        backgroundColor: '#fff'
    },
    itemNameContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});
const mapStateToProps = (state: TmainState) => {
    const t = state;
    return {
        itemSelected: t.itemSelected,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addToCart: (e: any) => dispatch({ type: ACTIONS.cartAdd, payload: e })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailModal);