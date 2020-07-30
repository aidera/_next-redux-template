import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Button from "../components/Button/Button";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import FieldInput from "../components/FormsControls/FieldInput";
import FieldCheckbox from "../components/FormsControls/FieldCheckbox";
import Preloader from "../components/Preloader/Preloader";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { wrapper } from "../redux/store";
import { END } from "redux-saga";
import { getInitialized } from "../redux/app/app.selectors";
import { initializeApp } from "../redux/app/app.actions";
import { IconEnum } from "../types/Form";
import s from "../layouts/AuthLayout/AuthLayout.module.scss";

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, ...ctx }) => {
    const state = store.getState();
    const initialized = getInitialized(state);
    if (!initialized) {
      store.dispatch(initializeApp());
    }

    store.dispatch(END);
    // @ts-ignore
    await store.sagaTask.toPromise();
  }
);

interface IRegistryForm {
  registryName: string;
  registryEmail: string;
  registryPassword: string;
}

const Registry: NextPage = React.memo(() => {
  const initialized = useSelector(getInitialized);

  if(!initialized){
    return <Preloader />
  }
  return (
    <>
      <Head>
        <title>Registry page</title>
      </Head>
      <AuthLayout>
        <Formik
          enableReinitialize
          initialValues={{
            registryName: "",
            registryEmail: "",
            registryPassword: "",
          }}
          validationSchema={Yup.object().shape({
            registryName: Yup.string().required("Full name is required"),
            registryEmail: Yup.string()
              .required("Email is required")
              .email("Email is not correct"),
            registryPassword: Yup.string().required("Password is required"),
          })}
          onSubmit={(values, actions) => {
            console.log("Submit");
          }}
        >
          {(props: FormikProps<IRegistryForm>) => (
            <form className={s.form}>
              <h1>Registry</h1>
              <FieldInput
                name="registryName"
                type="text"
                label="Full Name"
                autoFocus
                maxLength={30}
                icon={IconEnum.user}
              />
              <FieldInput
                name="registryEmail"
                type="email"
                label="Email"
                icon={IconEnum.email}
              />
              <FieldInput
                name="registryPassword"
                type="password"
                label="Password"
                icon={IconEnum.password}
              />
              <Button type="submit" variant="fill">
                <img src="/user.svg" alt="" /> Submit
              </Button>
            </form>
          )}
        </Formik>
      </AuthLayout>
    </>
  );
});

export default Registry;
