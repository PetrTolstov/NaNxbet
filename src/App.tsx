import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import styles from "./App.module.css";
import getEvents from "./api/getEvents";
import EvensStore from "./stores/EvensStore";
import { observer } from "mobx-react-lite";
import EventItem from "./components/EventItem/EventItem";
import BetVariant from "./models/BetVariantClass";
import EventClass from "./models/EventClass";
import Header from "./components/Header/Header";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        getEvents().then((data) => {
            EvensStore.setEvents(data);
        });
    }, []);
    return (
        <>
            <Header />
            <main className={styles.App}>
                {EvensStore.events.list ? (
                    <>
                        {[...EvensStore.events.list].map((el) => (
                            <EventItem info={el} key={uuidv4()} />
                        ))}
                    </>
                ) : (
                    <>Loading</>
                )}
            </main>
            <ToastContainer theme="dark" />
        </>
    );
}

export default observer(App);
