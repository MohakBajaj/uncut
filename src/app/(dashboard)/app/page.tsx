import AppSidebar from "@/components/dashboard/sidebar";

export default function App() {
  return (
    <div className="grid container grid-cols-4 h-[calc(100vh-3.6rem)]">
      <AppSidebar />
      <div className="col-span-2 overflow-y-auto h-auto p-1 border-r">
        Uncut App
      </div>
    </div>
  );
}
