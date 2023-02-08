import EventClass from '../models/EventClass';
import EvensStore from "../stores/EvensStore";

export default async function getEvents() : Promise<EventClass[]> {
    return fetch("data/events.json")
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            return res.data as EventClass[];
        });
}
