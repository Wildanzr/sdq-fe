import ConnectWallet from "@/components/shared/ConnectWallet";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-blue-400">
      <ConnectWallet />
    </main>
  );
}
