import React from "react";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Head from "next/head";
import Link from "next/link";

const Error: React.FC = React.memo(() => {
  return (
    <>
      <Head>
        <title>Page not found</title>
      </Head>
      <MainLayout>
        <div>
          <h1>Page not found</h1>
          <Link href="/">
            <a>Go to home page</a>
          </Link>
        </div>
      </MainLayout>
    </>
  );
});

export default Error;
