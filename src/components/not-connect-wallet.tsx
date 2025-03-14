import ConnectWallet from "./ui/connect-wallet";

export default function NotConnectWallet() {
  return (
    <div className="fixed flex flex-col justify-center items-center w-full h-screen z-30 backdrop-blur-md bg-white/50 transition-discrete">
      <div className="flex flex-col justify-center items-center">
        <img className="w-full max-w-[240px]" src="/logo.svg" />
        <h1 className="font-bold text-3xl">Surf faster with Fly Explorer</h1>
      </div>
      <p className="mb-3">You are not connected</p>
      <ConnectWallet></ConnectWallet>
    </div>
  );
}
