import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWalletStore } from '@/stores/walletStore';
import { useUserStore } from '@/stores/userStore';
import {
  WalletIcon,
  CreditCardIcon,
  ArrowDownIcon,
  SearchIcon,
  ArrowUpRightIcon,
  TrendingUpIcon,
  DollarSignIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon } from
'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';





// Generate sample transactions (set to 0 for empty state)
const generateTransactions = (role) => {
  const baseTransactions = [
  {
    id: 'TXN-001',
    date: '2024-01-15T10:30:00',
    description: 'Order #GP-001 - TechCrunch.com',
    type: 'order',
    method: 'Platform',
    amount: 400.00,
    status: role === 'publisher' ? 'credit' : 'debit'
  },
  {
    id: 'TXN-002',
    date: '2024-01-14T14:20:00',
    description: 'Withdrawal to PayPal',
    type: 'withdrawal',
    method: 'PayPal',
    amount: 500.00,
    status: 'completed',
    platformFee: 100.00,
    processingFee: 15.00,
    netAmount: 385.00
  },
  {
    id: 'TXN-003',
    date: '2024-01-13T09:15:00',
    description: 'Order #GP-002 - Forbes.com',
    type: 'order',
    method: 'Platform',
    amount: 700.00,
    status: 'frozen'
  },
  {
    id: 'TXN-004',
    date: '2024-01-12T16:45:00',
    description: 'Withdrawal to Crypto',
    type: 'withdrawal',
    method: 'USDT (TRC20)',
    amount: 1000.00,
    status: 'processing',
    platformFee: 200.00,
    processingFee: 30.00,
    netAmount: 770.00
  },
  {
    id: 'TXN-005',
    date: '2024-01-11T11:30:00',
    description: 'Order #GP-003 - Entrepreneur.com',
    type: 'order',
    method: 'Platform',
    amount: 530.00,
    status: role === 'publisher' ? 'credit' : 'debit'
  },
  {
    id: 'TXN-006',
    date: '2024-01-10T09:00:00',
    description: 'Funds Deposit - Credit Card',
    type: 'deposit',
    method: 'Stripe',
    amount: 2000.00,
    status: 'deposit'
  }];


  const allTransactions = [];
  for (let i = 0; i < 50; i++) {// Generate 50 sample transactions
    const baseTransaction = baseTransactions[i % baseTransactions.length];

    // Filter logic based on role
    if (role === 'publisher') {
      // Publishers don't see deposits or debits (spending)
      if (baseTransaction.type === 'deposit') continue;
      if (baseTransaction.status === 'debit') continue;
    } else {
      // Advertisers don't see credits (earnings) - assuming they only spend
      if (baseTransaction.status === 'credit') continue;
    }

    const date = new Date();
    date.setDate(date.getDate() - i);

    allTransactions.push({
      ...baseTransaction,
      id: `TXN-${String(i + 1).padStart(3, '0')}`,
      date: date.toISOString()
    });
  }
  return allTransactions;
};

export function WalletOverview({ onNavigate }) {
  const { role } = useUserStore();
  const {
    pendingClearance,
    availableBalance,
    totalEarnings,
    selectedCurrency
  } = useWalletStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 20;

  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const tableRef = useRef(null);

  const transactions = generateTransactions(role);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: 0.1 + index * 0.06,
            ease: 'power2.out'
          }
        );
      }
    });

    if (tableRef.current) {
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.25, ease: 'power2.out' }
      );
    }
  }, []);

  const formatCurrency = (amount) => {
    const symbols = { USD: '$', EUR: '€', GBP: '£' };
    return `${symbols[selectedCurrency]}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch = txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || txn.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Header - Smaller */}
      <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Wallet</h1>
          <p className="text-xs text-slate-500 mt-0.5">Track your earnings, balance, and financial history.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onNavigate('payout-methods')}
            className="border-slate-200 text-slate-700 hover:bg-slate-50 h-8 text-xs">
            
            <CreditCardIcon className="w-3.5 h-3.5 mr-1.5" />
            {role === 'advertiser' ? 'Payment Methods' : 'Payout Methods'}
          </Button>
          
          <Button
            onClick={() => onNavigate('withdraw-method')}
            className={`${role === 'advertiser' ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-blue-600 text-white hover:bg-blue-700'} h-8 text-xs shadow-sm`}>
            
            <ArrowDownIcon className="w-3.5 h-3.5 mr-1.5" />
            Withdraw
          </Button>
          
          {role === 'advertiser' &&
          <Button
            onClick={() => onNavigate('deposit-method')}
            className="bg-emerald-600 text-white hover:bg-emerald-700 h-8 text-xs shadow-sm">
            
              <ArrowUpRightIcon className="w-3.5 h-3.5 mr-1.5" />
              Deposit
            </Button>
          }
        </div>
      </div>

      {/* Earnings Summary Cards - Optimized */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pending Clearance */}
        <Card
          ref={(el) => cardsRef.current[0] = el}
          className="border-border bg-card shadow-sm hover:shadow-md transition-all duration-200 group">
          
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Pending Clearance</p>
                <h3 className="text-2xl font-bold text-foreground tracking-tight">{formatCurrency(pendingClearance)}</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100 group-hover:scale-110 transition-transform duration-200">
                <ClockIcon className="w-4 h-4 text-amber-600" strokeWidth={2} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                <ClockIcon className="w-3 h-3" />
                Awaiting clearance
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Available Balance */}
        <Card
          ref={(el) => cardsRef.current[1] = el}
          className="border-border bg-card shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-8 -mt-8 blur-xl" />
          <CardContent className="p-5 relative">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Available Balance</p>
                <h3 className="text-2xl font-bold text-foreground tracking-tight">{formatCurrency(availableBalance)}</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 group-hover:scale-110 transition-transform duration-200">
                <DollarSignIcon className="w-4 h-4 text-emerald-600" strokeWidth={2} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <ArrowUpRightIcon className="w-3 h-3" />
                Ready to withdraw
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Total Earnings */}
        <Card
          ref={(el) => cardsRef.current[2] = el}
          className="border-border bg-card shadow-sm hover:shadow-md transition-all duration-200 group">
          
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Total Earnings</p>
                <h3 className="text-2xl font-bold text-foreground tracking-tight">{formatCurrency(totalEarnings)}</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform duration-200">
                <TrendingUpIcon className="w-4 h-4 text-blue-600" strokeWidth={2} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="text-emerald-600 font-medium flex items-center gap-0.5">
                <ArrowUpRightIcon className="w-3 h-3" /> +12.5%
              </span>
              <span>vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History Section */}
      <Card ref={tableRef} className="border-border shadow-sm bg-card overflow-hidden">
        {transactions.length > 0 &&
        <div className="p-4 border-b border-border bg-white">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search */}
              <div className="relative w-full sm:max-w-md">
                <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                placeholder="Search transactions by ID or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs bg-slate-50 border-slate-200 focus-visible:ring-primary/20 transition-all w-full hover:border-slate-300 focus:bg-white" />
              
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[140px] h-9 text-xs bg-white border-slate-200 text-slate-700 font-medium hover:bg-slate-50">
                    <SelectValue placeholder="Transaction Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="order">Orders</SelectItem>
                    <SelectItem value="withdrawal">Withdrawals</SelectItem>
                    <SelectItem value="deposit">Deposits</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[160px] h-9 text-xs bg-white border-slate-200 text-slate-700 font-medium hover:bg-slate-50">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="frozen">Frozen</SelectItem>
                    <SelectItem value="credit">Credit</SelectItem>
                    <SelectItem value="debit">Debit</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="deposit">Deposit</SelectItem>
                    <SelectItem value="withdraw">Withdraw</SelectItem>
                  </SelectContent>
                </Select>

                {(searchQuery || typeFilter !== 'all' || statusFilter !== 'all') &&
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setTypeFilter('all');
                  setStatusFilter('all');
                }}
                className="h-9 w-9 p-0 text-slate-400 hover:text-rose-500 hover:bg-rose-50 shrink-0"
                title="Reset Filters">
                
                    <span className="sr-only">Reset</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                  </Button>
              }
              </div>
            </div>
          </div>
        }

        {transactions.length === 0 ?
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center mb-4 border border-blue-100">
              <WalletIcon className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">No Transactions Yet</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-sm">
              {role === 'advertiser' ?
            "Your transaction history will appear here once you make your first deposit or purchase." :
            "Your transaction history will appear here once you receive your first payment or make a withdrawal."
            }
            </p>
            <div className="flex gap-2 mt-6">
              {role === 'advertiser' ?
            <>
                  <Button
                onClick={() => onNavigate('deposit-method')}
                className="bg-emerald-600 text-white hover:bg-emerald-700 h-9 text-sm shadow-sm">
                
                    <ArrowUpRightIcon className="w-4 h-4 mr-1.5" />
                    Make a Deposit
                  </Button>
                  <Button
                variant="outline"
                onClick={() => window.location.href = '/catalogue'}
                className="border-slate-200 text-slate-700 hover:bg-slate-50 h-9 text-sm">
                
                    Browse Catalogue
                  </Button>
                </> :

            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="border-slate-200 text-slate-700 hover:bg-slate-50 h-9 text-sm">
              
                  View Dashboard
                </Button>
            }
            </div>
          </div> :
        paginatedTransactions.length > 0 ?
        <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider w-[180px]">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider w-[120px]">
                      Type
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider min-w-[200px]">
                      Description
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider w-[140px]">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider w-[140px] text-right">
                      Amount
                    </th>
                    <th className="px-6 py-4 w-[50px]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                  {paginatedTransactions.map((txn) =>
                <tr
                  key={txn.id}
                  onClick={() => onNavigate('transaction-details', txn)}
                  className="group hover:bg-slate-50/60 transition-colors cursor-pointer">
                  
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-slate-700">
                            {new Date(txn.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                          </span>
                          <span className="text-[10px] text-slate-400 mt-0.5">
                            {new Date(txn.date).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      txn.type === 'deposit' || txn.status === 'credit' ?
                      'bg-emerald-50 border-emerald-100 text-emerald-600' :
                      txn.type === 'withdrawal' || txn.status === 'debit' || txn.status === 'withdraw' ?
                      'bg-slate-50 border-slate-100 text-slate-600' :
                      'bg-blue-50 border-blue-100 text-blue-600'}`
                      }>
                            {txn.type === 'deposit' || txn.status === 'credit' ?
                        <ArrowDownIcon className="w-3 h-3 rotate-180" strokeWidth={2.5} /> :
                        txn.type === 'withdrawal' || txn.status === 'debit' || txn.status === 'withdraw' ?
                        <ArrowUpRightIcon className="w-3 h-3" strokeWidth={2.5} /> :

                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        }
                          </div>
                          <span className="text-xs font-medium text-slate-700 capitalize">{txn.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-800">{txn.description}</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-slate-500">{txn.method}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(txn.status)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className={`text-sm font-bold ${
                      txn.status === 'credit' || txn.type === 'deposit' ? 'text-emerald-600' : 'text-slate-900'}`
                      }>
                            {txn.status === 'credit' || txn.type === 'deposit' ? '+' : '-'}{formatCurrency(txn.amount)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <ChevronRightIcon className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-border bg-slate-50/50">
              <p className="text-[11px] text-slate-500">
                Showing <span className="font-medium text-slate-700">{startIndex + 1}-{Math.min(endIndex, filteredTransactions.length)}</span> of <span className="font-medium text-slate-700">{filteredTransactions.length}</span>
              </p>
              <div className="flex items-center gap-1">
                <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-7 w-7 p-0 border-slate-200">
                
                  <ChevronLeftIcon className="w-3.5 h-3.5" />
                </Button>
                
                {getPageNumbers().map((page, index) =>
              page === '...' ?
              <span key={`ellipsis-${index}`} className="px-1.5 text-[10px] text-slate-400">...</span> :

              <Button
                key={page}
                variant={currentPage === page ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`h-7 w-7 p-0 text-[11px] ${currentPage !== page ? "text-slate-600 hover:bg-slate-100" : ""}`}>
                
                      {page}
                    </Button>

              )}
                
                <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="h-7 w-7 p-0 border-slate-200">
                
                  <ChevronRightIcon className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </> :
        transactions.length > 0 ?
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3 border border-slate-100">
              <SearchIcon className="w-5 h-5 text-slate-300" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">No transactions found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button
            variant="outline"
            size="sm"
            className="mt-4 h-8 text-xs border-slate-200"
            onClick={() => {
              setSearchQuery('');
              setTypeFilter('all');
              setStatusFilter('all');
            }}>
            
              Clear Filters
            </Button>
          </div> :
        null}
      </Card>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>);

}