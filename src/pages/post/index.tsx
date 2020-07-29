import React from "react";
import Link from "next/link";
import MainLayout from "../../layouts/MainLayout/MainLayout";

const Posts: React.FC = () => {
  return (
    <MainLayout>
      <h1>Posts</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </MainLayout>
  );
};

export default Posts;
