import { observer } from "mobx-react-lite";
import styles from "./Bag.module.css";
import { useEffect, useState } from "react";
import BagStore from "../../stores/BagStore";
import Button, { Size } from "../Button/Button";
import { v4 as uuidv4 } from "uuid";

export type BagProps = {
    closeModal: () => void;
};
function Bag({ closeModal }: BagProps) {
    const [bill, setBill] = useState(0);

    function Submit() {
        BagStore.clearBag();
        closeModal();
    }

    useEffect(() => {
        let sum = 0;
        BagStore.bag.list.map((el) => {
            sum += el.sum;
        });
        setBill(sum);
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <h2>Confirm your bets</h2>
                {BagStore.bag.list.map((el) => (
                    <div className={styles.betContainer} key={uuidv4()}>
                        <span className={styles.title}>
                            {el.betVariant.title}
                        </span>
                        <span className={styles.coefficientXSum}>
                            {el.betVariant.coefficient} x {el.sum}$
                        </span>
                        <span className={styles.sum}>
                            {el.betVariant.coefficient * el.sum}$
                        </span>
                    </div>
                ))}
            </div>
            <Button action={() => Submit()} size={Size.Large}>
                <b>Bet </b>
                <span className={styles.bill}>{bill}$</span>
            </Button>
        </div>
    );
}

export default observer(Bag);
