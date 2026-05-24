import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { ShoppingCartIcon, MessageSquareIcon, TruckIcon, AlertCircleIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const activities = [
{
  icon: ShoppingCartIcon,
  title: 'New order received',
  description: 'Order #ORD-245 from Sarah Johnson',
  time: '2 minutes ago',
  type: 'success'
},
{
  icon: MessageSquareIcon,
  title: 'Customer question',
  description: 'Question about shipping times',
  time: '15 minutes ago',
  type: 'info'
},
{
  icon: TruckIcon,
  title: 'Order shipped',
  description: 'Order #ORD-238 has been dispatched',
  time: '1 hour ago',
  type: 'success'
},
{
  icon: AlertCircleIcon,
  title: 'Low stock alert',
  description: 'Product "Premium Widget" running low',
  time: '2 hours ago',
  type: 'warning'
}];


const typeConfig = {
  success: 'bg-green-100 text-green-700 border-green-200',
  info: 'bg-blue-100 text-blue-700 border-blue-200',
  warning: 'bg-amber-100 text-amber-700 border-amber-200'
};

export function RecentActivity() {
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, delay: index * 0.1, ease: 'power2.out' }
        );
      }
    });
  }, []);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div
              key={index}
              ref={(el) => itemsRef.current[index] = el}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
              
              <div className={`w-10 h-10 rounded-lg ${typeConfig[activity.type]} flex items-center justify-center flex-shrink-0 border`}>
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>);

        })}
      </CardContent>
    </Card>);

}