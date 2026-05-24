import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardStore } from '@/stores/dashboardStore';
import { PlusIcon, XIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function QAStatisticsChart() {
  const { faqEntries, toggleFAQ } = useDashboardStore();
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, delay: index * 0.05, ease: 'power2.out' }
        );
      }
    });
  }, []);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {faqEntries.map((entry, index) =>
          <div
            key={entry.id}
            ref={(el) => itemsRef.current[index] = el}
            className="border-b border-border last:border-b-0">
            
              <button
              onClick={() => toggleFAQ(entry.id)}
              className="w-full flex items-center justify-between py-3 sm:py-4 text-left hover:bg-accent/30 transition-colors px-2">
              
                <span className="text-xs sm:text-sm font-medium text-foreground pr-3 sm:pr-4">{entry.question}</span>
                {entry.isOpen ?
              <XIcon className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={2} /> :

              <PlusIcon className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={2} />
              }
              </button>
              {entry.isOpen &&
            <div className="pb-4 px-2 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">{entry.answer}</p>
                </div>
            }
            </div>
          )}
        </div>
      </CardContent>
    </Card>);

}