import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableHighlight, Button, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { TmainState, ACTIONS } from '../store/actions/main';

import ExclamationDark from '../imgs/png/exclamation-dark.png';
import StarLight from '../imgs/png/star-light.png';
import HelmetLight from '../imgs/png/helmet-light.png';



interface IRestaurantModal {
    restFeed: any;
    WIDTH: number;
    selected: any;
    unselect: () => void;
    Link: (e: string) => void;
}

const RestaurantModal: React.FC<IRestaurantModal> = ({ restFeed, unselect, WIDTH, Link, selected }) => {
    const [selectedCategory, setCategory] = useState(-1);
    const [imgSeed] = useState(`https://picsum.photos/${window.innerWidth}/${Math.floor(Math.random() * 20 + 200)}`);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', unselect);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', unselect);
        }
    }, [])


    const [menuel] = useState(() => {
        const menuArray = [];
        const randomCategoryNumber: number = Math.floor(Math.random() * 3 + 3);
        for (let category = 0; category < randomCategoryNumber; category++) {
            const itemArray = [];
            const categoryName = ['tincidunt', 'pozzin', 'aliquet', 'enim', 'nullam', 'nahim', 'eget', 'ligula', 'anc', 'olen', 'vinarg', 'oderd'][Math.floor(Math.random() * 11)];
            const randomNumberItem: number = Math.floor(Math.random() * 10 + 2);
            for (let item = 0; item < randomNumberItem; item++) {
                const RitemName = `${['dictum', 'amet', 'sit', 'finibus', 'dolor', 'faucibus', 'orci', 'aliquet', 'ligula'][Math.floor(Math.random() * 9)]} ${
                    ['birger', 'chees', 'mauis', 'nimb', 'larab', 'justo', 'ornare', 'feugiat', 'arcu', 'nullam', 'naiem', 'nimbrad'][Math.floor(Math.random() * 12)]}`;
                const PriceBase = Math.floor(Math.random() * 15 + 5);
                const PriceVariation = Math.floor(Math.random() * 5 + 1);
                const description: string = `${['Curabitur vestibulum vulputate tempor.', 'Curabitur auctor, massa ac imperdiet.', 'Praesent ornare feugiat fermentum.',
                    'Duis neque lorem, auctor a vehicula fermentum.', 'Aenean vel ornare metus.', 'Aenean faucibus diam nec mattis tincidunt.'][Math.floor(Math.random() * 6)]}`;
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
                                <Image source={{ uri: imgSeed }}
                                    style={{
                                        width: '100%',
                                        height: 175
                                    }} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View style={{ width: 100, marginTop: -50 }}>
                                        <Image source={{ uri: restInfo.image }} style={{
                                            width: 100, height: 100
                                        }} />
                                        <Text style={{ textAlign: 'center', color: restInfo.isOpen ? 'green' : 'red' }}>
                                            {restInfo.isOpen ? 'Open' : 'Closed'}
                                        </Text>
                                    </View>
                                    <View style={{ alignItems: 'center', flexWrap: 'wrap' }}>
                                        <Text style={{ fontWeight: '700', fontSize: 22, width: '50vw', textAlign: 'center', margin: 6, color: 'darkslategrey' }}>
                                            {restInfo.name}
                                        </Text>
                                        <Text style={{ color: 'goldenrod', fontWeight: '600',  textAlign: 'center', }}>⭐ {restInfo.rating.toFixed(1)}</Text>
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
                                {menuel.map((e: any, index: number) => <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                    {index !== selectedCategory ? <View style={{ backgroundColor: '#fff', width: "100%", margin: 8 }}>
                                        <Button title={e.category} color={index%2 === 0 ? "#38757b" : "#81aba8"} onPress={() => setCategory(index)}/>
                                    </View>
                                        :
                                        <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 18, color: 'mediumpurple' }}>{e.category}</Text>
                                    }
                                    <View accessibilityRole="menu">

                                        {e.item.map((e: any) => index === selectedCategory ? <View style={{ flexDirection: 'row', margin: '0.4em' }} accessibilityRole="menuitem">
                                            <View style={{ width: '80vw' }}>
                                                <Text style={{ fontWeight: '700',  color: 'darkslategrey' }}>{e.name}</Text>
                                                <Text style={{ fontWeight: '500', color: 'darkslategrey' }}>{e.desc}</Text>
                                            </View>
                                            <View style={{ width: '12vw' }}>
                                                <Text >${e.prices[0]}</Text>
                                            </View>
                                        </View> : '')}
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
                                <Button title="❕ REPORT A PROBLEM" color={'mediumpurple'} onPress={() => console.log('a')}/>                               
                            </View>
                        </View>
                    </ScrollView>
                    <View style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
                        <TouchableHighlight onPress={() => Link('home')} >
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                                height: 32, justifyContent: 'space-around', backgroundColor: '#ffffff77'
                            }}>
                                <Text style={{ opacity: 0.6 }}>🔴</Text>
                                <Text style={{ opacity: 0.6 }}>🔴</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </>
        )
    } else {
        return (<>
            <Text>aaaaaaaaaaa</Text>
        </>)
    }

}

const mapStateToProps = (state: TmainState) => {
    const t = state;
    return {
        restFeed: t.restFeed,
        WIDTH: t.windowWidth,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        unselect: () => dispatch({ type: ACTIONS.selectRestaurant, payload: -1 }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantModal);