import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircleIcon } from 'lucide-react';

export function VideoSection() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">Platform Overview</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Learn how to use the dashboard effectively</p>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <PlayCircleIcon className="w-7 h-7 sm:w-10 sm:h-10 text-primary" strokeWidth={1.5} />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
            <h3 className="text-white font-medium text-sm sm:text-base mb-0.5 sm:mb-1">Getting Started with Countlink</h3>
            <p className="text-white/90 text-xs">5:32 minutes</p>
          </div>
        </div>
        <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-[11px] sm:text-xs text-blue-900">
            <strong className="font-medium">Quick Tip:</strong> Watch this video to understand how to manage your orders, track earnings, and communicate with publishers effectively.
          </p>
        </div>
      </CardContent>
    </Card>);

}