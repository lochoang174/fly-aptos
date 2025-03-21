import cn from "classnames";
import { Link } from "react-router-dom";
import { MessageCircle, ChartNetwork, Receipt } from "lucide-react";
// Import components
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "src/components/ui/sidebar";
import WalletInformationBox from "./wallet-information-box";

// Menu items.
const items = [
  {
    url: "/app/conversation",
    icon: MessageCircle,
    label: "Conversation",
  },
  {
    url: "/app/graph",
    icon: ChartNetwork,
    label: "Graph",
  },
  {
    url: "/app/bounty",
    icon: Receipt,
    label: "Bounty",
  },
];

const sideBarClassName = cn([
  "[&>div[data-sidebar=sidebar]]:border",
  "[&>div[data-sidebar=sidebar]]:flex-1",
  "[&>div[data-sidebar=sidebar]]:rounded-lg",
]);

export function AppSidebar() {
  return (
    <Sidebar
      className={` ${sideBarClassName} bg-transparent  border border-r border-[#E2E8F0] `}
      variant="inset"
      collapsible="icon"
    >
      <SidebarHeader className="rounded-t-lg max-h-[45px]">
        <div className="flex items-center justify-center mt-2">
          <Avatar className="h-10 w-10 rounded-lg self-center">
            <AvatarImage src="/logo.svg" />
          </Avatar>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="flex flex-col justify-center items-center  mt-[100px] gap-8">
          {items
            .filter(
              (item) =>
                item.label === "Conversation" ||
                item.label === "Graph" ||
                item.label === "Bounty"
            )
            .map((item) => (
              <Link to={item.url} className="text-[#475569]" key={item.label}>
                <item.icon className="w-8 h-8" />
              </Link>
            ))}
        </div>
      </SidebarContent>
      {/* <SidebarFooter className="bg-blue">
        <WalletInformationBox />
      </SidebarFooter> */}
    </Sidebar>
  );
}
