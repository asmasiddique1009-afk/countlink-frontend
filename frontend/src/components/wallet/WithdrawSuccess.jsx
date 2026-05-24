import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useWalletStore } from '@/stores/walletStore';
import { useUserStore } from '@/stores/userStore';
import { CheckCircleIcon, ArrowLeftIcon, FileTextIcon } from 'lucide-react';






export function WithdrawSuccess({ withdrawalData, onNavigate }) {
  const { selectedCurrency } = useWalletStore();
  const { role } = useUserStore();

  const { transactionId, amount, platformFee, processingFee, netAmount, method } = withdrawalData;

  const formatCurrency = (value) => {
    const symbols = { USD: '$', EUR: '€', GBP: '£' };
    return `${symbols[selectedCurrency]}${value.toFixed(2)}`;
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {/* Success Message */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50/50 shadow-sm">
        <CardContent className="p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2 ring-4 ring-green-50">
            <CheckCircleIcon className="w-5 h-5 text-green-600" strokeWidth={2} />
          </div>
          <h1 className="text-lg font-semibold text-green-900 mb-0.5">Withdrawal Submitted</h1>
          <p className="text-[11px] text-green-800/80 max-w-md mx-auto leading-relaxed">
            Your withdrawal request has been successfully submitted and is being processed.
          </p>
        </CardContent>
      </Card>

      {/* Withdrawal Summary */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-8 space-y-5">
          <h2 className="text-lg font-semibold text-foreground mb-4">Transaction Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Reference ID</span>
              <span className="text-sm font-medium text-foreground">{transactionId}</span>
            </div>

            <Separator className="opacity-50" />

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Withdrawal Amount</span>
              <span className="text-sm font-medium text-foreground">{formatCurrency(amount)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Platform Fee</span>
              <span className={`text-sm font-medium ${role === 'advertiser' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {role === 'advertiser' ? '+' : '-'}{formatCurrency(platformFee)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Processing Fee</span>
              <span className={`text-sm font-medium ${role === 'advertiser' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {role === 'advertiser' ? '+' : '-'}{formatCurrency(processingFee)}
              </span>
            </div>

            <Separator className="my-1" />

            <div className="flex justify-between items-center bg-green-50/50 p-3 rounded-lg border border-green-100/50">
              <span className="text-sm font-semibold text-green-900">{role === 'advertiser' ? 'Total Refund' : 'Net Amount'}</span>
              <span className="text-lg font-bold text-green-700">
                {formatCurrency(netAmount)}
              </span>
            </div>

            <Separator className="opacity-50" />

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Payout Method</span>
              <span className="text-sm font-medium text-foreground capitalize">
                {method.type === 'crypto' ? `Crypto (${method.network})` : method.type}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Date</span>
              <span className="text-sm font-medium text-foreground">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Reminder */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex gap-3 items-start">
        <FileTextIcon className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-semibold text-blue-900">What happens next?</p>
          <ul className="text-xs text-blue-800/90 space-y-1 list-disc list-inside">
            <li>Your payment will be processed within 4–7 working days</li>
            <li>You'll receive an email confirmation once processing begins</li>
            <li>You can track the status in your transaction history</li>
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-3 pt-2">
        <Button
          variant="outline"
          onClick={() => onNavigate('overview')}
          className="border-border hover:bg-accent h-9 text-sm">
          
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Wallet
        </Button>
        <Button
          onClick={() => onNavigate('transaction-details', { id: transactionId })}
          className="bg-primary text-primary-foreground hover:opacity-90 h-9 text-sm shadow-sm">
          
          <FileTextIcon className="w-4 h-4 mr-2" />
          View Transaction
        </Button>
      </div>
    </div>);

}