import { ShoppingCartIcon, ClockIcon, DollarSignIcon, TrendingUpIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const metrics = [
{
  icon: ShoppingCartIcon,
  label: 'Total Orders',
  value: '1,234',
  trend: '+12.5%',
  trendUp: true
},
{
  icon: ClockIcon,
  label: 'Pending Orders',
  value: '45',
  trend: '-3.2%',
  trendUp: false
},
{
  icon: DollarSignIcon,
  label: 'Revenue',
  value: '$45,678',
  trend: '+18.7%',
  trendUp: true
},
{
  icon: TrendingUpIcon,
  label: 'Avg Order Value',
  value: '$89.50',
  trend: '+5.3%',
  trendUp: true
}];


export function SummaryCards() {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, delay: index * 0.1, ease: 'power2.out' }
        );
      }
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div key={metric.label} ref={(el) => cardsRef.current[index] = el}>
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground font-normal mb-2">{metric.label}</p>
                    <p className="text-3xl font-mono font-semibold text-foreground mb-2">{metric.value}</p>
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-sm font-normal ${
                        metric.trendUp ? 'text-success' : 'text-warning'}`
                        }>
                        
                        {metric.trend}
                      </span>
                      <span className="text-xs text-muted-foreground">vs last period</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-gradient-1 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>);

      })}
    </div>);

}