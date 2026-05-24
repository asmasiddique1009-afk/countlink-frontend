import { Card, CardContent } from '@/components/ui/card';
import { TrendingUpIcon, TargetIcon, ZapIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const insights = [
{
  icon: TargetIcon,
  title: 'Weekly Goal',
  description: 'You are 85% towards your weekly sales goal',
  progress: 85,
  color: 'success'
},
{
  icon: TrendingUpIcon,
  title: 'Sales Prediction',
  description: 'Expected to reach $50K by end of month',
  highlight: '+12%',
  color: 'primary'
},
{
  icon: ZapIcon,
  title: 'Performance',
  description: 'Your response time improved by 23%',
  highlight: 'Excellent',
  color: 'tertiary'
}];


export function InsightsSection() {
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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">AI Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={insight.title} ref={(el) => cardsRef.current[index] = el}>
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-1 flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-1">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                      {insight.progress &&
                      <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                          className="bg-gradient-1 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${insight.progress}%` }} />
                        
                        </div>
                      }
                      {insight.highlight &&
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-${insight.color}/10 text-${insight.color}`}>
                          {insight.highlight}
                        </span>
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>);

        })}
      </div>
    </div>);

}