import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "../redux/store";
import Routes from "../routes";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min";
import "antd/dist/antd.css";
import "tailwindcss/tailwind.css";
import "../styles/_app.scss";
import {AppProps} from "next/app";

export default function MyApp({
  Component,
  pageProps,
  router,
}: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes Component={Component} pageProps={pageProps} router={router} />
      </PersistGate>
    </Provider>
  );
}
