import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableHighlight, Button } from 'react-native';
import { connect } from 'react-redux';
import { TmainState, ACTIONS } from '../store/actions/main';

import ExclamationDark from '../imgs/png/exclamation-dark.png';
import StarLight from '../imgs/png/star-light.png';
import HelmetLight from '../imgs/png/helmet-light.png';

interface IRestaurantModal {
    restInfo: any;
    WIDTH: number;
    unselect: () => void;

}

const RestaurantModal: React.FC<IRestaurantModal> = ({ restInfo, unselect, WIDTH }) => {
    const [selectedCategory, setCategory] = useState(-1);
    const [imgSeed] = useState(Math.floor(Math.random() * 20 + 200));
    const [menuel] = useState(() => {
        const menuArray = [];
        const randomCategoryNumber: number = Math.floor(Math.random() * 3 + 1);
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
                    prices: [PriceBase, PriceBase + PriceVariation]
                });
            }
            menuArray.push({
                category: categoryName,
                item: itemArray
            });
        }
        return menuArray;
    })
    if (restInfo) {

        return (<>
            <View style={{ position: 'absolute', top: '2vh', alignContent: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                <View>
                    <View>
                        <Button title="<-" onPress={unselect} ></Button>
                    </View>
                    <ScrollView style={{ height: '90vh', backgroundColor: '#ffd' }} >
                        <View style={{
                            position: 'relative', width: '100vw',
                            flexDirection: 'column'
                        }}>
                            <Image source={{ uri: `https://picsum.photos/${window.innerWidth}/${imgSeed}` }}
                                style={{
                                    width: window.innerWidth, borderBottomWidth: 4, borderColor: "#000",
                                    height: 200, opacity: 0.8
                                }} />
                            <Image source={{ uri: restInfo.image }} style={{
                                position: 'absolute', borderRadius: 15,
                                width:  WIDTH < 700 ? WIDTH * 0.3 : 250, height: WIDTH < 700 ? WIDTH * 0.3 : 250, top: WIDTH < 700 ? 200 - (WIDTH * 0.15) : 75, left: WIDTH * 0.05
                            }} />
                            <Text style={{ position: 'absolute', left: WIDTH * 0.05, width: WIDTH < 700 ? WIDTH * 0.3 : 250,  top: 100 + (WIDTH < 700 ? WIDTH * 0.3 : 250) , textAlign: 'center', color: restInfo.isOpen ? 'green' : 'red' }}>
                                {restInfo.isOpen ? 'Open' : 'Closed'}
                            </Text>
                            <View style={{ position: 'absolute', right: 8, top: 200, width: window.innerWidth - 185, flexDirection: 'column' }}>
                                <View>
                                    <Text style={{ marginRight: '1em', fontSize: 22, fontWeight: '700', textAlign: 'center' }}>{restInfo.name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', backgroundColor: '#ddb700', paddingHorizontal: '0.3em', margin: 8, paddingVertical: '0.1em', 
                                    borderRadius: 5 }}>
                                        <Image source={{ uri: StarLight }} style={{ width: 20, height: 20, padding: '0.1em', margin: '0.1em' }} />
                                        <Text style={{ fontWeight: '900', padding: '0.1em', color: 'white', margin: '0.1em' }}>{restInfo.rating.toFixed(1)}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row', backgroundColor: '#22aa22', paddingHorizontal: '0.3em', paddingVertical: '0.1em', borderRadius: 5,
                                        alignItems: 'center', margin: 8,
                                    }}>
                                        <Image source={{ uri: HelmetLight }} style={{ width: 20, height: 20, padding: '0.1em', margin: '0.1em' }} />
                                        <Text style={{ fontWeight: '900', padding: '0.1em', color: 'white', margin: '0.1em' }}>
                                            {restInfo.deliveryFee <= 0 ? 'FREE' : `$${restInfo.deliveryFee.toFixed(2)}`}
                                        </Text>
                                    </View>
                                </View>
                            </View>                          
                            <View style={{marginTop:  WIDTH * 0.15, width: WIDTH}}>
                                <Text style={{textAlign: "center"}}>payment methods</Text>
                                
                            </View>
                            <View accessibilityRole="menubar" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: WIDTH < 700 ? WIDTH * 0.3 : 250 }}>
                                {menuel.map((e: any, index: number) => <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                    {index !== selectedCategory ? <TouchableHighlight onPress={() => setCategory(index)}>
                                        <View style={{backgroundColor: '#fff', margin: 8}}>
                                            <Text style={{fontWeight: '700', fontSize: 16}}>
                                                {e.category}
                                            </Text>
                                        </View>
                                    </TouchableHighlight> : <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 16}}>{e.category}</Text>}
                                    <View accessibilityRole="menu">
                                
                                        {e.item.map((e: any) => index === selectedCategory ? <View style={{ flexDirection: 'row', margin: '0.4em' }} accessibilityRole="menuitem">
                                            <View style={{ width: '80vw' }}>
                                                <Text style={{ fontWeight: '700' }}>{e.name}</Text>
                                                <Text style={{ fontWeight: '500', color: '#444' }}>{e.desc}</Text>
                                            </View>
                                            <View style={{ width: '10vw' }}>
                                                <Text>${e.prices[0]}</Text>
                                            </View>
                                        </View> : '')}
                                    </View>
                                </View>
                                )}
                            </View>

                        </View>
                        <View style={{ flexDirection: 'column', alignItems: "center", width: WIDTH * 0.8, marginLeft: WIDTH*0.1 }}>
                            <Text style={{textAlign: 'center', padding: 4, margin: 4, color: '#666'}}>
                                Nunc cursus risus dui, sed blandit lectus euismod vitae. Curabitur et est nec quam tincidunt scelerisque. Morbi eu rutrum leo.
                            </Text>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center', borderColor: '#999', padding: 3,
                                borderWidth: 2, borderRadius: 10
                            }}>
                                <Image source={{ uri: ExclamationDark }} style={{ width: 40, height: 40, marginHorizontal: 4 }} />
                                <Text style={{ marginHorizontal: 4 }}>Report a problem</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </>
        )
    } else {
        return (<></>)
    }

}

const mapStateToProps = (state: TmainState) => {
    const t = state;
    return {
        restInfo: t.restFeed[t.selectedRestaurant] !== undefined ? t.restFeed[t.selectedRestaurant] : false,
        WIDTH: t.windowWidth,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        unselect: () => dispatch({ type: ACTIONS.selectRestaurant, payload: -1 }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantModal);