import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { ACTIONS, TmainState } from '../../store/actions/main';
import { connect } from 'react-redux';

interface IBeforeCheckoutModal {
    Link: (e: number) => void;
    removeItem: (e: number) => void;
    setCart: (e: any) => void;
    selected: number;
    cartList: any;
    restaurantInfo: any;
    userInfo: any;

}

const BeforeCheckoutModal: React.FC<IBeforeCheckoutModal> = ({ Link, selected, setCart, cartList, restaurantInfo, userInfo, removeItem }) => {
    const [componentStage, setComponentStage] = React.useState(0);
    const [paymentInfo, setPaymentInfo] = React.useState({
        category: '', mode: ''
    });
    const restaurantSelected = restaurantInfo[selected];
    let subTotalPrice = 0;
    for (const item in cartList) {
        subTotalPrice = subTotalPrice + cartList[item].price
    }
    const totalPrice = (subTotalPrice + restaurantSelected.deliveryFee).toFixed(2);

    console.log(restaurantSelected);
    return (
        <View>
            <View style={{ alignItems: 'center', margin: 4 }}>
                {
                    [`${restaurantSelected.name}`,
                    `⭐ ${restaurantSelected.rating.toFixed(1)}`,
                    `${restaurantSelected.time} minutes`,
                    `${restaurantSelected.deliveryFee === 0 ? 'FREE DELIVERY' : `Delivery fee: $
                    ${restaurantSelected.deliveryFee.toFixed(2)}`}`
                    ].map((e: string) => <Text style={{ fontSize: 12 }}>
                        {e}
                    </Text>)
                }

            </View>
            <View style={{ alignItems: 'center', margin: 4 }}>
                {cartList.map((item:
                    {
                        comment: string,
                        desc: string,
                        name: string,
                        numberOpts: number[],
                        opts: any,
                        price: number,
                        units: number
                    },
                    itemIndex: number,
                ) => <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{
                            flexDirection: 'column', justifyContent: 'center',
                            alignItems: 'center', backgroundColor: itemIndex % 2 === 0 ? '#fefefe' : '#dcdcdc',
                            width: '70%'
                        }}>
                            <View>
                                <Text style={{ textAlign: 'left' }}>
                                    {item.units} {item.name} for ${(item.price * item.units).toFixed(2)}
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around',

                            }}>
                                {item.opts.map((option: any) => <Text>
                                    {option[0]} for ${option[1].toFixed(2)}
                                </Text>)}
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Button title='X' onPress={() => removeItem(itemIndex)} />
                        </View>
                    </View>
                )}
            </View>
            <View style={{ margin: 4 }}>
                <Text style={styles.priceCountText}>
                    Subtotal: ${subTotalPrice.toFixed(2)}
                </Text>
                <Text style={styles.priceCountText}>
                    Delivery fee: {restaurantSelected.deliveryFee === 0 ? 'FREE' : `$${restaurantSelected.deliveryFee}`}
                </Text>
                <Text style={styles.priceCountText}>Total:  ${totalPrice}</Text>
            </View>

            <View style={{ justifyContent: 'center', margin: 4 }}>
                {
                    [
                        <View>
                            <Button title="proceed" color="crimson" onPress={() => setComponentStage(1)} />
                            <View style={styles.secButton}>
                                <Button title="go back" color="royalblue" onPress={() => Link(-1)} />
                            </View>
                        </View>
                        ,
                        <View style={{ margin: 8, alignContent: 'center' }}>
                            <Text style={{ textAlign: 'center' }}>
                                Select a payment option:
                            </Text>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.buttonContainer}>
                                    {['online', 'on delivery']
                                        .map((e: string, i: number) =>
                                            i !== 1 || restaurantSelected.deliveryPay ? <View style={{ margin: 4 }}>
                                                <Button
                                                    title={e}
                                                    color={e === paymentInfo.category ? 'goldenrod' : 'dimgray'}
                                                    onPress={() => setPaymentInfo({
                                                        category: e, mode: ''
                                                    })}
                                                />
                                            </View> : ''
                                        )}
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}    >
                                    {
                                        paymentInfo.category.length > 0 ? <View style={styles.buttonContainer}>
                                            {
                                                paymentInfo.category === 'online' ? userInfo.onlineCard.map((card: string) =>
                                                    <View style={{ margin: 4 }}>
                                                        <Button
                                                            title={card} color={card === paymentInfo.mode ? 'goldenrod' : 'dimgray'}
                                                            onPress={() => setPaymentInfo((prevState) => {
                                                                return {
                                                                    ...prevState,
                                                                    mode: card
                                                                }
                                                            })} />
                                                    </View>)
                                                    :
                                                    [
                                                        restaurantSelected.deliveryInfo.cash,
                                                        restaurantSelected.deliveryInfo.credit,
                                                        restaurantSelected.deliveryInfo.debit
                                                    ]
                                                        .map((paymode: boolean, payIndex: number) => paymode ? <View style={{ margin: 4 }}>
                                                            <Button
                                                                color={['cash', 'credit card', 'debit card'][payIndex] === paymentInfo.mode ? 'goldenrod' : 'dimgray'}
                                                                title={['cash', 'credit card', 'debit card'][payIndex]}
                                                                onPress={() => setPaymentInfo((prevState) => {
                                                                    return {
                                                                        ...prevState,
                                                                        mode: ['cash', 'credit card', 'debit card'][payIndex]
                                                                    }
                                                                })} />
                                                        </View> : '')
                                            }
                                        </View> : ''
                                    }
                                </View>
                                <View>
                                    {
                                        paymentInfo.mode.length > 0 ?
                                            <View>
                                                <View>
                                                    <Text>
                                                        Deliver to:
                                                     </Text>
                                                    <View style={{ margin: 4, alignItems: 'center', transform: [{scale: 0.8}] }}>
                                                        <Button title={userInfo.address[userInfo.selectedAddress]} color="royalblue"
                                                            onPress={() => console.log('aa')} />
                                                    </View>
                                                </View>
                                                <View style={{alignItems: 'center', margin: 8}}>
                                                    <Button title="checkout" color="crimson" onPress={() => {
                                                        setCart({
                                                            paymentCategory: paymentInfo.category,
                                                            paymentMethod: paymentInfo.mode,
                                                            totalPrice: totalPrice,
                                                            restaurantIndex: selected,
                                                            address: userInfo.address[userInfo.selectedAddress],
                                                            items: cartList
                                                        })
                                                        Link(1)
                                                    }} />
                                                </View>
                                            </View>
                                            : ''
                                    }
                                </View>
                            </View>
                        </View>
                    ][componentStage]
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    secButton: {
        transform: [{ scale: 0.8 }],
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dedede',
        padding: 4,
        margin: 4,
        borderRadius: 10,
        flexWrap: 'wrap',
    },
    priceCountText: {
        textAlign: 'center'
    }
})

const mapStateToProps = (state: TmainState) => {
    const t = state;
    return {
        cartList: t.cartList,
        restaurantInfo: t.restFeed,
        userInfo: t.userInfo,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        removeItem: (e: number) => dispatch({ type: ACTIONS.cartRemoveItem, payload: e }),
        setCart: (e: any) => dispatch({ type: ACTIONS.setCheckoutCart, payload: e })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BeforeCheckoutModal);
