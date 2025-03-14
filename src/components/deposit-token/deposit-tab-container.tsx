import React from "react";
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";

// Import components
import JsonLogger from "../log";
import ConnectWallet from "../ui/connect-wallet";

// Import objects
// import { TokenAPI } from "src/objects/token/api";


// Import types
import { useConversationState } from "src/states/conversation";

type DepositeTabContainerProps = {
  symbol: string;
  amount: number;
  txBytes?: string;
  logs: string;
};

export default function DepositeTabContainer({
  symbol,
  amount,
  txBytes,
  logs,
}: DepositeTabContainerProps) {
  const [price, setPrice] = React.useState<string>("0.0");
  const [loading, setLoading] = React.useState(false);
  const { addDialog } = useConversationState();

  React.useEffect(() => {
    // TokenAPI.getTokenPriceByCoinType("0x2::abc::abc").then((price) => {
    //   if (price) {
    //     setPrice(price);
    //   }
    // });
  }, []);



  const handleDepositTransation = async () => {
    if (!txBytes) {
      alert("No transaction bytes found");
      return;
    }
  

  };

  return (
    <div className="inset-x-0 bottom-0 z-50">
      <div className=" inset-x-0 bottom-0 z-50">
        <div className="w-full max-w-md bg-slate-50 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-left shadow-sm">
          <TabGroup>
            <TabList className="flex space-x-4 border-b border-gray-200 mb-4">
              <Tab
                className={({ selected }) =>
                  `px-4 py-2 text-sm font-medium border-b-2 ${selected
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-500 hover:text-blue-400"
                  } transition-colors duration-200`
                }
              >
                Deposit
              </Tab>
              <Tab
                className={({ selected }) =>
                  `px-4 py-2 text-sm font-medium border-b-2 ${selected
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-500 hover:text-blue-400"
                  } transition-colors duration-200`
                }
              >
                Logs
              </Tab>
            </TabList>

            <TabPanels>
              {loading ? (
                <div className="text-center text-gray-400 py-4">Loading...</div>
              ) : (
                <>
                  <TabPanel>
                    <div className="flex justify-between rounded-lg px-3 py-2 bg-border mb-3">
                      <p className="font-bold">{amount}</p>
                      <p className="font-bold">{symbol}</p>
                    </div>
                    <div className="flex justify-between px-3 mb-3">
                      <p>Price</p>
                      <p>${price}</p>
                    </div>
                    <button
                      disabled={!txBytes}
                      onClick={handleDepositTransation}
                      className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg border border-blue-600 hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirm Deposit
                    </button>
                  </TabPanel>

                  <TabPanel>
                    <div className="bg-gray-50 ">
                      <JsonLogger logs={logs} />
                    </div>
                  </TabPanel>
                </>
              )}
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}
