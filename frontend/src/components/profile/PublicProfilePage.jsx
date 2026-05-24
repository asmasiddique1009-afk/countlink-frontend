import { useEffect, useRef } from 'react';
import {
  ArrowLeftIcon,
  MessageSquareIcon,
  CalendarIcon,
  ShoppingBagIcon,
  StarIcon,
  ShieldCheckIcon,

  ClockIcon } from


'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { gsap } from 'gsap';







// Mock data generator based on name
const getProfileData = (name) => {
  // Deterministic pseudo-random based on name length
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
    role: seed % 2 === 0 ? 'Advertiser' : 'Publisher',
    location: ['United States', 'United Kingdom', 'Canada', 'Germany', 'Australia'][seed % 5],
    memberSince: `${joinMonth} ${joinYear}`,
    ordersCompleted: ordersDisplay,
    rating: rating,
    reviewsCount: seed * 3 + 2,
    responseTime: ['1 hour', '4 hours', '12 hours', '24 hours'][seed % 4],
    lastActive: ['Just now', '15 mins ago', '2 hours ago', '1 day ago'][seed % 4],
    completionRate: 90 + seed % 10,
    bio: `Professional ${seed % 2 === 0 ? 'advertiser' : 'publisher'} with over ${ordersDisplay} successful orders. Specializes in technology and business content. Committed to high-quality deliverables and fast turnaround times.`,
    reviews: [
    {
      id: 1,
      author: "Alice Smith",
      website: "techcrunch.com",
      rating: 5,
      date: "2 days ago",
      comment: "Great experience working with this user. Clear instructions and fast payment."
    },
    {
      id: 2,
      author: "Bob Jones",
      website: "forbes.com",
      rating: 4,
      date: "1 week ago",
      comment: "Good communication, slightly delayed but overall very professional."
    },
    {
      id: 3,
      author: "Charlie Day",
      website: "businessinsider.com",
      rating: 5,
      date: "3 weeks ago",
      comment: "Excellent! Will definitely work together again."
    }]

  };
};

export function PublicProfilePage({ profileName, onBack, onMessage }) {
  const containerRef = useRef(null);
  const profile = getProfileData(profileName);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [profileName]);

  return (
    <div className="w-full space-y-6 pb-10" ref={containerRef}>
      {/* Header */}
      <div className="flex items-center gap-4 px-2 sm:px-0">
        <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-accent">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Profile Header Card */}
      <Card className="border-border shadow-sm overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative shrink-0">
              <Avatar className="w-20 h-20 border border-border shadow-sm">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-xl bg-primary/10 text-primary">
                  {profile.name.charAt(0)}
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
                      {profile.name}
                    </h1>
                    <Badge variant="secondary" className="text-[10px] font-medium bg-slate-100 text-slate-700 border-slate-200 px-1.5 py-0 h-5">
                      {profile.role}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      Joined {profile.memberSince}
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-3.5 h-3.5" />
                      Active {profile.lastActive}
                    </div>
                  </div>
                </div>

                <Button onClick={onMessage} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm h-9 text-xs px-4">
                  <MessageSquareIcon className="w-3.5 h-3.5 mr-1.5" />
                  Send Message
                </Button>
              </div>

              <div className="mt-6 max-w-3xl">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-3" />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="space-y-0.5 p-2 rounded-lg bg-slate-50/50 border border-slate-100">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Orders</p>
              <div className="flex items-center gap-1.5">
                <ShoppingBagIcon className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-sm font-semibold text-foreground">{profile.ordersCompleted}</span>
              </div>
            </div>

            <div className="space-y-0.5 p-2 rounded-lg bg-slate-50/50 border border-slate-100">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Rating</p>
              <div className="flex items-center gap-1.5">
                <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-sm font-semibold text-foreground">{profile.rating}</span>
                <span className="text-[10px] text-muted-foreground">({profile.reviewsCount})</span>
              </div>
            </div>

            <div className="space-y-0.5 p-2 rounded-lg bg-slate-50/50 border border-slate-100">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Completion</p>
              <div className="flex items-center gap-1.5">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-sm font-semibold text-foreground">{profile.completionRate}%</span>
              </div>
            </div>

            <div className="space-y-0.5 p-2 rounded-lg bg-slate-50/50 border border-slate-100">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Avg. Response Time</p>
              <div className="flex items-center gap-1.5">
                <ClockIcon className="w-3.5 h-3.5 text-purple-600" />
                <span className="text-sm font-semibold text-foreground">{profile.responseTime}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Section - Full Width */}
      <Card className="border-border shadow-sm">
        <CardHeader className="py-4 px-6 border-b border-border">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            Reviews <span className="text-muted-foreground font-normal text-sm">({profile.reviewsCount})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {profile.reviews.map((review) =>
          <div key={review.id} className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8 border border-border">
                    <AvatarFallback className="bg-slate-50 text-xs text-slate-600">{review.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-foreground">{review.author}</p>
                      <span className="text-[10px] text-muted-foreground">•</span>
                      <p className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{review.website}</p>
                    </div>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[1, 2, 3, 4, 5].map((star) =>
                    <StarIcon
                      key={star}
                      className={`w-2.5 h-2.5 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />

                    )}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground">{review.date}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed pl-11">
                "{review.comment}"
              </p>
              <Separator className="mt-4 opacity-50" />
            </div>
          )}
          
          <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground h-8">
            Load More Reviews
          </Button>
        </CardContent>
      </Card>
    </div>);

}