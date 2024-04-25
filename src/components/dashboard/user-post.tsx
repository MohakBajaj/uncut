import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function UserPost({
  user,
  post,
  likes,
  dislikes,
  tags,
}: {
  user: string;
  post: string;
  likes: number;
  dislikes: number;
  tags: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2 border-b p-2">
      <div className="w-full flex gap-2 items-center">
        <Avatar className="pointer-events-none select-none">
          <AvatarImage
            src={`https://source.boringavatars.com/beam/120/${user}`}
          />
          <AvatarFallback>{user}</AvatarFallback>
        </Avatar>
        <p className="font-semibold text-sm">{user}</p>
      </div>
      <p className="w-full text-muted-foreground">{post}</p>
      <div className="flex w-full items-center gap-1 select-none">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-primary text-foreground h-5 rounded-full flex items-center text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-2 select-none">
        <Button variant={"ghost"}>
          <ThumbsUp className="w-5 h-5" />
          &nbsp; {likes}
        </Button>
        <Button variant={"ghost"}>
          <ThumbsDown className="w-5 h-5" />
          &nbsp; {dislikes}
        </Button>
      </div>
    </div>
  );
}
