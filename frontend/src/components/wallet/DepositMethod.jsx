import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, CreditCardIcon, Building2Icon, BitcoinIcon, ChevronRightIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';





export function DepositMethod({ onNavigate }) {
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

  const methods = [
  {
    id: 'crypto',
    title: 'Cryptocurrency',
    description: 'Deposit via USDT, BTC, ETH (Instant)',
    icon: BitcoinIcon,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100'
  },
  {
    id: 'card',
    title: 'Credit / Debit Card',
    description: 'Visa, Mastercard, Amex (Instant)',
    icon: CreditCardIcon,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100'
  },
  {
    id: 'bank',
    title: 'Bank Transfer',
    description: 'Wire Transfer, ACH (1-3 Business Days)',
    icon: Building2Icon,
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-100'
  }];


  return (
    <div className="space-y-6 max-w-3xl mx-auto">
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
          <h1 className="text-2xl font-semibold text-slate-800">Deposit Funds</h1>
          <p className="text-sm text-slate-500 mt-1">Select a payment method to add funds</p>
        </div>
      </div>

      <div className="grid gap-4">
        {methods.map((method, index) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              ref={(el) => cardsRef.current[index] = el}
              onClick={() => onNavigate('deposit-amount', method.id)}
              className="w-full group text-left">
              
              <Card className="border-slate-200 shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-200">
                <CardContent className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.bg} ${method.border} border`}>
                      <Icon className={`w-6 h-6 ${method.color}`} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-800 group-hover:text-primary transition-colors">
                        {method.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {method.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            </button>);

        })}
      </div>
    </div>);

}