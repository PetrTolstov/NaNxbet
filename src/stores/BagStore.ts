import { makeAutoObservable } from "mobx";
import BetClass from "../models/BetClass";
class BagStore {
    constructor() {
        makeAutoObservable(this);
    }

    bag: { list: BetClass[] } = {
        list: [],
    };

    clearBag() {
        this.bag.list = [];
    }

    addBetAtBag(bet: BetClass) {
        this.bag.list.push(bet);
    }

    get getLength() {
        return this.bag.list.length;
    }

    isBetThere(bet: BetClass) {
        let found = false;
        this.bag.list.forEach((item) => {
            if (bet._id == item._id) {
                found = true;
            }
        });

        return found;
    }
}

export default new BagStore();
