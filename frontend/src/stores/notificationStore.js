import { create } from 'zustand';


































export const useNotificationStore = create((set) => ({
  notifications: [
  {
    id: 'NOT-001',
    message: 'Your order has been accepted by the publisher. The publisher has started working on your guest post placement.',
    status: 'ORDER_ACCEPTED',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    isRead: false
  },
  {
    id: 'NOT-002',
    message: 'The publisher has submitted the live link for your order. Please review the link and confirm if everything looks good.',
    status: 'LINK_SUBMITTED',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    isRead: false
  },
  {
    id: 'NOT-003',
    message: 'The publisher has submitted a revision for your order. Please review the updated details and confirm if everything is correct.',
    status: 'REVISION_SUBMITTED',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    isRead: false
  },
  {
    id: 'NOT-004',
    message: 'Your order has been successfully completed. The live link has been published and verified.',
    status: 'ORDER_COMPLETED',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    isRead: true
  },
  {
    id: 'NOT-005',
    message: 'You have received a new message from the publisher. Click to view and respond.',
    status: 'MESSAGE_RECEIVED',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
    isRead: true
  },
  {
    id: 'NOT-006',
    message: 'Your order has been cancelled. The funds have been returned to your wallet.',
    status: 'ORDER_CANCELLED',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    isRead: true
  },
  {
    id: 'NOT-007',
    message: 'A new website matching your filters is available. You may review it and place an order.',
    status: 'NEW_OPPORTUNITY',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isRead: true
  },
  {
    id: 'NOT-008',
    message: 'Your account password has been updated successfully; if this action was not authorized by you, please contact support immediately.',
    status: 'PASSWORD_UPDATED',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    isRead: true
  }],

  unreadCount: 3,

  markAsRead: (id) => set((state) => {
    const updatedNotifications = state.notifications.map((n) =>
    n.id === id ? { ...n, isRead: true } : n
    );
    return {
      notifications: updatedNotifications,
      unreadCount: updatedNotifications.filter((n) => !n.isRead).length
    };
  }),

  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    unreadCount: 0
  })),

  deleteNotification: (id) => set((state) => ({
    notifications: state.notifications.filter((n) => n.id !== id),
    unreadCount: state.notifications.filter((n) => n.id !== id && !n.isRead).length
  }))
}));