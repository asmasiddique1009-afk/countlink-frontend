import { useState, useEffect, useRef } from 'react';
import {
  ArrowLeftIcon,
  MessageSquareIcon,
  CalendarIcon,
  ShoppingBagIcon,
  StarIcon,
  ShieldCheckIcon,

  ClockIcon,
  AwardIcon,
  ZapIcon,
  ShieldIcon,
  BookmarkIcon,
  BanIcon,
  PenToolIcon,
  ShoppingCartIcon,
  CheckIcon,
  HeartIcon } from
'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger } from
"@/components/ui/tooltip";









// Mock publisher data generator
const getPublisherData = (name) => {
  const seed = name.length;

  const joinYears = [2021, 2022, 2023, 2024];
  const joinYear = joinYears[seed % joinYears.length];
  const joinMonth = ['Jan', 'Mar', 'May', 'Aug', 'Oct', 'Dec'][seed % 6];

  const ordersCount = seed * 12 + 5;
  const ordersDisplay = ordersCount > 100 ? '100+' : ordersCount > 50 ? '50+' : ordersCount > 20 ? '20+' : ordersCount > 10 ? '10+' : '5+';

  const rating = (4 + seed % 10 / 10).toFixed(1);

  return {
    name: name,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    location: ['United States', 'United Kingdom', 'Canada', 'Germany', 'Australia'][seed % 5],
    memberSince: `${joinMonth} ${joinYear}`,
    ordersCompleted: ordersDisplay,
    rating: rating,
    reviewsCount: seed * 3 + 127,
    lastActive: ['Just now', '15 mins ago', '2 hours ago', '1 day ago'][seed % 4],
    completionRate: 90 + seed % 10,
    badge: seed % 3 === 0 ? 'Trusted Publisher' : null,
    bio: `Professional publisher with over ${ordersDisplay} successful orders. Specializes in technology and business content. Committed to high-quality deliverables and fast turnaround times.`
  };
};

// Mock websites data for this publisher
const getPublisherWebsites = (publisherName) => {
  const seed = publisherName.length;

  const templates = [
  {
    domain: 'TechDaily',
    tld: '.com',
    initial: 'T',
    initialColor: 'bg-indigo-100 text-indigo-600',
    categories: ['Technology', 'AI', 'SaaS'],
    blocked: ['Crypto', 'Gambling'],
    language: 'English',
    country: 'United Kingdom',
    flag: '🇬🇧',
    langFlag: '🇺🇸'
  },
  {
    domain: 'FinanceToday',
    tld: '.net',
    initial: 'F',
    initialColor: 'bg-green-100 text-green-600',
    categories: ['Business', 'Finance', 'Economy'],
    blocked: ['None'],
    language: 'Spanish',
    country: 'Spain',
    flag: '🇪🇸',
    langFlag: '🇪🇸'
  },
  {
    domain: 'HealthWeekly',
    tld: '.org',
    initial: 'H',
    initialColor: 'bg-red-100 text-red-600',
    categories: ['Health', 'Wellness', 'Medical'],
    blocked: ['Pharma'],
    language: 'German',
    country: 'Germany',
    flag: '🇩🇪',
    langFlag: '🇩🇪'
  }];


  // Generate 3-5 websites for this publisher
  const websiteCount = 3 + seed % 3;
  const websites = [];

  for (let i = 0; i < websiteCount; i++) {
    const template = templates[i % templates.length];
    websites.push({
      id: seed * 100 + i,
      domain: `${template.domain}${seed + i}${template.tld}`,
      initial: template.initial,
      initialColor: template.initialColor,
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      published: `${Math.floor(Math.random() * 24) + 1}h ago`,
      categories: template.categories,
      blocked: template.blocked,
      language: template.language,
      country: template.country,
      flag: template.flag,
      langFlag: template.langFlag,
      da: Math.floor(Math.random() * 60) + 20,
      dr: Math.floor(Math.random() * 60) + 20,
      traffic: `${Math.floor(Math.random() * 100) + 1}K`,
      price: Math.floor(Math.random() * 400) + 50,
      copywriting: Math.floor(Math.random() * 40) + 10,
      discount: Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 5 : 0,
      isFavorite: Math.random() > 0.8,
      badges: {
        proPublisher: Math.random() > 0.5,
        fastDelivery: Math.random() > 0.6,
        lifetimeGuarantee: Math.random() > 0.7
      }
    });
  }

  return websites;
};

export function PublisherProfilePage({ publisherName, onBack, onMessage, onWebsiteClick, onRatingsClick }) {
  const containerRef = useRef(null);
  const publisher = getPublisherData(publisherName);
  const websites = getPublisherWebsites(publisherName);
  const [addingItemId, setAddingItemId] = useState(null);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [publisherName]);

  const handleAddToCart = (itemId) => {
    setAddingItemId(itemId);

    setTimeout(() => {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1
      }));
      setAddingItemId(null);
    }, 400);
  };

  const incrementCartQuantity = (itemId, e) => {
    e.stopPropagation();
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  return (
    <TooltipProvider>
      <div className="w-full max-w-7xl mx-auto space-y-6 pb-10" ref={containerRef}>
        {/* Header */}
        <div className="flex items-center gap-4 px-2 sm:px-0">
          <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-accent">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card className="border-border shadow-sm overflow-hidden">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="relative shrink-0">
                <Avatar className="w-20 h-20 border border-border shadow-sm">
                  <AvatarImage src={publisher.avatar} alt={publisher.name} />
                  <AvatarFallback className="text-xl bg-primary/10 text-primary">
                    {publisher.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-card rounded-full" title="Online"></div>
              </div>

              {/* Info */}
              <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-xl font-bold text-foreground">
                        {publisher.name}
                      </h1>
                      <Badge variant="secondary" className="text-[10px] font-medium bg-slate-100 text-slate-700 border-slate-200 px-1.5 py-0 h-5">
                        Publisher
                      </Badge>
                      {publisher.badge &&
                      <Badge variant="secondary" className="text-[10px] font-medium bg-blue-50 text-blue-700 border-blue-200 px-1.5 py-0 h-5">
                          {publisher.badge}
                        </Badge>
                      }
                    </div>
                    
                    {/* Rating - Clickable */}
                    <button
                      onClick={() => onRatingsClick?.(publisherName)}
                      className="inline-flex items-center gap-1.5 text-sm hover:underline cursor-pointer mt-2">
                      
                      <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-semibold text-foreground">{publisher.rating}</span>
                      <span className="text-muted-foreground">({publisher.reviewsCount})</span>
                      <span className="text-muted-foreground">Rating</span>
                    </button>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground mt-3">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        Member Since {publisher.memberSince}
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-3.5 h-3.5" />
                        Last Active {publisher.lastActive}
                      </div>
                    </div>
                  </div>

                  <Button onClick={onMessage} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm h-9 text-xs px-4">
                    <MessageSquareIcon className="w-3.5 h-3.5 mr-1.5" />
                    Send Message
                  </Button>
                </div>

                <div className="mt-3 max-w-3xl">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {publisher.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="space-y-0.5 p-2 rounded-lg bg-slate-50/50 border border-slate-100">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Total Orders</p>
                <div className="flex items-center gap-1.5">
                  <ShoppingBagIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-sm font-semibold text-foreground">{publisher.ordersCompleted}</span>
                </div>
              </div>

              <div className="space-y-0.5 p-2 rounded-lg bg-slate-50/50 border border-slate-100">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Success Rate</p>
                <div className="flex items-center gap-1.5">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-sm font-semibold text-foreground">{publisher.completionRate}%</span>
                </div>
              </div>

              <div className="space-y-0.5 p-2 rounded-lg bg-slate-50/50 border border-slate-100">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Websites</p>
                <div className="flex items-center gap-1.5">
                  <ShieldIcon className="w-3.5 h-3.5 text-purple-600" />
                  <span className="text-sm font-semibold text-foreground">{websites.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Websites Section */}
        <Card className="border-border shadow-sm">
          <CardHeader className="py-4 px-6 border-b border-border">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              Publisher's Websites <span className="text-muted-foreground font-normal text-sm">({websites.length})</span>
            </CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider w-[240px]">Website & Rating</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider w-[220px]">Category & Topics</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider w-[180px]">Region</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider w-[200px]">Authority Metrics</th>
                  <th className="px-4 py-3 text-right text-[11px] font-semibold text-muted-foreground uppercase tracking-wider w-[120px]">Pricing</th>
                  <th className="px-4 py-3 text-right text-[11px] font-semibold text-muted-foreground uppercase tracking-wider w-[100px]">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                {websites.map((item) =>
                <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 align-top">
                      <div className="flex items-start gap-2.5">
                        <div className={`size-7 rounded-md ${item.initialColor} flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5`}>
                          {item.initial}
                        </div>
                        <div className="flex flex-col gap-2 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <button
                            onClick={() => onWebsiteClick?.(item.id)}
                            className="text-sm font-semibold text-primary hover:underline truncate text-left">
                            
                              {item.domain}
                            </button>
                            {item.isFavorite && <HeartIcon className="w-2.5 h-2.5 text-rose-500 fill-rose-500 shrink-0" />}
                          </div>
                          
                          {/* Badges */}
                          {(item.badges.proPublisher || item.badges.fastDelivery || item.badges.lifetimeGuarantee) &&
                        <div className="flex items-center gap-1 flex-wrap">
                              {item.badges.proPublisher &&
                          <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-amber-200/50 hover:bg-slate-50 transition-colors cursor-help">
                                      <AwardIcon className="w-3 h-3 text-amber-600 stroke-[2]" />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-[220px] bg-slate-900 text-white shadow-lg">
                                    <p className="text-xs font-semibold mb-1">Pro Publisher</p>
                                    <p className="text-xs leading-relaxed">Experienced and trusted publisher with strong performance history.</p>
                                  </TooltipContent>
                                </Tooltip>
                          }
                              
                              {item.badges.fastDelivery &&
                          <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-yellow-200/50 hover:bg-slate-50 transition-colors cursor-help">
                                      <ZapIcon className="w-3 h-3 text-yellow-600 stroke-[2] fill-yellow-600" />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-[220px] bg-slate-900 text-white shadow-lg">
                                    <p className="text-xs font-semibold mb-1">Fast Delivery</p>
                                    <p className="text-xs leading-relaxed">Orders are usually completed faster than the standard delivery time.</p>
                                  </TooltipContent>
                                </Tooltip>
                          }
                              
                              {item.badges.lifetimeGuarantee &&
                          <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-emerald-200/50 hover:bg-slate-50 transition-colors cursor-help">
                                      <ShieldIcon className="w-3 h-3 text-emerald-600 stroke-[2]" />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-[240px] bg-slate-900 text-white shadow-lg">
                                    <p className="text-xs font-semibold mb-1">Lifetime Link Guarantee</p>
                                    <p className="text-xs leading-relaxed">We ensure your live link remains active. If any issue occurs, our team will resolve and restore the placement.</p>
                                  </TooltipContent>
                                </Tooltip>
                          }
                            </div>
                        }
                          
                          <div className="flex items-center gap-1 text-[11px] mt-1">
                            <StarIcon className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-foreground font-medium">{item.rating}</span>
                            <span className="text-muted-foreground">Rating</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-1.5 text-xs text-foreground">
                          <BookmarkIcon className="w-3.5 h-3.5 text-[#007ad8] mt-0.5 shrink-0" />
                          <span className="leading-4">{item.categories.join(', ')}</span>
                        </div>
                        <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <BanIcon className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                          <span className="leading-4">{item.blocked.join(', ')}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-foreground">
                          <span className="text-base leading-none">{item.langFlag}</span>
                          <span>{item.language}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-foreground">
                          <span className="text-base leading-none">{item.flag}</span>
                          <span className="text-muted-foreground">{item.country}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="grid grid-cols-1 gap-1.5">
                        <div className="flex items-center justify-between p-1 rounded bg-slate-50 border border-slate-100 max-w-[160px]">
                          <div className="flex items-center gap-1.5">
                            <span className="flex items-center justify-center size-3.5 rounded-sm bg-[#007ad8] text-white text-[8px] font-bold tracking-tighter">M</span>
                            <span className="text-[10px] font-medium text-muted-foreground">DA</span>
                          </div>
                          <span className="text-[11px] font-medium text-foreground">{item.da}</span>
                        </div>
                        <div className="flex items-center justify-between p-1 rounded bg-slate-50 border border-slate-100 max-w-[160px]">
                          <div className="flex items-center gap-1.5">
                            <span className="flex items-center justify-center size-3.5 rounded-sm bg-[#ff6300] text-white text-[8px] font-bold tracking-tighter">A</span>
                            <span className="text-[10px] font-medium text-muted-foreground">DR</span>
                          </div>
                          <span className="text-[11px] font-medium text-foreground">{item.dr}</span>
                        </div>
                        <div className="flex items-center justify-between p-1 rounded bg-slate-50 border border-slate-100 max-w-[160px]">
                          <div className="flex items-center gap-1.5">
                            <span className="flex items-center justify-center size-3.5 rounded-sm bg-[#323642] text-white text-[8px] font-bold tracking-tighter">S</span>
                            <span className="text-[10px] font-medium text-muted-foreground">Traffic</span>
                          </div>
                          <span className="text-[11px] font-medium text-foreground">{item.traffic}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="flex flex-col items-end gap-0.5 pt-1 pr-4">
                        {item.discount > 0 ?
                      <>
                            <div className="flex items-center justify-end gap-1.5">
                              <span className="text-[11px] text-muted-foreground line-through">${item.price}</span>
                              <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-semibold bg-gradient-to-r from-red-50 to-orange-50 text-red-600 border border-red-200 hover:bg-red-50 whitespace-nowrap">
                                {item.discount}% OFF
                              </Badge>
                            </div>
                            <span className="text-sm text-foreground">${(item.price * (1 - item.discount / 100)).toFixed(0)}</span>
                          </> :

                      <span className="text-sm text-foreground">${item.price}</span>
                      }
                        <div className="flex items-center justify-end gap-1">
                          <span className="text-xs text-muted-foreground">+${item.copywriting}</span>
                          <PenToolIcon className="w-3 h-3 text-muted-foreground" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <div className="flex justify-end">
                        {cartItems[item.id] ?
                      <div className="inline-flex items-center rounded-md overflow-hidden shadow-sm">
                            <Button
                          onClick={(e) => incrementCartQuantity(item.id, e)}
                          variant="outline"
                          className="h-8 pl-2.5 pr-1.5 border-primary/50 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium transition-all duration-300 whitespace-nowrap rounded-r-none border-r-0">
                          
                              <CheckIcon className="w-3.5 h-3.5 mr-1" />
                              In Cart
                            </Button>
                            <button
                          onClick={(e) => incrementCartQuantity(item.id, e)}
                          className="flex h-8 min-w-[28px] items-center justify-center bg-primary/20 px-2 text-xs font-bold text-primary border border-primary/50 border-l-0 hover:bg-primary/30 transition-colors cursor-pointer">
                          
                              {cartItems[item.id]}
                            </button>
                          </div> :

                      <Button
                        onClick={() => handleAddToCart(item.id)}
                        disabled={addingItemId === item.id}
                        className={cn(
                          "h-8 px-3 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm text-xs font-medium justify-center transition-all duration-300 whitespace-nowrap",
                          addingItemId === item.id && "scale-95 bg-green-500 hover:bg-green-500"
                        )}>
                        
                            {addingItemId === item.id ?
                        <>
                                <CheckIcon className="w-3.5 h-3.5 mr-1.5 animate-in zoom-in duration-200" />
                                Adding...
                              </> :

                        <>
                                <ShoppingCartIcon className="w-3.5 h-3.5 mr-1.5" />
                                Add to Cart
                              </>
                        }
                          </Button>
                      }
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </TooltipProvider>);

}