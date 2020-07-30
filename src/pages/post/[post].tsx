import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Button from "../../components/Button/Button";
import { ColorEnum } from "../../types/Theme";
import {addPost, deletePost, loadPost, loadPosts} from "../../redux/post/post.actions";
import {wrapper} from "../../redux/store";
import Preloader from "../../components/Preloader/Preloader";
import {getCurrentPost} from "../../redux/post/post.selectors";
import { END } from "redux-saga";
import {getInitialized} from "../../redux/app/app.selectors";
import {NextPage} from "next";
import {initializeApp} from "../../redux/app/app.actions";

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, ...ctx }) => {
  const state = store.getState();
  const initialized = getInitialized(state);
  if(!initialized){
    store.dispatch(initializeApp());
  }
  const postId = Number(ctx.params.post);

  store.dispatch(loadPost(postId));

  store.dispatch(END)
  // @ts-ignore
  await store.sagaTask.toPromise();
});

const Post: NextPage = React.memo((props) => {
  const dispatch = useDispatch();
  const post = useSelector(getCurrentPost);
  const initialized = useSelector(getInitialized);

  const handleClickAdd = () => {
    dispatch(
      addPost({
        id: 1000,
        body: "this is body post",
        title: "title of 1000 post",
        userId: 1,
      })
    );
  };

  const handleClickDelete = () => {
    dispatch(deletePost(1000));
  };

  if(!post || !initialized){
    return <Preloader />
  }
  return (
    <>
      <Head>
        <title>Post {post.id}</title>
      </Head>
      <MainLayout>
        <div>
          <h1>{post.id} - {post.title}</h1>
          <p>{post.body}</p>
          <Button
            type="button"
            variant="fill"
            color={ColorEnum.success}
            onClick={handleClickAdd}
          >
            Add Post
          </Button>
          <Button
            type="button"
            variant="fill"
            color={ColorEnum.warning}
            onClick={handleClickDelete}
          >
            Delete Post
          </Button>
        </div>
      </MainLayout>
    </>
  );
});

// Page.getInitialProps = ({store, pathname, req, res}) => {
//   console.log('2. Page.getInitialProps uses the store to dispatch things');
//   store.dispatch({type: 'TICK', payload: 'was set in error page ' + pathname});
// };

export default Post;
