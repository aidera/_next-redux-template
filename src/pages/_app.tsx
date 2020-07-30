import React from "react";
import "../assets/theme/theme.scss";
import { wrapper } from "../redux/store";
import { NextPage } from "next";

const WrappedApp: NextPage<any> = React.memo(({ Component, pageProps }) => {
  return <Component {...pageProps} />;
});

export default wrapper.withRedux(WrappedApp);
