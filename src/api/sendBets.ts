import Bet from "../models/BetClass";
import BagStore from "../stores/BagStore";
import EvensStore from "../stores/EvensStore";

function CheckDateIsOk() {
    //Easy check end date of event
    let found = true;
    for (let el of BagStore.bag.list) {
        const index = parseInt(el.betVariant._id[1]);
        if (
            index &&
            EvensStore.events.list &&
            EvensStore.events.list.at(index)
        ) {
            let date = EvensStore.events?.list?.at(index)?.endDate;
            if (new Date().getTime() > new Date(`${date}`).getTime()) {
                BagStore.deleteBet(el._id)
                found = false;
            }
        }
    }
    return found
}

export default async function sendBets(){
    return CheckDateIsOk()
}