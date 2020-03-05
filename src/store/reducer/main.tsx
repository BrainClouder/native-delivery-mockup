import { createStore } from "redux";
import { ACTIONS, TmainState } from "../actions/main";

const imageList: any = [];
for (let i = 0; i < 28; i++) {
    const imageAuthorArray = [
        'by Brenda Godinez',
        'by Daniel Cuklev',
        'by Hoa Luu',
        'by Iftekhar Uddin Emon',
        'by Jakub Kapusnak',
        'by Justyna Le',
        'by LEi - DESIGN',
        'by Mae Mu',
        'by Nazia A',
        'by Spineat',
        'by Whitney Wright'

    ];
    const authorCount = [1, 2, 2, 1, 13, 2, 2, 1, 1, 1, 2];
    let index = -1;
    let cumulative = 0;
    for (const element in authorCount) {
        cumulative = cumulative + authorCount[element];
        const ver = i - cumulative;
        if (ver < 0 && index === -1) {
            index = parseInt(element);
        }
    }

    imageList.push([i ,imageAuthorArray[index]]);
}


const createRestFeed = () => {
    const ofTheKing = [];
    const todayHour = new Date().getHours();
    for (let i = 0;i < 50; i++) {
        const randomImageNumber = Math.floor(Math.random() * imageList.length);
        const Rname: string = `${['Lorem', 'Ipsum', 'Unum', 'Consectetur', 'Rutrum', 'Magna ac sem'][Math.floor(Math.random() * 6)]} ${['Burger', 'Restaurant', 'Cafe', 'Inc', 'Supreme', 'Max'][Math.floor(Math.random() * 6)]}`;
        const Rcategory: string = ['Italian', 'Burger', 'Arabic', 'Japanese', 'Chinese', 'Fast Food', 'Vegetarian'][Math.floor(Math.random() * 7)];
        const Rrating: number = Math.random() * 3 + 2;
        const Rimage: number = imageList[randomImageNumber][0];
        const RimageAttribution: string = imageList[randomImageNumber][1];
        const RdeliveryFee: number = Math.random() > 0.8 ? 0 : Math.floor(Math.random() * 8) + 2;
        const Rpromo: boolean = Math.random() < 0.1;        
        const timeToDeliver = ['20-40', '25-45', '30-60', '40-60', '40-90', '60-90', '60-120'][Math.floor(Math.random() * 7)];
        const RisOpen: boolean = todayHour < 13 && 7 < todayHour ? Math.random() < 0.2 : todayHour >= 13 && 17 > todayHour ? Math.random() < 0.4 : todayHour >= 17 || todayHour < 0 ? Math.random() < 0.8 : Math.random() < 0.52;
        ofTheKing.push({
          name: Rname,
          category: Rcategory,
          rating: Rrating,
          image: Rimage,
          imageAttribution: RimageAttribution,
          deliveryFee: RdeliveryFee,
          promo: Rpromo,
          isOpen: RisOpen,
          time: timeToDeliver
        })
    }
    return ofTheKing;   
  }

const feed = createRestFeed();





const initialState: TmainState = {
    restFeed: feed,
    showMode: Math.random() < 0.3,
    cartList: [],
    itemSelected: {name: '', desc: '', prices: [0,0]},
    userInfo: {
        name: 'Kevin Scott', 
        age: 26, 
        selectedAddress: 0,
        address: ['Loram apsum tower II, 77, Mars', 'Dinum bog resort, 42, Mars'],
        image: 'https://i.stack.imgur.com/qrzo6.png?s=328&g=1',
        deliveries: 35    
      }
}

const main = (state = initialState, action: any) => {
    switch (action.type) {
        case ACTIONS.changeSelectedItem:
            return {
                ...state,
                itemSelected: action.payload,
            }
        case ACTIONS.updateUser:
            return {
                ...state,
                userInfo:  action.payload
            }

        case ACTIONS.clearCart:
            return {
                ...state,
                cartList: initialState.cartList,
            }
        case ACTIONS.cartRemoveItem:
            const rem = [...state.cartList];
            rem.splice(action.payload, 1);
            return {
                ...state,
                cartList: rem,
            }
        case ACTIONS.cartAdd:
            const a = [...state.cartList];
            a.push(action.payload);
            return {
                ...state,
                cartList: a
            }
        case ACTIONS.toggleShow:
            return {
                ...state,
                showMode: action.payload,
            }
        case ACTIONS.refreshWidth:
            return {
                ...state,
                windowWidth: window.innerWidth,
            }
        case ACTIONS.selectRestaurant:
            return {
                ...state,
                selectedRestaurant: action.payload,
            }
        default:
            return state;
    }
}

export default createStore(main);