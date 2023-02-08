import { makeAutoObservable, ObservableSet } from "mobx";
import EventClass from "../models/EventClass";

class EvensStore {
    constructor() {
        makeAutoObservable(this);
    }

    events: { list: Set<EventClass> | null } = {
        list: new Set<EventClass>(),
    };


    setEvents(events: EventClass[]) {
        
        this.events.list = new Set([...events]);
        
        
       
    }
}

export default new EvensStore();
