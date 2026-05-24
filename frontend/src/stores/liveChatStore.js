import { create } from 'zustand';
import { persist } from 'zustand/middleware';




























































export const AGENTS = [
{ id: 'agent-1', name: 'Sarah Miller', avatar: 'SM', role: 'Support Specialist', color: '#6366f1' },
{ id: 'agent-2', name: 'James Parker', avatar: 'JP', role: 'Technical Advisor', color: '#0ea5e9' },
{ id: 'agent-3', name: 'Lena Torres', avatar: 'LT', role: 'Account Manager', color: '#ec4899' },
{ id: 'agent-4', name: 'Marcus Webb', avatar: 'MW', role: 'Billing Specialist', color: '#f59e0b' },
{ id: 'agent-5', name: 'Nina Chen', avatar: 'NC', role: 'Onboarding Lead', color: '#10b981' }];


const AUTO_RESPONSES = [
{ agentId: 'agent-1', text: "Hey there! 👋 Happy to help you today. What can I assist you with?" },
{ agentId: 'agent-2', text: "Great question! Let me look into that for you right away." },
{ agentId: 'agent-3', text: "Thanks for reaching out. I'll make sure we get this sorted quickly!" },
{ agentId: 'agent-4', text: "Absolutely, I understand your concern. Here's what we can do..." },
{ agentId: 'agent-5', text: "Perfect, I've noted that down. Is there anything else I can help you with today? 😊" }];


let autoResponseIndex = 0;

const MOCK_SESSIONS = [
{
  id: 'session-mock-1',
  agentId: 'agent-1',
  title: 'Order Issue - Guest Post',
  lastMessage: "We've resolved your order issue. Let us know if you need anything else!",
  lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  unreadCount: 0,
  status: 'resolved'
},
{
  id: 'session-mock-2',
  agentId: 'agent-2',
  title: 'Technical Integration Help',
  lastMessage: "The API key has been sent to your email. Check your spam folder if you don't see it.",
  lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  unreadCount: 2,
  status: 'resolved'
},
{
  id: 'session-mock-3',
  agentId: 'agent-3',
  title: 'Billing & Subscription',
  lastMessage: "Your invoice has been updated. You can download it from the billing section.",
  lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  unreadCount: 0,
  status: 'resolved'
},
{
  id: 'session-mock-4',
  agentId: 'agent-5',
  title: 'Onboarding Walkthrough',
  lastMessage: "Welcome aboard! I've set up your account with all the recommended defaults.",
  lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  unreadCount: 0,
  status: 'resolved'
}];


const MOCK_MESSAGES = [
{
  id: 'msg-mock-1-1',
  sessionId: 'session-mock-1',
  content: "Hi, I have an issue with my guest post order #ORD-2024-042. It's been pending for 5 days.",
  sender: 'user',
  timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 - 8 * 60000),
  type: 'text'
},
{
  id: 'msg-mock-1-2',
  sessionId: 'session-mock-1',
  content: "Hi! I can see your order. The publisher just confirmed — it'll be live within 24 hours. Sorry for the wait!",
  sender: 'agent',
  agentId: 'agent-1',
  timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 - 5 * 60000),
  type: 'text'
},
{
  id: 'msg-mock-1-3',
  sessionId: 'session-mock-1',
  content: "We've resolved your order issue. Let us know if you need anything else!",
  sender: 'agent',
  agentId: 'agent-1',
  timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  type: 'text'
},
{
  id: 'msg-mock-2-1',
  sessionId: 'session-mock-2',
  content: "I need help integrating your API into my dashboard.",
  sender: 'user',
  timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 - 15 * 60000),
  type: 'text'
},
{
  id: 'msg-mock-2-2',
  sessionId: 'session-mock-2',
  content: "Sure! I'll generate a fresh API key for you. One moment.",
  sender: 'agent',
  agentId: 'agent-2',
  timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 - 10 * 60000),
  type: 'text'
},
{
  id: 'msg-mock-2-3',
  sessionId: 'session-mock-2',
  content: "The API key has been sent to your email. Check your spam folder if you don't see it.",
  sender: 'agent',
  agentId: 'agent-2',
  timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  type: 'text'
}];


function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useLiveChatStore = create()(
  persist(
    (set, get) => ({
      isOpen: false,
      screen: 'home',
      activeSessionId: null,
      sessions: MOCK_SESSIONS,
      messages: MOCK_MESSAGES,
      unreadTotal: 2,
      isTyping: false,
      inputValue: '',
      showEmojiPicker: false,
      showGifPicker: false,

      openWidget: () => set({ isOpen: true }),
      closeWidget: () => set({ isOpen: false, showEmojiPicker: false, showGifPicker: false }),

      setScreen: (screen) => set({ screen, showEmojiPicker: false, showGifPicker: false }),

      startNewChat: () => {
        const sessionId = `session-${generateId()}`;
        const agentId = AGENTS[Math.floor(Math.random() * AGENTS.length)].id;
        const newSession = {
          id: sessionId,
          agentId,
          title: 'New Conversation',
          lastMessage: '',
          lastMessageAt: new Date(),
          unreadCount: 0,
          status: 'active'
        };
        set((state) => ({
          sessions: [newSession, ...state.sessions],
          activeSessionId: sessionId,
          screen: 'chat',
          showEmojiPicker: false,
          showGifPicker: false
        }));
        // Greet after 1.2s
        setTimeout(() => {
          set({ isTyping: true });
          setTimeout(() => {
            const resp = AUTO_RESPONSES[0];
            get().receiveMessage(sessionId, resp.text, resp.agentId);
            set({ isTyping: false });
          }, 1800);
        }, 1200);
      },

      openSession: (sessionId) => {
        set({ activeSessionId: sessionId, screen: 'chat', showEmojiPicker: false, showGifPicker: false });
        get().markSessionRead(sessionId);
      },

      sendMessage: (content, type = 'text', extra = {}) => {
        const { activeSessionId, sessions } = get();
        if (!activeSessionId) return;
        const newMsg = {
          id: `msg-${generateId()}`,
          sessionId: activeSessionId,
          content,
          sender: 'user',
          timestamp: new Date(),
          type,
          ...extra
        };
        const session = sessions.find((s) => s.id === activeSessionId);
        // Auto-generate title from first user message if session has default title
        const isFirstUserMessage = !get().messages.some(
          (m) => m.sessionId === activeSessionId && m.sender === 'user'
        );
        const autoTitle = isFirstUserMessage && type === 'text' ?
        content.length > 40 ? content.slice(0, 40).trim() + '…' : content :
        null;
        set((state) => ({
          messages: [...state.messages, newMsg],
          sessions: state.sessions.map((s) =>
          s.id === activeSessionId ?
          {
            ...s,
            lastMessage: type === 'file' ? `📎 ${extra.fileName || 'File'}` : content,
            lastMessageAt: new Date(),
            ...(autoTitle ? { title: autoTitle } : {})
          } :
          s
          ),
          inputValue: '',
          showEmojiPicker: false,
          showGifPicker: false
        }));

        // Auto-response
        const respIdx = autoResponseIndex % AUTO_RESPONSES.length;
        autoResponseIndex++;
        setTimeout(() => {
          set({ isTyping: true });
          const delay = 1200 + Math.random() * 1000;
          setTimeout(() => {
            const resp = AUTO_RESPONSES[respIdx];
            const agentId = session?.agentId || resp.agentId;
            get().receiveMessage(activeSessionId, resp.text, agentId);
            set({ isTyping: false });
          }, delay);
        }, 600);
      },

      receiveMessage: (sessionId, content, agentId) => {
        const newMsg = {
          id: `msg-${generateId()}`,
          sessionId,
          content,
          sender: 'agent',
          agentId,
          timestamp: new Date(),
          type: 'text'
        };
        set((state) => {
          const isActive = state.activeSessionId === sessionId && state.isOpen;
          return {
            messages: [...state.messages, newMsg],
            sessions: state.sessions.map((s) =>
            s.id === sessionId ?
            {
              ...s,
              lastMessage: content,
              lastMessageAt: new Date(),
              unreadCount: isActive ? 0 : s.unreadCount + 1
            } :
            s
            ),
            unreadTotal: isActive ? state.unreadTotal : state.unreadTotal + 1
          };
        });
      },

      setTyping: (val) => set({ isTyping: val }),
      setInputValue: (val) => set({ inputValue: val }),
      setShowEmojiPicker: (val) => set({ showEmojiPicker: val, showGifPicker: val ? false : get().showGifPicker }),
      setShowGifPicker: (val) => set({ showGifPicker: val, showEmojiPicker: val ? false : get().showEmojiPicker }),

      markSessionRead: (sessionId) => {
        set((state) => {
          const session = state.sessions.find((s) => s.id === sessionId);
          const unreadDelta = session?.unreadCount || 0;
          return {
            sessions: state.sessions.map((s) => s.id === sessionId ? { ...s, unreadCount: 0 } : s),
            unreadTotal: Math.max(0, state.unreadTotal - unreadDelta)
          };
        });
      }
    }),
    {
      name: 'live-chat-store',
      partialize: (state) => ({
        sessions: state.sessions,
        messages: state.messages,
        unreadTotal: state.unreadTotal
      })
    }
  )
);