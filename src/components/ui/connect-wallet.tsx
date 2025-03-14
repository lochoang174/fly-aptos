import { ConnectButton } from '@razorlabs/razorkit';

export default function ConnectWallet() {
  
  return (
    <div className="w-full overflow-hidden border-white flex justify-center items-center border rounded-lg">
     <ConnectButton className="bg-blue-600 text-white/75  hover:text-white"></ConnectButton>
    </div>
  );
}
