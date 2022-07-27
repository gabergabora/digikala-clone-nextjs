import { useEffect, useState } from "react";

import "/styles/globals.css";

//? Store
import { store } from "app/store";
import { Provider } from "react-redux";

store.dispatch(fetchCategories());

//? Layouts & Components
import {
  DashboardLayout,
  ClientLayout,
  ProfileLayout,
  RefreshTokenHandler,
  Modal,
} from "components";
import { fetchCategories } from "app/slices/category.slice";

export default function MyApp({ Component, pageProps }) {
  //? Fix Hydration failed
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  //? Lyout Config
  if (Component.getClientLayout) {
    return Component.getClientLayout(
      <Provider store={store}>
        <ClientLayout>
          <Component {...pageProps} />
          <RefreshTokenHandler />
          <Modal />
        </ClientLayout>
      </Provider>
    );
  }

  //? Lyout Config
  if (Component.getDashboardLayout) {
    return Component.getDashboardLayout(
      <Provider store={store}>
        <DashboardLayout>
          <Component {...pageProps} />
          <RefreshTokenHandler />
          <Modal />
        </DashboardLayout>
      </Provider>
    );
  }
  //? Lyout Config
  if (Component.getProfileLayout) {
    return Component.getProfileLayout(
      <Provider store={store}>
        <ProfileLayout>
          <Component {...pageProps} />
          <RefreshTokenHandler />
          <Modal />
        </ProfileLayout>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Modal />
    </Provider>
  );
}
