import {
  CheckCircleIcon,
  MailIcon,



  RefreshCwIcon,
  WalletIcon,
  DownloadIcon,
  FileSearchIcon,
  CheckCircle2Icon,
  LayoutDashboardIcon,
  ShoppingCartIcon } from
'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';





export function OrderConfirmationPage({ onNavigate }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto py-4 px-4" ref={containerRef}>
      {/* Success Header */}
      <div className="flex flex-col items-center text-center gap-4 mb-6">
        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 shadow-sm ring-1 ring-green-500/10">
          <CheckCircleIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex flex-col gap-1 max-w-xl">
          <h1 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-foreground">
            Order Confirmed!
          </h1>
          <p className="text-base text-muted-foreground">
            You have placed your order containing 3 items. Your dashboard has been updated.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border shadow-sm rounded-full py-1.5 px-4 mt-1">
          <MailIcon className="w-4 h-4 text-primary" />
          <p className="text-xs font-medium text-foreground">
            A summary receipt has been sent to your email address.
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div className="w-full mb-6">
        <div className="flex items-end justify-between mb-3 px-1">
          <div>
            <h3 className="text-lg font-bold text-foreground">Your Order Details</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Review the status of your requested placements.</p>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-0.5 bg-muted rounded-md text-[10px] font-mono text-muted-foreground border border-border">
            Placed: Just now
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {/* Item 1 */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-4 hover:shadow-md transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
              <div className="flex items-start gap-3">
                <img src="https://flagcdn.com/w40/us.png" alt="US Flag" className="w-6 h-auto shadow-sm rounded-sm mt-1" />
                <div>
                  <h4 className="font-bold text-base leading-tight group-hover:text-primary transition-colors text-foreground">
                    TechCrunch.com
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                    <span className="text-[11px] font-medium text-muted-foreground">Order ID: #GP-1001-TC</span>
                    <span className="text-muted-foreground text-[10px]">•</span>
                    <span className="text-[11px] text-muted-foreground">Guest Post & Content Creation</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-border mt-1 md:mt-0">
                <div className="flex flex-col items-start md:items-end">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
                    <RefreshCwIcon className="w-3 h-3 animate-spin-slow" />
                    Submitted
                  </span>
                </div>
                <div className="text-right min-w-[70px]">
                  <p className="font-bold text-sm text-foreground">$850.00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-4 hover:shadow-md transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
              <div className="flex items-start gap-3">
                <img src="https://flagcdn.com/w40/us.png" alt="US Flag" className="w-6 h-auto shadow-sm rounded-sm mt-1" />
                <div>
                  <h4 className="font-bold text-base leading-tight group-hover:text-primary transition-colors text-foreground">
                    Forbes.com
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                    <span className="text-[11px] font-medium text-muted-foreground">Order ID: #GP-1002-FB</span>
                    <span className="text-muted-foreground text-[10px]">•</span>
                    <span className="text-[11px] text-muted-foreground">Niche Edit</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-border mt-1 md:mt-0">
                <div className="flex flex-col items-start md:items-end">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
                    <RefreshCwIcon className="w-3 h-3 animate-spin-slow" />
                    Requested
                  </span>
                </div>
                <div className="text-right min-w-[70px]">
                  <p className="font-bold text-sm text-foreground">$1,200.00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-4 hover:shadow-md transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
              <div className="flex items-start gap-3">
                <img src="https://flagcdn.com/w40/us.png" alt="US Flag" className="w-6 h-auto shadow-sm rounded-sm mt-1" />
                <div>
                  <h4 className="font-bold text-base leading-tight group-hover:text-primary transition-colors text-foreground">
                    BusinessInsider.com
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                    <span className="text-[11px] font-medium text-muted-foreground">Order ID: #GP-1003-BI</span>
                    <span className="text-muted-foreground text-[10px]">•</span>
                    <span className="text-[11px] text-muted-foreground">Guest Post & Content Creation</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-border mt-1 md:mt-0">
                <div className="flex flex-col items-start md:items-end">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
                    <RefreshCwIcon className="w-3 h-3 animate-spin-slow" />
                    Submitted
                  </span>
                </div>
                <div className="text-right min-w-[70px]">
                  <p className="font-bold text-sm text-foreground">$500.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Paid */}
        <div className="mt-4 px-4 py-3 bg-muted/30 rounded-lg border border-border flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-10 bg-card border border-border rounded flex items-center justify-center">
              <WalletIcon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-xs text-muted-foreground">
              Paid from account balance
            </div>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Total Paid</span>
              <span className="text-lg font-black text-foreground">$2,565.00</span>
            </div>
            <button className="text-muted-foreground hover:text-primary hover:bg-card transition-all h-8 w-8 flex items-center justify-center rounded-full border border-transparent hover:border-border hover:shadow-sm" title="Download Invoice">
              <DownloadIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="w-full mb-8">
        <h3 className="text-base font-bold mb-4 text-center sm:text-left text-foreground">What Happens Next?</h3>
        <div className="relative">
          <div className="hidden md:block absolute top-5 left-[16%] right-[16%] h-px bg-border z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            <div className="bg-card p-4 rounded-lg border border-border flex flex-col items-center text-center hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 ring-4 ring-card">
                <FileSearchIcon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-foreground">Publisher Review</h4>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Publishers independently review your request against their guidelines.
              </p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border flex flex-col items-center text-center hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 ring-4 ring-card">
                <CheckCircle2Icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-foreground">Acceptance & Delivery</h4>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Once accepted, publisher will publish and deliver on the target website.
              </p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border flex flex-col items-center text-center hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center mb-3 ring-4 ring-card">
                <WalletIcon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-foreground">Payment Release</h4>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Funds will be credited to the publisher from escrow.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 border-t border-border">
        <Button
          onClick={() => onNavigate('purchases')}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-10 px-6 rounded-md shadow-sm transition-all w-full sm:w-auto min-w-[160px] text-sm">
          
          <LayoutDashboardIcon className="w-4 h-4" />
          Go to My Orders
        </Button>
        <Button
          variant="outline"
          onClick={() => onNavigate('catalogue')}
          className="flex items-center justify-center gap-2 bg-card border border-border text-foreground hover:bg-accent font-medium h-10 px-6 rounded-md transition-all w-full sm:w-auto min-w-[160px] text-sm">
          
          <ShoppingCartIcon className="w-4 h-4" />
          Continue Browsing
        </Button>
      </div>
    </div>);

}