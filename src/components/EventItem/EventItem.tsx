import { observer } from "mobx-react-lite";
import Event from "../../models/EventClass";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { Size } from "../Button/Button";
import styles from "./Event.module.css";
import BagStore from "../../stores/BagStore";
import BetClass from "../../models/BetClass";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

function EventItem({ info }: { info: Event }) {
    const [currentVariant, setCurrentVariant] = useState(info.variants[0]._id);
    const [amountBet, setAmountBet] = useState<string>("");

    function makeABet() {
        if (isNaN(parseInt(amountBet)) || parseInt(amountBet) < 1) {
            toast.warning("Please make a correct bet");
            return;
        }
        const bet = new BetClass(
            `${uuidv4()}`,
            info.variants.filter((el) => {
                return el._id === currentVariant;
            })[0],
            parseInt(amountBet)
        );

        BagStore.addBetAtBag(bet);
        setAmountBet("");
    }

    useEffect(() => {
        BagStore.bag;
    }, []);

    return (
        <article className={styles.container}>
            <h2 className={styles.title}>{info.title}</h2>
            <span className={styles.description}>{info.description}</span>
            <span className={styles.date}>
                {info.startDate.split("-").join(".")} -{" "}
                {info.endDate.split("-").join(".")}
            </span>
            <select
                className={styles.select}
                onChange={(ev) => setCurrentVariant(ev.currentTarget.value)}
                defaultValue={currentVariant}
            >
                {info.variants.map((el) => (
                    <option value={el._id} key={el._id}>
                        {el.title}
                    </option>
                ))}
            </select>
            {info.variants.map((el) => {
                if (el._id === currentVariant) {
                    return (
                        <div className={styles.betContainer} key={el._id}>
                            <span className={styles.betText}>
                                Bet with <b>{el.coefficient}x</b> coefficient!
                            </span>
                            <div className={styles.inputContainer}>
                                <input
                                    className={styles.betInput}
                                    type={"number"}
                                    placeholder={"Write your bet"}
                                    onChange={(ev) => {
                                        setAmountBet(ev.currentTarget.value);
                                    }}
                                    value={amountBet}
                                />
                                <span>$</span>
                            </div>

                            <Button action={() => makeABet()} size={Size.Large}>
                                Bet
                            </Button>
                        </div>
                    );
                }
            })}
        </article>
    );
}

export default observer(EventItem);
