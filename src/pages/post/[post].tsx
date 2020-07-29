import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Button from "../../components/Button/Button";
import { ColorEnum } from "../../types/Theme";
import { addPost, deletePost } from "../../redux/post/post.actions";

const Post: React.FC = () => {
  const router = useRouter();
  const { post } = router.query;

  const dispatch = useDispatch();

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

  return (
    <>
      <Head>
        <title>Post {post}</title>
      </Head>
      <MainLayout>
        <div>
          <h1>Post - {post}</h1>
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
};

export default Post;
