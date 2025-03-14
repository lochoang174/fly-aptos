// Import routes
import RootRoutes from "./routes/RootRoutes";
import "./wallet-custom.css";
import { WalletProvider } from "@razorlabs/razorkit";
import "@razorlabs/razorkit/style.css";
function App() {
  return (
    // add wallet provider
    <WalletProvider>
      <RootRoutes />
    </WalletProvider>
  );
}

export default App;
