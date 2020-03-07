import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableHighlight, Button, BackHandler, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { TmainState, ACTIONS } from '../store/actions/main';
import Emoji from './util/Emoji';
import ItemDetailModal from './ItemDetailModal';
import RestaurantCartModal from './RestaurantCartModal';
import CartButton from './util/CartButton';


interface IRestaurantModal {
    restFeed: any;
    selected: any;
    Link: (e: string) => void;
    selectItem: (e: {name: string, desc: string, prices: any[]}) => void;
    clearCart: () => void;
}

const RestaurantModal: React.FC<IRestaurantModal> = ({ restFeed, selectItem, Link, selected, clearCart }) => {
    const [selectedCategory, setCategory] = useState(-1);
    const [imgSeed] = useState(Math.floor(Math.random() * 27));
    const [modalMode, setModal] = useState(-1);

    const goBackHandler = () => {
        clearCart();
        Link('home');
    }

    useEffect(() => {
        
        BackHandler.addEventListener('hardwareBackPress', () => goBackHandler);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', () => goBackHandler);
        }
    }, [goBackHandler]);

    const [menuel] = useState(() => {
        const menuArray = [];
        const randomCategoryNumber: number = Math.floor(Math.random() * 3 + 3);
        for (let category = 0; category < randomCategoryNumber; category++) {
            const itemArray = [];
            const categoryName = ['tincidunt',
                'pozzin', 'aliquet', 'enim', 'nullam', 'nahim', 'eget', 'ligula',
                'anc', 'olen', 'vinarg', 'oderd']
            [Math.floor(Math.random() * 11)];

            const randomNumberItem: number = Math.floor(Math.random() * 10 + 2);
            for (let item = 0; item < randomNumberItem; item++) {
                const RitemName = `${['dictum', 'amet', 'sit', 'finibus', 'dolor', 'faucibus', 'orci', 'aliquet', 'ligula']
                [Math.floor(Math.random() * 9)]} ${
                    ['birger', 'chees', 'mauis', 'nimb', 'larab', 'justo', 'ornare', 'feugiat', 'arcu', 'nullam', 'naiem', 'nimbrad']
                    [Math.floor(Math.random() * 12)]}`;
                const PriceBase = Math.floor(Math.random() * 15 + 5);
                const PriceVariation = Math.floor(Math.random() * 5 + 1);
                const description: string = `${['Curabitur vestibulum vulputate tempor.', 'Curabitur auctor, massa ac imperdiet.',
                    'Praesent ornare feugiat fermentum.', 'Duis neque lorem, auctor a vehicula fermentum.', 'Aenean vel ornare metus.',
                    'Aenean faucibus diam nec mattis tincidunt.']
                [Math.floor(Math.random() * 6)]}`;

                itemArray.push({
                    name: RitemName,
                    desc: description,
                    prices: [PriceBase, PriceBase + PriceVariation],
                });
            }
            menuArray.push({
                category: categoryName,
                item: itemArray
            });
        }
        return menuArray;
    })

    const handlerSelectItem = (e: {name: string, desc: string, prices: any[]}) => {
        selectItem(e);
        setModal(0);
    }

    

    const modalList = [
        <ItemDetailModal setModal={setModal} />
        ,
        <RestaurantCartModal setModal={setModal} selected={selected} />
    ]

    const restInfo = restFeed[selected];
    if (restInfo) {
        return (<>
            <View style={{ position: 'absolute', alignContent: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                <View>
                    <ScrollView style={{ height: '100vh', backgroundColor: 'honeydew' }} >
                        <View style={{
                            position: 'relative', width: '100vw',
                            flexDirection: 'column'
                        }}>
                            <View>
                                <Image source={ require(`../imgs/png/food/${imgSeed}.png`)}
                                    style={{
                                        width: '100%',
                                        height: 175, borderColor: '#333', borderBottomWidth: 4
                                    }} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View style={{ width: 100, marginTop: -50 }}>
                                        <View style={{
                                            borderRadius: 14,
                                            backgroundColor: '#eee'
                                        }}>
                                            <Image source={require(`../imgs/png/food/${restInfo.image}.png`)} style={{
                                                width: 100, height: 100, borderRadius: 12,
                                                borderColor: '#333', borderWidth: 4,
                                            }} />
                                        </View>
                                        <Text style={{ textAlign: 'center', color: restInfo.isOpen ? 'green' : 'red' }}>
                                            {restInfo.isOpen ? 'Open' : 'Closed'}
                                        </Text>
                                    </View>
                                    <View style={{ alignItems: 'center', flexWrap: 'wrap' }}>
                                        <Text style={{ fontWeight: '700', fontSize: 22, width: '50vw', textAlign: 'center', margin: 6, color: 'darkslategrey' }}>
                                            {restInfo.name}
                                        </Text>
                                        <Text style={{ color: 'goldenrod', fontWeight: '600', textAlign: 'center', }}><Emoji emoji="⭐" label="rating" /> {restInfo.rating.toFixed(1)}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                {
                                    [`${restInfo.deliveryFee === 0 ? 'FREE delivery' : `$${restInfo.deliveryFee} delivery fee`}`,
                                    `🕑 ${restInfo.time} minutes`, 'payment 💳💸', 'more 📋'].map((e: string) => <TouchableHighlight>
                                        <View style={{
                                            paddingHorizontal: 4, paddingVertical: 8,
                                            alignItems: 'center', flexShrink: 0
                                        }} ><Text
                                            style={{
                                                width: window.innerWidth > 300 ? 70 : 50, fontSize: window.innerWidth > 300 ? 16 : 12,
                                                textAlign: 'center', color: 'darkslategrey'
                                            }}>{e}
                                            </Text>
                                        </View>
                                    </TouchableHighlight>)
                                }
                            </View>

                            <View accessibilityRole="menubar" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    menuel.map((element: any, index: number) => <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                        {
                                            index !== selectedCategory ? <View style={{ backgroundColor: '#fff', width: "100%", margin: 8 }}>
                                                <Button title={element.category} color={index % 2 === 0 ? "#38757b" : "#81aba8"} onPress={() => setCategory(index)} />
                                            </View>
                                                :
                                                <Text style={{
                                                    textAlign: 'center', fontWeight: '600', fontSize: 22, margin: 8, color: 'mediumpurple', textTransform: 'capitalize'
                                                }}>
                                                    {element.category
                                                    }</Text>
                                        }
                                        <View accessibilityRole="menu">

                                            {
                                                element.item.map((e: any, i: number) => index === selectedCategory ? <TouchableHighlight onPress={() => handlerSelectItem(e)}
                                                    key={i + e.name}>
                                                    <View style={{
                                                        flexDirection: 'row', padding: 8, margin: '0.4em', opacity: restInfo.isOpen ? 1 : 0.4,
                                                        backgroundColor: i % 2 === 0 ? '#efefef' : '#fefefe', borderRadius: 6
                                                    }} accessibilityRole="menuitem">
                                                        <View style={{ width: '80vw' }}>
                                                            <Text style={{ fontWeight: '700', color: 'darkslategrey' }}>{e.name}</Text>
                                                            <Text style={{ fontWeight: '500', color: 'darkslategrey' }}>{e.desc}</Text>
                                                        </View>
                                                        <View style={{ width: '12vw' }}>
                                                            <Text >${e.prices[0]}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableHighlight> : '')}
                                        </View>
                                    </View>
                                    )}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: "center", margin: 12 }}>
                            <Text style={{ textAlign: 'center', padding: 4, margin: 8, color: '#666' }}>
                                Nunc cursus risus dui, sed blandit lectus euismod vitae. Curabitur et est nec quam tincidunt scelerisque. Morbi eu rutrum leo.
                            </Text>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center'
                            }}>
                                <Button title="❕ REPORT A PROBLEM" color={'mediumpurple'} onPress={() => console.log('a')} />
                            </View>
                        </View>
                    </ScrollView>
                    <View style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
                        <TouchableHighlight onPress={goBackHandler} >
                            <View style={{
                                alignItems: 'center',
                                backgroundColor: '#ffffff77'
                            }}>
                                <View style={{
                                    alignContent: 'center',
                                    flexDirection: 'row', alignItems: 'center',
                                    justifyContent: 'space-between', width: '90%',
                                }}>
                                    <Text style={{ opacity: 0.6, fontSize: 24, fontWeight: '900', transform: [{ rotate: '180deg' }] }}>
                                        ^
                                    </Text>
                                    <Text style={{ opacity: 0.6, fontSize: 24, fontWeight: '900', transform: [{ rotate: '180deg' }] }}>
                                        ^
                                    </Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>

                   
                    {modalList[modalMode] !== undefined ? <>
                        <TouchableHighlight onPress={() => setModal(-1)} style={{ backgroundColor: '#222', zIndex: 5, position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, opacity: 0.6 }}>
                            <View></View>
                        </TouchableHighlight>
                        <View style={{ position: 'absolute', top: '1%', width: '100%', left: 0, alignItems: 'center', zIndex: 5 }}>
                            <View style={{
                                borderRadius: 8,
                                flexDirection: 'column', backgroundColor: '#eee',
                                alignItems: 'center', width: '95%', margin: 8
                            }}>
                                {modalList[modalMode]}
                            </View>
                        </View>

                    </> : ''}

                    <CartButton setModal={setModal} />
                </View>
            </View>
        </>
        )
    } else {
        return (<>
        </>)
    }
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
})



const mapStateToProps = (state: TmainState) => {
    const t = state;
    return {
        restFeed: t.restFeed,   
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        selectItem: (e: {name: string, desc: string, prices: any[]}) => dispatch({type: ACTIONS.changeSelectedItem, payload: e}),
        addToCart: (e: any) => dispatch({ type: ACTIONS.cartAdd, payload: e }),
        clearCart: () => dispatch({type: ACTIONS.clearCart}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantModal);