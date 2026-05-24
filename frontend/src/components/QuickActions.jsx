import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon, FileTextIcon, DownloadIcon, SettingsIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const actions = [
{
  icon: PlusIcon,
  label: 'New Order',
  description: 'Create a new order',
  color: 'from-blue-500 to-blue-600'
},
{
  icon: FileTextIcon,
  label: 'Generate Report',
  description: 'Export analytics',
  color: 'from-purple-500 to-purple-600'
},
{
  icon: DownloadIcon,
  label: 'Export Data',
  description: 'Download CSV/Excel',
  color: 'from-green-500 to-green-600'
},
{
  icon: SettingsIcon,
  label: 'Settings',
  description: 'Configure dashboard',
  color: 'from-gray-500 to-gray-600'
}];


export function QuickActions() {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, delay: index * 0.1, ease: 'power2.out' }
        );
      }
    });
  }, []);

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div key={action.label} ref={(el) => cardsRef.current[index] = el}>
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 flex items-start gap-3 bg-background hover:bg-accent border-border">
                  
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium text-foreground">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </Button>
              </div>);

          })}
        </div>
      </CardContent>
    </Card>);

}