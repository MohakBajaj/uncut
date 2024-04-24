"use client";

import { Syne_Mono } from "next/font/google";
import { Icons } from "../Icons";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useTheme } from "next-themes";

const sm = Syne_Mono({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const user =
    typeof window !== "undefined" && localStorage.getItem("session")
      ? JSON.parse(localStorage.getItem("session")!).res.tokenData.payload
          .username
      : "";
  const router = useRouter();
  const { setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div
          className="flex items-center select-none"
          onClick={() => {
            router.push("/app");
          }}
        >
          <Icons.logo className="fill-none stroke-primary w-12 h-10" />
          <h1 className={cn("text-3xl text-primary mt-2", sm.className)}>
            Uncut
          </h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage
                src={`https://source.boringavatars.com/beam/120/${user}`}
              />
              <AvatarFallback>{user}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="focus:bg-transparent">
              <div className="flex gap-3 justify-between items-center">
                Theme
                <Select
                  onValueChange={(theme) => {
                    setTheme(theme);
                  }}
                >
                  <SelectTrigger className="w-[100px] h-7 rounded-sm">
                    <SelectValue placeholder="System" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log Out &nbsp; <LogOut className="w-4 stroke-red-500/70" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
