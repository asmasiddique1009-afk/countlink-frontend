import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useWalletStore } from '@/stores/walletStore';
import { useUserStore } from '@/stores/userStore';
import { ArrowLeftIcon, AlertCircleIcon, CheckCircleIcon, CreditCardIcon } from 'lucide-react';
import { useState } from 'react';






export function WithdrawReview({ withdrawData, onNavigate }) {
  const { selectedCurrency, submitWithdrawal } = useWalletStore();
  const { role } = useUserStore();
  const [taxAcknowledged, setTaxAcknowledged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { method, amount } = withdrawData;

  const platformFee = amount * 0.20;
  const processingFee = amount * 0.02;

  let netAmount = 0;
  if (role === 'publisher') {
    netAmount = amount - platformFee - processingFee;
  } else {
    // For advertisers, fees are refunded (added back)
    netAmount = amount + platformFee + processingFee;
  }

  const formatCurrency = (value) => {
    const symbols = { USD: '$', EUR: '€', GBP: '£' };
    return `${symbols[selectedCurrency]}${value.toFixed(2)}`;
  };

  const handleSubmit = async () => {
    if (!taxAcknowledged) return;

    setIsSubmitting(true);
    try {
      const transactionId = await submitWithdrawal(amount, method.id);
      onNavigate('withdraw-success', {
        transactionId,
        amount,
        platformFee,
        processingFee,
        netAmount,
        method
      });
    } catch (error) {
      console.error('Withdrawal failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate('withdraw-amount', method)}
          className="hover:bg-accent h-8 w-8">
          
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Review Withdrawal</h1>
          <p className="text-xs text-muted-foreground">Confirm your withdrawal details</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-semibold">
            ✓
          </div>
          <span className="text-xs font-medium text-foreground">Method</span>
        </div>
        <div className="w-12 h-px bg-green-500"></div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-semibold">
            ✓
          </div>
          <span className="text-xs font-medium text-foreground">Amount</span>
        </div>
        <div className="w-12 h-px bg-primary"></div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
            3
          </div>
          <span className="text-xs font-medium text-foreground">Review</span>
        </div>
      </div>

      <div className="grid gap-4">
        {/* Withdrawal Calculation */}
        <Card className="border-border shadow-sm">
          <CardHeader className="border-b border-border py-3 px-5 bg-muted/20">
            <CardTitle className="text-sm font-medium">Transaction Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Withdrawal Amount</span>
                <span className="text-sm font-semibold text-foreground">
                  {formatCurrency(amount)}
                </span>
              </div>

              <Separator className="opacity-50" />

              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Platform Fee (20%)</span>
                <span className={`text-xs font-medium ${role === 'advertiser' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {role === 'advertiser' ? '+' : '-'}{formatCurrency(platformFee)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Processing Fee (2%)</span>
                <span className={`text-xs font-medium ${role === 'advertiser' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {role === 'advertiser' ? '+' : '-'}{formatCurrency(processingFee)}
                </span>
              </div>

              <Separator className="my-1" />

              <div className="flex justify-between items-center pt-1">
                <span className="text-sm font-medium text-foreground">{role === 'advertiser' ? 'Total Refund' : 'Net Amount'}</span>
                <span className="text-xl font-bold text-emerald-600">
                  {formatCurrency(netAmount)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

            {/* Payout Method */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircleIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Payout Method</p>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {method.type === 'crypto' ? `Crypto (${method.network})` : method.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {method.email || method.accountId || `${method.walletAddress?.slice(0, 10)}...${method.walletAddress?.slice(-8)}`}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => onNavigate('withdraw-method')}>Change</Button>
              </CardContent>
            </Card>

            {/* Advertiser Warning for Card Refunds */}
            {role === 'advertiser' &&
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex gap-3 items-start">
                <CreditCardIcon className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-amber-900">Original Payment Method Policy</p>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Please note that funds originally deposited via <strong>Credit/Debit Card</strong> will be processed as a refund to the same card. 
                    Platform commission and processing fees are also refunded to you.
                  </p>
                </div>
              </div>
        }

            {/* Tax & Processing */}
            <div className="grid gap-3">
          <Card className="border-border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="tax-acknowledge"
                  checked={taxAcknowledged}
                  onCheckedChange={(checked) => setTaxAcknowledged(checked)}
                  className="mt-0.5" />
                
                <Label htmlFor="tax-acknowledge" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                  I acknowledge that I am responsible for payment of my taxes and understand that 
                  the platform does not withhold taxes on my behalf.
                </Label>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 flex gap-3 items-start">
            <AlertCircleIcon className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 leading-relaxed">
              Withdrawal requests are processed within 4–7 working days. You will receive 
              an email notification once your withdrawal has been processed.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button
          variant="outline"
          onClick={() => onNavigate('withdraw-amount', method)}
          className="border-border hover:bg-accent h-9 text-sm"
          disabled={isSubmitting}>
          
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!taxAcknowledged || isSubmitting}
          className="bg-primary text-primary-foreground hover:opacity-90 h-9 text-sm px-6">
          
          {isSubmitting ? 'Processing...' : 'Confirm Withdrawal'}
        </Button>
      </div>
    </div>);

}