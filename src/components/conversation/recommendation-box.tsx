// Import components
import { useConversationState } from "src/states/conversation";
// Import state

// Import types
import type { RecommendationsBoxProps } from "./types";
import { Button } from "../ui/button";

export default function RecommendationsBox(props: RecommendationsBoxProps) {
  const { conversation } = useConversationState();

  if (conversation.dialogs.length > 0) return;

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-10">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-[100px] font-semibold ">
          <span className="text-sky-500">Fly</span>{" "}
          <span className="text-black/80 relative">
            Explorer
            <div className="absolute top-0 right-0 bg-gradient-to-t from-sky-500 to-sky-600 border-2 border-white/20 sm:absolute translate-y-2 rounded-full px-2 py-1 text-xs font-semibold text-gray-100 transition-all hover:scale-110 sm:px-3 sm:py-1 sm:text-sm">
              Beta 🚀
            </div>
          </span>
        </h1>
        {/* <img className="w-full max-w-[320px]" src="/logo.svg" /> */}
        <Button variant="outline">
          Interested in AI Agent to scrape web data?
        </Button>
      </div>
      {/* <div className="w-full p-4 bg-green-100 border-1 border-black/10 rounded-lg">
        <Recommendations className="mx-auto" />
      </div> */}
    </div>
  );
}
