import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function Post() {
  const user =
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : "";
  return (
    <div className="flex flex-wrap justify-end p-2 gap-2 border-b">
      <div className="w-full flex gap-2 justify-center items-center">
        <Avatar className="pointer-events-none select-none">
          <AvatarImage
            src={`https://source.boringavatars.com/beam/120/${user}`}
          />
          <AvatarFallback>{user}</AvatarFallback>
        </Avatar>
        <textarea
          id="post"
          rows={3}
          placeholder="What's on your mind?"
          className="w-full text-lg border-b rounded-md bg-background focus-visible:outline-none px-3 py-2 placeholder:text-muted-foreground resize-none"
        />
      </div>
      <Button className="w-20">Post</Button>
    </div>
  );
}
