import { makeAutoObservable, ObservableSet } from "mobx";
import EventClass from "../models/EventClass";

class EvensStore {
    constructor() {
        makeAutoObservable(this);
    }

    events: { list: EventClass[] | null } = {
        list: [],
    };

    setEvents(events: EventClass[]) {
        this.events.list = events;
    }
}

export default new EvensStore();
