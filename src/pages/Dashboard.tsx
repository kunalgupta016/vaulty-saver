import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, WalletIcon, LogOutIcon, VaultIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [balance, setBalance] = useState("0.00");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (!window.ethereum) {
      toast({
        title: "Wallet Not Found",
        description: "Please install MetaMask to use this application",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length === 0) {
        navigate('/');
        return;
      }

      setAddress(accounts[0].address);
      const balance = await provider.getBalance(accounts[0].address);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error("Error checking wallet connection:", error);
      navigate('/');
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "Successfully disconnected your wallet",
    });
    navigate('/');
  };

  const handleDeposit = async () => {
    if (!window.ethereum) return;
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = {
        to: address,
        value: ethers.parseEther(amount)
      };
      
      const transaction = await signer.sendTransaction(tx);
      await transaction.wait();

      toast({
        title: "Deposit Successful",
        description: `${amount} ETH has been deposited to your vault`,
      });
      
      setAmount("");
      checkWalletConnection(); // Refresh balance
    } catch (error) {
      console.error("Error during deposit:", error);
      toast({
        title: "Deposit Failed",
        description: "There was an error processing your deposit",
        variant: "destructive",
      });
    }
  };

  const handleWithdraw = async () => {
    if (!window.ethereum) return;
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = {
        to: address,
        value: ethers.parseEther(amount)
      };
      
      const transaction = await signer.sendTransaction(tx);
      await transaction.wait();

      toast({
        title: "Withdrawal Successful",
        description: `${amount} ETH has been withdrawn from your vault`,
      });
      
      setAmount("");
      checkWalletConnection(); // Refresh balance
    } catch (error) {
      console.error("Error during withdrawal:", error);
      toast({
        title: "Withdrawal Failed",
        description: "There was an error processing your withdrawal",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Navigation Bar */}
      <nav className="glass border-b border-white/10 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <VaultIcon className="h-8 w-8 text-blue-400 float" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 gradient-shimmer">
                Saving Vaults
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center px-4 py-2 rounded-lg bg-black/20 border border-white/10 glow">
                <WalletIcon className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-sm text-gray-300">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              </div>
              <Button
                variant="ghost"
                className="hover:bg-white/5 scale-hover"
                onClick={handleLogout}
              >
                <LogOutIcon className="h-5 w-5 mr-2" />
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4 space-y-6 animate-fade-in">
        <div className="flex flex-col items-center justify-center space-y-4 py-8 float-slow">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 gradient-shimmer">
            Your Savings Dashboard
          </h1>
          <p className="text-gray-400">
            Manage your secure blockchain savings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="col-span-full lg:col-span-1 card-glass hover:shadow-lg transition-all duration-300 scale-hover glow float">
            <CardHeader>
              <CardTitle className="flex items-center">
                <WalletIcon className="mr-2 h-5 w-5 text-blue-400" />
                Current Balance
              </CardTitle>
              <CardDescription className="text-gray-400">Your total savings in ETH</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-400">{balance} ETH</div>
            </CardContent>
          </Card>

          <Card className="col-span-full lg:col-span-2 card-glass hover:shadow-lg transition-all duration-300 scale-hover glow float-slow">
            <CardHeader>
              <CardTitle className="text-blue-400">Actions</CardTitle>
              <CardDescription className="text-gray-400">Deposit or withdraw from your vault</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  type="number"
                  placeholder="Amount in ETH"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 bg-black/20 border-white/10 text-white"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleDeposit}
                    className="flex-1 md:flex-none bg-blue-500 hover:bg-blue-600"
                  >
                    <ArrowUpIcon className="mr-2 h-4 w-4" />
                    Deposit
                  </Button>
                  <Button
                    onClick={handleWithdraw}
                    variant="secondary"
                    className="flex-1 md:flex-none bg-slate-800 hover:bg-slate-700 text-white"
                  >
                    <ArrowDownIcon className="mr-2 h-4 w-4" />
                    Withdraw
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-full card-glass hover:shadow-lg transition-all duration-300 scale-hover glow float">
            <CardHeader>
              <CardTitle className="text-blue-400">Recent Transactions</CardTitle>
              <CardDescription className="text-gray-400">Your latest vault activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((tx, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      {tx.type === 'deposit' ? (
                        <ArrowUpIcon className="text-green-400" />
                      ) : (
                        <ArrowDownIcon className="text-red-400" />
                      )}
                      <div>
                        <div className="font-medium text-white">
                          {tx.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                        </div>
                        <div className="text-sm text-gray-400">
                          {tx.date}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-white">
                      {tx.type === 'deposit' ? '+' : '-'}{tx.amount} ETH
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const transactions = [
  {
    type: 'deposit',
    amount: '0.5',
    date: '2024-03-20',
  },
  {
    type: 'withdrawal',
    amount: '0.2',
    date: '2024-03-19',
  },
  {
    type: 'deposit',
    amount: '1.0',
    date: '2024-03-18',
  },
];

export default Dashboard;
