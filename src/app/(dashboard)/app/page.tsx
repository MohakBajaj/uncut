import Feed from "@/components/dashboard/feed";
import AppSidebar from "@/components/dashboard/sidebar";

export default function App() {
  return (
    <div className="grid container grid-cols-4 h-[calc(100vh-3.6rem)]">
      <AppSidebar />
      <Feed />
    </div>
  );
}
