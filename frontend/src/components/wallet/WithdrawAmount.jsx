import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useWalletStore } from '@/stores/walletStore';
import { useUserStore } from '@/stores/userStore';
import { ArrowLeftIcon, AlertCircleIcon, InfoIcon } from 'lucide-react';
import { useState, useEffect } from 'react';






export function WithdrawAmount({ selectedMethod, onNavigate }) {
  const { availableBalance } = useWalletStore();
  const { role } = useUserStore();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [contlinksCommission, setContlinksCommission] = useState(0);
  const [processingFee, setProcessingFee] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);

  const minWithdrawal = 50;

  const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
  };

  useEffect(() => {
    const numValue = parseFloat(amount);
    if (!isNaN(numValue) && numValue > 0) {
      let commission = 0;
      let processing = 0;
      let received = 0;

      if (role === 'publisher') {
        commission = numValue * 0.20; // 20% Contlinks commission for publishers
        processing = numValue * 0.02; // 2% payment processing fee for publishers
        received = numValue - commission - processing;
      } else {
        // Advertisers get fees refunded (added back to the withdrawal amount)
        commission = numValue * 0.20;
        processing = numValue * 0.02;
        received = numValue + commission + processing;
      }

      setContlinksCommission(commission);
      setProcessingFee(processing);
      setTotalReceived(Math.max(0, received));
    } else {
      setContlinksCommission(0);
      setProcessingFee(0);
      setTotalReceived(0);
    }
  }, [amount, role]);

  const handleAmountChange = (value) => {
    setAmount(value);
    setError('');

    const numValue = parseFloat(value);
    if (value && isNaN(numValue)) {
      setError('Please enter a valid amount');
    } else if (numValue < minWithdrawal) {
      setError(`Minimum withdrawal amount is ${formatCurrency(minWithdrawal)}`);
    } else if (numValue > availableBalance) {
      setError('Amount exceeds available balance');
    }
  };

  const handleContinue = () => {
    const numValue = parseFloat(amount);
    if (!error && numValue >= minWithdrawal && numValue <= availableBalance) {
      onNavigate('withdraw-review', {
        method: selectedMethod,
        amount: numValue
      });
    }
  };

  return (
    <div className="space-y-3 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate('withdraw-method')}
          className="hover:bg-accent h-8 w-8">
          
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Withdraw Earnings</h1>
          <p className="text-xs text-muted-foreground">Enter withdrawal amount</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
            ✓
          </div>
          <span className="text-sm font-medium text-foreground">Method</span>
        </div>
        <div className="w-16 h-0.5 bg-primary"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
            2
          </div>
          <span className="text-sm font-medium text-foreground">Amount</span>
        </div>
        <div className="w-16 h-0.5 bg-border"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
            3
          </div>
          <span className="text-sm text-muted-foreground">Review</span>
        </div>
      </div>

      {/* Selected Method */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className="text-xs text-muted-foreground">Withdrawing to:</div>
            <div className="text-sm font-semibold text-foreground capitalize">
              {selectedMethod.type === 'crypto' ? `Crypto (${selectedMethod.network})` : selectedMethod.type}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawal Calculator */}
      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/30 py-3 px-4">
          <CardTitle className="text-sm font-semibold">Withdrawal Calculator</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          
          {/* Input Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="amount" className="text-xs font-medium text-foreground">Withdrawal Amount</Label>
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
                <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">Available</span>
                <span className="text-xs font-bold font-mono">{formatCurrency(availableBalance)}</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                $
              </div>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className={`pl-8 h-10 text-base font-medium ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                min={minWithdrawal}
                max={availableBalance}
                step="0.01" />
              
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-[10px] pl-2 pr-4 text-primary hover:text-primary hover:bg-primary/10 font-semibold tracking-wide"
                  onClick={() => handleAmountChange(availableBalance.toString())}>
                  
                  MAX
                </Button>
              </div>
            </div>
            {error &&
            <p className="text-xs text-red-600 flex items-center gap-1.5">
                <AlertCircleIcon className="w-3.5 h-3.5" />
                {error}
              </p>
            }
          </div>

          {/* Breakdown */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3 border border-border/50">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Platform Fee (20%)</span>
              <span className={`font-medium ${role === 'advertiser' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {role === 'advertiser' ? '+' : '-'}{formatCurrency(contlinksCommission)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Processing Fee (2%)</span>
              <span className={`font-medium ${role === 'advertiser' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {role === 'advertiser' ? '+' : '-'}{formatCurrency(processingFee)}
              </span>
            </div>
            <Separator className="bg-border/60" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-foreground">{role === 'advertiser' ? 'Total Refund' : 'Net Amount'}</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-emerald-600">{formatCurrency(totalReceived)}</span>
                <span className="text-xs font-medium text-muted-foreground">USD</span>
              </div>
            </div>
          </div>

              {/* Info */}
              <div className="flex gap-3 p-3 bg-blue-50/50 border border-blue-100 rounded-lg">
                <InfoIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-medium text-blue-900">Important Information</p>
                  <div className="text-[11px] text-blue-700 space-y-0.5">
                    <p>• Minimum withdrawal: {formatCurrency(minWithdrawal)}</p>
                    <p>• Processing time: 5-8 business days</p>
                    {role === 'advertiser' &&
                <p>• Card deposits are refunded to the original card</p>
                }
                  </div>
                </div>
              </div>

        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => onNavigate('withdraw-method')}
          className="border-border hover:bg-accent">
          
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!!error || !amount || parseFloat(amount) < minWithdrawal}
          className="bg-gradient-1 text-primary-foreground hover:opacity-90">
          
          Continue to Review
        </Button>
      </div>
    </div>);

}