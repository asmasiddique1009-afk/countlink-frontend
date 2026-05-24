import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWalletStore } from '@/stores/walletStore';
import { ArrowLeftIcon, DollarSignIcon, CopyIcon, CheckIcon, AlertCircleIcon } from 'lucide-react';
import { useState } from 'react';






export function DepositAmount({ method, onNavigate }) {
  const { depositFunds } = useWalletStore();
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setIsProcessing(true);

    // Simulate API call
    setTimeout(async () => {
      const transaction = await depositFunds(parseFloat(amount), method);
      setIsProcessing(false);
      onNavigate('deposit-success', transaction);
    }, 1500);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderMethodContent = () => {
    switch (method) {
      case 'crypto':
        return (
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">USDT (TRC20) Address</span>
                <span className="text-xs text-slate-400">Only send USDT TRC20</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white p-2.5 rounded border border-slate-200 font-mono text-sm text-slate-700 break-all">
                  T9yD14Nj9j7xAB4dbGeiX9h8bN897G4d3f
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy('T9yD14Nj9j7xAB4dbGeiX9h8bN897G4d3f')}
                  className="shrink-0 h-10 w-10">
                  
                  {copied ? <CheckIcon className="w-4 h-4 text-green-600" /> : <CopyIcon className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="amount">Deposit Amount (USD)</Label>
              <div className="relative">
                <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-9 h-11 text-lg" />
                
              </div>
              <p className="text-xs text-slate-500">
                Funds will be credited automatically after 3 network confirmations.
              </p>
            </div>
          </div>);


      case 'card':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="amount">Amount to Deposit</Label>
              <div className="relative">
                <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-9 h-11 text-lg" />
                
              </div>
            </div>

            <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-slate-500">Card Number</Label>
                <Input placeholder="0000 0000 0000 0000" className="bg-white h-9" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500">Expiry</Label>
                  <Input placeholder="MM/YY" className="bg-white h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-slate-500">CVC</Label>
                  <Input placeholder="123" className="bg-white h-9" />
                </div>
              </div>
            </div>
          </div>);


      case 'bank':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
              <AlertCircleIcon className="w-5 h-5 text-blue-600 shrink-0" />
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-blue-900">Bank Transfer Instructions</h4>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Please transfer the exact amount to the bank account below. Include your Reference ID in the transfer description.
                </p>
              </div>
            </div>

            <div className="space-y-4 border border-slate-200 rounded-lg p-5">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-xs text-slate-500 mb-1">Bank Name</span>
                  <span className="font-medium text-slate-800">Chase Bank</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500 mb-1">Account Holder</span>
                  <span className="font-medium text-slate-800">Countlink Inc.</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500 mb-1">Account Number</span>
                  <span className="font-medium text-slate-800">9876543210</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500 mb-1">Routing Number</span>
                  <span className="font-medium text-slate-800">021000021</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-xs text-slate-500 mb-1">Reference ID (Required)</span>
                  <span className="font-mono font-bold text-primary bg-primary/5 px-2 py-1 rounded">
                    DEP-{Math.floor(Math.random() * 100000)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="amount">Amount Sent</Label>
              <div className="relative">
                <DollarSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-9 h-11 text-lg" />
                
              </div>
            </div>
          </div>);


      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate('deposit-method')}
          className="hover:bg-slate-100">
          
          <ArrowLeftIcon className="w-5 h-5 text-slate-600" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-slate-800">
            {method === 'crypto' ? 'Crypto Deposit' : method === 'card' ? 'Card Payment' : 'Bank Transfer'}
          </h1>
          <p className="text-sm text-slate-500">Enter amount and details</p>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-6">
          {renderMethodContent()}

          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
            <Button
              onClick={handleDeposit}
              disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
              className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[140px]">
              
              {isProcessing ? 'Processing...' : method === 'bank' ? 'I Have Sent Funds' : 'Pay Now'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>);

}