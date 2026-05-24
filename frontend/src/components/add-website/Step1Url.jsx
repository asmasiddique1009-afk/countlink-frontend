import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertCircleIcon,
  GlobeIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CheckIcon,
  XIcon,
  TrendingUpIcon,
  FileTextIcon,
  AlertTriangleIcon } from
'lucide-react';
import { Card, CardContent } from '@/components/ui/card';







export function Step1Url({ onNext, initialData, existingDomains = [] }) {
  const [url, setUrl] = useState(initialData?.url || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Please enter your website URL to continue');
      return;
    }

    const formattedUrl = url.trim();

    // Strict validation: Must start with http:// or https://
    if (!/^https?:\/\//i.test(formattedUrl)) {
      setError('URL must start with http:// or https://');
      return;
    }

    try {
      const urlObj = new URL(formattedUrl);
      const hostname = urlObj.hostname.toLowerCase().replace(/^www\./, '');

      // Check for duplicates
      const isDuplicate = existingDomains.some((domain) => {
        const existingHostname = domain.toLowerCase().replace(/^www\./, '');
        return existingHostname === hostname;
      });

      if (isDuplicate) {
        setError('This website is already registered in our database. If you are the owner, please contact support.');
        return;
      }
    } catch (_) {
      setError('Please enter a valid URL');
      return;
    }

    onNext({ url: formattedUrl });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Left Column: Form */}
      <div className="flex flex-col h-full">
        <Card className="h-full border-border shadow-sm flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <GlobeIcon className="w-5 h-5 text-blue-600" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Add Your Website</h2>
                <p className="text-xs text-muted-foreground">Start earning from guest posts today.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
              <div className="space-y-2">
                <Label htmlFor="url" className="text-sm font-medium">Website URL <span className="text-destructive">*</span></Label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <GlobeIcon className="w-4 h-4" />
                  </div>
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setError('');
                    }}
                    className={`pl-10 h-11 text-base bg-background transition-all ${error ? 'border-destructive focus-visible:ring-destructive' : 'hover:border-primary/50 focus-visible:border-primary'}`} />
                  
                </div>
                {error ?
                <div className="mt-2 p-3 rounded-lg bg-red-50 border border-red-100 flex items-start gap-2.5 animate-in slide-in-from-top-1">
                    <AlertCircleIcon className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-red-900 mb-0.5">Unable to proceed</h4>
                      <p className="text-xs text-red-700 leading-relaxed">{error}</p>
                    </div>
                  </div> :

                <p className="text-xs text-muted-foreground mt-1.5">
                    Enter the complete URL including https://
                  </p>
                }
              </div>

              <div className="mt-auto pt-4">
                <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-sm transition-all">
                  Continue to Verification
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Guidelines & Benefits */}
      <div className="space-y-4">
        {/* Submission Guidelines Card */}
        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <ShieldCheckIcon className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-foreground">Submission Guidelines</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {/* Required Section */}
              <div>
                <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckIcon className="w-3 h-3" /> Required
                </h4>
                <ul className="space-y-2">
                  {[
                  "Live & accessible website",
                  "Original content only",
                  "Min. 10+ published articles",
                  "Google indexed pages"].
                  map((item, i) =>
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Not Allowed Section */}
              <div>
                <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <XIcon className="w-3 h-3" /> Not Allowed
                </h4>
                <ul className="space-y-2">
                  {[
                  "Adult / Gambling content",
                  "Illegal / Harmful material",
                  "Free subdomains",
                  "PBN networks"].
                  map((item, i) =>
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Warning Box */}
            <div className="mt-5 p-3 bg-amber-50 border border-amber-100 rounded-md flex gap-2.5 items-start">
              <AlertTriangleIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                Websites not meeting these requirements will be automatically rejected.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Why Join Card */}
        <Card className="border-border shadow-sm bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-blue-100">
          <CardContent className="p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">Why Join Our Marketplace?</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-blue-100">
                  <TrendingUpIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-foreground">Earn Revenue</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Monetize your traffic</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-blue-100">
                  <FileTextIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-foreground">Quality Content</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Get premium articles</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-blue-100">
                  <ShieldCheckIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-foreground">Secure Pay</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Guaranteed payments</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

}