import { Button } from '@/components/ui/button';
import { CheckCircleIcon, ClockIcon, BellIcon, LayoutDashboardIcon, ArrowRightIcon, PlusIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';








export function Step4Success({ onFinish, onAddAnother, isEditing, status = 'in_review' }) {
  const isReview = status === 'in_review';

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm ring-8 ${isReview ? 'bg-amber-100 ring-amber-50' : 'bg-green-100 ring-green-50'}`}>
        {isReview ?
        <ClockIcon className="w-10 h-10 text-amber-600" strokeWidth={2} /> :

        <CheckCircleIcon className="w-10 h-10 text-green-600" strokeWidth={2} />
        }
      </div>
      
      <h2 className="text-2xl font-bold text-foreground mb-2">
        {isEditing ?
        isReview ? "Changes Submitted for Review" : "Changes Saved Successfully!" :
        "Website Submitted Successfully!"}
      </h2>
      <p className="text-muted-foreground text-sm max-w-md mb-10">
        {isEditing ?
        isReview ?
        "Your changes require moderation. The website status has been updated to 'In Review'." :
        "Your website details have been updated and are live." :
        "Your website is now under review. We will notify you once it's approved and live on the marketplace."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-10">
        <Card className="border-border bg-card shadow-sm">
          <CardContent className="p-5 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
              <ClockIcon className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Review Process</h4>
            <p className="text-xs text-muted-foreground">Our team typically reviews sites within 24-48 hours.</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardContent className="p-5 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center mb-3">
              <BellIcon className="w-5 h-5 text-amber-600" />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Notification</h4>
            <p className="text-xs text-muted-foreground">You will receive an email update upon completion.</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardContent className="p-5 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-3">
              <LayoutDashboardIcon className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Listing Live</h4>
            <p className="text-xs text-muted-foreground">Once approved, your site is instantly visible to buyers.</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {!isEditing && onAddAnother &&
        <Button
          variant="outline"
          size="lg"
          onClick={onAddAnother}
          className="h-11 px-6 text-sm font-medium">
          
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Another Website
          </Button>
        }
        <Button
          size="lg"
          onClick={onFinish}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-11 text-sm font-medium shadow-md">
          
          Go to Dashboard
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>);

}