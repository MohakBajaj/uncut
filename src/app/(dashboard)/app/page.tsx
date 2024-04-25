import AppSidebar from "@/components/dashboard/sidebar";

export default function App() {
  return (
    <div className="grid container grid-cols-4">
      <AppSidebar />
      <div className="col-span-2 overflow-y-auto h-auto p-1 border-r">
        Uncut App
      </div>
    </div>
  );
}
