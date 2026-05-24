import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircleIcon, ArrowLeftIcon, FileTextIcon } from 'lucide-react';






export function DepositSuccess({ transaction, onNavigate }) {
  return (
    <div className="max-w-md mx-auto pt-10 space-y-6">
      <Card className="border-emerald-100 bg-emerald-50/50 shadow-sm">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
            <CheckCircleIcon className="w-8 h-8 text-emerald-600" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-emerald-900 mb-2">Deposit Successful</h1>
          <p className="text-emerald-700/80">
            Your funds have been added to your wallet successfully.
          </p>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-sm text-slate-500">Transaction ID</span>
            <span className="text-sm font-mono font-medium text-slate-800">{transaction.id}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-sm text-slate-500">Amount</span>
            <span className="text-lg font-bold text-emerald-600">+${transaction.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-sm text-slate-500">Method</span>
            <span className="text-sm font-medium text-slate-800 capitalize">{transaction.method}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-slate-500">Date</span>
            <span className="text-sm font-medium text-slate-800">
              {new Date(transaction.date).toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onNavigate('overview')}>
          
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Wallet
        </Button>
        <Button
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={() => onNavigate('transaction-details', transaction)}>
          
          <FileTextIcon className="w-4 h-4 mr-2" />
          View Receipt
        </Button>
      </div>
    </div>);

}