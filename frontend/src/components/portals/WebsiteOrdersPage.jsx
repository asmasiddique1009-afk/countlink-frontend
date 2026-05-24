import { useState, useEffect, useRef } from 'react';
import {
  ArrowLeftIcon,
  FileTextIcon,
  ClockIcon,
  CheckCircle2Icon,
  XCircleIcon,
  CalendarIcon,


  GlobeIcon,

  AlertCircleIcon,
  MessageSquareIcon,
  MoreVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
  PencilIcon,
  StarIcon,
  ExternalLinkIcon,
  AlertTriangleIcon,
  LinkIcon,
  SearchIcon,

  ArrowRightIcon,

  RefreshCwIcon,
  XIcon,
  FilterIcon } from
'lucide-react';
import { Button } from '@/components/ui/button';

import { Badge } from '@/components/ui/badge';
import { OrderDetailsModal } from '@/components/modals/OrderDetailsModal';
import { QuickChatModal } from '@/components/modals/QuickChatModal';
import { CancelOrderModal } from '@/components/modals/CancelOrderModal';
import { AcceptOrderModal } from '@/components/modals/AcceptOrderModal';
import { RequestRevisionModal } from '@/components/modals/RequestRevisionModal';
import { OpenResolutionModal } from '@/components/modals/OpenResolutionModal';
import { SubmitLinkModal } from '@/components/modals/SubmitLinkModal';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger } from

"@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger } from
"@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger } from
"@/components/ui/dropdown-menu";
import { useMessageStore } from '@/stores/messageStore';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';







const defaultInstructions = `I am looking for a professional writer to create a high-quality guest post for our platform. The article should be around 700–750 words, original, and engaging, following our editorial guidelines. It must be written in clear and simple English with an informative and professional tone suitable for our audience.

The content should be well-structured, with a clear title, proper subheadings, and short paragraphs to ensure readability. SEO best practices should be applied, including the primary keyword naturally 2–3 times and secondary keywords where relevant, without overstuffing. Only the approved anchor text and URL(s) should be used, and irrelevant links or promotional content are not allowed. If images are included, they must be relevant and properly attributed.`;

// Mock order data generator
const generateOrdersForWebsite = (domain) => {
  const baseOrders = [
  { id: 'ORD-1001', advertiser: 'John Smith', website: 'mybusiness.com', price: 350, date: '2024-03-01', status: 'in_request', hasWriting: true, articleTitle: 'The Future of AI in Healthcare' },
  { id: 'ORD-1002', advertiser: 'Sarah Johnson', website: 'techstartup.io', price: 350, date: '2024-03-02', status: 'in_request', hasWriting: false, details: '10 Ways to Scale Your SaaS Business in 2024' },
  { id: 'ORD-1003', advertiser: 'Mike Chen', website: 'digitalagency.com', price: 350, date: '2024-03-03', status: 'in_request', hasWriting: true, articleTitle: 'Digital Marketing Trends 2024' },
  { id: 'ORD-1004', advertiser: 'Emma Wilson', website: 'marketingpro.net', price: 350, date: '2024-02-28', status: 'in_progress', hasWriting: true, articleTitle: 'Content Marketing Strategies' },
  { id: 'ORD-1005', advertiser: 'David Brown', website: 'seoexperts.com', price: 350, date: '2024-02-27', status: 'in_progress', hasWriting: false, details: 'SEO Best Practices Guide', submittedUrl: 'healthnews.io/seo-best-practices' },
  { id: 'ORD-1006', advertiser: 'Lisa Anderson', website: 'contentwriters.io', price: 350, date: '2024-02-26', status: 'in_progress', hasWriting: true, articleTitle: 'Writing for the Web' },
  { id: 'ORD-1007', advertiser: 'Tom Garcia', website: 'webdesign.co', price: 350, date: '2024-02-25', status: 'in_progress', hasWriting: false, details: 'Web Design Principles' },
  { id: 'ORD-1008', advertiser: 'Anna Martinez', website: 'brandstudio.com', price: 350, date: '2024-02-24', status: 'in_progress', hasWriting: true, articleTitle: 'Building Brand Identity' },
  { id: 'ORD-1009', advertiser: 'Chris Lee', website: 'socialmedia.net', price: 350, date: '2024-02-20', status: 'completed', hasWriting: false, details: 'Social Media Marketing', publishedUrl: 'healthnews.io/social-media-marketing', googleIndexed: true, linkFound: true },
  { id: 'ORD-1010', advertiser: 'Rachel Kim', website: 'analytics.io', price: 350, date: '2024-02-19', status: 'completed', hasWriting: true, articleTitle: 'Data Analytics Guide', publishedUrl: 'healthnews.io/data-analytics', googleIndexed: false, linkFound: true },
  { id: 'ORD-1011', advertiser: 'James Taylor', website: 'consulting.com', price: 350, date: '2024-02-18', status: 'completed', hasWriting: false, details: 'Business Consulting Tips', publishedUrl: 'healthnews.io/consulting-tips', googleIndexed: true, linkFound: true },
  { id: 'ORD-1012', advertiser: 'Sophie White', website: 'ecommerce.shop', price: 350, date: '2024-02-17', status: 'completed', hasWriting: true, articleTitle: 'E-commerce Success Stories', publishedUrl: 'healthnews.io/ecommerce-success', googleIndexed: false, linkFound: false },
  { id: 'ORD-1013', advertiser: 'Daniel Park', website: 'startup.tech', price: 350, date: '2024-02-16', status: 'completed', hasWriting: false, details: 'Startup Growth Hacks', publishedUrl: 'healthnews.io/startup-growth', googleIndexed: true, linkFound: true },
  { id: 'ORD-1014', advertiser: 'Olivia Davis', website: 'growth.io', price: 350, date: '2024-02-15', status: 'completed', hasWriting: true, articleTitle: 'Growth Marketing Tactics', publishedUrl: 'healthnews.io/growth-marketing', googleIndexed: true, linkFound: true },
  { id: 'ORD-1015', advertiser: 'Ryan Miller', website: 'innovation.co', price: 350, date: '2024-02-14', status: 'completed', hasWriting: false, details: 'Innovation in Tech', publishedUrl: 'healthnews.io/innovation-tech', googleIndexed: true, linkFound: true },
  { id: 'ORD-1016', advertiser: 'Emily Clark', website: 'ventures.com', price: 350, date: '2024-02-13', status: 'completed', hasWriting: true, articleTitle: 'Venture Capital Insights', publishedUrl: 'healthnews.io/venture-capital', googleIndexed: true, linkFound: true },
  { id: 'ORD-1017', advertiser: 'Alex Turner', website: 'solutions.net', price: 350, date: '2024-02-10', status: 'cancelled', hasWriting: false, details: 'Tech Solutions', cancelReason: 'Order was automatically terminated due to no action taken within the allowed time.' },
  { id: 'ORD-1018', advertiser: 'Grace Hall', website: 'platform.io', price: 350, date: '2024-02-09', status: 'cancelled', hasWriting: true, articleTitle: 'Platform Development', cancelReason: 'Order cancelled by the customer.' }];


  const projectNames = ['SEO Campaign Q1', 'Link Building 2024', 'Brand Awareness', 'Content Marketing', 'Q2 Outreach'];

  // Generate 50 orders
  const allOrders = [];
  for (let i = 0; i < 50; i++) {
    const baseOrder = baseOrders[i % baseOrders.length];

    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    const createdDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    let timer = null;
    let timerStatus = null;

    if (baseOrder.status === 'in_progress' || baseOrder.status === 'in_request') {
      const daysLeft = Math.floor(Math.random() * 5);
      const hoursLeft = Math.floor(Math.random() * 23);
      timer = `${daysLeft}d ${hoursLeft}h 30m`;
      timerStatus = daysLeft < 2 ? 'warning' : 'success';
    } else if (baseOrder.status === 'cancelled' && baseOrder.cancelReason?.includes('terminated')) {
      timer = 'Expired';
      timerStatus = 'expired';
    }

    let verificationData = {};
    if (baseOrder.status === 'completed') {
      verificationData = {
        googleIndexed: baseOrder.googleIndexed ?? true,
        linkFound: baseOrder.linkFound ?? true,
        lastChecked: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
    }

    allOrders.push({
      ...baseOrder,
      ...verificationData,
      id: `ORD-2024-${String(i + 1).padStart(3, '0')}`,
      createdDate,
      timer,
      timerStatus,
      instructions: defaultInstructions,
      projectName: projectNames[Math.floor(Math.random() * projectNames.length)],
      writingPrice: baseOrder.hasWriting ? 35 : 0,
      dedicatedPrice: Math.random() > 0.7 ? 15 : 0,
      hasMessages: Math.floor(Math.random() * 3),
      advertiser: { name: baseOrder.advertiser, reviews: Math.floor(Math.random() * 200) + 20 }
    });
  }
  return allOrders;
};

export function WebsiteOrdersPage({ websiteDomain, onBack, onNavigateToMessages }) {
  const { selectConversation, conversations } = useMessageStore();
  const [orders, setOrders] = useState(generateOrdersForWebsite(websiteDomain));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [revisionModalOpen, setRevisionModalOpen] = useState(false);
  const [resolutionModalOpen, setResolutionModalOpen] = useState(false);
  const [submitLinkModalOpen, setSubmitLinkModalOpen] = useState(false);

  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState(null);
  const [selectedOrderForCancel, setSelectedOrderForCancel] = useState(null);
  const [selectedOrderForAccept, setSelectedOrderForAccept] = useState(null);
  const [selectedOrderForRevision, setSelectedOrderForRevision] = useState(null);
  const [selectedOrderForResolution, setSelectedOrderForResolution] = useState(null);
  const [selectedOrderForSubmission, setSelectedOrderForSubmission] = useState(null);

  const tableRef = useRef(null);

  // Calculate status counts
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  // Filter logic
  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
    order.id.toLowerCase().includes(query) ||
    order.advertiser.name.toLowerCase().includes(query) ||
    order.projectName?.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

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

    return matchesSearch && matchesStatus && matchesDate;
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
  }, [searchQuery, statusFilter, dateRange]);

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
      case 'in_request':
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
    const toLocalISO = (d) => {
      const offset = d.getTimezoneOffset() * 60000;
      return new Date(d.getTime() - offset).toISOString().split('T')[0];
    };
    setDateRange({
      start: toLocalISO(start),
      end: toLocalISO(end)
    });
  };

  const handleViewDetails = (order) => {
    setSelectedOrderForDetails(order);
    setOrderModalOpen(true);
  };

  const handleMessageClick = (orderId) => {
    const conversation = conversations.find((c) => c.orderId === orderId);
    if (conversation) {
      selectConversation(conversation.id);
    } else if (conversations.length > 0) {
      selectConversation(conversations[0].id);
    }
    setChatModalOpen(true);
  };

  const handleCancelClick = (orderId) => {
    setSelectedOrderForCancel(orderId);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = () => {
    setCancelModalOpen(false);
    setSelectedOrderForCancel(null);
  };

  const handleContactPublisher = () => {
    if (selectedOrderForCancel) {
      handleMessageClick(selectedOrderForCancel);
    }
    setCancelModalOpen(false);
  };

  const handleAcceptOrder = (orderId) => {
    setSelectedOrderForAccept(orderId);
    setAcceptModalOpen(true);
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

  const handlePublisherAcceptOrder = (orderId) => {
    setOrders((prev) => prev.map((o) =>
    o.id === orderId ?
    { ...o, status: 'in_progress', statusLabel: 'In Progress' } :
    o
    ));
  };

  const handleRequestRevision = (orderId) => {
    setSelectedOrderForRevision(orderId);
    setRevisionModalOpen(true);
  };

  const handleConfirmRevision = (reason) => {
    if (selectedOrderForRevision) {
      const conversation = conversations.find((c) => c.orderId === selectedOrderForRevision);
      if (conversation) {
        useMessageStore.getState().sendMessage(conversation.id, reason, 'revision_request');
        selectConversation(conversation.id);
        setChatModalOpen(true);
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
      setOrders((prev) => prev.map((o) =>
      o.id === selectedOrderForResolution ?
      { ...o, status: 'in_resolution', statusLabel: 'In Resolution' } :
      o
      ));

      const conversation = conversations.find((c) => c.orderId === selectedOrderForResolution);
      if (conversation) {
        useMessageStore.getState().sendMessage(conversation.id, reason, 'resolution_opened');
        selectConversation(conversation.id);
        setChatModalOpen(true);
      }
    }
    setResolutionModalOpen(false);
    setSelectedOrderForResolution(null);
  };

  const handleOpenSubmitLinkModal = (orderId) => {
    setSelectedOrderForSubmission(orderId);
    setSubmitLinkModalOpen(true);
  };

  const handleConfirmSubmitLink = (link) => {
    if (selectedOrderForSubmission) {
      setOrders((prev) => prev.map((o) =>
      o.id === selectedOrderForSubmission ?
      { ...o, submittedUrl: link, status: 'in_progress' } :
      o
      ));
      setSelectedOrderForSubmission(null);
    }
  };

  const handleUpdateDetails = (orderId, data) => {
    setOrders((prev) => prev.map((o) =>
    o.id === orderId ?
    { ...o, details: data.details } :
    o
    ));
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  // Calculate stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'in_request' || o.status === 'in_progress').length;
  const completedOrders = orders.filter((o) => o.status === 'completed');
  const totalEarnings = completedOrders.reduce((sum, o) => sum + o.price, 0);
  const pendingEarnings = orders.filter((o) => o.status === 'in_request' || o.status === 'in_progress').reduce((sum, o) => sum + o.price, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      <OrderDetailsModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        order={selectedOrderForDetails}
        role="publisher"
        onOpenSubmitLink={() => handleOpenSubmitLinkModal(selectedOrderForDetails?.id)}
        onCancelOrder={handleCancelClick}
        onUpdateDetails={handleUpdateDetails}
        onAcceptOrder={() => handleAcceptOrder(selectedOrderForDetails?.id)}
        onPublisherAccept={() => handlePublisherAcceptOrder(selectedOrderForDetails?.id)}
        onRequestRevision={() => handleRequestRevision(selectedOrderForDetails?.id)}
        onOpenResolution={() => handleOpenResolution(selectedOrderForDetails?.id)}
        onSendMessage={() => {
          if (selectedOrderForDetails) {
            const advertiserName = selectedOrderForDetails.advertiser?.name || selectedOrderForDetails.website || 'Advertiser';
            const convId = useMessageStore.getState().openConversationForOrder(
              selectedOrderForDetails.id,
              advertiserName,
              'Advertiser'
            );
            selectConversation(convId);
            setOrderModalOpen(false);
            onNavigateToMessages?.(convId);
          }
        }} />
      

      <QuickChatModal
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)} />
      

      <CancelOrderModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        onContactPublisher={handleContactPublisher} />
      

      <AcceptOrderModal
        isOpen={acceptModalOpen}
        onClose={() => setAcceptModalOpen(false)}
        onConfirm={handleConfirmAccept} />
      

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
      

      <SubmitLinkModal
        isOpen={submitLinkModalOpen}
        onClose={() => setSubmitLinkModalOpen(false)}
        onConfirm={handleConfirmSubmitLink} />
      

      <div className="w-full space-y-4 sm:space-y-6">
        {/* Page Header */}
        <div className="px-2 sm:px-0">
          <div className="flex items-center gap-3 mb-2">
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Portals
            </Button>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Orders for {websiteDomain}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Manage and track all orders for this website</p>
        </div>


        {/* Filters Toolbar */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon className="w-3.5 h-3.5" />
            </div>
            <Input
              placeholder="Search order ID, advertiser..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9 text-sm bg-white border-slate-200 shadow-sm focus-visible:ring-primary/20 transition-all hover:border-slate-300" />
            
          </div>

          {/* Filters Group */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] h-9 bg-white border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-slate-700 text-[13px] font-medium hover:bg-slate-50 hover:border-slate-300 transition-all focus:ring-2 focus:ring-primary/10 focus:border-primary/30">
                <div className="flex items-center gap-2 truncate">
                  <FilterIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">
                    {statusFilter === 'all' ? 'All Statuses' :
                    statusFilter === 'in_request' ? 'In Request' :
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
                
                <SelectItem value="in_request" className="text-[13px] rounded-md focus:bg-blue-50/50 cursor-pointer py-2">
                  <div className="flex items-center justify-between w-full gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_4px_rgba(59,130,246,0.4)]"></div>
                      <span className="text-slate-700">In Request</span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200 min-w-[24px] text-center">{statusCounts['in_request'] || 0}</span>
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

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs font-normal" onClick={() => setDatePreset(7)}>Last 7 Days</Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs font-normal" onClick={() => setDatePreset(30)}>Last 30 Days</Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs font-normal" onClick={() => setMonthPreset(0)}>This Month</Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs font-normal" onClick={() => setMonthPreset(-1)}>Last Month</Button>
                  </div>

                  <div className="h-px bg-border" />

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
            {(searchQuery || statusFilter !== 'all' || dateRange.start || dateRange.end) &&
            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setDateRange({ start: '', end: '' });
              }}
              className="h-9 px-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors text-sm">
              
                <XIcon className="w-3.5 h-3.5 mr-1.5" />
                Reset
              </Button>
            }
          </div>
        </div>

        {/* Orders Table */}
        <div ref={tableRef} className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar pb-2">
            <div className="min-w-[1400px] inline-block w-full align-middle">
              {/* Table Header */}
              <div className="grid grid-cols-[minmax(200px,1.5fr)_minmax(160px,1.2fr)_minmax(180px,1.2fr)_minmax(240px,2fr)_minmax(150px,1.2fr)_minmax(110px,0.9fr)_minmax(80px,0.6fr)_minmax(180px,1.5fr)] gap-5 bg-slate-50 px-6 py-3 border-b border-border text-[11px] font-semibold text-slate-600 uppercase tracking-wide w-full">
                <div className="whitespace-nowrap">Order ID / Website</div>
                <div className="whitespace-nowrap">Created / Timer</div>
                <div className="whitespace-nowrap">Advertiser</div>
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
                    "grid grid-cols-[minmax(200px,1.5fr)_minmax(160px,1.2fr)_minmax(180px,1.2fr)_minmax(240px,2fr)_minmax(150px,1.2fr)_minmax(110px,0.9fr)_minmax(80px,0.6fr)_minmax(180px,1.5fr)] gap-5 py-5 transition-colors items-start w-full min-h-[130px]",
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
                        
                          {websiteDomain}
                          <ExternalLinkIcon className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <div className="text-slate-500 text-[12px] font-medium tabular-nums">{order.id}</div>
                    </div>

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

                    {/* Advertiser Profile */}
                    <div className="pr-2 flex items-center">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                            {order.advertiser.name.charAt(0)}
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[13px] font-semibold text-slate-700 hover:text-blue-600 cursor-pointer transition-colors">
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

                    {/* Details */}
                    <div className="pr-3">
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
                    </div>

                    {/* Status */}
                    <div className="pt-1 pr-3">
                      <Badge className={`${getStatusConfig(order.status)} mb-2 text-[11px] font-medium px-2.5 py-0.5 border`}>
                        {order.status === 'in_request' ? 'In Request' :
                      order.status === 'in_progress' ? 'In Progress' :
                      order.status === 'in_revision' ? 'In Revision' :
                      order.status === 'in_resolution' ? 'In Resolution' :
                      order.status === 'completed' ? 'Completed' : 'Cancelled'}
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
                                  {order.status === 'in_request' &&
                            <>
                                      <DropdownMenuItem
                                onSelect={() => handlePublisherAcceptOrder(order.id)}
                                className="cursor-pointer h-7 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md focus:bg-emerald-100 focus:text-emerald-800 focus:border-emerald-300 justify-start px-2.5 transition-all mb-1">
                                
                                        <CheckCircle2Icon className="w-3.5 h-3.5 mr-2 shrink-0" />
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
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pagination Footer */}
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
      </div>
    </>);

}