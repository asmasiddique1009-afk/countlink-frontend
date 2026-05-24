import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLinkIcon, EyeIcon } from 'lucide-react';





// Mock data for orders within a project
const mockOrders = [
{ id: 'ORD-001', website: 'TechCrunch.com', normalPrice: 300, writingPrice: 150, status: 'completed', createdDate: '2024-01-15', finishedDate: '2024-01-18' },
{ id: 'ORD-002', website: 'Forbes.com', normalPrice: 650, writingPrice: 200, status: 'in_progress', createdDate: '2024-01-20', finishedDate: undefined },
{ id: 'ORD-003', website: 'BusinessInsider.com', normalPrice: 450, writingPrice: 150, status: 'active', createdDate: '2024-01-22', finishedDate: undefined }];


export function ProjectOrdersTab({ projectId }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'in_progress':return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'active':return 'bg-blue-50 text-blue-700 border-blue-200';
      default:return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-3 font-medium text-muted-foreground">Order ID</th>
                <th className="px-6 py-3 font-medium text-muted-foreground">Website Name</th>
                <th className="px-6 py-3 font-medium text-muted-foreground">Price</th>
                <th className="px-6 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-3 font-medium text-muted-foreground">Created Date</th>
                <th className="px-6 py-3 font-medium text-muted-foreground">Finished Date</th>
                <th className="px-6 py-3 font-medium text-muted-foreground text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockOrders.map((order) =>
              <tr key={order.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                  <td className="px-6 py-4 font-medium">
                    <div className="flex items-center gap-2">
                      {order.website}
                      <ExternalLinkIcon className="w-3 h-3 text-muted-foreground" />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-semibold text-foreground">${order.normalPrice + order.writingPrice}</span>
                      {order.writingPrice > 0 &&
                    <span className="text-xs text-muted-foreground">+ ${order.writingPrice} Writing</span>
                    }
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={`capitalize ${getStatusBadge(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{order.createdDate}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {order.finishedDate || '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-primary hover:text-primary hover:bg-primary/10">
                      <EyeIcon className="w-4 h-4 mr-1.5" />
                      View
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>);

}