
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, WalletIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [balance, setBalance] = useState("0.00");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const handleDeposit = () => {
    toast({
      title: "Deposit Successful",
      description: `${amount} ETH has been deposited to your vault`,
    });
    setAmount("");
  };

  const handleWithdraw = () => {
    toast({
      title: "Withdrawal Successful",
      description: `${amount} ETH has been withdrawn from your vault`,
    });
    setAmount("");
  };

  return (
    <div className="container mx-auto p-4 space-y-6 animate-fade-in">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold">Your Savings Dashboard</h1>
        <p className="text-muted-foreground">Manage your secure savings vault</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-full lg:col-span-1 card-glass">
          <CardHeader>
            <CardTitle className="flex items-center">
              <WalletIcon className="mr-2 h-5 w-5" />
              Current Balance
            </CardTitle>
            <CardDescription>Your total savings in ETH</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{balance} ETH</div>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-2 card-glass">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Deposit or withdraw from your vault</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="number"
                placeholder="Amount in ETH"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleDeposit}
                  className="flex-1 md:flex-none"
                >
                  <ArrowUpIcon className="mr-2 h-4 w-4" />
                  Deposit
                </Button>
                <Button
                  onClick={handleWithdraw}
                  variant="secondary"
                  className="flex-1 md:flex-none"
                >
                  <ArrowDownIcon className="mr-2 h-4 w-4" />
                  Withdraw
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full card-glass">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest vault activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((tx, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/50"
                >
                  <div className="flex items-center gap-3">
                    {tx.type === 'deposit' ? (
                      <ArrowUpIcon className="text-green-500" />
                    ) : (
                      <ArrowDownIcon className="text-red-500" />
                    )}
                    <div>
                      <div className="font-medium">
                        {tx.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {tx.date}
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">
                    {tx.type === 'deposit' ? '+' : '-'}{tx.amount} ETH
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
