import React from "react";
import {
  ArrowLeftRight,
  HardDriveDownload,
  HardDriveUpload,
  ScanQrCode,
} from "lucide-react";

export type RecommendationProps = {
  className?: string; // Cho phép tuỳ chỉnh class từ bên ngoài
};

interface RecommendItem {
  icon: React.ReactNode;
  name: string;
  des: string;
}

// Danh sách recommendation với dữ liệu linh hoạt hơn
const recommentItems = [
  {
    icon: <ArrowLeftRight />,
    name: "Swap",
    des: "",
  },
  {
    icon: <HardDriveDownload />,
    name: "Deposit",
    des: "",
  },
  {
    icon: <HardDriveUpload />,
    name: "Withdraw",
    des: "",
  },
  { icon: <ScanQrCode />, name: "Portfolio", des: "Get portfolio for address " },
];

// Component chính với React.memo để tối ưu re-render
const Recommendations: React.FC<RecommendationProps> = React.memo(
  ({ className = "" }) => {
    // Get wallet and conversation state
    // const { addDialog } = useConversationState();

    const handleItemClick = (item: RecommendItem) => {
      // const fullDescription = account?.address
      //   ? `${item.des}${account.address}`
      //   : `${item.des}(Please connect wallet first)`;

      // // Add dialog to conversation
      // const userDialog = ConversationUtils.createDialog(
      //   fullDescription
      // );
      // addDialog(userDialog);
      const userInputElement = document.getElementById("user-input");
      // if (userInputElement) {
      //   userInputElement.textContent = fullDescription;
      // }
    };

    return (
      <div
        className={`flex justify-center flex-wrap gap-4 p-4 max-w-[900px] ${className}`}
      >
        {recommentItems.map((item, index) => (
          <div
            key={index}
            className="min-w-[400px] h-[80px] bg-background rounded-lg border border-gray-300 p-2 flex flex-col justify-center items-center gap-2 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            {/* Icon + Name */}
            <div className="flex items-center gap-2">
              <div className="text-gray-700">{item.icon}</div>
              <div className="font-medium">{item.name}</div>
            </div>

            {/* Description */}
            <div className="text-sm text-gray-500">
             // show account info
            </div>
          </div>
        ))}
      </div>
    );
  }
);

export default Recommendations;
