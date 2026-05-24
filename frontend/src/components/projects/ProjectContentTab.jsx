import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LinkIcon, FileTextIcon } from 'lucide-react';





const mockContent = [
{ id: 'ART-001', title: 'The Future of AI in Healthcare', anchor: 'healthcare ai solutions', target: 'https://mybusiness.com/ai-health', status: 'Published' },
{ id: 'ART-002', title: 'Top 10 Business Trends 2024', anchor: 'business consulting', target: 'https://mybusiness.com/consulting', status: 'Drafting' }];


export function ProjectContentTab({ projectId }) {
  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-3 font-medium text-muted-foreground">Article Title</th>
                <th className="px-6 py-3 font-medium text-muted-foreground">Anchor Text</th>
                <th className="px-6 py-3 font-medium text-muted-foreground">Target Link</th>
                <th className="px-6 py-3 font-medium text-muted-foreground">Submission Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockContent.map((item) =>
              <tr key={item.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-medium">
                      <FileTextIcon className="w-4 h-4 text-blue-500" />
                      {item.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className="font-normal bg-slate-100 text-slate-700 border-slate-200">
                      {item.anchor}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <LinkIcon className="w-3 h-3" />
                      <span className="truncate max-w-[200px]">{item.target}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`
                  }>
                      {item.status}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>);

}