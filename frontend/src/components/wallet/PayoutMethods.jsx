import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWalletStore } from '@/stores/walletStore';
import { useUserStore } from '@/stores/userStore';
import { ArrowLeftIcon, PlusIcon, TrashIcon, WalletIcon, AlertTriangleIcon, EditIcon, CreditCardIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';





export function PayoutMethods({ onNavigate }) {
  const { role } = useUserStore();
  const { payoutMethods, addPayoutMethod, updatePayoutMethod, deletePayoutMethod, setDefaultPayoutMethod } = useWalletStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [methodType, setMethodType] = useState('paypal');

  // Form state
  const [email, setEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [network, setNetwork] = useState('TRC20');
  const [label, setLabel] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');

  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, delay: 0.1 + index * 0.08, ease: 'power2.out' }
        );
      }
    });
  }, [showAddForm, payoutMethods]);

  const handleEdit = (method) => {
    setMethodType(method.type);
    setEmail(method.email || '');
    setWalletAddress(method.walletAddress || '');
    setNetwork(method.network || 'TRC20');
    setLabel(method.label || '');
    setCardNumber(method.accountId ? `**** **** **** ${method.accountId.slice(-4)}` : '');
    setEditingId(method.id);
    setShowAddForm(true);
  };

  const handleSave = () => {
    const methodData = {
      type: methodType,
      email: methodType === 'paypal' ? email : undefined,
      walletAddress: methodType === 'crypto' ? walletAddress : undefined,
      network: methodType === 'crypto' ? network : undefined,
      label: methodType === 'crypto' ? label : undefined,
      accountId: methodType === 'card' ? cardNumber : undefined
    };

    if (editingId) {
      updatePayoutMethod(editingId, methodData);
    } else {
      addPayoutMethod({
        id: `PM-${Date.now()}`,
        isDefault: payoutMethods.length === 0,
        ...methodData
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingId(null);
    setEmail('');
    setWalletAddress('');
    setNetwork('TRC20');
    setLabel('');
    setCardNumber('');
    setCardExpiry('');
    setMethodType('paypal');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div ref={headerRef} className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('overview')}
            className="hover:bg-slate-100">
            
            <ArrowLeftIcon className="w-5 h-5 text-slate-600" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Payout Methods</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your payment methods</p>
          </div>
        </div>
        {!showAddForm &&
        <Button
          onClick={() => {
            resetForm();
            setShowAddForm(true);
          }}
          className="bg-blue-600 text-white hover:bg-blue-700 h-9 text-sm">
          
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Method
          </Button>
        }
      </div>

      {/* Add/Edit Method Form */}
      {showAddForm &&
      <Card ref={(el) => cardsRef.current[0] = el} className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-200 bg-slate-50 py-4">
            <CardTitle className="text-base font-semibold text-slate-800">
              {editingId ? 'Edit Payout Method' : 'Add New Payout Method'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Method Type</Label>
              <Select value={methodType} onValueChange={(value) => setMethodType(value)}>
                <SelectTrigger className="h-9 border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="crypto">Crypto (USDT)</SelectItem>
                  {role === 'advertiser' && <SelectItem value="card">Credit/Debit Card</SelectItem>}
                </SelectContent>
              </Select>
            </div>

            {methodType === 'paypal' &&
          <div className="space-y-2">
                <Label htmlFor="paypal-email" className="text-sm font-medium text-slate-700">PayPal Email</Label>
                <Input
              id="paypal-email"
              type="email"
              placeholder="your.email@paypal.com"
              className="h-9 border-slate-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            
              </div>
          }

            {methodType === 'crypto' &&
          <>
                <div className="space-y-2">
                  <Label htmlFor="network" className="text-sm font-medium text-slate-700">Network</Label>
                  <Select value={network} onValueChange={setNetwork}>
                    <SelectTrigger className="h-9 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TRC20">TRC20 (Tron)</SelectItem>
                      <SelectItem value="ERC20">ERC20 (Ethereum)</SelectItem>
                      <SelectItem value="BEP20">BEP20 (BSC)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wallet-address" className="text-sm font-medium text-slate-700">Wallet Address</Label>
                  <Input
                id="wallet-address"
                placeholder="0x..."
                className="font-mono h-9 border-slate-200"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)} />
              
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wallet-label" className="text-sm font-medium text-slate-700">Label (Optional)</Label>
                  <Input
                id="wallet-label"
                placeholder="My USDT Wallet"
                className="h-9 border-slate-200"
                value={label}
                onChange={(e) => setLabel(e.target.value)} />
              
                </div>
                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <AlertTriangleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-900">
                        Double-check your wallet address. Incorrect addresses may result in permanent loss of funds.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
          }

            {methodType === 'card' &&
          <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number" className="text-sm font-medium text-slate-700">Card Number</Label>
                  <Input
                id="card-number"
                placeholder="0000 0000 0000 0000"
                className="h-9 border-slate-200"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)} />
              
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-expiry" className="text-sm font-medium text-slate-700">Expiry Date</Label>
                    <Input
                  id="card-expiry"
                  placeholder="MM/YY"
                  className="h-9 border-slate-200"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)} />
                
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-cvc" className="text-sm font-medium text-slate-700">CVC</Label>
                    <Input
                  id="card-cvc"
                  placeholder="123"
                  className="h-9 border-slate-200" />
                
                  </div>
                </div>
              </div>
          }

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <Button
              variant="outline"
              onClick={resetForm}
              className="border-slate-200 text-slate-700 hover:bg-slate-50 h-9">
              
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700 h-9">
                {editingId ? 'Update Method' : 'Save Method'}
              </Button>
            </div>
          </CardContent>
        </Card>
      }

      {/* Existing Methods */}
      <Card ref={(el) => cardsRef.current[1] = el} className="border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200 bg-slate-50 py-4">
          <CardTitle className="text-base font-semibold text-slate-800">Your Payout Methods</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          {payoutMethods.length > 0 ?
          <div className="space-y-3">
              {payoutMethods.map((method, index) =>
            <div
              key={method.id}
              ref={(el) => cardsRef.current[index + 2] = el}
              className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
              
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  method.type === 'paypal' ? 'bg-[#003087]/10' :
                  method.type === 'crypto' ? 'bg-emerald-50' :
                  method.type === 'card' ? 'bg-blue-50' : 'bg-slate-100'}`
                  }>
                        {method.type === 'paypal' ?
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.076 19.073l.924-6.302.146-.992c.178-1.23 1.23-2.14 2.474-2.14h1.35c2.63 0 4.576-1.336 4.576-4.51 0-2.37-1.67-3.62-4.26-3.62H5.5a1 1 0 00-.99 1.14l1.9 13.17a1 1 0 00.99.86h-.324z" fill="#003087" />
                            <path d="M17.543 9.64c0-2.37-1.67-3.62-4.26-3.62H9.25a1 1 0 00-.99 1.14l-1.184 8.17-.64 4.46a1 1 0 00.99 1.14h2.87a1 1 0 00.987-.86l.146-.99.924-6.303c.178-1.23 1.23-2.14 2.474-2.14h.35c2.63 0 4.376-1.336 4.376-4.51z" fill="#003087" />
                            <path d="M14.543 9.64c0-2.37-1.67-3.62-4.26-3.62H9.25a1 1 0 00-.99 1.14l-.924 6.303-.146.99c-.178 1.23-1.23 2.14-2.474 2.14h-1.35c-2.63 0-4.576 1.336-4.576 4.51 0 2.37 1.67 3.62 4.26 3.62h3.78a1 1 0 00.99-1.14l1.9-13.17a1 1 0 00-.99-.86h.324z" fill="#012169" />
                          </svg> :
                    method.type === 'crypto' ?
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-600" fill="currentColor">
                            <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#26A17B" />
                            <path d="M15.95 9.46h-2.68v8.69h-2.54V9.46H8.05V7.23h7.9v2.23z" fill="#FFF" />
                          </svg> :
                    method.type === 'card' ?
                    <CreditCardIcon className="w-5 h-5 text-blue-600" /> :

                    <WalletIcon className="w-5 h-5 text-slate-600" />
                    }
                      </div>
                      <div>
                        <p className="text-base font-semibold text-slate-800 capitalize">
                          {method.type === 'crypto' ? `Crypto (${method.network})` : method.type === 'card' ? 'Credit/Debit Card' : method.type}
                        </p>
                        <p className="text-sm text-slate-500">
                          {method.email || method.accountId || `${method.walletAddress?.slice(0, 10)}...${method.walletAddress?.slice(-8)}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.isDefault ?
                  <Badge className="bg-green-50 text-green-700 border-green-200">
                          Default
                        </Badge> :

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDefaultPayoutMethod(method.id)}
                    className="h-8 text-xs border-slate-200 text-slate-700 hover:bg-slate-50">
                    
                          Set Default
                        </Button>
                  }
                      <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(method)}
                    className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 h-8 w-8 p-0">
                    
                        <EditIcon className="w-4 h-4" />
                      </Button>
                      <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deletePayoutMethod(method.id)}
                    className="text-slate-400 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0">
                    
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
            )}
            </div> :

          <div className="text-center py-12">
              <WalletIcon className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-40" />
              <h3 className="text-base font-semibold text-slate-800 mb-2">No Payout Methods</h3>
              <p className="text-sm text-slate-500 mb-6">
                Add a payout method to enable withdrawals
              </p>
              <Button
              onClick={() => {
                resetForm();
                setShowAddForm(true);
              }}
              className="bg-blue-600 text-white hover:bg-blue-700">
              
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Method
              </Button>
            </div>
          }
        </CardContent>
      </Card>

      {/* Info Notice */}
      {payoutMethods.length > 0 &&
      <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <p className="text-sm text-blue-900">
              Only one method can be set as default. Default methods are pre-selected during withdrawals.
            </p>
          </CardContent>
        </Card>
      }
    </div>);

}