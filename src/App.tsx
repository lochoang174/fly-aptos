// Import routes
import RootRoutes from "./routes/RootRoutes";
import { WalletProvider } from "./utils/wallet/WalletSelector";
import "./wallet.css";

function App() {
  return (
    // add wallet provider
    <WalletProvider>
      <RootRoutes />
    </WalletProvider>
  );
}

export default App;
