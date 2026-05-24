import { useDashboardStore } from '@/stores/dashboardStore';
import { useUserStore } from '@/stores/userStore';
import { useMessageStore } from '@/stores/messageStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon, SparklesIcon, CalendarIcon, ClockIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

import { OrderDetailsModal } from '@/components/modals/OrderDetailsModal';

const statusColors = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
  processing: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
  cancelled: 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
};

const LiveTimer = ({ dueDate }) => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const due = new Date(dueDate);
      const now = new Date();
      const diffMs = now.getTime() - due.getTime();
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor(diffMs % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      const minutes = Math.floor(diffMs % (1000 * 60 * 60) / (1000 * 60));
      const seconds = Math.floor(diffMs % (1000 * 60) / 1000);
      if (days > 0) setTimeString(`${days}d ${hours}h ${minutes}m`);else
      if (hours > 0) setTimeString(`${hours}h ${minutes}m`);else
      if (minutes > 0) setTimeString(`${minutes}m ${seconds}s`);else
      setTimeString(`${seconds}s`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [dueDate]);

  return <span className="text-black/70 font-medium">{timeString}</span>;
};





export function OrdersTable({ onOpenChat } = {}) {
  const { orders } = useDashboardStore();
  const { role } = useUserStore();
  const { openConversationForOrder } = useMessageStore();
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState(null);

  const handleSendMessage = (order) => {
    const otherPartyRole = role === 'publisher' ? 'Advertiser' : 'Publisher';
    const conversationId = openConversationForOrder(order.id, order.websiteName, otherPartyRole);
    onOpenChat?.(conversationId, order.id);
  };

  const handleViewMore = (order) => {
    const modalOrder = {
      id: order.id,
      website: order.websiteName,
      status: order.status === 'pending' ? 'new_request' : order.status === 'processing' ? 'in_progress' : order.status,
      price: order.normalPrice,
      writingPrice: order.writingPrice,
      dedicatedPrice: 0,
      createdDate: order.dueDate,
      hasWriting: order.writingPrice > 0,
      details: null,
      submittedUrl: null,
      publishedUrl: order.status === 'completed' ? `${order.websiteName.toLowerCase()}/article` : null,
      instructions: `Please write a high-quality guest post for ${order.websiteName}.`,
      links: [{ anchor: 'example anchor text', url: 'https://example.com', type: 'Do-Follow' }],
      publisher: { name: 'Publisher Name', reviews: 120 },
      advertiser: { name: 'Advertiser Name', reviews: 85 }
    };
    setSelectedOrderForDetails(modalOrder);
    setDetailsModalOpen(true);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg font-medium text-foreground">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground">Order ID / Website</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground">Created / Timer</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground">Earnings</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const dueDate = new Date(order.dueDate);
                const now = new Date();
                const diffTime = dueDate.getTime() - now.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                return (
                  <tr key={order.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2 mb-0.5">
                        <button
                          className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-sm flex items-center gap-1 cursor-pointer bg-transparent border-none p-0">
                          
                          {order.websiteName}
                          <ExternalLinkIcon className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-slate-500 text-xs font-medium font-mono">{order.id}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex flex-col gap-1.5">
                        <div className="text-slate-500 text-xs flex items-center gap-1.5">
                          <CalendarIcon className="w-3 h-3 text-slate-400" />
                          {order.dueDate}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-black">
                          <ClockIcon className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                          {diffDays > 0 ?
                          <span className="font-semibold tabular-nums">{diffDays}d remaining</span> :
                          diffDays === 0 ?
                          <span className="text-amber-600 font-semibold">Due today</span> :

                          <LiveTimer dueDate={order.dueDate} />
                          }
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="text-sm font-semibold text-foreground">${order.normalPrice}</span>
                        {order.isDedicatedTopic && <SparklesIcon className="w-3 h-3 text-blue-600" />}
                      </div>
                      <div className="text-xs text-muted-foreground">+${order.writingPrice} Writing</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <Badge className={`${statusColors[order.status]} font-normal text-xs cursor-default`}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10 h-7 text-xs px-2" onClick={() => handleViewMore(order)}>
                          View
                          <ExternalLinkIcon className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </td>
                  </tr>);

              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-2.5">
          {orders.map((order) => {
            const dueDate = new Date(order.dueDate);
            const now = new Date();
            const diffTime = dueDate.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return (
              <div key={order.id} className="border border-border rounded-lg p-3 bg-background hover:bg-accent/30 transition-colors">
                {/* Row 1: Website + Status */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-blue-600 truncate">{order.websiteName}</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{order.id}</p>
                  </div>
                  <Badge className={`${statusColors[order.status]} font-normal text-[10px] flex-shrink-0`}>
                    {order.status}
                  </Badge>
                </div>
                {/* Row 2: Date + Earnings */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <CalendarIcon className="w-3 h-3" />
                    <span>{order.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">${order.normalPrice}</span>
                    {order.isDedicatedTopic && <SparklesIcon className="w-3 h-3 text-blue-600" />}
                  </div>
                </div>
                {/* Row 3: Timer + Action */}
                <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-border">
                  <div className="flex items-center gap-1 text-[11px]">
                    <ClockIcon className="w-3 h-3 text-slate-400" />
                    {diffDays > 0 ?
                    <span className="font-semibold text-foreground">{diffDays}d remaining</span> :
                    diffDays === 0 ?
                    <span className="text-amber-600 font-semibold">Due today</span> :

                    <LiveTimer dueDate={order.dueDate} />
                    }
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 h-6 text-[11px] px-2 py-0" onClick={() => handleViewMore(order)}>
                      View
                    </Button>
                  </div>
                </div>
              </div>);

          })}
        </div>

        <OrderDetailsModal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          order={selectedOrderForDetails}
          role={role}
          onSendMessage={() => selectedOrderForDetails && handleSendMessage({ id: selectedOrderForDetails.id, websiteName: selectedOrderForDetails.website })} />
        

        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-muted-foreground">Showing 1-8 of 234 orders</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="w-7 h-7 sm:w-8 sm:h-8 bg-background text-foreground border-border hover:bg-accent" aria-label="Previous page">
              <ChevronLeftIcon className="w-3.5 h-3.5" />
            </Button>
            <Button variant="outline" size="icon" className="w-7 h-7 sm:w-8 sm:h-8 bg-background text-foreground border-border hover:bg-accent" aria-label="Next page">
              <ChevronRightIcon className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>);

}