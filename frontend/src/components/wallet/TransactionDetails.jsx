import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useWalletStore } from '@/stores/walletStore';
import { ArrowLeftIcon, CalendarIcon, HashIcon, CreditCardIcon, FileTextIcon } from 'lucide-react';






export function TransactionDetails({ transaction, onNavigate }) {
  const { selectedCurrency } = useWalletStore();

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return '$0.00';
    const symbols = { USD: '$', EUR: '€', GBP: '£' };
    return `${symbols[selectedCurrency]}${amount.toFixed(2)}`;
  };

  const getStatusBadge = (status) => {
    const styles = {
      frozen: 'text-blue-700 bg-blue-50',
      credit: 'text-emerald-700 bg-emerald-50',
      debit: 'text-slate-700 bg-slate-100',
      processing: 'text-amber-700 bg-amber-50',
      completed: 'text-emerald-700 bg-emerald-50',
      deposit: 'text-emerald-700 bg-emerald-50',
      withdraw: 'text-slate-700 bg-slate-100',
      cancelled: 'text-rose-700 bg-rose-50',
      failed: 'text-rose-700 bg-rose-50'
    };

    const labels = {
      frozen: 'Frozen',
      credit: 'Credit',
      debit: 'Debit',
      processing: 'Processing',
      completed: 'Completed',
      deposit: 'Deposit',
      withdraw: 'Withdrawal',
      cancelled: 'Cancelled',
      failed: 'Failed'
    };

    const style = styles[status] || 'text-gray-700 bg-gray-50';
    const label = labels[status] || status;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${style}`}>
        {label}
      </span>);

  };

  const handleDownloadInvoice = () => {
    const symbols = { USD: '$', EUR: '€', GBP: '£' };
    const currencySymbol = symbols[selectedCurrency] || '$';
    const isCredit = transaction.status === 'credit' || transaction.type === 'deposit';
    const amountSign = isCredit ? '+' : '-';
    const formattedAmount = `${amountSign}${currencySymbol}${Number(transaction.amount).toFixed(2)}`;
    const formattedDate = new Date(transaction.date).toLocaleString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    const statusLabels = {
      frozen: 'Frozen', credit: 'Credit', debit: 'Debit', processing: 'Processing',
      completed: 'Completed', deposit: 'Deposit', withdraw: 'Withdrawal',
      cancelled: 'Cancelled', failed: 'Failed'
    };
    const statusLabel = statusLabels[transaction.status] || transaction.status;
    const typeLabel = transaction.type ? transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1) : '';

    const withdrawalRows = transaction.type === 'withdrawal' ? `
      <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Withdrawal Amount</td><td style="padding:8px 0;text-align:right;font-size:13px;font-weight:600;">${currencySymbol}${Number(transaction.amount).toFixed(2)}</td></tr>
      <tr><td colspan="2" style="padding:2px 0;border-top:1px solid #e2e8f0;"></td></tr>
      <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Platform Fee (20%)</td><td style="padding:8px 0;text-align:right;font-size:13px;color:#e11d48;">-${currencySymbol}${Number(transaction.platformFee || 0).toFixed(2)}</td></tr>
      <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Processing Fee (3%)</td><td style="padding:8px 0;text-align:right;font-size:13px;color:#e11d48;">-${currencySymbol}${Number(transaction.processingFee || 0).toFixed(2)}</td></tr>
      <tr><td colspan="2" style="padding:2px 0;border-top:1px solid #e2e8f0;"></td></tr>
      <tr><td style="padding:8px 0;font-size:13px;font-weight:600;">Total Fees</td><td style="padding:8px 0;text-align:right;font-size:13px;font-weight:600;color:#e11d48;">-${currencySymbol}${(Number(transaction.platformFee || 0) + Number(transaction.processingFee || 0)).toFixed(2)}</td></tr>
      <tr><td colspan="2" style="padding:4px 0;border-top:2px solid #cbd5e1;"></td></tr>
      <tr style="background:#f0fdf4;"><td style="padding:12px;font-size:14px;font-weight:700;color:#15803d;border-radius:4px 0 0 4px;">Net Amount Received</td><td style="padding:12px;text-align:right;font-size:16px;font-weight:800;color:#15803d;border-radius:0 4px 4px 0;">${currencySymbol}${Number(transaction.netAmount || 0).toFixed(2)}</td></tr>
    ` : '';

    const breakdownSection = transaction.type === 'withdrawal' ? `
      <div style="margin-top:24px;">
        <h3 style="font-size:14px;font-weight:700;color:#1e293b;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #f1f5f9;">Withdrawal Breakdown</h3>
        <table style="width:100%;border-collapse:collapse;">${withdrawalRows}</table>
      </div>
    ` : '';

    const invoiceHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Invoice ${transaction.id}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; color: #1e293b; }
    @media print {
      body { background: white; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="background:#1e293b;color:#fff;padding:12px 24px;display:flex;justify-content:space-between;align-items:center;">
    <span style="font-size:14px;font-weight:600;">Invoice ${transaction.id}</span>
    <button onclick="window.print()" style="background:#3b82f6;color:#fff;border:none;padding:8px 20px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600;">🖨️ Print / Save as PDF</button>
  </div>
  <div style="max-width:680px;margin:32px auto;background:#fff;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">
    <div style="background:linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%);padding:36px 40px;color:#fff;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div style="font-size:22px;font-weight:800;letter-spacing:-0.5px;">Contlinks</div>
          <div style="font-size:12px;opacity:0.75;margin-top:4px;">Transaction Invoice</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:13px;opacity:0.75;">Invoice #</div>
          <div style="font-size:15px;font-weight:700;font-family:monospace;">${transaction.id}</div>
        </div>
      </div>
      <div style="margin-top:28px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.2);">
        <div style="font-size:36px;font-weight:800;letter-spacing:-1px;">${formattedAmount}</div>
        <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.15);padding:4px 12px;border-radius:999px;margin-top:8px;">
          <span style="font-size:12px;font-weight:600;">${statusLabel}</span>
        </div>
      </div>
    </div>
    <div style="padding:32px 40px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px;">
        <div style="background:#f8fafc;border-radius:8px;padding:16px;border:1px solid #e2e8f0;">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;margin-bottom:6px;">Date & Time</div>
          <div style="font-size:14px;font-weight:600;color:#1e293b;">${formattedDate}</div>
        </div>
        <div style="background:#f8fafc;border-radius:8px;padding:16px;border:1px solid #e2e8f0;">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;margin-bottom:6px;">Transaction Type</div>
          <div style="font-size:14px;font-weight:600;color:#1e293b;">${typeLabel}</div>
        </div>
        <div style="background:#f8fafc;border-radius:8px;padding:16px;border:1px solid #e2e8f0;">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;margin-bottom:6px;">Payment Method</div>
          <div style="font-size:14px;font-weight:600;color:#1e293b;">${transaction.method}</div>
        </div>
        <div style="background:#f8fafc;border-radius:8px;padding:16px;border:1px solid #e2e8f0;">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;margin-bottom:6px;">Status</div>
          <div style="font-size:14px;font-weight:600;color:#1e293b;">${statusLabel}</div>
        </div>
      </div>
      <div style="background:#f8fafc;border-radius:8px;padding:16px;border:1px solid #e2e8f0;margin-bottom:28px;">
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;margin-bottom:6px;">Description</div>
        <div style="font-size:14px;color:#1e293b;">${transaction.description}</div>
      </div>
      ${breakdownSection}
      <div style="margin-top:32px;padding-top:20px;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
        <div style="font-size:11px;color:#94a3b8;">Generated on ${new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <div style="font-size:11px;color:#94a3b8;">Contlinks Platform · contlinks.com</div>
      </div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([invoiceHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice-${transaction.id}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('overview')}
            className="hover:bg-accent h-8 w-8">
            
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Transaction Details</h1>
            <p className="text-xs text-muted-foreground">View complete transaction information</p>
          </div>
        </div>
        <Button
          onClick={handleDownloadInvoice}
          variant="outline"
          className="h-7 px-2.5 text-xs border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors gap-1.5">
          
          <FileTextIcon className="w-3 h-3" />
          Download Invoice
        </Button>
      </div>

      {/* Core Information */}
      <Card className="border-border shadow-sm">
        <CardHeader className="border-b border-border bg-gradient-to-r from-primary/5 to-tertiary/5 py-3 px-5">
          <CardTitle className="text-sm font-semibold">Core Information</CardTitle>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex items-start gap-3">
              <HashIcon className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Reference ID</p>
                <p className="text-sm font-mono font-medium text-foreground">{transaction.id}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarIcon className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Date & Time</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(transaction.date).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CreditCardIcon className="w-4 h-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Record Type</p>
                <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 capitalize font-normal text-[10px] h-5 px-2">
                  {transaction.type}
                </Badge>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-4 h-4 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Method</p>
                <p className="text-sm font-medium text-foreground">{transaction.method}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-xs text-muted-foreground mb-1">Description</p>
            <p className="text-sm text-foreground leading-relaxed">{transaction.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Amount & Status */}
      <Card className="border-border shadow-sm">
        <CardHeader className="border-b border-border bg-gradient-to-r from-primary/5 to-tertiary/5 py-3 px-5">
          <CardTitle className="text-sm font-semibold">Amount & Status</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Amount</p>
              <p className={`text-xl font-bold tracking-tight ${transaction.status === 'credit' || transaction.type === 'deposit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                {transaction.status === 'credit' || transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <div className="mt-1">
                {getStatusBadge(transaction.status)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawal Breakdown */}
      {transaction.type === 'withdrawal' &&
      <Card className="border-border shadow-sm">
          <CardHeader className="border-b border-border bg-gradient-to-r from-primary/5 to-tertiary/5 py-3 px-5">
            <CardTitle className="text-sm font-semibold">Withdrawal Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Withdrawal Amount</span>
                <span className="text-xs font-semibold text-foreground">
                  {formatCurrency(transaction.amount)}
                </span>
              </div>

              <Separator className="opacity-50" />

              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Platform Fee (20%)</span>
                <span className="text-xs font-medium text-rose-600">
                  -{formatCurrency(transaction.platformFee || 0)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Processing Fee (3%)</span>
                <span className="text-xs font-medium text-rose-600">
                  -{formatCurrency(transaction.processingFee || 0)}
                </span>
              </div>

              <Separator className="opacity-50" />

              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-foreground">Total Fees</span>
                <span className="text-xs font-semibold text-rose-600">
                  -{formatCurrency((transaction.platformFee || 0) + (transaction.processingFee || 0))}
                </span>
              </div>

              <Separator className="border-t-2 my-1" />

              <div className="flex justify-between items-center bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                <span className="text-xs font-semibold text-emerald-900">Net Amount Received</span>
                <span className="text-lg font-bold text-emerald-700">
                  {formatCurrency(transaction.netAmount || 0)}
                </span>
              </div>
            </div>

            {transaction.notes &&
          <>
                <Separator />
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs font-medium text-amber-900 mb-0.5">Processing Notes</p>
                  <p className="text-xs text-amber-800">{transaction.notes}</p>
                </div>
              </>
          }

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-900">
                <strong>Payout Method:</strong> {transaction.method}
              </p>
            </div>
          </CardContent>
        </Card>
      }

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          onClick={() => onNavigate('overview')}
          className="h-9 px-4 text-sm border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors">
          
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Wallet
        </Button>
        </div>
    </div>);

}