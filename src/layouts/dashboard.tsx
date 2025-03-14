// Import components
import { SidebarProvider, SidebarTrigger } from "src/components/ui/sidebar";
import { AppSidebar } from "src/components/app-sidebar";
import NotConnectWallet from "src/components/not-connect-wallet";
import { useWallet } from "@razorlabs/razorkit";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const wallet = useWallet();
  return (
    <>
      {!wallet.connected && <NotConnectWallet />}
      <SidebarProvider>
        <AppSidebar />
        <div className="py-2 pe-2 w-full h-screen max-h-screen">
          <main className="flex flex-col w-full border rounded-lg overflow-hidden bg-background/70 backdrop-blur-md">
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}
