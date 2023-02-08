import BetVariant from "./BetVariantClass";

export default class EventClass {
    _id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    variants: BetVariant[];

    constructor(
        id: string,
        title: string,
        description: string,
        startDate: string,
        endDate: string,
        variants: BetVariant[]
    ) {
        this._id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.variants = variants;
    }
}
