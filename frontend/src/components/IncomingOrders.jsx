import { useDashboardStore } from '@/stores/dashboardStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, PackageIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function IncomingOrders() {
  const { incomingOrders } = useDashboardStore();
  const ordersRef = useRef([]);

  useEffect(() => {
    ordersRef.current.forEach((order, index) => {
      if (order) {
        gsap.fromTo(
          order,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, delay: index * 0.1, ease: 'power2.out' }
        );
      }
    });
  }, [incomingOrders]);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Incoming Orders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {incomingOrders.map((order, index) =>
        <div
          key={order.id}
          ref={(el) => ordersRef.current[index] = el}
          className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-tertiary/5 border border-border">
          
            <div className="w-10 h-10 rounded-lg bg-gradient-1 flex items-center justify-center flex-shrink-0">
              <PackageIcon className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{order.customer}</p>
              <p className="text-xs text-muted-foreground">{order.time}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono font-semibold text-foreground">${order.amount.toFixed(2)}</p>
            </div>
          </div>
        )}

        <Button
          variant="outline"
          className="w-full bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground">
          
          View All Orders
          <ArrowRightIcon className="w-4 h-4 ml-2" strokeWidth={1.5} />
        </Button>
      </CardContent>
    </Card>);

}