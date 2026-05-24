import { create } from 'zustand';




































const generateMockConversations = () => [
{
  id: 'CONV-001',
  orderId: 'ORD-2024-001',
  websiteName: 'TechCrunch.com',
  articleTitle: 'The Future of AI in Healthcare',
  unreadCount: 2,
  otherParty: {
    name: 'Sarah Johnson',
    avatar: 'https://c.animaapp.com/mhmjm5e0FqIvyc/img/ai_2.png',
    isOnline: true,
    role: 'Publisher'
  },
  lastMessage: {
    id: 'MSG-102',
    senderId: 'other',
    text: 'I have reviewed the article and it looks great. When can we expect publication?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 mins ago
  },
  messages: [
  {
    id: 'MSG-101',
    senderId: 'me',
    text: 'Hi Sarah, I just submitted the article for the TechCrunch order.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  },
  {
    id: 'MSG-102',
    senderId: 'other',
    text: 'I have reviewed the article and it looks great. When can we expect publication?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString()
  }]

},
{
  id: 'CONV-002',
  orderId: 'ORD-2024-002',
  websiteName: 'Forbes.com',
  clientAnchorText: 'best crm software',
  unreadCount: 0,
  otherParty: {
    name: 'Michael Chen',
    avatar: 'https://c.animaapp.com/mhmjm5e0FqIvyc/img/ai_3.png',
    isOnline: false,
    lastSeen: '2 hours ago',
    role: 'Advertiser'
  },
  lastMessage: {
    id: 'MSG-203',
    senderId: 'me',
    text: 'The link has been inserted as requested. Please check the draft.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
  },
  messages: [
  {
    id: 'MSG-201',
    senderId: 'other',
    text: 'Hello, for this order we need the anchor text "best crm software" to be placed naturally.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString()
  },
  {
    id: 'MSG-202',
    senderId: 'me',
    text: 'Understood. I will work on the integration.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString()
  },
  {
    id: 'MSG-203',
    senderId: 'me',
    text: 'The link has been inserted as requested. Please check the draft.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  }]

},
// Website Inquiry (No Order ID)
{
  id: 'CONV-003',
  websiteName: 'BusinessInsider.com',
  unreadCount: 1,
  otherParty: {
    name: 'Emma Davis',
    avatar: 'https://c.animaapp.com/mhmjm5e0FqIvyc/img/ai_4.png',
    isOnline: true,
    role: 'Publisher'
  },
  lastMessage: {
    id: 'MSG-301',
    senderId: 'other',
    text: 'Do you accept guest posts about crypto on BusinessInsider?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 mins ago
  },
  messages: [
  {
    id: 'MSG-301',
    senderId: 'other',
    text: 'Do you accept guest posts about crypto on BusinessInsider?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  }]

},
// Direct Message (No Order, No Website)
{
  id: 'CONV-004',
  unreadCount: 0,
  otherParty: {
    name: 'David Wilson',
    avatar: 'https://c.animaapp.com/mhmjm5e0FqIvyc/img/ai_5.png',
    isOnline: false,
    lastSeen: '1 day ago',
    role: 'Advertiser'
  },
  lastMessage: {
    id: 'MSG-402',
    senderId: 'other',
    text: 'Thanks for the info!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() // 2 days ago
  },
  messages: [
  {
    id: 'MSG-401',
    senderId: 'me',
    text: 'Hey David, are you interested in our new bulk packages?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 49).toISOString()
  },
  {
    id: 'MSG-402',
    senderId: 'other',
    text: 'Thanks for the info! I will check them out.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  }]

}];


export const useMessageStore = create((set) => ({
  conversations: generateMockConversations(),
  selectedConversationId: null,

  selectConversation: (id) => set((state) => {
    // Mark as read when selected
    if (id) {
      const updatedConversations = state.conversations.map((c) =>
      c.id === id ? { ...c, unreadCount: 0 } : c
      );
      return { selectedConversationId: id, conversations: updatedConversations };
    }
    return { selectedConversationId: id };
  }),

  sendMessage: (conversationId, text, type = 'text') => set((state) => {
    const newMessage = {
      id: `MSG-${Date.now()}`,
      senderId: 'me',
      text,
      timestamp: new Date().toISOString(),
      type
    };

    return {
      conversations: state.conversations.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            messages: [...c.messages, newMessage],
            lastMessage: newMessage
          };
        }
        return c;
      })
    };
  }),

  markAsRead: (conversationId) => set((state) => ({
    conversations: state.conversations.map((c) =>
    c.id === conversationId ? { ...c, unreadCount: 0 } : c
    )
  })),

  openConversationForOrder: (orderId, websiteName, otherPartyRole) => {
    let conversationId = '';
    set((state) => {
      // Find existing conversation for this order
      const existing = state.conversations.find((c) => c.orderId === orderId);
      if (existing) {
        conversationId = existing.id;
        return {
          selectedConversationId: existing.id,
          conversations: state.conversations.map((c) =>
          c.id === existing.id ? { ...c, unreadCount: 0 } : c
          )
        };
      }
      // Create a new conversation thread for this order
      const newId = `CONV-ORDER-${orderId}`;
      conversationId = newId;
      const newConversation = {
        id: newId,
        orderId,
        websiteName,
        unreadCount: 0,
        otherParty: {
          name: otherPartyRole === 'Publisher' ? 'Publisher' : 'Advertiser',
          avatar: '',
          isOnline: false,
          role: otherPartyRole
        },
        lastMessage: {
          id: `MSG-INIT-${Date.now()}`,
          senderId: 'me',
          text: '',
          timestamp: new Date().toISOString(),
          type: 'text'
        },
        messages: []
      };
      return {
        conversations: [newConversation, ...state.conversations],
        selectedConversationId: newId
      };
    });
    return conversationId;
  }
}));