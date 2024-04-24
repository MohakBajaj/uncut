import Navbar from "@/components/dashboard/navbar";
import { ThemeProvider } from "@/components/theme-provider";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="">
        <Navbar />
        {children}
      </div>
    </ThemeProvider>
  );
}
