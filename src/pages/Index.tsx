
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { WalletIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ethers } from 'ethers';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!window.ethereum) {
      toast({
        title: "Wallet Not Found",
        description: "Please install MetaMask to use this application",
        variant: "destructive",
      });
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl w-full space-y-8 text-center animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Welcome to Vaulty Saver
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Your secure digital vault for savings on the blockchain
          </p>
        </div>
        
        <div className="card-glass p-8 rounded-2xl max-w-md mx-auto space-y-6 hover:shadow-xl transition-all duration-300">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-600">Get Started</h2>
            <p className="text-muted-foreground">
              Connect your wallet to access your secure savings vault
            </p>
          </div>
          
          <Button
            onClick={handleConnect}
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105"
          >
            <WalletIcon className="mr-2 h-5 w-5" />
            Connect Wallet
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-glass p-6 rounded-xl space-y-3 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-blue-600 text-xl font-semibold">
                {feature.title}
              </div>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "Secure Storage",
    description: "Your funds are secured by blockchain technology",
  },
  {
    title: "Easy Access",
    description: "Deposit and withdraw with just a few clicks",
  },
  {
    title: "Full Control",
    description: "Monitor your balance and transactions in real-time",
  },
];

export default Index;
