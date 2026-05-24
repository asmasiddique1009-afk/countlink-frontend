import { useEffect, useRef } from 'react';
import { ArrowLeftIcon, StarIcon, ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { gsap } from 'gsap';






// Mock reviews data
const getReviews = (publisherName) => {
  const seed = publisherName.length;

  const reviews = [
  {
    id: 1,
    advertiserName: 'John Smith',
    advertiserAvatar: 'https://ui-avatars.com/api/?name=John+Smith&background=random',
    websiteName: 'TechDaily.com',
    rating: 5,
    date: '2 days ago',
    review: 'Excellent work! The article was published quickly and the quality exceeded my expectations. The publisher was very professional and responsive throughout the process.',
    helpful: 12,
    notHelpful: 1
  },
  {
    id: 2,
    advertiserName: 'Sarah Johnson',
    advertiserAvatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random',
    websiteName: 'FinanceToday.net',
    rating: 4,
    date: '5 days ago',
    review: 'Great experience overall. The content was well-placed and the link is indexed. Minor delay in delivery but the quality made up for it.',
    helpful: 8,
    notHelpful: 0
  },
  {
    id: 3,
    advertiserName: 'Michael Chen',
    advertiserAvatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=random',
    websiteName: 'HealthWeekly.org',
    rating: 5,
    date: '1 week ago',
    review: 'Outstanding service! The publisher followed all my instructions perfectly and the article looks great on the website. Highly recommend!',
    helpful: 15,
    notHelpful: 2
  },
  {
    id: 4,
    advertiserName: 'Emily Davis',
    advertiserAvatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=random',
    websiteName: 'TechDaily.com',
    rating: 5,
    date: '2 weeks ago',
    review: 'Very satisfied with the results. Fast delivery, professional communication, and high-quality placement. Will definitely order again.',
    helpful: 10,
    notHelpful: 0
  },
  {
    id: 5,
    advertiserName: 'David Wilson',
    advertiserAvatar: 'https://ui-avatars.com/api/?name=David+Wilson&background=random',
    websiteName: 'FinanceToday.net',
    rating: 4,
    date: '3 weeks ago',
    review: 'Good service. The article was published as promised and the link is live. Communication could have been better but overall a positive experience.',
    helpful: 6,
    notHelpful: 1
  }];


  return reviews;
};

export function RatingsPage({ publisherName, onBack }) {
  const containerRef = useRef(null);
  const reviews = getReviews(publisherName);

  // Calculate rating statistics
  const totalReviews = reviews.length;

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

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) =>
        <StarIcon
          key={star}
          className={`w-4 h-4 ${
          star <= rating ?
          'fill-amber-400 text-amber-400' :
          'text-slate-200'}`
          } />

        )}
      </div>);

  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-10" ref={containerRef}>
      {/* Header */}
      <div className="flex items-center gap-4 px-2 sm:px-0">
        <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-accent">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Profile
        </Button>
      </div>


      {/* Reviews List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground px-2 sm:px-0">
          Customer Reviews
        </h2>
        
        {reviews.map((review) =>
        <Card key={review.id} className="border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                {/* Review Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10 border border-border">
                      <AvatarImage src={review.advertiserAvatar} alt={review.advertiserName} />
                      <AvatarFallback className="text-sm bg-primary/10 text-primary">
                        {review.advertiserName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-foreground">
                          {review.advertiserName}
                        </h3>
                        <Badge variant="secondary" className="text-[10px] font-medium bg-slate-100 text-slate-700 border-slate-200 px-1.5 py-0 h-5">
                          Advertiser
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Ordered on {review.websiteName}</span>
                        <span>•</span>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                <p className="text-sm text-foreground leading-relaxed">
                  {review.review}
                </p>

                {/* Review Actions */}
                <div className="flex items-center gap-4 pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground">Was this helpful?</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs hover:bg-green-50 hover:text-green-700">
                      <ThumbsUpIcon className="w-3.5 h-3.5 mr-1" />
                      {review.helpful}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs hover:bg-red-50 hover:text-red-700">
                      <ThumbsDownIcon className="w-3.5 h-3.5 mr-1" />
                      {review.notHelpful}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>);

}