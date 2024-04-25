"use client";
import Post from "./post";
import UserPost from "./user-post";

export default function Feed() {
  const dummy_data = [
    {
      user: "John Doe",
      post: "Hello, World!",
      likes: 0,
      dislikes: 0,
      tags: ["general", "academic"],
    },
    {
      user: "John Doe",
      post: "Hello, World!",
      likes: 0,
      dislikes: 0,
      tags: ["general", "academic"],
    },
    {
      user: "John Doe",
      post: "Hello, World!",
      likes: 0,
      dislikes: 0,
      tags: ["general", "academic"],
    },
    {
      user: "John Doe",
      post: "Hello, World!",
      likes: 0,
      dislikes: 0,
      tags: ["general", "academic"],
    },
    {
      user: "John Doe",
      post: "Hello, World!",
      likes: 0,
      dislikes: 0,
      tags: ["general", "academic"],
    },
  ];
  return (
    <div className="col-span-2 border-r overflow-y-auto">
      <Post />
      {dummy_data.map((data, index) => (
        <UserPost
          key={index}
          user={data.user}
          post={data.post}
          likes={data.likes}
          dislikes={data.dislikes}
          tags={data.tags}
        />
      ))}
    </div>
  );
}
