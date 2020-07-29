import React from "react";
import s from "../layouts/AuthLayout/AuthLayout.module.scss";
import * as Yup from "yup";
import Head from "next/head";
import Button from "../components/Button/Button";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import FieldInput from "../components/FormsControls/FieldInput";
import FieldCheckbox from "../components/FormsControls/FieldCheckbox";
import { Formik, FormikProps, Form } from "formik";
import { IconEnum } from "../types/Form";

interface ILoginForm {
  loginEmail: string;
  loginPassword: string;
  loginRememberMe: boolean;
}

const Login: React.FC = () => {
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
};

export default Login;
