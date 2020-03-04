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
    const [optItem, setOpt] = React.useState([['', 0]]);
    const [optCount, setOptCount] = React.useState([0]);
    const [totalPrice, setTotal] = React.useState(itemSelected.prices[0]);
    const [observation, setObservation] = React.useState('');
    const [quantity, setQuantity] = React.useState(1);

    const handlerAddOpt = (opt: any) => {
        const a = [...optItem];
        let b = [...optCount];
        if (a.indexOf(opt) === -1) {
            a.push(opt);
            b.push(1);
            setOpt(a);
            setOptCount(b);
        } else {
            b[a.indexOf(opt)]++;
            setOptCount(b);
        }
        setTotal(totalPrice + opt[1])
    }

    const handlerRemoveOpt = (opt: any) => {
        const a = [...optItem];
        let b = [...optCount];
        b[a.indexOf(opt)]--;
        if (b[a.indexOf(opt)] <= 0) {
            a.splice(a.indexOf(opt), 1);
            setOpt(a);
        }
        setOptCount(b);
        setTotal(totalPrice - opt[1])
    }
    const handlerAddToCart = () => {
        addToCart({
            name: itemSelected.name,
            desc: itemSelected.desc,
            priceTotal: totalPrice,
            units: quantity,
            opts: optItem,
            numberOpts: optCount
        });
        setModal(-1);
    }

    return (
        <View style={styles.modalContainer}>
            <View style={{
                backgroundColor: '#ddd', width: '100%',
                borderTopLeftRadius: 8, borderTopRightRadius: 8
            }}>
                <Text style={styles.modalTitle}>User Profile</Text>
            </View>
            <View style={styles.innerContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.baseModalText}>
                        {itemSelected.name}
                    </Text>
                    <Text style={styles.baseModalText}>
                        {itemSelected.prices[0]}
                    </Text>
                </View>
                <Text style={styles.baseModalText}>
                    {itemSelected.desc}
                </Text>
                <Text style={styles.baseModalText}>
                    {optionsArray.length > 0 ? 'Options' : 'Sorry, no options :('}
                </Text>
                <View>

                    {
                        optionsArray.map((opt: [string, number]) => <View style={{
                            flexDirection: 'row', justifyContent: 'space-between',
                            alignContent: 'center',
                        }}>
                            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                                {optItem.indexOf(opt) !== -1 ? <TouchableHighlight style={{ margin: 2 }}
                                    onPress={() => handlerRemoveOpt(opt)}>
                                    <Text style={{ color: '#eee', fontSize: 22 }}>
                                        -
                                </Text>
                                </TouchableHighlight>
                                    : <Text style={{ color: '#333', fontSize: 22, margin: 2 }}>-</Text>}

                                <Text style={{ color: '#eee', fontSize: 16, margin: 2 }}>
                                    {optItem.indexOf(opt) !== -1 ? optCount[optItem.indexOf(opt)] : 0}
                                </Text>
                                <TouchableHighlight style={{ justifyContent: 'center', margin: 2 }} onPress={() => handlerAddOpt(opt)}>
                                    <Text style={{ color: '#eee', fontSize: 22 }}>
                                        +
                                </Text>
                                </TouchableHighlight>
                            </View>
                            <Text style={styles.baseModalText}>
                                {opt[0]}
                            </Text>
                            <Text style={styles.baseModalText}>
                                ${opt[1]}
                            </Text>
                        </View>)}
                </View>

                <View>
                    <Text style={styles.baseModalText}>
                        Anything else?
                    </Text>
                    <TextInput style={{ backgroundColor: '#eee' }} multiline value={observation} onChangeText={setObservation} />
                </View>
                <View style={{ flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.baseModalText}>
                        Unit price: ${itemSelected.prices[0]}
                    </Text>
                    <Text style={styles.baseModalText}>
                        Total: ${totalPrice * quantity}.00
                        </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.baseModalText}>
                            Units:
                        </Text>
                        <TouchableHighlight onPress={() => quantity <= 1 ? '' : setQuantity(quantity - 1)}>
                            <Text style={styles.baseModalText}>
                                -
                            </Text>
                        </TouchableHighlight>
                        <Text style={styles.baseModalText}>
                            {quantity}
                        </Text>
                        <TouchableHighlight onPress={() => setQuantity(quantity + 1)}>
                            <Text style={styles.baseModalText}>
                                +
                            </Text>
                        </TouchableHighlight>

                    </View>
                </View>

                <Button title="Add to cart" onPress={handlerAddToCart} color="crimson" />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    baseModalText: {
        color: '#eee'
    },
    modalTitle: {
        color: '#333',
        textAlign: 'center',
    },
    modalContainer: {
        width: '100%'
    },
    innerContainer: {
        padding: 8
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
        addToCart: (e: any) => dispatch({type: ACTIONS.cartAdd, payload: e})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailModal);