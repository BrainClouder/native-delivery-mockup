import React from 'react';

import MenuDark from '../../imgs/png/menu-dark.png';
import StarDark from '../../imgs/png/star-dark.png';
import StarLight from '../../imgs/png/star-light.png';
import HelmetLight from '../../imgs/png/helmet-light.png';
import { Button, Image, StyleSheet, Text, View, ScrollView, TouchableHighlight } from "react-native";
import { connect } from 'react-redux';
import { ACTIONS } from '../../store/actions/main';
interface ISlider {
    feed: any;
    filterType: number;
    select: (e: number) => void;
}



const SlideShowCase: React.FC<ISlider> = ({ feed, filterType, select }) => {
    const filteredList = [];
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
        return (<></>)
    } else {
        filteredList.sort((a: any, b: any) => a.rating < b.rating ? 1 : a.rating === b.rating ? 0 : -1)
        return (<>
            <View style={{
                flex: 1,
                // flexShrink: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: '1.5em',
                marginVertical: '1em',
                // alignContent: 'flex-end',
                alignItems: 'center'
                // justifyContent: 'space-between',
            }}>
                <Text style={styles.titleCat}>{['Offer + Free Delivery', ['Free Delivery'], ['Offers'], ['Open'], ['Closed']][filterType]}</Text>

                <View>
                    <Image source={{ uri: MenuDark }} style={{ width: 30, height: 30 }} />
                </View>
            </View>
            <ScrollView horizontal >
                <View style={styles.promoShow}  >
                    {filteredList.map((e: any, index: number) =><TouchableHighlight key={index + e.name} onPress={() => select(feed.indexOf(e))}>
                        <View style={e.isOpen ? styles.showCase : [styles.disabledShowCase, styles.showCase]}>
                        <Image source={{ uri: e.image }} style={styles.imageShowCase} />

                        <View style={{
                            position: "absolute",  flexDirection: 'row', alignItems: 'center', width: '95%', justifyContent: 'space-between', top:'-0.5em',
                           
                        }}>
                            <View style={{ flexDirection: 'row', backgroundColor: '#eec700', paddingHorizontal: '0.3em', paddingVertical: '0.1em', borderRadius: 5 }}>
                                <Image source={{ uri: StarLight }} style={{ width: 20, height: 20, padding: '0.1em', margin: '0.1em' }} />
                                <Text style={{ fontWeight: '900', padding: '0.1em', color: 'white', margin: '0.1em' }}>{e.rating.toFixed(1)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', backgroundColor: 'limegreen', paddingHorizontal: '0.3em', paddingVertical: '0.1em', borderRadius: 5, 
                            alignItems: 'center'}}>
                                <Image source={{uri: HelmetLight}}  style={{ width: 20, height: 20, padding: '0.1em', margin: '0.1em' }} />
                                <Text style={{fontWeight: '900', padding: '0.1em', color: 'white', margin: '0.1em'}}>
                                    {e.deliveryFee <= 0 ? 'FREE' :  `$${e.deliveryFee.toFixed(2)}`}
                                </Text>
                            </View>

                        </View>
                        <View style={styles.restTextBody}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', margin: '0.2em', color: '#333' }}>{e.name}</Text>
                        <Text style={{marginBottom: '0.3em', color: "#555"}}>{e.category}</Text>
                        </View>
                    </View></TouchableHighlight>)}
                </View>
            </ScrollView>
        </>
        )
    }
}

const styles = StyleSheet.create({
    restTextBody: {
        backgroundColor: "#fff",
        flexDirection: 'column',
        textAlign: 'center',
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        padding: '0.2em',
        width: "100%",
        height: 'auto',
        shadowColor: '#000',
        shadowOffset: {height: 5, width: 2},
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    imageShowCase: {
        width: 150,
        height: 150,        
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10,        
    },
    showCase: {
        width: 150,
        alignItems: 'center',
        marginHorizontal: '0.5em',
        borderRadius: 5,
        marginVertical: '1em',

    },
    disabledShowCase: {
        opacity: 0.5,
    },
    barElement: {
        flexDirection: 'row',
    },
    promoShow: {
        flex: 1,
        flexDirection: 'row',
    },
    appBarImg: {
        width: 30,
        height: 30,
        marginHorizontal: '0.7em'
    },
    logo: {
        height: 80
    },
    header: {
        padding: 20
    },
    titleCat: {
        // fontWeight: "bold",
        // margin: '1em',
        textAlign: "right",
        fontSize: 32,
        fontFamily: "antiqua, antiqua",
    },
    text: {
        lineHeight: "1.5em",
        fontSize: "1.125rem",
        marginVertical: "1em",
        textAlign: "center"
    },
    code: {
        fontFamily: "monospace, monospace"
    },

});

const mapStateToProps = (state: any) => {
    const t = state;
    return {
        feed: t.restFeed,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        select: (e: number) => dispatch({type: ACTIONS.selectRestaurant, payload: e})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideShowCase);