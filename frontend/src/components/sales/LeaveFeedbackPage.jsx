import { useState } from 'react';
import {
  StarIcon,
  ChevronLeftIcon,
  SendIcon,
  InfoIcon,
  MessageSquareIcon,
  FileTextIcon,
  CheckCircle2Icon,
  ShieldCheckIcon,
  ThumbsUpIcon,
  ThumbsDownIcon } from
'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
























function StarRating({
  value,
  onChange,
  size = 'md'




}) {
  const [hovered, setHovered] = useState(0);
  const sizeClass = size === 'lg' ? 'w-8 h-8' : size === 'md' ? 'w-6 h-6' : 'w-5 h-5';
  const gap = size === 'lg' ? 'gap-2' : 'gap-1.5';

  const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  const labelColors = [
  '',
  'text-rose-500',
  'text-orange-500',
  'text-amber-500',
  'text-lime-600',
  'text-emerald-600'];


  return (
    <div className="flex items-center gap-3">
      <div className={cn('flex items-center', gap)}>
        {[1, 2, 3, 4, 5].map((star) => {
          const active = (hovered || value) >= star;
          return (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => onChange(star)}
              className="transition-transform hover:scale-110 focus:outline-none">
              
              <StarIcon
                className={cn(
                  sizeClass,
                  'transition-colors duration-150',
                  active ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-100'
                )} />
              
            </button>);

        })}
      </div>
      {(hovered || value) > 0 &&
      <span className={cn('text-xs font-semibold', labelColors[hovered || value])}>
          {labels[hovered || value]}
        </span>
      }
    </div>);

}

export function LeaveFeedbackPage({ order, role = 'publisher', onBack, onSubmit }) {
  const [overallRating, setOverallRating] = useState(0);
  const [communicationRating, setCommunicationRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [comment, setComment] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const isAdvertiser = role === 'advertiser';
  const canSubmit = overallRating > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(order.id, { overallRating, communicationRating, qualityRating, comment, recommendation });
    setSubmitted(true);
  };

  const backLabel = isAdvertiser ? 'Back to Purchases' : 'Back to Sales';

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="w-20 h-20 bg-emerald-50 border-2 border-emerald-200 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2Icon className="w-9 h-9 text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Your review has been submitted successfully.</h2>
        <p className="text-sm text-slate-500 mb-8 max-w-sm">
          Thank you! Your feedback helps maintain quality and trust on the platform.
        </p>
        <Button onClick={onBack} className="bg-slate-900 hover:bg-slate-800 text-white h-9 px-8 text-sm">
          {backLabel}
        </Button>
      </div>);

  }

  const counterpartyName = isAdvertiser ?
  order.publisher?.name ?? order.advertiser.name :
  order.advertiser.name;

  return (
    <div className="px-6 py-6 max-w-[1100px]">
      {/* Back link */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors mb-5">
        
        <ChevronLeftIcon className="w-3.5 h-3.5" />
        {backLabel}
      </button>

      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Leave a Review</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          {isAdvertiser ?
          'Rate the quality of the guest post and your overall experience' :
          'Share your experience working with this advertiser'}
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-8 items-start">

        {/* ── LEFT: Form ── */}
        <div className="flex-1 min-w-0 space-y-4">

          {/* Order summary strip */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {counterpartyName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{counterpartyName}</p>
              <p className="text-xs text-slate-500">{order.website} · {order.id}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-slate-800">${order.price}</p>
              <p className="text-xs text-slate-400">{order.createdDate}</p>
            </div>
          </div>

          {/* Rating card */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
              <StarIcon className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h2 className="text-sm font-semibold text-slate-800">Rate Your Experience</h2>
              <span className="ml-auto text-[11px] text-slate-400">
                <span className="text-rose-500">*</span> required
              </span>
            </div>

            <div className="divide-y divide-slate-100">

              {/* 1. Star Rating (Overall) — Required */}
              <div className="px-5 py-5">
                <div className="mb-3">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-slate-800">Star Rating</p>
                    <span className="text-rose-500 text-sm leading-none">*</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Your overall rating for this order</p>
                </div>
                <StarRating value={overallRating} onChange={setOverallRating} size="lg" />
                {overallRating === 0 &&
                <p className="text-[11px] text-slate-400 mt-2">Click a star to rate (required)</p>
                }
              </div>

              {/* 2. Communication */}
              <div className="px-5 py-4">
                <div className="mb-3">
                  <p className="text-sm font-semibold text-slate-800">Communication</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Rate communication with the {isAdvertiser ? 'publisher' : 'advertiser'}
                  </p>
                </div>
                <StarRating value={communicationRating} onChange={setCommunicationRating} size="md" />
              </div>

              {/* 3. Quality of Work / Content (Advertiser only) */}
              {isAdvertiser &&
              <div className="px-5 py-4">
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-slate-800">Quality of Work / Content</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Rate the quality of the delivered guest post
                    </p>
                  </div>
                  <StarRating value={qualityRating} onChange={setQualityRating} size="md" />
                </div>
              }

            </div>
          </div>

          {/* Review Comment */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
              <FileTextIcon className="w-4 h-4 text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-800">Review Comment</h2>
              <span className="text-[11px] text-slate-400 font-normal ml-1">(Optional)</span>
            </div>
            <div className="p-5">
              <Textarea
                placeholder={
                isAdvertiser ?
                "Describe your experience — was the content high quality? Did the publisher communicate well? Would you order again?" :
                "Describe your experience — were the instructions clear? Was communication smooth? Would you work with this advertiser again?"
                }
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[120px] text-sm resize-none border-slate-200 focus-visible:ring-primary/20 placeholder:text-slate-400"
                maxLength={1000} />
              
              <div className="flex justify-end mt-2">
                <span className="text-xs text-slate-400">{comment.length}/1000</span>
              </div>
            </div>
          </div>

          {/* Recommendation (Advertiser only) */}
          {isAdvertiser &&
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                <ThumbsUpIcon className="w-4 h-4 text-slate-400" />
                <h2 className="text-sm font-semibold text-slate-800">Recommendation</h2>
                <span className="text-[11px] text-slate-400 font-normal ml-1">(Optional)</span>
              </div>
              <div className="p-5">
                <p className="text-xs text-slate-500 mb-4">
                  Would you recommend this publisher to other advertisers?
                </p>
                <div className="flex items-center gap-3">
                  <button
                  type="button"
                  onClick={() => setRecommendation(recommendation === 'recommend' ? null : 'recommend')}
                  className={cn(
                    'flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all',
                    recommendation === 'recommend' ?
                    'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-sm' :
                    'bg-white border-slate-200 text-slate-500 hover:border-emerald-300 hover:bg-emerald-50/50'
                  )}>
                  
                    <ThumbsUpIcon
                    className={cn(
                      'w-5 h-5 transition-colors',
                      recommendation === 'recommend' ? 'text-emerald-500 fill-emerald-400' : 'text-slate-400'
                    )} />
                  
                    Recommend
                  </button>

                  <button
                  type="button"
                  onClick={() => setRecommendation(recommendation === 'not_recommend' ? null : 'not_recommend')}
                  className={cn(
                    'flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all',
                    recommendation === 'not_recommend' ?
                    'bg-rose-50 border-rose-400 text-rose-700 shadow-sm' :
                    'bg-white border-slate-200 text-slate-500 hover:border-rose-300 hover:bg-rose-50/50'
                  )}>
                  
                    <ThumbsDownIcon
                    className={cn(
                      'w-5 h-5 transition-colors',
                      recommendation === 'not_recommend' ? 'text-rose-500 fill-rose-400' : 'text-slate-400'
                    )} />
                  
                    Not Recommend
                  </button>
                </div>
              </div>
            </div>
          }

          {/* Actions */}
          <div className="flex items-center justify-between pt-1 pb-6">
            <Button
              variant="outline"
              onClick={onBack}
              className="h-9 px-5 text-sm border-slate-300 text-slate-600 hover:bg-slate-50">
              
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={cn(
                'h-9 px-7 text-sm font-semibold flex items-center gap-2 transition-all',
                canSubmit ?
                'bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md' :
                'bg-slate-200 text-slate-400 cursor-not-allowed'
              )}>
              
              <SendIcon className="w-3.5 h-3.5" />
              Submit Review
            </Button>
          </div>
        </div>

        {/* ── RIGHT: Instructions sidebar ── */}
        <div className="w-72 shrink-0 flex flex-col gap-4">
          {/* Spacer matching order summary strip */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 opacity-0 pointer-events-none select-none flex items-center gap-4">
            <div className="w-9 h-9 rounded-full shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">&nbsp;</p>
              <p className="text-xs">&nbsp;</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold">&nbsp;</p>
              <p className="text-xs">&nbsp;</p>
            </div>
          </div>

          <div className="sticky top-6 space-y-4">
            {/* How to review */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-4 py-3 bg-purple-50 border-b border-purple-100 flex items-center gap-2">
                <InfoIcon className="w-4 h-4 text-purple-500" />
                <h3 className="text-xs font-semibold text-purple-700 uppercase tracking-wide">How to Review</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                    <StarIcon className="w-3 h-3 text-amber-500 fill-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">Star Rating</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      This is required. Reflect on the full experience — quality, punctuality, and professionalism.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquareIcon className="w-3 h-3 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">Communication</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      How responsive and clear was the {isAdvertiser ? 'publisher' : 'advertiser'} throughout the order?
                    </p>
                  </div>
                </div>
                {isAdvertiser &&
                <div className="flex gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <FileTextIcon className="w-3 h-3 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-700">Quality of Work</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        Rate the quality, accuracy, and readability of the delivered guest post content.
                      </p>
                    </div>
                  </div>
                }
                {isAdvertiser &&
                <div className="flex gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                      <ThumbsUpIcon className="w-3 h-3 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-700">Recommendation</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        Let other advertisers know if you'd recommend this publisher.
                      </p>
                    </div>
                  </div>
                }
              </div>
            </div>

            {/* Writing Tips */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                <FileTextIcon className="w-4 h-4 text-slate-400" />
                <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Writing Tips</h3>
              </div>
              <div className="p-4 space-y-2">
                {[
                'Be honest and specific about your experience',
                'Mention what went well, not just the negatives',
                'Keep it professional and constructive',
                'Avoid sharing sensitive order details publicly'].
                map((tip, i) =>
                <div key={i} className="flex gap-2 items-start">
                    <CheckCircle2Icon className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-500 leading-relaxed">{tip}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Policy note */}
            <div className="flex gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <ShieldCheckIcon className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Reviews are visible to publishers and help maintain platform quality. Misleading or abusive content may be removed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);

}