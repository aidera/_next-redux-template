import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../redux/store";
import Head from "next/head";
import MainLayout from "../layouts/MainLayout/MainLayout";
import { ColorEnum } from "../types/Theme";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import Preloader from "../components/Preloader/Preloader";
import { initializeApp } from "../redux/app/app.actions";
import { getInitialized } from "../redux/app/app.selectors";
import { loadPosts } from "../redux/post/post.actions";
import { getPosts } from "../redux/post/post.selectors";

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  if (store.getState().app.global !== null) {
    await store.dispatch(loadPosts());
    store.dispatch(initializeApp());
  }
});

const Index: React.FC = () => {
  const dispatch = useDispatch();
  const initialized = useSelector(getInitialized);
  const posts = useSelector(getPosts);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = () => {
    dispatch(loadPosts);
  };

  const promise = () =>
    new Promise((resolve, reject) => {
      const randomNumber = Math.random();
      setTimeout(() => {
        if (randomNumber < 0.6) {
          resolve(null);
        } else {
          reject(new Error("Oops"));
        }
      }, 2000);
    });
  const promise2 = () =>
    new Promise((resolve, reject) => {
      const randomNumber = Math.random();
      setTimeout(() => {
        if (randomNumber < 0.6) {
          resolve("OK!");
        } else {
          reject(new Error("Oops"));
        }
      }, 2000);
    });

  if (!initialized) {
    return <Preloader />;
  }
  return (
    <>
      <Head>
        <title>Index page</title>
      </Head>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        text="Custom modal with any text you want"
        buttonResolveText="Resolve"
        buttonRejectText="Reject"
        promiseResolve={promise}
        promiseResolveError="this is an error in resolve"
        promiseReject={promise2}
        promiseRejectError="this is an error in reject"
      />
      <MainLayout>
        <h1>Index page</h1>
        <Button
          type="button"
          variant="fill"
          color={ColorEnum.warning}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Open modal
        </Button>
        <div>
          <h2>Posts</h2>
          <ul>
            {posts.map((post) => {
              return <li key={post.id}>{post.title}</li>;
            })}
          </ul>
          <Button
            type="button"
            variant="fill"
            color={ColorEnum.success}
            onClick={loadData}
          >
            Load Posts
          </Button>
        </div>
      </MainLayout>
    </>
  );
};

export default Index;
