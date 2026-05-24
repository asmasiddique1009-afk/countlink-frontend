import { useState, useEffect, useRef } from 'react';
import { useUserStore } from '@/stores/userStore';
import { useMessageStore } from '@/stores/messageStore';
import { QuickChatModal } from '@/components/modals/QuickChatModal';
import { RequestRevisionModal } from '@/components/modals/RequestRevisionModal';
import { OpenResolutionModal } from '@/components/modals/OpenResolutionModal';
import {
  ExternalLinkIcon,
  ClockIcon,
  FileTextIcon,
  MessageSquareIcon,
  MoreVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
  PencilIcon,

  StarIcon,
  XCircleIcon,

  AlertCircleIcon,
  RefreshCwIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  LinkIcon,
  SearchIcon,
  GlobeIcon,
  BriefcaseIcon,
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon } from
'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger } from
"@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger } from
"@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger } from

"@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FilterIcon, XIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator } from
"@/components/ui/command";
import { CancelOrderModal } from '@/components/modals/CancelOrderModal';
import { AcceptOrderModal } from '@/components/modals/AcceptOrderModal';
import { OrderDetailsModal } from '@/components/modals/OrderDetailsModal';
import { SubmitLinkModal } from '@/components/modals/SubmitLinkModal';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

const generateOrdersData = () => {
  const defaultInstructions = `I am looking for a professional writer to create a high-quality guest post for our platform. The article should be around 700–750 words, original, and engaging, following our editorial guidelines. It must be written in clear and simple English with an informative and professional tone suitable for our audience.

The content should be well-structured, with a clear title, proper subheadings, and short paragraphs to ensure readability. SEO best practices should be applied, including the primary keyword naturally 2–3 times and secondary keywords where relevant, without overstuffing. Only the approved anchor text and URL(s) should be used, and irrelevant links or promotional content are not allowed. If images are included, they must be relevant and properly attributed.`;

  const baseOrders = [
  {
    website: 'techcrunch.com',
    websiteInitial: 'T',
    initialColor: 'bg-blue-50 text-blue-600',
    avgDelivery: '3d delivery',
    hasWriting: true,
    details: null,
    status: 'in_progress',
    statusLabel: 'In Progress',
    price: 450,
    writingPrice: 45,
    hasMessages: 1,
    publishedUrl: null,
    completionNote: null,
    hasFeedback: false,
    hasAI: false,
    articleTitle: 'The Future of AI in Healthcare',
    dedicatedPrice: 15,
    publisher: { name: 'Sarah Johnson', reviews: 127 },
    advertiser: { name: 'Tech Corp Inc.', reviews: 89 }
  },
  {
    website: 'forbes.com',
    websiteInitial: 'F',
    initialColor: 'bg-emerald-50 text-emerald-600',
    avgDelivery: null,
    hasWriting: false,
    details: '10 Ways to Scale Your SaaS Business in 2024',
    status: 'new_request',
    statusLabel: 'New Request',
    price: 850,
    writingPrice: 0,
    hasMessages: 0,
    publishedUrl: null,
    completionNote: null,
    hasFeedback: false,
    hasAI: true,
    dedicatedPrice: 0,
    publisher: { name: 'Emma Rodriguez', reviews: 94 },
    advertiser: { name: 'StartupHub LLC', reviews: 45 }
  },
  {
    website: 'entrepreneur.com',
    websiteInitial: 'E',
    initialColor: 'bg-purple-50 text-purple-600',
    avgDelivery: '4d delivery',
    hasWriting: true,
    details: null,
    status: 'completed',
    statusLabel: 'Completed',
    price: 320,
    writingPrice: 32,
    hasMessages: 2,
    publishedUrl: 'entrepreneur.com/article/how-to-build-startup',
    completionNote: 'The client accepted the completed task. The funds have been credited to your balance.',
    hasFeedback: true,
    hasAI: false,
    publisher: { name: 'David Park', reviews: 178 },
    advertiser: { name: 'Growth Agency', reviews: 112 }
  },
  {
    website: 'businessinsider.com',
    websiteInitial: 'B',
    initialColor: 'bg-rose-50 text-rose-600',
    avgDelivery: null,
    hasWriting: false,
    details: 'Future of AI in Marketing',
    status: 'cancelled',
    statusLabel: 'Cancelled',
    price: 600,
    writingPrice: 0,
    hasMessages: 0,
    publishedUrl: null,
    completionNote: null,
    cancelReason: "Order was automatically terminated due to no action taken within the allowed time.",
    hasFeedback: false,
    hasAI: false,
    publisher: { name: 'Lisa Anderson', reviews: 67 },
    advertiser: { name: 'AI Solutions Co.', reviews: 34 }
  },
  {
    website: 'wired.com',
    websiteInitial: 'W',
    initialColor: 'bg-slate-50 text-slate-600',
    avgDelivery: null,
    hasWriting: true,
    details: 'Cybersecurity Trends',
    status: 'cancelled',
    statusLabel: 'Cancelled',
    price: 450,
    writingPrice: 45,
    hasMessages: 1,
    publishedUrl: null,
    completionNote: null,
    cancelReason: "Order cancelled by the customer.",
    hasFeedback: false,
    hasAI: false,
    publisher: { name: 'Mark Wilson', reviews: 88 },
    advertiser: { name: 'SecureNet Ltd', reviews: 12 }
  },
  {
    website: 'medium.com',
    websiteInitial: 'M',
    initialColor: 'bg-gray-50 text-gray-600',
    avgDelivery: null,
    hasWriting: false,
    details: 'Crypto Investment Guide',
    status: 'cancelled',
    statusLabel: 'Cancelled',
    price: 200,
    writingPrice: 0,
    hasMessages: 0,
    publishedUrl: null,
    completionNote: null,
    cancelReason: "Rejected by publisher — Not matching website guidelines.",
    hasFeedback: false,
    hasAI: false,
    publisher: { name: 'Sarah Jenkins', reviews: 156 },
    advertiser: { name: 'CryptoKing', reviews: 5 }
  },
  {
    website: 'theverge.com',
    websiteInitial: 'V',
    initialColor: 'bg-zinc-50 text-zinc-600',
    avgDelivery: '2d delivery',
    hasWriting: false,
    details: 'Review of new AI Gadget',
    status: 'in_progress',
    statusLabel: 'In Progress',
    price: 550,
    writingPrice: 0,
    hasMessages: 3,
    publishedUrl: null,
    submittedUrl: null,
    completionNote: null,
    hasFeedback: false,
    hasAI: false,
    publisher: { name: 'Robert Fox', reviews: 42 },
    advertiser: { name: 'Gadget World', reviews: 12 }
  },
  {
    website: 'mashable.com',
    websiteInitial: 'M',
    initialColor: 'bg-cyan-50 text-cyan-600',
    avgDelivery: '2d delivery',
    hasWriting: true,
    details: null,
    status: 'completed',
    statusLabel: 'Completed',
    price: 280,
    writingPrice: 28,
    hasMessages: 0,
    publishedUrl: 'mashable.com/article/tech-gadgets-review',
    completionNote: 'The client accepted the completed task. The funds have been credited to your balance.',
    hasFeedback: false,
    hasAI: false,
    publisher: { name: 'James Wilson', reviews: 145 },
    advertiser: { name: 'Media Buyers Ltd', reviews: 78 }
  },
  {
    website: 'nytimes.com',
    websiteInitial: 'N',
    initialColor: 'bg-slate-900 text-white',
    avgDelivery: '5d delivery',
    hasWriting: true,
    details: 'Global Economic Outlook 2024',
    status: 'in_resolution',
    statusLabel: 'In Resolution',
    price: 1200,
    writingPrice: 120,
    hasMessages: 5,
    publishedUrl: null,
    completionNote: null,
    hasFeedback: false,
    hasAI: false,
    publisher: { name: 'Editorial Team', reviews: 342 },
    advertiser: { name: 'Global Finance', reviews: 21 }
  },
  {
    website: 'huffpost.com',
    websiteInitial: 'H',
    initialColor: 'bg-emerald-900 text-white',
    avgDelivery: '3d delivery',
    hasWriting: false,
    details: 'Sustainable Living Tips',
    status: 'in_revision',
    statusLabel: 'In Revision',
    price: 400,
    writingPrice: 0,
    hasMessages: 2,
    publishedUrl: null,
    submittedUrl: 'huffpost.com/draft/sustainable-living',
    completionNote: null,
    hasFeedback: false,
    hasAI: false,
    publisher: { name: 'Green Earth', reviews: 150 },
    advertiser: { name: 'EcoBrand', reviews: 30 }
  },
  {
    website: 'gizmodo.com',
    websiteInitial: 'G',
    initialColor: 'bg-blue-600 text-white',
    avgDelivery: '2d delivery',
    hasWriting: false,
    details: 'Review of latest VR headset',
    status: 'in_progress',
    statusLabel: 'In Progress',
    price: 600,
    writingPrice: 0,
    hasMessages: 2,
    publishedUrl: null,
    submittedUrl: 'gizmodo.com/draft/vr-headset-review-2024',
    completionNote: null,
    hasFeedback: false,
    hasAI: false,
    publisher: { name: 'Tech Reviewer', reviews: 55 },
    advertiser: { name: 'VR Systems', reviews: 18 }
  },
  {
    website: 'investopedia.com',
    websiteInitial: 'I',
    initialColor: 'bg-indigo-50 text-indigo-600',
    avgDelivery: '4d delivery',
    hasWriting: true,
    details: 'ETF Investment Strategies',
    status: 'in_progress',
    statusLabel: 'In Progress',
    price: 450,
    writingPrice: 45,
    hasMessages: 0,
    publishedUrl: null,
    submittedUrl: 'investopedia.com/preview/etf-strategies-guide',
    completionNote: null,
    hasFeedback: false,
    hasAI: false,
    publisher: { name: 'Finance Guru', reviews: 210 },
    advertiser: { name: 'Wealth Mgmt', reviews: 65 }
  },
  // --- 5 completed orders with Leave Feedback available for advertisers ---
  {
    website: 'searchenginejournal.com',
    websiteInitial: 'S',
    initialColor: 'bg-orange-50 text-orange-600',
    avgDelivery: '3d delivery',
    hasWriting: true,
    details: 'Advanced Link Building Strategies for 2024',
    status: 'completed',
    statusLabel: 'Completed',
    price: 380,
    writingPrice: 38,
    hasMessages: 1,
    publishedUrl: 'searchenginejournal.com/link-building-2024',
    completionNote: 'The client accepted the completed task. The funds have been credited to your balance.',
    hasFeedback: false,
    hasAI: false,
    articleTitle: 'Advanced Link Building Strategies for 2024',
    dedicatedPrice: 0,
    publisher: { name: 'Alex Turner', reviews: 203 },
    advertiser: { name: 'SEO Wizards Inc.', reviews: 57 },
    googleIndexed: true,
    linkFound: true,
    lastChecked: 'Mar 15, 2024',
    pendingFeedback: true
  },
  {
    website: 'ahrefs.com',
    websiteInitial: 'A',
    initialColor: 'bg-sky-50 text-sky-600',
    avgDelivery: '2d delivery',
    hasWriting: false,
    details: 'How to Conduct a Complete SEO Audit',
    status: 'completed',
    statusLabel: 'Completed',
    price: 720,
    writingPrice: 0,
    hasMessages: 0,
    publishedUrl: 'ahrefs.com/blog/seo-audit-guide',
    completionNote: 'The client accepted the completed task. The funds have been credited to your balance.',
    hasFeedback: false,
    hasAI: false,
    articleTitle: 'How to Conduct a Complete SEO Audit',
    dedicatedPrice: 20,
    publisher: { name: 'Nina Clarke', reviews: 318 },
    advertiser: { name: 'RankBoost Agency', reviews: 92 },
    googleIndexed: true,
    linkFound: true,
    lastChecked: 'Mar 14, 2024',
    pendingFeedback: true
  },
  {
    website: 'semrush.com',
    websiteInitial: 'S',
    initialColor: 'bg-teal-50 text-teal-600',
    avgDelivery: '4d delivery',
    hasWriting: true,
    details: 'Keyword Research Techniques That Actually Work',
    status: 'completed',
    statusLabel: 'Completed',
    price: 560,
    writingPrice: 56,
    hasMessages: 2,
    publishedUrl: 'semrush.com/blog/keyword-research-techniques',
    completionNote: 'The client accepted the completed task. The funds have been credited to your balance.',
    hasFeedback: false,
    hasAI: false,
    articleTitle: 'Keyword Research Techniques That Actually Work',
    dedicatedPrice: 0,
    publisher: { name: 'Tom Bradley', reviews: 145 },
    advertiser: { name: 'ContentFirst Ltd', reviews: 38 },
    googleIndexed: false,
    linkFound: true,
    lastChecked: 'Mar 13, 2024',
    pendingFeedback: true
  },
  {
    website: 'moz.com',
    websiteInitial: 'M',
    initialColor: 'bg-blue-50 text-blue-600',
    avgDelivery: '3d delivery',
    hasWriting: false,
    details: 'Domain Authority: Everything You Need to Know',
    status: 'completed',
    statusLabel: 'Completed',
    price: 890,
    writingPrice: 0,
    hasMessages: 0,
    publishedUrl: 'moz.com/blog/domain-authority-guide',
    completionNote: 'The client accepted the completed task. The funds have been credited to your balance.',
    hasFeedback: false,
    hasAI: false,
    articleTitle: 'Domain Authority: Everything You Need to Know',
    dedicatedPrice: 25,
    publisher: { name: 'Chris Evans', reviews: 412 },
    advertiser: { name: 'AuthorityBuilders', reviews: 74 },
    googleIndexed: true,
    linkFound: true,
    lastChecked: 'Mar 12, 2024',
    pendingFeedback: true
  },
  {
    website: 'backlinko.com',
    websiteInitial: 'B',
    initialColor: 'bg-violet-50 text-violet-600',
    avgDelivery: '5d delivery',
    hasWriting: true,
    details: "The Skyscraper Technique: Beginner's Guide",
    status: 'completed',
    statusLabel: 'Completed',
    price: 1100,
    writingPrice: 110,
    hasMessages: 3,
    publishedUrl: 'backlinko.com/skyscraper-technique-guide',
    completionNote: 'The client accepted the completed task. The funds have been credited to your balance.',
    hasFeedback: false,
    hasAI: false,
    articleTitle: "The Skyscraper Technique: Beginner's Guide",
    dedicatedPrice: 30,
    publisher: { name: 'Monica Hayes', reviews: 521 },
    advertiser: { name: 'LinkVault Pro', reviews: 108 },
    googleIndexed: true,
    linkFound: true,
    lastChecked: 'Mar 11, 2024',
    pendingFeedback: true
  }];


  const projectNames = ['SEO Campaign Q1', 'Link Building 2024', 'Brand Awareness', 'Content Marketing', 'Q2 Outreach', 'Tech Blog Growth', 'Finance Authority', 'Health Niche Expansion'];

  // Generate 50 orders
  const allOrders = [];
  for (let i = 0; i < 50; i++) {
    const baseOrder = baseOrders[i % baseOrders.length];

    // Generate random date within last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    const createdDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    // Generate timer for active orders
    let timer = null;
    let timerStatus = null;

    if (baseOrder.status === 'in_progress' || baseOrder.status === 'new_request') {
      const daysLeft = Math.floor(Math.random() * 5);
      const hoursLeft = Math.floor(Math.random() * 23);
      timer = `${daysLeft}d ${hoursLeft}h 30m`;
      timerStatus = daysLeft < 2 ? 'warning' : 'success';
    } else if (baseOrder.status === 'cancelled' && baseOrder.cancelReason?.includes('terminated')) {
      timer = 'Expired';
      timerStatus = 'expired';
    }

    // Mock verification data for completed orders
    let verificationData = {};
    if (baseOrder.status === 'completed') {
      // Create specific scenarios for demonstration based on index
      if (i === 2) {
        // Scenario: Link Found but Not Indexed (Warning)
        verificationData = {
          googleIndexed: false,
          linkFound: true,
          lastChecked: 'Just now'
        };
      } else if (i === 7) {
        // Scenario: Link NOT Found (Critical Error)
        verificationData = {
          googleIndexed: false,
          linkFound: false,
          lastChecked: 'Just now'
        };
      } else {
        // Default: Success
        verificationData = {
          googleIndexed: true,
          linkFound: true,
          lastChecked: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      }
    }

    allOrders.push({
      ...baseOrder,
      ...verificationData,
      id: `ORD-2024-${String(i + 1).padStart(3, '0')}`,
      createdDate,
      timer,
      timerStatus,
      instructions: defaultInstructions,
      projectName: projectNames[Math.floor(Math.random() * projectNames.length)]
    });
  }
  return allOrders;
};

const initialOrdersData = generateOrdersData();









export function SalesPurchasesPage({ onProfileClick, showEmptyState = false, onShowEmptyState, onLeaveFeedback, onNavigateToMessages }) {
  const { role } = useUserStore();
  const { selectConversation, conversations } = useMessageStore();
  const [orders, setOrders] = useState(initialOrdersData);
  const [currentPage, setCurrentPage] = useState(1);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [revisionModalOpen, setRevisionModalOpen] = useState(false);
  const [resolutionModalOpen, setResolutionModalOpen] = useState(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [selectedOrderForCancel, setSelectedOrderForCancel] = useState(null);
  const [selectedOrderForRevision, setSelectedOrderForRevision] = useState(null);
  const [selectedOrderForResolution, setSelectedOrderForResolution] = useState(null);
  const [selectedOrderForAccept, setSelectedOrderForAccept] = useState(null);
  const [submitLinkModalOpen, setSubmitLinkModalOpen] = useState(false);
  const [selectedOrderForSubmission, setSelectedOrderForSubmission] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedWebsites, setSelectedWebsites] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const tableRef = useRef(null);

  const pageTitle = role === 'publisher' ? 'Sales' : 'Purchases';

  // Date helpers
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const setDatePreset = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setDateRange({
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    });
  };

  const setMonthPreset = (offset = 0) => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    const end = new Date(now.getFullYear(), now.getMonth() + offset + 1, 0);
    // Adjust for timezone offset to ensure correct YYYY-MM-DD
    const toLocalISO = (d) => {
      const offset = d.getTimezoneOffset() * 60000;
      return new Date(d.getTime() - offset).toISOString().split('T')[0];
    };
    setDateRange({
      start: toLocalISO(start),
      end: toLocalISO(end)
    });
  };

  // Calculate status counts
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  // Calculate website counts
  const websiteCounts = orders.reduce((acc, order) => {
    acc[order.website] = (acc[order.website] || 0) + 1;
    return acc;
  }, {});

  const uniqueWebsites = Object.keys(websiteCounts).sort();

  // Filter logic
  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
    order.id.toLowerCase().includes(query) ||
    order.website.toLowerCase().includes(query) ||
    order.projectName?.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesWebsite = selectedWebsites.length === 0 || selectedWebsites.includes(order.website);

    let matchesDate = true;
    if (dateRange.start || dateRange.end) {
      const orderDate = new Date(order.createdDate);
      if (dateRange.start) {
        matchesDate = matchesDate && orderDate >= new Date(dateRange.start);
      }
      if (dateRange.end) {
        matchesDate = matchesDate && orderDate <= new Date(dateRange.end);
      }
    }

    return matchesSearch && matchesStatus && matchesDate && matchesWebsite;
  });

  const totalEntries = filteredOrders.length;
  const entriesPerPage = 20;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, dateRange, selectedWebsites]);

  useEffect(() => {
    if (tableRef.current) {
      gsap.killTweensOf(tableRef.current);
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
    return () => {
      if (tableRef.current) {
        gsap.killTweensOf(tableRef.current);
      }
    };
  }, [currentPage]);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'new_request':
        return 'bg-blue-100 text-blue-700 border-blue-200 shadow-sm font-semibold';
      case 'in_progress':
        return 'bg-amber-100 text-amber-800 border-amber-200 shadow-sm font-semibold';
      case 'in_revision':
        return 'bg-purple-100 text-purple-700 border-purple-200 shadow-sm font-semibold';
      case 'in_resolution':
        return 'bg-rose-100 text-rose-700 border-rose-200 shadow-sm font-semibold';
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm font-semibold';
      case 'cancelled':
        return 'bg-slate-100 text-slate-600 border-slate-200 font-medium';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const handleProfileClick = (name, reviews) => {
    if (onProfileClick) {
      onProfileClick(name);
    }
  };

  const handleCancelClick = (orderId) => {
    setSelectedOrderForCancel(orderId);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = () => {
    console.log("Cancelling order:", selectedOrderForCancel);
    // Here you would call your store to update the order status
    setCancelModalOpen(false);
    setSelectedOrderForCancel(null);
  };

  const handleContactPublisher = () => {
    console.log("Contacting publisher for order:", selectedOrderForCancel);
    if (selectedOrderForCancel) {
      handleMessageClick(selectedOrderForCancel);
    }
    setCancelModalOpen(false);
  };

  const handleMessageClick = (orderId) => {
    // Find conversation associated with this order
    const conversation = conversations.find((c) => c.orderId === orderId);

    if (conversation) {
      selectConversation(conversation.id);
    } else {
      // If no conversation exists, select the first one for demo purposes
      // In a real app, this would create a new conversation
      if (conversations.length > 0) {
        selectConversation(conversations[0].id);
      }
    }
    setChatModalOpen(true);
  };

  const handleRequestRevision = (orderId) => {
    setSelectedOrderForRevision(orderId);
    setRevisionModalOpen(true);
  };

  const handleConfirmRevision = (reason) => {
    if (selectedOrderForRevision) {
      // Find conversation and send revision request message
      const conversation = conversations.find((c) => c.orderId === selectedOrderForRevision);
      if (conversation) {
        useMessageStore.getState().sendMessage(conversation.id, reason, 'revision_request');
        selectConversation(conversation.id);
        setChatModalOpen(true);
      } else {
        // Fallback if no conversation exists (demo only)
        if (conversations.length > 0) {
          useMessageStore.getState().sendMessage(conversations[0].id, reason, 'revision_request');
          selectConversation(conversations[0].id);
          setChatModalOpen(true);
        }
      }
    }
    setRevisionModalOpen(false);
    setSelectedOrderForRevision(null);
  };

  const handleOpenResolution = (orderId) => {
    setSelectedOrderForResolution(orderId);
    setResolutionModalOpen(true);
  };

  const handleConfirmResolution = (reason) => {
    if (selectedOrderForResolution) {
      // Update local order state
      setOrders((prev) => prev.map((o) =>
      o.id === selectedOrderForResolution ?
      { ...o, status: 'in_resolution', statusLabel: 'In Resolution' } :
      o
      ));

      // Find conversation and send resolution message
      const conversation = conversations.find((c) => c.orderId === selectedOrderForResolution);
      if (conversation) {
        useMessageStore.getState().sendMessage(conversation.id, reason, 'resolution_opened');
        selectConversation(conversation.id);
        setChatModalOpen(true);
      } else {
        // Fallback if no conversation exists (demo only)
        if (conversations.length > 0) {
          useMessageStore.getState().sendMessage(conversations[0].id, reason, 'resolution_opened');
          selectConversation(conversations[0].id);
          setChatModalOpen(true);
        }
      }
    }
    setResolutionModalOpen(false);
    setSelectedOrderForResolution(null);
  };

  const handleAcceptOrder = (orderId) => {
    setSelectedOrderForAccept(orderId);
    setAcceptModalOpen(true);
  };

  const handlePublisherAcceptOrder = (orderId) => {
    // Immediately accept order and move to in_progress
    setOrders((prev) => prev.map((o) =>
    o.id === orderId ?
    { ...o, status: 'in_progress', statusLabel: 'In Progress' } :
    o
    ));
  };

  const handleViewDetails = (order) => {
    setSelectedOrderForDetails(order);
    setDetailsModalOpen(true);
  };

  const handleOpenSubmitLinkModal = (orderId) => {
    setSelectedOrderForSubmission(orderId);
    setSubmitLinkModalOpen(true);
  };

  const handleConfirmSubmitLink = (link) => {
    if (selectedOrderForSubmission) {
      handleSubmitLink(selectedOrderForSubmission, link);
      setSelectedOrderForSubmission(null);
    }
  };

  const handleSubmitLink = (orderId, link) => {
    console.log(`Submitting link for order ${orderId}: ${link}`);
    setOrders((prev) => prev.map((o) =>
    o.id === orderId ?
    { ...o, submittedUrl: link, status: 'in_progress' } // Keep in progress but with link
    : o
    ));
    // In a real app, this would trigger a status change or notification
  };

  const handleUpdateDetails = (orderId, data) => {
    console.log(`Updating details for order ${orderId}`, data);
    setOrders((prev) => prev.map((o) =>
    o.id === orderId ?
    { ...o, details: data.details } :
    o
    ));
  };

  const handleConfirmAccept = (feedback) => {
    if (selectedOrderForAccept) {
      setOrders((prev) => prev.map((o) => {
        if (o.id === selectedOrderForAccept) {
          return {
            ...o,
            status: 'completed',
            statusLabel: 'Completed',
            hasFeedback: !!feedback,
            completionNote: feedback ? null : "The client accepted the completed task. The funds have been credited to your balance."
          };
        }
        return o;
      }));
    }
    setAcceptModalOpen(false);
    setSelectedOrderForAccept(null);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  // Show empty state if no orders OR if showEmptyState prop is true
  if (orders.length === 0 || showEmptyState) {
    return (
      <div className="w-full min-h-[500px] flex items-center justify-center px-4 py-12">
            <div className="max-w-4xl w-full">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 relative overflow-hidden">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(100 116 139) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}></div>
                
                {/* Content */}
                <div className="relative z-10 text-center max-w-2xl mx-auto">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-200">
                    {role === 'publisher' ?
                <GlobeIcon className="w-10 h-10 text-slate-400" strokeWidth={1.5} /> :

                <BriefcaseIcon className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
                }
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                    {role === 'publisher' ? 'No Sales Yet' : 'No Purchases Yet'}
                  </h2>
                  <p className="text-base text-slate-600 leading-relaxed mb-8">
                    {role === 'publisher' ?
                "Start earning by listing your websites and receiving guest post orders from advertisers worldwide." :
                "Browse our catalogue of premium websites and place your first order to boost your SEO with high-quality backlinks."}
                  </p>

                  {/* CTA Button */}
                  <Button
                className="bg-slate-900 hover:bg-slate-800 text-white h-11 px-8 text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
                onClick={() => {/* Navigate to catalogue */}}>
                
                    {role === 'publisher' ?
                <>
                        <GlobeIcon className="w-4 h-4 mr-2" />
                        List Your Website
                      </> :

                <>
                        <SearchIcon className="w-4 h-4 mr-2" />
                        Browse Catalogue
                      </>
                }
                  </Button>

                  {/* Features - Simple Text List */}
                  <div className="mt-10 pt-8 border-t border-slate-200">
                    <div className="grid grid-cols-3 gap-6 text-center">
                      {role === 'publisher' ?
                  <>
                          <div>
                            <div className="text-sm font-medium text-slate-900 mb-1">Set Your Prices</div>
                            <div className="text-xs text-slate-500">Full control over pricing</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900 mb-1">Secure Payments</div>
                            <div className="text-xs text-slate-500">Get paid for every order</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900 mb-1">Easy Management</div>
                            <div className="text-xs text-slate-500">One dashboard for all orders</div>
                          </div>
                        </> :

                  <>
                          <div>
                            <div className="text-sm font-medium text-slate-900 mb-1">1000+ Websites</div>
                            <div className="text-xs text-slate-500">Premium quality sites</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900 mb-1">Track Orders</div>
                            <div className="text-xs text-slate-500">All in one place</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900 mb-1">Fast Delivery</div>
                            <div className="text-xs text-slate-500">Quality backlinks quickly</div>
                          </div>
                        </>
                  }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>);

  }

  return (
    <div className="w-full space-y-4 sm:space-y-6">
          {/* Page Header - Responsive */}
        <div className="px-2 sm:px-0">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{pageTitle}</h1>
          {role === 'advertiser' && onShowEmptyState &&
          <Button
            variant="outline"
            onClick={onShowEmptyState}
            className="h-8 px-3 text-xs font-medium border-slate-300 hover:bg-slate-50">
            
              No Purchases
            </Button>
          }
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {role === 'publisher' ?
          'Track your guest post orders and earnings' :
          'Manage your guest post purchases and campaigns'}
        </p>
      </div>

      <CancelOrderModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        onContactPublisher={handleContactPublisher} />
      

      <QuickChatModal
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)} />
      

      <RequestRevisionModal
        isOpen={revisionModalOpen}
        onClose={() => setRevisionModalOpen(false)}
        onConfirm={handleConfirmRevision} />
      

      <OpenResolutionModal
        isOpen={resolutionModalOpen}
        onClose={() => setResolutionModalOpen(false)}
        onConfirm={handleConfirmResolution}
        onContactPublisher={() => {
          if (selectedOrderForResolution) {
            handleMessageClick(selectedOrderForResolution);
            setResolutionModalOpen(false);
          }
        }} />
      

      <AcceptOrderModal
        isOpen={acceptModalOpen}
        onClose={() => setAcceptModalOpen(false)}
        onConfirm={handleConfirmAccept} />
      

      <OrderDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        order={selectedOrderForDetails}
        role={role}
        onOpenSubmitLink={() => handleOpenSubmitLinkModal(selectedOrderForDetails?.id)}
        onCancelOrder={handleCancelClick}
        onUpdateDetails={handleUpdateDetails}
        onAcceptOrder={() => handleAcceptOrder(selectedOrderForDetails?.id)}
        onPublisherAccept={() => handlePublisherAcceptOrder(selectedOrderForDetails?.id)}
        onRequestRevision={() => handleRequestRevision(selectedOrderForDetails?.id)}
        onOpenResolution={() => handleOpenResolution(selectedOrderForDetails?.id)}
        onSendMessage={() => {
          if (selectedOrderForDetails) {
            const otherPartyRole = role === 'publisher' ? 'Advertiser' : 'Publisher';
            const otherName = role === 'publisher' ?
            selectedOrderForDetails.advertiser?.name || selectedOrderForDetails.website :
            selectedOrderForDetails.publisher?.name || selectedOrderForDetails.website;
            const convId = useMessageStore.getState().openConversationForOrder(
              selectedOrderForDetails.id,
              otherName,
              otherPartyRole
            );
            selectConversation(convId);
            setDetailsModalOpen(false);
            onNavigateToMessages?.(convId);
          }
        }} />
      

          <SubmitLinkModal
        isOpen={submitLinkModalOpen}
        onClose={() => setSubmitLinkModalOpen(false)}
        onConfirm={handleConfirmSubmitLink} />
      
    
          {/* Professional Filters Toolbar */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                <SearchIcon className="w-3.5 h-3.5" />
              </div>
              <Input
            placeholder="Search website, order ID, project name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9 text-sm bg-white border-slate-200 shadow-sm focus-visible:ring-primary/20 transition-all hover:border-slate-300" />
          
            </div>

            {/* Filters Group */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
              
              {/* Website Filter */}
              {role === 'publisher' &&
          <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn(
                "h-9 bg-white border-slate-200 shadow-sm text-slate-700 text-sm font-medium px-3 hover:bg-slate-50 hover:border-slate-300 transition-colors min-w-[140px] justify-between",
                selectedWebsites.length > 0 && "border-primary/30 bg-primary/5 text-primary"
              )}>
                    <div className="flex items-center gap-2 truncate">
                      <GlobeIcon className={cn("w-3.5 h-3.5 shrink-0", selectedWebsites.length > 0 ? "text-primary" : "text-slate-400")} />
                      <span className="truncate">
                        {selectedWebsites.length === 0 ?
                    "All Websites" :
                    selectedWebsites.length === 1 ?
                    selectedWebsites[0] :
                    `${selectedWebsites.length} Websites`}
                      </span>
                    </div>
                    {selectedWebsites.length > 0 &&
                <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground ml-1">
                        {selectedWebsites.length}
                      </span>
                }
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search website..." className="h-8 text-xs" />
                    <CommandList>
                      <CommandEmpty>No website found.</CommandEmpty>
                      <CommandGroup className="max-h-[200px] overflow-y-auto">
                        {uniqueWebsites.map((website) => {
                      const isSelected = selectedWebsites.includes(website);
                      return (
                        <CommandItem
                          key={website}
                          onSelect={() => {
                            setSelectedWebsites((prev) =>
                            isSelected ?
                            prev.filter((w) => w !== website) :
                            [...prev, website]
                            );
                          }}
                          className="text-xs cursor-pointer">
                          
                              <div className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                          )}>
                                <CheckIcon className="h-3 w-3" />
                              </div>
                              <span className="flex-1 truncate">{website}</span>
                              <span className="ml-auto text-[10px] text-muted-foreground bg-slate-100 px-1.5 py-0.5 rounded-full">
                                {websiteCounts[website]}
                              </span>
                            </CommandItem>);

                    })}
                      </CommandGroup>
                      {selectedWebsites.length > 0 &&
                  <>
                          <CommandSeparator />
                          <CommandGroup>
                            <CommandItem
                        onSelect={() => setSelectedWebsites([])}
                        className="justify-center text-center text-xs font-medium text-muted-foreground cursor-pointer">
                        
                              Clear filters
                            </CommandItem>
                          </CommandGroup>
                        </>
                  }
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
          }

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] h-9 bg-white border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-slate-700 text-[13px] font-medium hover:bg-slate-50 hover:border-slate-300 transition-all focus:ring-2 focus:ring-primary/10 focus:border-primary/30">
                  <div className="flex items-center gap-2 truncate">
                    <FilterIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">
                      {statusFilter === 'all' ? 'All Statuses' :
                  statusFilter === 'new_request' ? 'New Request' :
                  statusFilter === 'in_progress' ? 'In Progress' :
                  statusFilter === 'in_revision' ? 'In Revision' :
                  statusFilter === 'in_resolution' ? 'In Resolution' :
                  statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-[320px] p-1 shadow-lg border-slate-100 rounded-lg">
                  <SelectItem value="all" className="text-[13px] rounded-md focus:bg-slate-50 cursor-pointer py-2">
                    <div className="flex items-center justify-between w-full gap-8">
                      <span className="font-medium text-slate-700">All Statuses</span>
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200 min-w-[24px] text-center">{orders.length}</span>
                    </div>
                  </SelectItem>
                  
                  <div className="h-px bg-slate-100 my-1 mx-2" />
                  
                  <SelectItem value="new_request" className="text-[13px] rounded-md focus:bg-blue-50/50 cursor-pointer py-2">
                    <div className="flex items-center justify-between w-full gap-8">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_4px_rgba(59,130,246,0.4)]"></div>
                        <span className="text-slate-700">New Request</span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200 min-w-[24px] text-center">{statusCounts['new_request'] || 0}</span>
                    </div>
                  </SelectItem>
                  
                  <SelectItem value="in_progress" className="text-[13px] rounded-md focus:bg-amber-50/50 cursor-pointer py-2">
                    <div className="flex items-center justify-between w-full gap-8">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.4)]"></div>
                        <span className="text-slate-700">In Progress</span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200 min-w-[24px] text-center">{statusCounts['in_progress'] || 0}</span>
                    </div>
                  </SelectItem>
                  
                  <SelectItem value="in_revision" className="text-[13px] rounded-md focus:bg-purple-50/50 cursor-pointer py-2">
                    <div className="flex items-center justify-between w-full gap-8">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_4px_rgba(168,85,247,0.4)]"></div>
                        <span className="text-slate-700">In Revision</span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200 min-w-[24px] text-center">{statusCounts['in_revision'] || 0}</span>
                    </div>
                  </SelectItem>
                  
                  <SelectItem value="in_resolution" className="text-[13px] rounded-md focus:bg-rose-50/50 cursor-pointer py-2">
                    <div className="flex items-center justify-between w-full gap-8">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_4px_rgba(244,63,94,0.4)]"></div>
                        <span className="text-slate-700">In Resolution</span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200 min-w-[24px] text-center">{statusCounts['in_resolution'] || 0}</span>
                    </div>
                  </SelectItem>
                  
                  <div className="h-px bg-slate-100 my-1 mx-2" />
                  
                  <SelectItem value="completed" className="text-[13px] rounded-md focus:bg-emerald-50/50 cursor-pointer py-2">
                    <div className="flex items-center justify-between w-full gap-8">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.4)]"></div>
                        <span className="text-slate-700">Completed</span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200 min-w-[24px] text-center">{statusCounts['completed'] || 0}</span>
                    </div>
                  </SelectItem>
                  
                  <SelectItem value="cancelled" className="text-[13px] rounded-md focus:bg-slate-50 cursor-pointer py-2">
                    <div className="flex items-center justify-between w-full gap-8">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                        <span className="text-slate-700">Cancelled</span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200 min-w-[24px] text-center">{statusCounts['cancelled'] || 0}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Date Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn(
                "h-9 bg-white border-slate-200 shadow-sm text-slate-700 text-sm font-medium px-3 hover:bg-slate-50 hover:border-slate-300 transition-colors min-w-[140px] justify-start",
                (dateRange.start || dateRange.end) && "border-primary/30 bg-primary/5 text-primary"
              )}>
                    <CalendarIcon className={cn("w-3.5 h-3.5 mr-2 shrink-0", dateRange.start || dateRange.end ? "text-primary" : "text-slate-400")} />
                    <span className="truncate">
                      {dateRange.start ?
                  dateRange.end ? `${formatDateDisplay(dateRange.start)} - ${formatDateDisplay(dateRange.end)}` : `From ${formatDateDisplay(dateRange.start)}` :

                  "Select Date Range"
                  }
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[320px] p-4" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-foreground">Date Range</h4>
                      {(dateRange.start || dateRange.end) &&
                  <button
                    onClick={() => setDateRange({ start: '', end: '' })}
                    className="text-[11px] text-rose-500 hover:text-rose-600 hover:underline font-medium">
                    
                          Reset
                        </button>
                  }
                    </div>

                    {/* Quick Presets */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs font-normal" onClick={() => setDatePreset(7)}>Last 7 Days</Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs font-normal" onClick={() => setDatePreset(30)}>Last 30 Days</Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs font-normal" onClick={() => setMonthPreset(0)}>This Month</Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs font-normal" onClick={() => setMonthPreset(-1)}>Last Month</Button>
                    </div>

                    <div className="h-px bg-border" />

                    {/* Custom Range */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="start-date" className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Start Date</Label>
                        <Input
                      id="start-date"
                      type="date"
                      className="h-8 text-xs bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                      value={dateRange.start}
                      onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))} />
                    
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="end-date" className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">End Date</Label>
                        <Input
                      id="end-date"
                      type="date"
                      className="h-8 text-xs bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                      value={dateRange.end}
                      onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))} />
                    
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Reset Button */}
              {(searchQuery || statusFilter !== 'all' || dateRange.start || dateRange.end || selectedWebsites.length > 0) &&
          <Button
            variant="ghost"
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setDateRange({ start: '', end: '' });
              setSelectedWebsites([]);
            }}
            className="h-9 px-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors text-sm">
            
                  <XIcon className="w-3.5 h-3.5 mr-1.5" />
                  Reset
                </Button>
          }
            </div>
          </div>
    
          {/* Orders Table - Horizontal Scroll Container */}
          <div ref={tableRef} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar pb-2">
          <div className="min-w-[1600px] inline-block w-full align-middle">
            {/* Table Header */}
            <div className={cn(
              "grid gap-5 bg-slate-50 px-6 py-3 border-b border-border text-[11px] font-semibold text-slate-600 uppercase tracking-wide w-full",
              role === 'advertiser' ?
              "grid-cols-[minmax(200px,1.5fr)_minmax(150px,1fr)_minmax(160px,1.2fr)_minmax(240px,2fr)_minmax(150px,1.2fr)_minmax(110px,0.9fr)_minmax(80px,0.6fr)_minmax(180px,1.5fr)]" :
              "grid-cols-[minmax(200px,1.5fr)_minmax(160px,1.2fr)_minmax(180px,1.2fr)_minmax(240px,2fr)_minmax(150px,1.2fr)_minmax(110px,0.9fr)_minmax(80px,0.6fr)_minmax(180px,1.5fr)]"
            )}>
              <div className="whitespace-nowrap">Order ID / Website</div>
              
              {role === 'advertiser' ?
              <>
                  <div className="whitespace-nowrap">Project Name</div>
                  <div className="whitespace-nowrap">Created / Timer</div>
                </> :

              <>
                  <div className="whitespace-nowrap">Created / Timer</div>
                  <div className="whitespace-nowrap">Advertiser</div>
                </>
              }
              
              <div className="whitespace-nowrap">Details</div>
              <div className="whitespace-nowrap">Status</div>
              <div className="whitespace-nowrap">Price</div>
              <div className="text-center whitespace-nowrap">Chat</div>
              <div className="text-center whitespace-nowrap">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-100 w-full">
              {currentOrders.map((order) =>
              <div
                key={order.id}
                className={cn(
                  "grid gap-5 py-5 transition-colors items-start w-full min-h-[130px]",
                  role === 'advertiser' ?
                  "grid-cols-[minmax(200px,1.5fr)_minmax(150px,1fr)_minmax(160px,1.2fr)_minmax(240px,2fr)_minmax(150px,1.2fr)_minmax(110px,0.9fr)_minmax(80px,0.6fr)_minmax(180px,1.5fr)]" :
                  "grid-cols-[minmax(200px,1.5fr)_minmax(160px,1.2fr)_minmax(180px,1.2fr)_minmax(240px,2fr)_minmax(150px,1.2fr)_minmax(110px,0.9fr)_minmax(80px,0.6fr)_minmax(180px,1.5fr)]",
                  order.status === 'in_revision' ?
                  "bg-purple-50/60 hover:bg-purple-50/80 border-l-[3px] border-l-purple-500 pl-[21px] pr-6" :
                  "hover:bg-slate-50 px-6"
                )}>
                
                  {/* Order ID / Website */}
                  <div className="pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <a
                      href="#"
                      className="text-blue-600 hover:text-blue-700 hover:underline font-medium text-[14px] flex items-center gap-1.5">
                      
                        {order.website}
                        <ExternalLinkIcon className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <div className="text-slate-500 text-[12px] font-medium tabular-nums">{order.id}</div>
                  </div>

                  {/* Role-based Columns */}
                  {role === 'advertiser' ?
                <>
                      {/* Project Name (Advertiser) */}
                      <div className="pr-2 flex items-center">
                        <a
                      href="#"
                      className="flex items-center gap-1.5 group/project max-w-full py-1"
                      title={order.projectName}>
                      
                          <BriefcaseIcon className="w-3.5 h-3.5 text-blue-400 group-hover/project:text-blue-600 transition-colors flex-shrink-0" />
                          <span className="text-[12px] font-medium text-blue-500 group-hover/project:text-blue-600 group-hover/project:underline transition-colors truncate">
                            {order.projectName}
                          </span>
                        </a>
                      </div>

                      {/* Created / Timer */}
                      <div className="pr-2">
                        <div className="text-slate-500 text-[13px] mb-1.5 font-medium">{order.createdDate}</div>
                        {order.timer &&
                    <div className={cn(
                      "flex items-center gap-1.5 text-[12px] font-bold",
                      order.timerStatus === 'expired' ?
                      "text-rose-600" :
                      "text-slate-600"
                    )}>
                            <ClockIcon
                        className={cn(
                          "w-3.5 h-3.5",
                          order.timerStatus === 'expired' ? "text-rose-500" : "text-slate-400"
                        )}
                        strokeWidth={2} />
                      
                            <span className="font-medium tracking-tight tabular-nums">{order.timer}</span>
                          </div>
                    }
                      </div>
                    </> :

                <>
                      {/* Created / Timer */}
                      <div className="pr-2 flex flex-col gap-2.5">
                        <div className="text-slate-500 text-[13px] font-medium flex items-center gap-2">
                          <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                          {order.createdDate}
                        </div>
                        {order.timer &&
                    <div className={cn(
                      "flex items-center gap-2 text-[13px] font-medium",
                      order.timerStatus === 'expired' ?
                      "text-rose-600" :
                      "text-slate-700"
                    )}>
                            <ClockIcon
                        className={cn(
                          "w-4 h-4",
                          order.timerStatus === 'expired' ? "text-rose-500" : "text-slate-400"
                        )}
                        strokeWidth={2} />
                      
                            <span className="font-semibold tracking-tight tabular-nums">{order.timer}</span>
                          </div>
                    }
                      </div>

                      {/* Advertiser Profile (Publisher) */}
                      <div className="pr-2 flex items-center">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                              {order.advertiser.name.charAt(0)}
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          </div>
                          <div className="flex flex-col">
                            <span
                          className="text-[13px] font-semibold text-slate-700 hover:text-blue-600 cursor-pointer transition-colors"
                          onClick={() => handleProfileClick(order.advertiser.name, order.advertiser.reviews)}>
                          
                              {order.advertiser.name}
                            </span>
                            <div className="flex items-center gap-1">
                              <StarIcon className="w-3 h-3 text-amber-400 fill-amber-400" />
                              <span className="text-[11px] text-slate-500 font-medium">4.9</span>
                              <span className="text-[10px] text-slate-400">({order.advertiser.reviews})</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                }

                  {/* Details */}
                  <div className="pr-3">
                    {role === 'advertiser' ?
                  <div className="flex flex-col gap-2.5 items-start min-w-0">
                        {/* Service Type Indicator */}
                        <div className="inline-flex items-center gap-1.5 mb-1.5 px-2 py-0.5 rounded border border-slate-200 bg-slate-50/50">
                          {order.hasWriting ?
                      <PencilIcon className="w-3 h-3 text-purple-600 shrink-0" /> :

                      <FileTextIcon className="w-3 h-3 text-blue-600 shrink-0" />
                      }
                          <span className="text-[11px] font-medium text-slate-600 tracking-tight">
                            {order.hasWriting ? "Content & Publication" : "Publication Only"}
                          </span>
                        </div>
                        
                        {/* Title/Topic */}
                        {(order.articleTitle || order.details) &&
                    <div
                      className="group/title cursor-pointer"
                      onClick={() => handleViewDetails(order)}>
                      
                            <p className="text-[13px] font-medium text-slate-700 leading-snug line-clamp-2 group-hover/title:text-blue-600 transition-colors" title={order.articleTitle || order.details || ''}>
                              {order.articleTitle || order.details}
                            </p>
                          </div>
                    }
                        
                        {/* Action */}
                        <button
                      onClick={() => handleViewDetails(order)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium bg-blue-50 text-blue-600 border border-blue-200 shadow-sm hover:bg-blue-100 hover:border-blue-300 transition-all group/btn mt-1">
                      
                          View Details
                          <ArrowRightIcon className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 text-blue-400 group-hover/btn:text-blue-600" />
                        </button>
                      </div> :

                  <div className="flex flex-col items-start gap-3">
                        {order.hasWriting ?
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md border border-amber-200 text-[11px] font-semibold shadow-sm">
                            <PencilIcon className="w-3 h-3" />
                            Writing Required
                          </div> :
                    order.details ?
                    <div className="flex items-start gap-2">
                            <FileTextIcon className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700 text-[12px] font-medium leading-snug line-clamp-2">
                              {order.details}
                            </span>
                          </div> :
                    null}
                        
                        <button
                      onClick={() => handleViewDetails(order)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-50 text-blue-600 border border-blue-200 shadow-sm hover:bg-blue-100 hover:border-blue-300 transition-all group/btn">
                      
                          View Details
                          <ArrowRightIcon className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 text-blue-400 group-hover/btn:text-blue-600" />
                        </button>
                      </div>
                  }
                  </div>

                  {/* Status */}
                  <div className="pt-1 pr-3">
                    <Badge className={`${getStatusConfig(order.status)} mb-2 text-[11px] font-medium px-2.5 py-0.5 border`}>
                      {order.statusLabel}
                    </Badge>
                    {order.publishedUrl &&
                  <a
                    href="#"
                    className="block text-blue-600 hover:text-blue-700 hover:underline text-[11px] flex items-center gap-1 max-w-[160px]"
                    title={order.publishedUrl}>
                    
                        <span className="truncate">{order.publishedUrl}</span>
                        <ExternalLinkIcon className="w-3 h-3 flex-shrink-0" />
                      </a>
                  }
                    {/* Submitted Link for In-Progress Orders */}
                    {order.status === 'in_progress' && order.submittedUrl &&
                  <a
                    href="#"
                    className="block text-blue-600 hover:text-blue-700 hover:underline text-[11px] flex items-center gap-1 max-w-[160px] mt-1"
                    title={order.submittedUrl}>
                    
                        <span className="truncate">{order.submittedUrl}</span>
                        <ExternalLinkIcon className="w-3 h-3 flex-shrink-0" />
                      </a>
                  }

                    {/* Verification Icons for Completed Orders */}
                    {order.status === 'completed' &&
                  <div className="flex items-center gap-2 mt-2">
                        {/* Google Index Status */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className={cn(
                          "flex items-center justify-center w-5 h-5 rounded-md border transition-all duration-200 cursor-help shadow-sm outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary/20",
                          order.googleIndexed ?
                          "bg-blue-50/80 border-blue-200 text-blue-600 hover:bg-blue-100 hover:border-blue-300" :
                          "bg-amber-50/80 border-amber-200 text-amber-600 hover:bg-amber-100 hover:border-amber-300"
                        )}>
                              <GlobeIcon className="w-3 h-3" strokeWidth={2} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="text-xs p-3 bg-white border border-border shadow-xl text-foreground">
                            <div className="flex items-center gap-2 mb-1.5">
                              <GlobeIcon className={cn("w-3.5 h-3.5", order.googleIndexed ? "text-blue-600" : "text-amber-600")} />
                              <p className="font-semibold text-foreground">Google Index Status</p>
                            </div>
                            <div className="space-y-1">
                              <p className={cn("font-medium", order.googleIndexed ? "text-blue-600" : "text-amber-600")}>
                                {order.googleIndexed ? "Successfully Indexed" : "Not Indexed Yet"}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                Last checked: <span className="font-mono text-foreground/80">{order.lastChecked}</span>
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>

                        {/* Link Found Status */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className={cn(
                          "flex items-center justify-center w-5 h-5 rounded-md border transition-all duration-200 cursor-help shadow-sm outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary/20",
                          order.linkFound ?
                          "bg-emerald-50/80 border-emerald-200 text-emerald-600 hover:bg-emerald-100 hover:border-emerald-300" :
                          "bg-rose-50/80 border-rose-200 text-rose-600 hover:bg-rose-100 hover:border-rose-300"
                        )}>
                              {order.linkFound ?
                          <LinkIcon className="w-3 h-3" strokeWidth={2} /> :

                          <AlertCircleIcon className="w-3 h-3" strokeWidth={2} />
                          }
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="text-xs p-3 bg-white border border-border shadow-xl text-foreground">
                            <div className="flex items-center gap-2 mb-1.5">
                              {order.linkFound ?
                          <LinkIcon className="w-3.5 h-3.5 text-emerald-600" /> :

                          <AlertCircleIcon className="w-3.5 h-3.5 text-rose-600" />
                          }
                              <p className="font-semibold text-foreground">Backlink Status</p>
                            </div>
                            <div className="space-y-1">
                              <p className={cn("font-medium", order.linkFound ? "text-emerald-600" : "text-rose-600")}>
                                {order.linkFound ? "Live Link Found" : "Link Not Found!"}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                Last checked: <span className="font-mono text-foreground/80">{order.lastChecked}</span>
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                  }
                  </div>

                  {/* Price */}
                  <div className="pl-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[15px] font-bold text-slate-800 py-1">${order.price}</span>
                      {order.dedicatedPrice > 0 &&
                    <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-flex items-center justify-center p-0.5 rounded bg-blue-50 text-blue-500 cursor-help">
                              <SparklesIcon className="w-3.5 h-3.5" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="bg-white text-foreground border-border shadow-xl">
                            <p className="font-semibold text-xs">Dedicated Topic Order</p>
                            <p className="text-[10px] text-muted-foreground">Dedicated Price: ${order.dedicatedPrice}</p>
                          </TooltipContent>
                        </Tooltip>
                    }
                    </div>
                    {order.writingPrice > 0 &&
                  <div className="text-[11px] text-slate-500 py-0.5">+ ${order.writingPrice} Writing</div>
                  }
                  </div>

                  {/* Message */}
                  <div className="flex justify-center pt-1">
                    <div
                    className="relative cursor-pointer text-blue-600 hover:text-blue-700 transition-colors"
                    onClick={() => handleMessageClick(order.id)}>
                    
                      <MessageSquareIcon className="w-5 h-5" />
                      {order.hasMessages > 0 &&
                    <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                          {order.hasMessages}
                        </span>
                    }
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-center gap-2 pt-1">
                    {order.status === 'cancelled' ?
                  <div className="text-[11px] text-slate-500 leading-tight max-w-[180px] text-center font-medium">
                        {order.cancelReason || "Order cancelled"}
                      </div> :
                  order.status === 'in_resolution' ?
                  <div className="flex flex-col items-center gap-1.5">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-semibold shadow-sm">
                          <AlertTriangleIcon className="w-3 h-3" />
                          Resolution Opened
                        </div>
                        <span className="text-[10px] text-slate-500 text-center max-w-[150px] leading-tight">
                          Case under review by support team
                        </span>
                      </div> :

                  <>
                        {order.completionNote &&
                    <div className="text-[10px] text-slate-500 leading-tight max-w-[200px] mb-1 text-center">
                            {order.completionNote}
                          </div>
                    }
                        {/* Leave Feedback: publisher sees it when hasFeedback=true, advertiser sees it when pendingFeedback=true */}
                        {(role === 'publisher' && order.hasFeedback || role === 'advertiser' && order.pendingFeedback) && order.status === 'completed' &&
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-medium h-7 px-3 shadow-sm"
                      onClick={() => onLeaveFeedback && onLeaveFeedback(order)}>
                      
                            Leave Feedback
                          </Button>
                    }
                        
                        {/* Publisher Specific Actions */}
                        {role === 'publisher' && !order.hasFeedback && !order.completionNote &&
                    <>
                            {/* In-Progress with Submitted Link - Text Only */}
                            {order.status === 'in_progress' && order.submittedUrl ?
                      <div className="text-[10px] text-slate-500 text-center max-w-[150px] leading-tight font-medium">
                                Link has been submitted. Customer will review it or the order will be auto-completed after 4 days.
                              </div> :

                      <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-md hover:bg-slate-100 outline-none focus:ring-2 focus:ring-primary/20">
                                    <MoreVerticalIcon className="w-5 h-5" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40">
                                  <div className="flex flex-col gap-1.5 p-1.5">
                                    
                                    {/* New Request: Accept & Reject */}
                                    {order.status === 'new_request' &&
                            <>
                                        <DropdownMenuItem
                                onSelect={() => handlePublisherAcceptOrder(order.id)}
                                className="cursor-pointer h-7 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md focus:bg-emerald-100 focus:text-emerald-800 focus:border-emerald-300 justify-start px-2.5 transition-all mb-1">
                                
                                          <CheckCircleIcon className="w-3.5 h-3.5 mr-2 shrink-0" />
                                          Accept
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                onSelect={() => handleCancelClick(order.id)}
                                className="cursor-pointer h-7 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-md focus:bg-rose-100 focus:text-rose-800 focus:border-rose-300 justify-start px-2.5 transition-all">
                                
                                          <XCircleIcon className="w-3.5 h-3.5 mr-2 shrink-0" />
                                          Reject
                                        </DropdownMenuItem>
                                      </>
                            }

                                    {/* In Progress (No Link): Submit Link & Cancel */}
                                    {order.status === 'in_progress' && !order.submittedUrl &&
                            <>
                                        <DropdownMenuItem
                                onSelect={() => handleOpenSubmitLinkModal(order.id)}
                                className="cursor-pointer h-7 text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md focus:bg-blue-100 focus:text-blue-800 focus:border-blue-300 justify-start px-2.5 transition-all mb-1">
                                
                                          <LinkIcon className="w-3.5 h-3.5 mr-2 shrink-0" />
                                          Submit Link
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                onSelect={() => handleCancelClick(order.id)}
                                className="cursor-pointer h-7 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-md focus:bg-rose-100 focus:text-rose-800 focus:border-rose-300 justify-start px-2.5 transition-all">
                                
                                          <XCircleIcon className="w-3.5 h-3.5 mr-2 shrink-0" />
                                          Cancel
                                        </DropdownMenuItem>
                                      </>
                            }

                                    {/* In Revision: Submit Update & Open Resolution */}
                                    {order.status === 'in_revision' &&
                            <>
                                        <DropdownMenuItem
                                onSelect={() => handleViewDetails(order)}
                                className="cursor-pointer h-7 text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-md focus:bg-purple-100 focus:text-purple-800 focus:border-purple-300 justify-start px-2.5 transition-all mb-1">
                                
                                          <RefreshCwIcon className="w-3.5 h-3.5 mr-2 shrink-0" />
                                          Submit Update
                                        </DropdownMenuItem>
                                    <DropdownMenuItem
                                onSelect={() => handleOpenResolution(order.id)}
                                className="cursor-pointer h-7 text-[10px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-md focus:bg-rose-100 focus:text-rose-800 focus:border-rose-300 justify-start px-2.5 transition-all whitespace-nowrap gap-1.5">
                                
                                      <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
                                      Open Resolution
                                    </DropdownMenuItem>
                                      </>
                            }
                                  </div>
                                </DropdownMenuContent>
                              </DropdownMenu>
                      }
                          </>
                    }

                        {/* Advertiser Specific Actions */}
                        {role === 'advertiser' && !order.hasFeedback && !order.completionNote &&
                    <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-md hover:bg-slate-100 outline-none focus:ring-2 focus:ring-primary/20">
                                <MoreVerticalIcon className="w-5 h-5" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              {/* Actions for In-Progress with Submitted Link */}
                              {order.status === 'in_progress' && order.submittedUrl ?
                        <div className="flex flex-col gap-1.5 p-1.5">
                                  <DropdownMenuItem
                            onSelect={() => handleAcceptOrder(order.id)}
                            className="cursor-pointer h-7 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md focus:bg-emerald-100 focus:text-emerald-800 focus:border-emerald-300 justify-start px-2.5 transition-all">
                            
                                    <CheckCircleIcon className="w-3.5 h-3.5 mr-2 shrink-0" />
                                    Accept Order
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                            onSelect={() => handleRequestRevision(order.id)}
                            className="cursor-pointer h-7 text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-md focus:bg-purple-100 focus:text-purple-800 focus:border-purple-300 justify-start px-2.5 transition-all">
                            
                                    <RefreshCwIcon className="w-3.5 h-3.5 mr-2 shrink-0" />
                                    Request Revision
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                            onSelect={() => handleOpenResolution(order.id)}
                            className="cursor-pointer h-7 text-[10px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-md focus:bg-rose-100 focus:text-rose-800 focus:border-rose-300 justify-start px-2.5 transition-all whitespace-nowrap gap-1.5">
                            
                                    <AlertCircleIcon className="w-3.5 h-3.5 shrink-0" />
                                    Open Resolution
                                  </DropdownMenuItem>
                                </div> : (

                        /* Standard Actions */
                        (order.status === 'new_request' || order.status === 'in_progress') &&
                        <div className="p-1.5">
                                    <DropdownMenuItem
                            onSelect={() => handleCancelClick(order.id)}
                            className="cursor-pointer h-7 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-md focus:bg-rose-100 focus:text-rose-800 focus:border-rose-300 justify-center transition-all">
                            
                                      <XCircleIcon className="w-3.5 h-3.5 mr-2" />
                                      Cancel Order
                                    </DropdownMenuItem>
                                  </div>)

                        }

                              {/* In Revision: Open Resolution */}
                              {order.status === 'in_revision' &&
                        <div className="p-1.5">
                                  <DropdownMenuItem
                            onSelect={() => handleOpenResolution(order.id)}
                            className="cursor-pointer h-7 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-md focus:bg-rose-100 focus:text-rose-800 focus:border-rose-300 justify-start px-2.5 transition-all whitespace-nowrap gap-1.5">
                            
                                    <AlertTriangleIcon className="w-3.5 h-3.5 shrink-0" />
                                    Open Resolution
                                  </DropdownMenuItem>
                                </div>
                        }
                            </DropdownMenuContent>
                          </DropdownMenu>
                    }
                      </>
                  }
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pagination Footer - Responsive */}
        <div className="bg-slate-50 px-4 sm:px-6 py-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-slate-600">
          <div className="text-xs sm:text-[13px]">
            Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of {totalEntries} entries
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="h-8 px-3 text-[12px] bg-white border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">
              
              <ChevronLeftIcon className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            
            {getPageNumbers().map((page, index) =>
            page === '...' ?
            <span key={`ellipsis-${index}`} className="px-2 py-1 text-slate-400">
                  ...
                </span> :

            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={`h-8 w-8 sm:w-auto sm:px-3 text-[12px] ${
              currentPage === page ?
              'bg-blue-600 text-white hover:bg-blue-700 border-blue-600' :
              'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}`
              }>
              
                  {page}
                </Button>

            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="h-8 px-3 text-[12px] bg-white border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">
              
              <span className="hidden sm:inline">Next</span>
              <ChevronRightIcon className="w-4 h-4 sm:ml-1" />
            </Button>
          </div>
        </div>
      </div>

          {/* Custom Scrollbar Styles */}
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              height: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f1f5f9;
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #94a3b8;
            }
          `}</style>
        </div>);

}