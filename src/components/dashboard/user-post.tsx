import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function UserPost() {
  return (
    <div className="flex flex-wrap gap-2 border-b p-2">
      <div className="w-full flex gap-2 items-center">
        <Avatar className="pointer-events-none select-none">
          <AvatarImage src="https://source.boringavatars.com/beam/120/JohnDoe" />
          <AvatarFallback>JohnDoe</AvatarFallback>
        </Avatar>
        <p className="font-semibold">john_doe</p>
      </div>
      <p className="w-full text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptates, dolorum, quos, quas voluptatem quod quibusdam atque
        necessitatibus quia maiores quidem. Quisquam voluptates, dolorum, quos,
        quas voluptatem quod quibusdam atque necessitatibus quia maiores quidem.
      </p>
      <div className="flex gap-2">
        <Button variant={"ghost"}>
          <ThumbsUp />
          &nbsp; 100
        </Button>
        <Button variant={"ghost"}>
          <ThumbsDown />
          &nbsp; 23
        </Button>
      </div>
    </div>
  );
}
