import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { ACTIONS, TmainState } from '../../store/actions/main';
import { connect } from 'react-redux';

interface IBeforeCheckoutModal {
    Link: (e: number) => void;
    removeItem: (e: number) => void;
    selected: number;
    cartList: any;
    restaurantInfo: any;
    userInfo: any;

}

const BeforeCheckoutModal: React.FC<IBeforeCheckoutModal> = ({ Link, selected, cartList, restaurantInfo, userInfo, removeItem }) => {
    const restaurantSelected = restaurantInfo[selected];
    console.log(cartList);
    return (
        <View>
            <View style={{ alignItems: 'center' }}>
                {
                    [`${restaurantSelected.name}`,
                    `⭐ ${restaurantSelected.rating.toFixed(1)}`,
                    `${restaurantSelected.time} minutes`, 
                    `${restaurantSelected.deliveryFee === 0 ? 'FREE DELIVERY' : `Delivery fee: $
                    ${restaurantSelected.deliveryFee.toFixed(2)}`}`].map((e: string) => <Text style={{margin: 2, fontSize: 12}}>
                        {e}
                        </Text>)
                }
                {/* <Text>
                    {restaurantSelected.name}
                </Text>
                <Text>
                    {restaurantSelected.time} minutes
                </Text>

                <Text>
                    {restaurantSelected.deliveryFee === 0 ? 'FREE DELIVERY' : `Delivery fee: $${restaurantSelected.deliveryFee.toFixed(2)}`}
                </Text> */}
            </View>
            <View style={{width: '100%'}}>
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
                                <Text style={{textAlign: 'left'}}>
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
        </View>
    )
}
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
        removeItem: (e: number) => dispatch({ type: ACTIONS.cartRemoveItem, payload: e })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BeforeCheckoutModal);
