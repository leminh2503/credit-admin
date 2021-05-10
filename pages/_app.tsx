import App from "next/app";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from "../redux/store";
import Routes from "../routes"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min";
import 'antd/dist/antd.css';
import 'tailwindcss/tailwind.css';
import "../utils/prototype"
import '../styles/_app.scss';

export default function MyApp({Component, pageProps, router}) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Routes
                    Component={Component}
                    pageProps={pageProps}
                    router={router}
                />
            </PersistGate>
        </Provider>
    );
}