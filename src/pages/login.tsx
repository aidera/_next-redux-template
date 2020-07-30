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

interface ILoginForm {
  loginEmail: string;
  loginPassword: string;
  loginRememberMe: boolean;
}

const Login: NextPage = React.memo(() => {
  const initialized = useSelector(getInitialized);

  if(!initialized){
    return <Preloader />
  }

  return (
    <>
      <Head>
        <title>Login page</title>
      </Head>

      <AuthLayout>
        <Formik
          enableReinitialize
          initialValues={{
            loginEmail: "",
            loginPassword: "",
            loginRememberMe: true,
          }}
          validationSchema={Yup.object().shape({
            loginEmail: Yup.string()
              .required("Email is required")
              .email("Email is not correct"),
            loginPassword: Yup.string().required("Password is required"),
            loginRememberMe: Yup.boolean().oneOf(
              [true],
              "Must Accept Terms and Conditions"
            ),
          })}
          onSubmit={(values, actions) => {
            console.log("Submit");
          }}
        >
          {(props: FormikProps<ILoginForm>) => (
            <Form className={s.form}>
              <h1>Login</h1>
              <FieldInput
                name="loginEmail"
                type="email"
                label="Email"
                autoFocus
                icon={IconEnum.email}
              />
              <FieldInput
                name="loginPassword"
                type="password"
                label="Password"
                icon={IconEnum.password}
              />
              <FieldCheckbox name="loginRememberMe" label="Remember me" />
              <Button type="submit" variant="fill">
                <img src="/user.svg" alt="" /> Submit
              </Button>
            </Form>
          )}
        </Formik>
      </AuthLayout>
    </>
  );
});

export default Login;
