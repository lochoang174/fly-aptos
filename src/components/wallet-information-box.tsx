// import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import ConnectWallet from "./ui/connect-wallet";
import { ChevronsUpDown, LogOut, Users } from "lucide-react";
import { User2 } from "lucide-react";

// Import components
// import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "src/components/ui/sidebar";
import { WalletUtils } from "src/utils/wallet";
import { useEffect } from "react";

// Import hooks
// import { useAuth } from "src/hooks/use-auth";

// Import objects
// import { UserUtils } from "src/objects/user/utils";

// Import utils

export default function WalletInformationBox() {
  // Get access to the wallet
  const { account, connected, wallet, changeNetwork, disconnect } = useWallet();
  const isConnected = false;
  useEffect(() => {
    console.log("Address: " + account?.address);
  }, [account?.address]);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent flex items-center justify-center"
            >
              <div className="flex items-center justify-center w-full">
                {/* <ConnectWallet /> */}
                <User2 className="mx-auto" />
              </div>

              {connected === false && (
                <ChevronsUpDown className="ml-auto size-4" />
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {!connected === false && (
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-sidebar"
              side="right"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-center text-black">
                      {account?.address &&
                        WalletUtils.censorAddress(
                          account?.address.toString(),
                          10,
                          10
                        )}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Users className="mr-2 size-4" />
                Change accounts
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500 cursor-pointer"
                onClick={() => disconnect()}
              >
                <LogOut className="mr-2 size-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
