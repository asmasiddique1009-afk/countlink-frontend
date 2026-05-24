import { useState } from 'react';
import { WalletOverview } from './WalletOverview';
import { TransactionDetails } from './TransactionDetails';
import { WithdrawMethod } from './WithdrawMethod';
import { WithdrawAmount } from './WithdrawAmount';
import { WithdrawReview } from './WithdrawReview';
import { WithdrawSuccess } from './WithdrawSuccess';
import { PayoutMethods } from './PayoutMethods';
import { DepositMethod } from './DepositMethod';
import { DepositAmount } from './DepositAmount';
import { DepositSuccess } from './DepositSuccess';
import { useUserStore } from '@/stores/userStore';

















export function WalletContainer({ initialPage }) {
  const { role } = useUserStore();
  const [currentPage, setCurrentPage] = useState(initialPage || 'overview');
  const [pageData, setPageData] = useState(null);

  const handleNavigate = (page, data) => {
    setCurrentPage(page);
    setPageData(data || null);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <WalletOverview onNavigate={handleNavigate} role={role} />;

      case 'transaction-details':
        return <TransactionDetails transaction={pageData} onNavigate={handleNavigate} />;

      case 'withdraw-method':
        return <WithdrawMethod onNavigate={handleNavigate} />;

      case 'withdraw-amount':
        return <WithdrawAmount selectedMethod={pageData} onNavigate={handleNavigate} />;

      case 'withdraw-review':
        return <WithdrawReview withdrawData={pageData} onNavigate={handleNavigate} />;

      case 'withdraw-success':
        return <WithdrawSuccess withdrawalData={pageData} onNavigate={handleNavigate} />;

      case 'payout-methods':
        return <PayoutMethods onNavigate={handleNavigate} />;

      case 'deposit-method':
        return <DepositMethod onNavigate={handleNavigate} />;

      case 'deposit-amount':
        return <DepositAmount method={pageData} onNavigate={handleNavigate} />;

      case 'deposit-success':
        return <DepositSuccess transaction={pageData} onNavigate={handleNavigate} />;

      default:
        return <WalletOverview onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-0">
      {renderPage()}
    </div>);

}