import React from "react";
import s from "../layouts/AuthLayout/AuthLayout.module.scss";
import * as Yup from "yup";
import Head from "next/head";
import { Formik, FormikProps } from "formik";
import FieldInput from "../components/FormsControls/FieldInput";
import Button from "../components/Button/Button";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import { IconEnum } from "../types/Form";

interface IRegistryForm {
  registryName: string;
  registryEmail: string;
  registryPassword: string;
}

const Registry: React.FC = React.memo(() => {
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
