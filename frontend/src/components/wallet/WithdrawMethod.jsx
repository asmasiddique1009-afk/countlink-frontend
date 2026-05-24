import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWalletStore } from '@/stores/walletStore';
import { ArrowLeftIcon, WalletIcon, PlusIcon, AlertCircleIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';





export function WithdrawMethod({ onNavigate }) {
  const { payoutMethods } = useWalletStore();
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
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
            delay: 0.1 + index * 0.08,
            ease: 'power2.out'
          }
        );
      }
    });
  }, []);

  const handleMethodSelect = (method) => {
    onNavigate('withdraw-amount', method);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div ref={headerRef} className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNavigate('overview')}
          className="hover:bg-slate-100">
          
          <ArrowLeftIcon className="w-5 h-5 text-slate-600" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Withdraw Earnings</h1>
          <p className="text-sm text-slate-500 mt-1">Select your payout method</p>
        </div>
      </div>

      {/* Info Notice */}
      <Card ref={(el) => cardsRef.current[0] = el} className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <AlertCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              Withdrawal requests are processed within 5-8 business days. 
              Ensure your payout details are correct before proceeding.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payout Methods */}
      <Card ref={(el) => cardsRef.current[1] = el} className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-slate-50 py-4">
          <CardTitle className="text-base font-semibold text-slate-800">Select Payout Method</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="space-y-3">
            {payoutMethods.length > 0 ?
            payoutMethods.map((method, index) =>
            <button
              key={method.id}
              ref={(el) => cardsRef.current[index + 2] = el}
              onClick={() => handleMethodSelect(method)}
              className="w-full border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-left">
              
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <WalletIcon className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-slate-800 capitalize">
                          {method.type === 'crypto' ? `Crypto (${method.network})` : method.type}
                        </p>
                        <p className="text-sm text-slate-500">
                          {method.email || method.accountId || `${method.walletAddress?.slice(0, 10)}...${method.walletAddress?.slice(-8)}`}
                        </p>
                      </div>
                    </div>
                    {method.isDefault &&
                <Badge className="bg-green-50 text-green-700 border-green-200">
                        Default
                      </Badge>
                }
                  </div>
                </button>
            ) :

            <div className="text-center py-12">
                <WalletIcon className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-40" />
                <h3 className="text-base font-semibold text-slate-800 mb-2">No Payout Methods</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Add a payout method to withdraw funds
                </p>
                <Button
                onClick={() => onNavigate('payout-methods')}
                className="bg-blue-600 text-white hover:bg-blue-700">
                
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Payout Method
                </Button>
              </div>
            }
          </div>

          {payoutMethods.length > 0 &&
          <div className="mt-6 pt-6 border-t border-slate-200">
              <Button
              variant="outline"
              onClick={() => onNavigate('payout-methods')}
              className="w-full border-slate-200 text-slate-700 hover:bg-slate-50">
              
                <PlusIcon className="w-4 h-4 mr-2" />
                Add New Method
              </Button>
            </div>
          }
        </CardContent>
      </Card>
    </div>);

}