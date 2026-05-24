import { useMessageStore } from '@/stores/messageStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';





export function ConversationList({ className }) {
  const { conversations, selectedConversationId, selectConversation } = useMessageStore();

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className={cn("flex flex-col h-full bg-card border-r border-border", className)}>
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Inbox</h2>
        <p className="text-xs text-muted-foreground mt-1">
          {conversations.reduce((acc, curr) => acc + curr.unreadCount, 0)} unread messages
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {conversations.map((conversation) =>
        <div
          key={conversation.id}
          onClick={() => selectConversation(conversation.id)}
          className={cn(
            "p-4 border-b border-border transition-colors hover:bg-accent/50 relative group cursor-pointer",
            selectedConversationId === conversation.id ? "bg-accent" : "bg-card"
          )}>
          
            <div className="flex gap-3">
              <div className="relative flex-shrink-0">
                <Avatar className="w-10 h-10 border border-border">
                  <AvatarImage src={conversation.otherParty.avatar} />
                  <AvatarFallback>{conversation.otherParty.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {conversation.otherParty.isOnline &&
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full"></span>
              }
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <span className="text-sm font-normal text-foreground truncate leading-tight">
                    {conversation.otherParty.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap flex-shrink-0 ml-2 mt-0.5">
                    {formatTime(conversation.lastMessage.timestamp)}
                  </span>
                </div>
                
                <div className="flex justify-between items-end gap-2">
                  <p className={cn(
                  "text-xs truncate leading-relaxed max-w-[85%]",
                  conversation.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                )}>
                    {conversation.lastMessage.senderId === 'me' && <span className="text-muted-foreground mr-1">You:</span>}
                    {conversation.lastMessage.text}
                  </p>
                  {conversation.unreadCount > 0 &&
                <Badge className="h-5 min-w-[20px] px-1.5 flex items-center justify-center bg-primary text-primary-foreground text-[10px] rounded-full">
                      {conversation.unreadCount}
                    </Badge>
                }
                </div>
              </div>
            </div>
            
            {/* Active Indicator Bar */}
            {selectedConversationId === conversation.id &&
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
          }
          </div>
        )}
      </div>
    </div>);

}