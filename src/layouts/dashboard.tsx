// Import components
import { SidebarProvider, SidebarTrigger } from "src/components/ui/sidebar";
import { AppSidebar } from "src/components/app-sidebar";
import NotConnectWallet from "src/components/not-connect-wallet";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { connected } = useWallet();
  return (
    <div
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover", // Để ảnh phủ đầy
        backgroundPosition: "center", // Căn giữa ảnh
      }}
    >
      {!connected && <NotConnectWallet />}
      <SidebarProvider>
        <AppSidebar />
        <div className="py-2 pe-2 w-full h-screen max-h-screen">
          <main className="flex flex-col w-full overflow-auto  rounded-lg  bg-transparent backdrop-blur-md">
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
