import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  UserIcon,
  LockIcon,
  BriefcaseIcon,
  WalletIcon,
  CameraIcon,
  StarIcon,
  EyeIcon,
  EyeOffIcon,
  CheckCircleIcon,


  PlusIcon,
  TrashIcon,
  EditIcon,
  MessageSquareIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  BuildingIcon,
  ShoppingBagIcon } from

'lucide-react';
import { useUserStore } from '@/stores/userStore';





export function ProfileSection({ onBack }) {
  const { role } = useUserStore();
  const isPublisher = role === 'publisher';
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isBusinessVerified, setIsBusinessVerified] = useState(true); // Toggle this to show/hide verification
  const headerRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
    if (tabsRef.current) {
      gsap.fromTo(
        tabsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      {/* Page Header */}
      <div ref={headerRef} className="mb-2">
        <h1 className="text-xl font-semibold text-foreground mb-0.5">Profile Settings</h1>
        <p className="text-xs text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="personal" className="w-full" ref={tabsRef}>
        <TabsList className="grid w-full grid-cols-5 mb-4 bg-muted/50 p-1 rounded-xl h-auto border border-border/50 shadow-sm">
          <TabsTrigger
            value="personal"
            className="flex items-center justify-center gap-1.5 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary/10 data-[state=active]:to-tertiary/10 data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-primary/20 py-1.5 rounded-lg transition-all duration-300 hover:bg-accent/50">
            
            <UserIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs font-medium">Personal</span>
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex items-center justify-center gap-1.5 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary/10 data-[state=active]:to-tertiary/10 data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-primary/20 py-1.5 rounded-lg transition-all duration-300 hover:bg-accent/50">
            
            <LockIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs font-medium">Security</span>
          </TabsTrigger>
          <TabsTrigger
            value="business"
            className="flex items-center justify-center gap-1.5 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary/10 data-[state=active]:to-tertiary/10 data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-primary/20 py-1.5 rounded-lg transition-all duration-300 hover:bg-accent/50">
            
            <BriefcaseIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs font-medium">Business</span>
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="flex items-center justify-center gap-1.5 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary/10 data-[state=active]:to-tertiary/10 data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-primary/20 py-1.5 rounded-lg transition-all duration-300 hover:bg-accent/50">
            
            <WalletIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs font-medium">Payment</span>
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="flex items-center justify-center gap-1.5 data-[state=active]:bg-gradient-to-br data-[state=active]:from-primary/10 data-[state=active]:to-tertiary/10 data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-primary/20 py-1.5 rounded-lg transition-all duration-300 hover:bg-accent/50">
            
            <MessageSquareIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs font-medium">Reviews</span>
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: Personal Information */}
        <TabsContent value="personal" className="space-y-6">
          {/* Profile Header Card */}
          <Card className="border-border shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="border-b border-border bg-gradient-to-r from-primary/5 via-tertiary/5 to-primary/5 py-2.5 space-y-0.5">
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-primary" />
                <CardTitle className="text-base">Profile Information</CardTitle>
              </div>
              <CardDescription className="text-xs">Update your personal details and profile picture</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group">
                    <Avatar className="w-32 h-32 border-4 border-border shadow-lg">
                      <AvatarImage src="https://c.animaapp.com/mhmjm5e0FqIvyc/img/ai_2.png" alt="Profile" />
                      <AvatarFallback className="bg-gradient-1 text-primary-foreground text-3xl">JD</AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                      <CameraIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-foreground">John Doe</h3>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) =>
                      <StarIcon
                        key={star}
                        className="w-4 h-4 fill-amber-400 text-amber-400" />

                      )}
                      <span className="ml-2 text-sm font-medium text-foreground">4.8</span>
                    </div>
                    <Badge className="mt-2 bg-green-100 text-green-700 border-green-200">
                      Premium Member
                    </Badge>
                  </div>
                </div>

                {/* Personal Details Form */}
                <div className="flex-1 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        defaultValue="John"
                        required
                        className="bg-background border-border" />
                      
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        defaultValue="Doe"
                        required
                        className="bg-background border-border" />
                      
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john.doe@example.com"
                      disabled
                      className="bg-muted/40 border-border text-foreground cursor-not-allowed font-medium" />
                    
                    <p className="text-xs text-primary mt-0.5 font-medium">
                      Please contact support to update your email address.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                    <div className="flex gap-2">
                      <Select defaultValue="+1">
                        <SelectTrigger className="w-24 bg-background border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+1">+1</SelectItem>
                          <SelectItem value="+44">+44</SelectItem>
                          <SelectItem value="+91">+91</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone"
                        placeholder="(555) 123-4567"
                        defaultValue="(555) 123-4567"
                        className="flex-1 bg-background border-border" />
                      
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Time Zone</Label>
                      <Select defaultValue="utc-5">
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc-5">UTC-5 (EST)</SelectItem>
                          <SelectItem value="utc-8">UTC-8 (PST)</SelectItem>
                          <SelectItem value="utc+0">UTC+0 (GMT)</SelectItem>
                          <SelectItem value="utc+5:30">UTC+5:30 (IST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency" className="text-foreground font-medium">Account Currency</Label>
                      <Input
                        id="currency"
                        defaultValue="USD ($)"
                        disabled
                        className="bg-muted/40 border-border text-foreground cursor-not-allowed font-medium" />
                      
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  className="border-border hover:bg-accent hover:border-primary/30 transition-all duration-300"
                  onClick={onBack}>
                  
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </Button>
                <Button className="bg-gradient-1 text-primary-foreground hover:opacity-90 shadow-md hover:shadow-lg transition-all duration-300">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: Password & Security */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-border shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="border-b border-border bg-gradient-to-r from-primary/5 via-tertiary/5 to-primary/5 py-2.5 space-y-0.5">
              <div className="flex items-center gap-2">
                <LockIcon className="w-4 h-4 text-primary" />
                <CardTitle className="text-base">Password & Security</CardTitle>
              </div>
              <CardDescription className="text-xs">Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="max-w-2xl space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className="bg-background border-border pr-10" />
                    
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      
                      {showCurrentPassword ?
                      <EyeOffIcon className="w-4 h-4" /> :

                      <EyeIcon className="w-4 h-4" />
                      }
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="bg-background border-border pr-10" />
                    
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      
                      {showNewPassword ?
                      <EyeOffIcon className="w-4 h-4" /> :

                      <EyeIcon className="w-4 h-4" />
                      }
                    </button>
                  </div>
                  {/* Password Strength Indicator */}
                  <div className="space-y-2 mt-3">
                    <div className="flex gap-1">
                      <div className="h-1 flex-1 rounded-full bg-red-500"></div>
                      <div className="h-1 flex-1 rounded-full bg-amber-500"></div>
                      <div className="h-1 flex-1 rounded-full bg-gray-200"></div>
                      <div className="h-1 flex-1 rounded-full bg-gray-200"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Password strength: <span className="text-amber-600 font-medium">Medium</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="bg-background border-border pr-10" />
                    
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      
                      {showConfirmPassword ?
                      <EyeOffIcon className="w-4 h-4" /> :

                      <EyeIcon className="w-4 h-4" />
                      }
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Password Requirements:</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• At least 8 characters long</li>
                    <li>• Contains uppercase and lowercase letters</li>
                    <li>• Includes at least one number</li>
                    <li>• Contains at least one special character</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  className="border-border hover:bg-accent hover:border-primary/30 transition-all duration-300"
                  onClick={onBack}>
                  
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </Button>
                <Button className="bg-gradient-1 text-primary-foreground hover:opacity-90 shadow-md hover:shadow-lg transition-all duration-300">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: Business Information */}
        <TabsContent value="business" className="space-y-6">
          <Card className="border-border shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="border-b border-border bg-gradient-to-r from-primary/5 via-tertiary/5 to-primary/5 py-2.5 space-y-0.5">
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="w-4 h-4 text-primary" />
                <CardTitle className="text-base">Business Information</CardTitle>
              </div>
              <CardDescription className="text-xs">Manage your company details and registration status</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Registration Status - Only show for publishers if verified */}
                {isPublisher && isBusinessVerified &&
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-green-900 mb-1">Company Verified</h4>
                      <p className="text-xs text-green-700">Your business registration has been verified and approved.</p>
                    </div>
                    <Badge className="bg-green-600 text-white border-0">Verified</Badge>
                  </div>
                }

                {/* Business Details Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">
                      Company Name{isPublisher && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    <Input
                      id="companyName"
                      placeholder="Acme Corporation"
                      defaultValue="Acme Corporation"
                      className="bg-background border-border"
                      required={isPublisher} />
                    
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regNumber">
                      Registration Number{isPublisher && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    <Input
                      id="regNumber"
                      placeholder="REG-123456"
                      defaultValue="REG-123456"
                      className="bg-background border-border"
                      required={isPublisher} />
                    
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vatNumber">
                    VAT Number{isPublisher && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  <Input
                    id="vatNumber"
                    placeholder="VAT-789012"
                    defaultValue="VAT-789012"
                    className="bg-background border-border"
                    required={isPublisher} />
                  
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessAddress">
                    Business Address{isPublisher && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  <Textarea
                    id="businessAddress"
                    placeholder="Enter your complete business address"
                    defaultValue="123 Business Street, Suite 100"
                    rows={3}
                    className="bg-background border-border resize-none"
                    required={isPublisher} />
                  
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="country">
                      Country{isPublisher && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    <Select defaultValue="us" required={isPublisher}>
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      City{isPublisher && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      defaultValue="New York"
                      className="bg-background border-border"
                      required={isPublisher} />
                    
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">
                      Postal Code{isPublisher && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    <Input
                      id="postalCode"
                      placeholder="10001"
                      defaultValue="10001"
                      className="bg-background border-border"
                      required={isPublisher} />
                    
                  </div>
                </div>

                {/* Document Upload - Only show if NOT verified */}
                {!isBusinessVerified &&
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <PlusIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Upload Company Documents</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB</p>
                      </div>
                    </div>
                  </div>
                }
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  className="border-border hover:bg-accent hover:border-primary/30 transition-all duration-300"
                  onClick={onBack}>
                  
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </Button>
                <Button className="bg-gradient-1 text-primary-foreground hover:opacity-90 shadow-md hover:shadow-lg transition-all duration-300">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Save Business Information
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4: Withdrawal & Payment Methods */}
        <TabsContent value="payment" className="space-y-6">
          <Card className="border-border shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="border-b border-border bg-gradient-to-r from-primary/5 via-tertiary/5 to-primary/5 py-2.5 space-y-0.5">
              <div className="flex items-center gap-2">
                <WalletIcon className="w-4 h-4 text-primary" />
                <CardTitle className="text-base">Payment Methods</CardTitle>
              </div>
              <CardDescription className="text-xs">Manage your withdrawal and payment preferences</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-8">
                {/* Added Payment Methods */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Active Payment Methods</h3>
                  <div className="space-y-3">
                    {/* PayPal */}
                    <div className="border border-border rounded-lg p-4 flex items-center justify-between hover:border-primary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <WalletIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">PayPal</p>
                          <p className="text-xs text-muted-foreground">john.doe@paypal.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-700 border-green-200">Default</Badge>
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Crypto */}
                    <div className="border border-border rounded-lg p-4 flex items-center justify-between hover:border-primary/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                          <WalletIcon className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Crypto Wallet (USDT)</p>
                          <p className="text-xs text-muted-foreground font-mono">0x742d...3f4a</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <EditIcon className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Payment Methods */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Add Payment Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Add PayPal */}
                    <button className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 hover:bg-primary/5 transition-all text-left">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <PlusIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Add PayPal</p>
                          <p className="text-xs text-muted-foreground">Connect your PayPal account</p>
                        </div>
                      </div>
                    </button>

                    {/* Add Crypto */}
                    <button className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 hover:bg-primary/5 transition-all text-left">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                          <PlusIcon className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Add Crypto Wallet</p>
                          <p className="text-xs text-muted-foreground">Add cryptocurrency address</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Withdrawal Settings */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Withdrawal Settings</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="defaultMethod">Default Payment Method</Label>
                      <Select defaultValue="paypal">
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paypal">PayPal - john.doe@paypal.com</SelectItem>
                          <SelectItem value="crypto">Crypto Wallet (USDT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-amber-900 mb-2">Withdrawal Information:</h4>
                      <ul className="text-xs text-amber-800 space-y-1">
                        <li>• Minimum withdrawal amount: $50</li>
                        <li>• Processing time: 2-5 business days</li>
                        <li>• Withdrawal fee: 2% (minimum $2)</li>
                        <li>• Maximum daily withdrawal: $10,000</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  className="border-border hover:bg-accent hover:border-primary/30 transition-all duration-300"
                  onClick={onBack}>
                  
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </Button>
                <Button className="bg-gradient-1 text-primary-foreground hover:opacity-90 shadow-md hover:shadow-lg transition-all duration-300">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Save Withdrawal Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* TAB 5: Reviews */}
        <TabsContent value="reviews" className="space-y-6">
          {/* Publisher Reviews — only shown to publishers */}
          {isPublisher && <Card className="border-border shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="border-b border-border bg-gradient-to-r from-primary/5 via-tertiary/5 to-primary/5 py-2.5 space-y-0.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BuildingIcon className="w-4 h-4 text-primary" />
                  <CardTitle className="text-base">Publisher Reviews</CardTitle>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) =>
                    <StarIcon key={s} className={`w-3.5 h-3.5 ${s <= 4 ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted-foreground'}`} />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-foreground">4.2</span>
                  <span className="text-xs text-muted-foreground">(18 reviews)</span>
                </div>
              </div>
              <CardDescription className="text-xs">Reviews left by advertisers on your publisher work</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {[
              { name: 'Alex Turner', website: 'techcrunch.com', rating: 5, date: 'Mar 10, 2026', comment: 'Outstanding publisher! Article was delivered well ahead of schedule with excellent content quality. The link placement was exactly as requested. Highly recommend!', positive: true },
              { name: 'Maria Lopez', website: 'forbes.com', rating: 4, date: 'Feb 28, 2026', comment: 'Great communication throughout the process. Minor revisions were needed but handled promptly. Overall a very smooth experience and the DA of the site is impressive.', positive: true },
              { name: 'James Whitfield', website: 'entrepreneur.com', rating: 3, date: 'Feb 14, 2026', comment: 'Decent publisher, but turnaround was slightly longer than expected. Content quality was acceptable. Would use again for less time-sensitive campaigns.', positive: false },
              { name: 'Sophie Chen', website: 'inc.com', rating: 5, date: 'Jan 30, 2026', comment: 'Absolutely fantastic! The article went live within 24 hours and the organic traffic boost was noticeable. This publisher truly understands SEO best practices.', positive: true }].
              map((review, i) =>
              <div key={i} className="border border-border/60 rounded-lg p-4 hover:border-primary/30 hover:bg-accent/20 transition-all duration-200">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-tertiary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                        {review.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.website}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) =>
                      <StarIcon key={s} className={`w-3 h-3 ${s <= review.rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted-foreground'}`} />
                      )}
                      </div>
                      <span className="text-[10px] text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{review.comment}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {review.positive ?
                  <Badge className="bg-green-50 text-green-700 border-green-200 text-[10px] px-1.5 py-0"><ThumbsUpIcon className="w-2.5 h-2.5 mr-1 inline" />Recommended</Badge> :
                  <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] px-1.5 py-0"><ThumbsDownIcon className="w-2.5 h-2.5 mr-1 inline" />Not Recommended</Badge>
                  }
                  </div>
                </div>
              )}
            </CardContent>
          </Card>}

          {/* Advertiser Reviews — only shown to advertisers */}
          {!isPublisher && <Card className="border-border shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="border-b border-border bg-gradient-to-r from-primary/5 via-tertiary/5 to-primary/5 py-2.5 space-y-0.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBagIcon className="w-4 h-4 text-primary" />
                  <CardTitle className="text-base">Advertiser Reviews</CardTitle>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) =>
                    <StarIcon key={s} className={`w-3.5 h-3.5 ${s <= 5 ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted-foreground'}`} />
                    )}
                  </div>
                  <span className="text-xs font-semibold text-foreground">4.8</span>
                  <span className="text-xs text-muted-foreground">(11 reviews)</span>
                </div>
              </div>
              <CardDescription className="text-xs">Reviews left by publishers on your advertiser campaigns</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {[
              { name: 'David Kim', campaign: 'SEO Boost Campaign', rating: 5, date: 'Mar 12, 2026', comment: 'Excellent advertiser! Clear instructions, fast payment, and very responsive communication. The brief was detailed and made the work much easier. Would gladly work with again.', positive: true },
              { name: 'Rachel Moore', campaign: 'Brand Awareness Q1', rating: 5, date: 'Feb 20, 2026', comment: 'One of the best advertisers I have worked with on this platform. Payment was instant upon delivery and the feedback was constructive and professional throughout.', positive: true },
              { name: 'Tom Hargreaves', campaign: 'Link Building Spring', rating: 4, date: 'Jan 18, 2026', comment: 'Good working relationship overall. Instructions were a bit vague initially but were clarified quickly when asked. Payment process was smooth and timely.', positive: true }].
              map((review, i) =>
              <div key={i} className="border border-border/60 rounded-lg p-4 hover:border-primary/30 hover:bg-accent/20 transition-all duration-200">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-tertiary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                        {review.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.campaign}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) =>
                      <StarIcon key={s} className={`w-3 h-3 ${s <= review.rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted-foreground'}`} />
                      )}
                      </div>
                      <span className="text-[10px] text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{review.comment}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Badge className="bg-green-50 text-green-700 border-green-200 text-[10px] px-1.5 py-0"><ThumbsUpIcon className="w-2.5 h-2.5 mr-1 inline" />Recommended</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>}
        </TabsContent>

      </Tabs>
    </div>);

}