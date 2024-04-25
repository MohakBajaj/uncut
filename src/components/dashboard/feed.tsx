"use client";
import Post from "./post";
import UserPost from "./user-post";

export default function Feed() {
  return (
    <div className="col-span-2 border-r overflow-y-auto">
      <Post />
      <UserPost />
      <UserPost />
      <UserPost />
      <UserPost />
      <UserPost />
      <UserPost />
    </div>
  );
}
