import BetVariant from "./BetVariantClass";

export default class BetClass {
    _id: string;
    betVariant: BetVariant;
    sum: number;


    constructor(id: string, betVariant: BetVariant, sum: number) {
        this._id = id;
        this.betVariant = betVariant;
        this.sum = sum;
    }
}
