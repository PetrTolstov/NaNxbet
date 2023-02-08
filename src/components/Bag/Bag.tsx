import { observer } from "mobx-react-lite";
import styles from "./Bag.module.css";
import { useEffect, useState } from "react";
import BagStore from "../../stores/BagStore";
import Button, { Size } from "../Button/Button";
import { v4 as uuidv4 } from "uuid";
import EvensStore from "../../stores/EvensStore";
import sendBets from "../../api/sendBets";
import { toast } from 'react-toastify';

export type BagProps = {
    closeModal: (wAn?: boolean) => void;
};
function Bag({ closeModal }: BagProps) {
    const [bill, setBill] = useState(0);

    async function Submit() {
        await sendBets().then((res) => {
            console.log(res)
            if (res) {
                BagStore.clearBag();
                closeModal();
            }else{
                toast.error("Some bets are unavalible, so we have deleted them")
            }
        });
    }

    useEffect(() => {
        let sum = 0;
        BagStore.bag.list.map((el) => {
            sum += el.sum;
        });
        setBill(sum);
    }, [BagStore.bag.list]);
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <h2>Confirm your bets</h2>
                {BagStore.bag.list.map((el) => (
                    <div className={styles.betContainer} key={uuidv4()}>
                        <div className={styles.buttonFlexContainer}>
                            <span className={styles.title}>
                                {el.betVariant.title}
                            </span>
                            <div className={styles.buttonContainer}>
                                <Button
                                    action={() => {
                                        BagStore.deleteBet(el._id);
                                    }}
                                    filled
                                    border
                                    size={Size.Large}
                                >
                                    <img src={"/delete.svg"} alt="-" />
                                </Button>
                            </div>
                        </div>

                        <span className={styles.coefficientXSum}>
                            {el.betVariant.coefficient} x {el.sum}$
                        </span>
                        <span className={styles.sum}>
                            {el.betVariant.coefficient * el.sum}$
                        </span>
                    </div>
                ))}
            </div>
            {bill < 1 ? (
                <Button action={() => closeModal(true)} size={Size.Large}>
                    Close
                </Button>
            ) : (
                <Button action={() => Submit()} size={Size.Large}>
                    <b>Bet </b>
                    <span className={styles.bill}>{bill}$</span>
                </Button>
            )}
        </div>
    );
}

export default observer(Bag);
