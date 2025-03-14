// Import components
import ConversationSection from "src/components/conversation/conversation-section";

export default function HomePage() {
  return (
    <div className="flex-1 flex justify-evenly items-start w-full">
      <ConversationSection className="w-8/12" />
    </div>
  );
}
