import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquareIcon } from 'lucide-react';





const mockMessages = [
{ id: 'MSG-001', sender: 'Publisher A', message: 'Hello, regarding the article for TechCrunch...', time: '2 hours ago', avatar: 'A' },
{ id: 'MSG-002', sender: 'Publisher B', message: 'Draft is ready for review.', time: '1 day ago', avatar: 'B' }];


export function ProjectMessagesTab({ projectId }) {
  return (
    <div className="space-y-4">
      {mockMessages.map((msg) =>
      <Card key={msg.id} className="border-border shadow-sm hover:shadow-md transition-all cursor-pointer">
          <CardContent className="p-4 flex items-center gap-4">
            <Avatar>
              <AvatarFallback>{msg.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-foreground">{msg.sender}</h4>
                <span className="text-xs text-muted-foreground">{msg.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{msg.message}</p>
            </div>
            <Button variant="ghost" size="icon">
              <MessageSquareIcon className="w-4 h-4 text-muted-foreground" />
            </Button>
          </CardContent>
        </Card>
      )}
      {mockMessages.length === 0 &&
      <div className="text-center py-12 text-muted-foreground">
          No messages yet for this project.
        </div>
      }
    </div>);

}