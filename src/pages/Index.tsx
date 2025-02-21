
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { WalletIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleConnect = () => {
    // Simulating wallet connection for now
    toast({
      title: "Wallet Connected",
      description: "Welcome to Vaulty Saver!",
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8 text-center animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Welcome to Vaulty Saver
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Your secure digital vault for savings on the blockchain
          </p>
        </div>
        
        <div className="card-glass p-8 rounded-2xl max-w-md mx-auto space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Get Started</h2>
            <p className="text-muted-foreground">
              Connect your wallet to access your secure savings vault
            </p>
          </div>
          
          <Button
            onClick={handleConnect}
            size="lg"
            className="w-full transition-all hover:scale-105"
          >
            <WalletIcon className="mr-2 h-5 w-5" />
            Connect Wallet
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-glass p-6 rounded-xl space-y-3"
            >
              <div className="text-primary text-xl font-semibold">
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
