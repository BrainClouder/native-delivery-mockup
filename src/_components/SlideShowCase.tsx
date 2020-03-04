import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView, TouchableHighlight } from "react-native";
import { connect } from 'react-redux';
import { ACTIONS } from '../store/actions/main';
import Emoji from './util/Emoji';
import aer from '../imgs/png/food/1.png';
interface ISlider {
    feed: any;
    filterType: number;
    showMode: boolean;
    Link: (e: string, param: number) => void;
}



const SlideShowCase: React.FC<ISlider> = ({ feed, filterType, showMode, Link }) => {
    const filteredList = [];
    const styles = StyleSheet.create({
        restInfoContainer: {
            flexDirection: 'column',
            textAlign: 'center',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            justifyContent: 'center',
            padding: '0.2em',
            width: showMode ? '80%' : '100%',
            marginBottom: 8,
            height: 'auto',
        },
        restInfoName: {
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center',
            color: '#333'
        },
        restInfoCategory: {
            marginBottom: '0.3em',
            color: "#555"
        },
        showCase: {
            width: showMode ? '' : 150,
            alignItems: 'center',
            flexDirection: showMode ? 'row' : 'column',
            transition: 200,
            marginHorizontal: showMode ? 0 : 8,
            borderRadius: 10,
            marginVertical: showMode ? 4 : 16,
            justifyContent: showMode ? 'flex-start' : 'center',
            paddingLeft: showMode ? 8 : 0,
            backgroundColor: showMode ? '#ffffff66' : '#fff',
            padding: showMode ? 0 : 0,
            shadowColor: '#000',
            shadowOffset: { height: 5, width: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 10,

        },
        disabledShowCase: {
            opacity: 0.5,
        },
        barElement: {
            flexDirection: 'row',
        },
        restContainer: {
            borderRadius: 5,
            flexDirection: showMode ? 'column' : 'row',
        },

        titleCat: {
            textAlign: "right",
            fontSize: 32,
            color: filterType % 2 !== 0 ? '#222' : '#555',
            fontFamily: "antiqua, antiqua",
        },
        infoContainer: {
            flexDirection: 'row',
            alignItems: 'center', width: showMode ? '' : '100%',
            justifyContent: showMode ? 'center' : 'space-evenly',
            top: '-0.5em',
            margin: showMode ? 8 : '',
        },
        ratingContainer: {
            shadowColor: '#000',
            shadowOpacity: 0.6,
            shadowRadius: 4,
            shadowOffset: {
                width: 2,
                height: 4
            },
            alignItems: 'center',
            backgroundColor: 'mediumpurple',
            paddingHorizontal: 2,
            paddingVertical: 1,
            borderRadius: 5,
            marginHorizontal: showMode ? 8 : 0,
        },
        deliveryFeeContainer: {
            shadowColor: '#000',
            shadowOpacity: 0.6,
            shadowRadius: 4,
            shadowOffset: {
                width: 2,
                height: 4
            },
            flexDirection: 'row',
            backgroundColor: 'steelblue',
            paddingHorizontal: '0.3em',
            paddingVertical: '0.1em',
            borderRadius: 5,
            alignItems: 'center',
            marginHorizontal: showMode ? 8 : 0,
        },
        ratingText: {
            fontWeight: '700',
            fontSize: 12,
            padding: 1,
            color: 'white',
            margin: 2
        },
        deliveryFeeText: {
            fontWeight: '700',
            fontSize: 12,
            padding: 2,
            color: '#fff',
            margin: 2
        },


    });
    const elementFiltered = (e: any) => {
        switch (filterType) {
            case 0:
                return e.promo && e.deliveryFee <= 0 && e.isOpen;
            case 1:
                return e.deliveryFee <= 0 && e.isOpen;
            case 2:
                return e.promo && e.isOpen;
            case 3:
                return e.isOpen;
            case 4:
                return !e.isOpen;
        }
    }
    for (let element in feed) {
        const filtered = elementFiltered(feed[element]);
        if (filtered) {
            filteredList.push(feed[element])
        }
    }
    if (filteredList.length === 0) {
        return (<>
        </>)
    } else {
        filteredList.sort((a: any, b: any) => a.rating < b.rating ? 1 : a.rating === b.rating ? 0 : -1)
        return (<View style={{
            backgroundColor: filterType % 2 === 0 ? '' : '#00000022'
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '1.5em',
                marginVertical: '1em',
                alignItems: 'center',

            }}>
                <Text style={styles.titleCat}>
                    {['Offer + Free Delivery', ['Free Delivery'], ['Offers'], ['Open'], ['Closed']][filterType]}
                </Text>
            </View>
            <ScrollView horizontal={!showMode} style={{}}>
                <View style={styles.restContainer}  >
                    {filteredList.map(
                        (e: any, index: number) => {
                        const ratingFee = (<View style={styles.infoContainer}>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>
                                    <Emoji emoji="⭐" label="star" /> {e.rating.toFixed(1)}
                                </Text>
                            </View>
                            <View style={styles.deliveryFeeContainer}>
                                <Text style={styles.deliveryFeeText}>
                                    <Emoji emoji="🛵" label="deliver" />
                                    {e.deliveryFee <= 0 ? 'FREE' : `$${e.deliveryFee.toFixed(2)}`}
                                </Text>
                            </View>
                        </View>);
                        return (<TouchableHighlight onPressOut={() => Link('restaurant', feed.indexOf(e))}>
                            <View key={e.name + index}
                                style={e.isOpen ? [styles.showCase] : [styles.disabledShowCase, styles.showCase]}>
                                <Image source={require(`../imgs/png/food/${e.image}.png`)} style={{
                                    width: showMode ? 75 : 150, height: showMode ? 75 : 150,
                                    borderTopLeftRadius: 6, borderTopRightRadius: 6,
                                    borderBottomLeftRadius: showMode ? 6 : 0, 
                                    borderBottomRightRadius: showMode ? 6 : 0,
                                }} />
                                {showMode ? '' : ratingFee}
                                <View style={styles.restInfoContainer}>
                                    <Text style={styles.restInfoName}>{e.name}</Text>
                                    {showMode ? <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <Text>
                                            <Emoji emoji="⭐" label="star" /> {e.rating.toFixed(1)}
                                        </Text>
                                        <Text>
                                            <Emoji emoji="🛵" label="deliver" />{e.deliveryFee === 0 ?
                                                'free' : `$${e.deliveryFee}`}
                                        </Text>
                                    </View> : ''}
                                    <Text style={styles.restInfoCategory}>
                                        {e.category}
                                    </Text>
                                    <Text style={{ fontSize: 14 }}>
                                        <Emoji emoji="🕑" label="time" /> {e.time} min
                                    </Text>

                                </View>
                            </View>
                        </TouchableHighlight>)
                    })}
                </View>
            </ScrollView>
        </View>
        )
    }
}



const mapStateToProps = (state: any) => {
    const t = state;
    return {
        feed: t.restFeed,
        showMode: t.showMode,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        select: (e: number) => dispatch({ type: ACTIONS.selectRestaurant, payload: e })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideShowCase);