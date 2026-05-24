import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UploadCloudIcon, ClockIcon, AlertTriangleIcon, ArrowRightIcon, ArrowLeftIcon, CheckIcon, Loader2Icon, DownloadIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';







export function Step2Verification({ onNext, onBack, initialData }) {
  const [method, setMethod] = useState(initialData?.verificationMethod || 'ga');
  const [reason, setReason] = useState(initialData?.verificationReason || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(null);

  const handleVerify = () => {
    setIsVerifying(true);
    setError(null);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 1500);
  };

  const handleContinue = () => {
    setError(null);

    if (method === 'skip') {
      if (!reason.trim()) {
        setError('Please provide a reason for skipping verification.');
        return;
      }
    } else {
      if (!isVerified) {
        setError('Please complete the verification process to continue.');
        return;
      }
    }

    onNext({ verificationMethod: method, verificationReason: reason });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-foreground">Verify Ownership</h2>
        <p className="text-sm text-muted-foreground mt-1">Choose a method to verify that you own this website.</p>
      </div>

      <RadioGroup value={method} onValueChange={(val) => {setMethod(val);setIsVerified(false);}} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Option 1: Google Analytics */}
        <Label
          htmlFor="ga"
          className={cn(
            "relative flex flex-col items-center text-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-accent/50",
            method === 'ga' ? "border-primary bg-primary/5" : "border-border bg-card"
          )}>
          
          <RadioGroupItem value="ga" id="ga" className="sr-only" />
          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors bg-white border border-border shadow-sm")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
              <path fill="#F9AB00" d="M16 4h4v16h-4z" />
              <path fill="#E37400" d="M10 9h4v11h-4z" />
              <path fill="#E37400" d="M4 14h4v6H4z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-foreground mb-0.5">Google Analytics</span>
          <span className="text-[11px] text-muted-foreground">Connect GA4 property</span>
          {method === 'ga' && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary" />}
        </Label>

        {/* Option 2: File Upload */}
        <Label
          htmlFor="file"
          className={cn(
            "relative flex flex-col items-center text-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-accent/50",
            method === 'file' ? "border-primary bg-primary/5" : "border-border bg-card"
          )}>
          
          <RadioGroupItem value="file" id="file" className="sr-only" />
          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors", method === 'file' ? "bg-blue-100 text-blue-600" : "bg-muted text-muted-foreground")}>
            <UploadCloudIcon className="w-5 h-5" />
          </div>
          <span className="text-sm font-semibold text-foreground mb-0.5">File Upload</span>
          <span className="text-[11px] text-muted-foreground">Upload to root folder</span>
          {method === 'file' && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary" />}
        </Label>

        {/* Option 3: Skip */}
        <Label
          htmlFor="skip"
          className={cn(
            "relative flex flex-col items-center text-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-accent/50",
            method === 'skip' ? "border-primary bg-primary/5" : "border-border bg-card"
          )}>
          
          <RadioGroupItem value="skip" id="skip" className="sr-only" />
          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors", method === 'skip' ? "bg-amber-100 text-amber-600" : "bg-muted text-muted-foreground")}>
            <ClockIcon className="w-5 h-5" />
          </div>
          <span className="text-sm font-semibold text-foreground mb-0.5">Verify Later</span>
          <span className="text-[11px] text-muted-foreground">Manual review required</span>
          {method === 'skip' && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary" />}
        </Label>
      </RadioGroup>

      {/* Verification Action Area */}
      <Card className="border-border bg-muted/30 shadow-sm mb-8">
        <CardContent className="p-6">
          {method === 'ga' &&
          <div className="flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-sm text-muted-foreground max-w-md">
                We will attempt to detect your Google Analytics tracking code. Ensure you are logged into the Google account associated with this property.
              </p>
              {!isVerified ?
            <Button onClick={handleVerify} disabled={isVerifying} className="min-w-[180px]">
                  {isVerifying && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />}
                  {isVerifying ? 'Verifying...' : 'Connect & Verify'}
                </Button> :

            <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 px-4 py-2 rounded-lg border border-green-100 text-sm">
                  <CheckIcon className="w-4 h-4" />
                  Ownership Verified Successfully
                </div>
            }
            </div>
          }

          {method === 'file' &&
          <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-card p-3 rounded-lg border border-border">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2 text-xs font-bold">1</div>
                  <p className="text-xs text-muted-foreground">Download the verification file</p>
                </div>
                <div className="bg-card p-3 rounded-lg border border-border">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2 text-xs font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Upload to website root (public_html)</p>
                </div>
                <div className="bg-card p-3 rounded-lg border border-border">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2 text-xs font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Click verify below</p>
                </div>
              </div>
              
              <div className="flex justify-center gap-3 pt-2">
                <Button variant="outline" size="sm" className="h-9">
                  <DownloadIcon className="w-3.5 h-3.5 mr-2" />
                  Download File
                </Button>
                {!isVerified ?
              <Button onClick={handleVerify} disabled={isVerifying} size="sm" className="h-9 min-w-[120px]">
                    {isVerifying && <Loader2Icon className="w-3.5 h-3.5 mr-2 animate-spin" />}
                    {isVerifying ? 'Checking...' : 'Verify Upload'}
                  </Button> :

              <Button disabled size="sm" className="bg-green-600 text-white opacity-100 h-9">
                    <CheckIcon className="w-3.5 h-3.5 mr-2" /> Verified
                  </Button>
              }
              </div>
            </div>
          }

          {method === 'skip' &&
          <div className="space-y-3 max-w-lg mx-auto">
              <Label htmlFor="reason" className="text-sm font-medium">Reason for skipping verification</Label>
              <Textarea
              id="reason"
              placeholder="E.g., I don't have server access right now..."
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError(null);
              }}
              className={cn(
                "min-h-[80px] resize-none bg-background text-sm",
                error && method === 'skip' && !reason.trim() ? "border-destructive focus-visible:ring-destructive" : ""
              )} />
            
              <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 p-3 rounded border border-amber-100">
                <AlertTriangleIcon className="w-4 h-4 shrink-0" />
                <p>Your website will be submitted for manual verification. Once our team verifies ownership, your website will be approved and listed in the marketplace.</p>
              </div>
            </div>
          }
        </CardContent>
      </Card>

      {error &&
      <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2 text-destructive text-sm animate-in slide-in-from-top-1">
          <AlertTriangleIcon className="w-4 h-4 shrink-0" />
          {error}
        </div>
      }

      <div className="flex justify-between pt-4 border-t border-border">
        <Button variant="outline" onClick={onBack} className="h-10 px-4 text-sm">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleContinue}
          className="h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
          
          Continue
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>);

}