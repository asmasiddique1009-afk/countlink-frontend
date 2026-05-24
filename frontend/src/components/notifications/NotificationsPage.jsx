import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNotificationStore } from '@/stores/notificationStore';
import {
  BellIcon,
  CheckCheckIcon,
  ShoppingCartIcon,
  FileEditIcon,
  XCircleIcon,
  LockIcon,
  MailIcon,
  ClockIcon,
  Trash2Icon } from
'lucide-react';
import { gsap } from 'gsap';

export function NotificationsPage() {
  const { notifications, markAllAsRead, markAsRead, deleteNotification } = useNotificationStore();
  const [filter, setFilter] = useState('all');
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [filter]);

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    return true;
  });

  const getStatusConfig = (status) => {
    switch (status) {
      case 'ORDER_RECEIVED':
        return {
          icon: ShoppingCartIcon,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-100'
        };
      case 'REVISION_REQUESTED':
        return {
          icon: FileEditIcon,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          border: 'border-amber-100'
        };
      case 'ORDER_CANCELLED':
        return {
          icon: XCircleIcon,
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-100'
        };
      case 'PASSWORD_UPDATED':
        return {
          icon: LockIcon,
          color: 'text-slate-600',
          bg: 'bg-slate-50',
          border: 'border-slate-100'
        };
      case 'EMAIL_UPDATED':
        return {
          icon: MailIcon,
          color: 'text-slate-600',
          bg: 'bg-slate-50',
          border: 'border-slate-100'
        };
      default:
        return {
          icon: BellIcon,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-100'
        };
    }
  };

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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BellIcon className="w-5 h-5 text-primary" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            <p className="text-sm text-muted-foreground">System alerts and account updates</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={markAllAsRead}
          className="text-muted-foreground hover:text-foreground">
          
          <CheckCheckIcon className="w-4 h-4 mr-2" />
          Mark all as read
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 border-b border-border pb-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
          filter === 'all' ?
          'text-primary' :
          'text-muted-foreground hover:text-foreground'}`
          }>
          
          All Notifications
          {filter === 'all' &&
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
          }
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
          filter === 'unread' ?
          'text-primary' :
          'text-muted-foreground hover:text-foreground'}`
          }>
          
          Unread
          {filter === 'unread' &&
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
          }
        </button>
      </div>

      {/* Notification List */}
      <div ref={listRef} className="space-y-3">
        {filteredNotifications.length > 0 ?
        filteredNotifications.map((notification) => {
          const config = getStatusConfig(notification.status);
          const Icon = config.icon;

          return (
            <Card
              key={notification.id}
              className={`border transition-all duration-200 hover:shadow-md ${
              notification.isRead ? 'bg-card border-border' : 'bg-white border-primary/20 shadow-sm'}`
              }
              onClick={() => !notification.isRead && markAsRead(notification.id)}>
              
                <CardContent className="p-5 flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${config.bg} ${config.color} border ${config.border}`}>
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-start justify-between gap-4">
                      <p className={`text-sm leading-relaxed ${notification.isRead ? 'text-muted-foreground' : 'text-foreground font-medium'}`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" />
                          {formatTime(notification.timestamp)}
                        </span>
                        <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="text-muted-foreground hover:text-destructive transition-colors">
                        
                          <Trash2Icon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Status Label */}
                    <div className="mt-3">
                      <Badge variant="outline" className={`text-[10px] font-mono tracking-wider ${config.bg} ${config.color} border-transparent`}>
                        {notification.status}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Unread Indicator */}
                  {!notification.isRead &&
                <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-primary animate-pulse" />
                }
                </CardContent>
              </Card>);

        }) :

        <div className="text-center py-16 bg-muted/30 rounded-xl border border-dashed border-border">
            <BellIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-20" />
            <p className="text-muted-foreground font-medium">No notifications found</p>
          </div>
        }
      </div>
    </div>);

}