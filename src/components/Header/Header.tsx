import { observer } from "mobx-react-lite";
import styles from "./Header.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Confetti from "react-confetti";
import Bag from "../Bag/Bag";
import Button from "../Button/Button";
import BagStore from "../../stores/BagStore";

function Header() {
    const [showing, setShowing] = useState(false);
    const [showingBag, setShowingBag] = useState(false);
    const [showingDishAdding, setShowingDishAdding] = useState(false);
    const [animate, setAnimate] = useState(false);
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.h}>NaNxbet</h1>
                <div className={styles.buttons}>
                    <Button
                        action={() => setShowingBag(true)}
                        filled
                        border
                        isDisabled={BagStore.getLength > 0 ? false : true}
                    >
                        <img src="/shopping-bag.svg" alt={"Bag"} />
                        {BagStore.getLength > 0 ? (
                            <span className={styles.amountBets}>
                                {BagStore.getLength}
                            </span>
                        ) : (
                            <></>
                        )}
                    </Button>
                </div>
            </div>

            <Modal
                isShowing={showingBag}
                closeModal={() => setShowingBag(false)}
            >
                <Bag
                    closeModal={() => {
                        setAnimate(true);
                        setShowingBag(false);
                    }}
                />
            </Modal>

            {animate ? (
                <Confetti
                    run={animate}
                    recycle={false}
                    numberOfPieces={300}
                    onConfettiComplete={() => setAnimate(false)}
                />
            ) : (
                <></>
            )}
        </header>
    );
}

export default observer(Header);
