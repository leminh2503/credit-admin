import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {QueryClient, QueryClientProvider} from "react-query";
import store, {persistor} from "../redux/store";
import Routes from "../routes";
import "tailwindcss/tailwind.css";
import "../styles/_app.scss";
import "../utils/I18n";
import "../utils/firebase";
import {AppProps} from "next/app";
import Config from "../config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: Config.NETWORK_CONFIG.RETRY,
      refetchOnWindowFocus: false,
    },
  },
});

export default function MyApp({
  Component,
  pageProps,
  router,
}: AppProps): JSX.Element {
  if (typeof window !== "undefined") {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Routes
              Component={Component}
              pageProps={pageProps}
              router={router}
            />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Routes Component={Component} pageProps={pageProps} router={router} />
      </QueryClientProvider>
    </Provider>
  );
}
