import { createStore } from "redux";
import { ACTIONS } from "../actions/main";

const createRestFeed = () => {
    const ofTheKing = [];
    const todayHour = new Date().getHours();
    for (let i = 0;i < 50; i++) {
        const Rname: string = `${['Lorem', 'Ipsum', 'Unum', 'Consectetur', 'Rutrum', 'Magna ac sem'][Math.floor(Math.random() * 6)]} ${['Burger', 'Restaurant', 'Cafe', 'Inc', 'Supreme', 'Max'][Math.floor(Math.random() * 6)]}`;
        const Rcategory: string = ['Italian', 'Burger', 'Arabic', 'Japanese', 'Chinese', 'Fast Food', 'Vegetarian'][Math.floor(Math.random() * 7)];
        const Rrating: number = Math.random() * 3 + 2;
        const Rimage: string = `https://picsum.photos/${Math.floor(Math.random() * 50 + 300)}`;
        const RdeliveryFee: number = Math.random() > 0.8 ? 0 : Math.floor(Math.random() * 8) + 2;
        const Rpromo: boolean = Math.random() < 0.1;
        const RisOpen: boolean = todayHour < 13 && 7 < todayHour ? Math.random() < 0.2 : todayHour >= 13 && 17 > todayHour ? Math.random() < 0.4 : todayHour >= 17 || todayHour < 0 ? Math.random() < 0.8 : Math.random() < 0.02;
        // const randomTime: number = Math.floor(Math.random() * 5);
        // const timeMinus: number = todayHour - randomTime;
        // const timePlus: number = todayHour + randomTime + 1;
        // const openingTime: string | number = timeMinus < 0 ? 23 - randomTime : timeMinus < 10 ? `0${timeMinus}`: timeMinus;
        // const closingTime: string | number = timePlus > 23 ? `0${timePlus - 23}` : timePlus < 10 ? `0${timePlus}` : timeMinus;
        // const RopenTime: string = RisOpen ? `${openingTime}:00 - ${closingTime}:00` : ``;
        ofTheKing.push({
          name: Rname,
          category: Rcategory,
          rating: Rrating,
          image: Rimage,
          deliveryFee: RdeliveryFee,
          promo: Rpromo,
          isOpen: RisOpen,
        })
    }
    return ofTheKing;   
  }

const feed = createRestFeed();



const initialState = {
    restFeed: feed,
    selectedRestaurant: -1,
    windowWidth: window.innerWidth,

}

const main = (state = initialState, action: any) => {
    switch (action.type) {
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