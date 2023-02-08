export default class BetVariantClass {
    _id: string;
    title: string;
    coefficient: number;

    constructor(id: string, title: string, coefficient: number) {
        this._id = id;
        this.title = title;
        this.coefficient = coefficient;
    }
}
