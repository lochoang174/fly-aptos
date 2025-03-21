import {
  MessageCircle,
  ChartNetwork,
  Receipt
} from "lucide-react";
import React from 'react'
const items = [
    {
      url: "/app/conversation",
      icon: MessageCircle,
      label: "Conversation",
    },
    {
      url: "/app/graph",
      icon: ChartNetwork ,
      label: "Graph",
    },
    {
      url: "/app/bounty",
      icon: Receipt,
      label: "Bounty",
    }
  ];
const MainSidebar = () => {
  return (
    <div className='w-[80px] px-4 py-8'>
      
    </div>
  )
}

export default MainSidebar
