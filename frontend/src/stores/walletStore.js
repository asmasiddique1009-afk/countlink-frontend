import { create } from "zustand";
import { useUserStore } from "./userStore";






























































export const useWalletStore = create((set, get) => ({
  pendingClearance: 1250.0,
  availableBalance: 2000.0,
  totalEarnings: 12890.5,
  onHoldAmount: 1960.0,
  awaitingClearanceAmount: 1960.0,
  selectedCurrency: "USD",

  transactions: [
  {
    id: "TXN-001",
    date: "2024-01-15T10:30:00",
    description: "Order #GP-001 - TechCrunch.com",
    type: "order",
    method: "Platform",
    amount: 400.0,
    status: "credit" // Publisher: Order Completed
  },
  {
    id: "TXN-002",
    date: "2024-01-14T14:20:00",
    description: "Withdrawal to PayPal",
    type: "withdrawal",
    method: "PayPal",
    amount: 500.0,
    status: "completed", // Publisher: Withdrawal Released
    platformFee: 100.0,
    processingFee: 15.0,
    netAmount: 385.0
  },
  {
    id: "TXN-003",
    date: "2024-01-13T09:15:00",
    description: "Order #GP-002 - Forbes.com",
    type: "order",
    method: "Platform",
    amount: 700.0,
    status: "frozen" // Publisher/Advertiser: Order Placed (Locked)
  },
  {
    id: "TXN-004",
    date: "2024-01-12T16:45:00",
    description: "Withdrawal to Crypto",
    type: "withdrawal",
    method: "USDT (TRC20)",
    amount: 1000.0,
    status: "processing", // Publisher: Withdrawal Requested
    platformFee: 200.0,
    processingFee: 30.0,
    netAmount: 770.0
  },
  {
    id: "TXN-005",
    date: "2024-01-11T11:30:00",
    description: "Order #GP-003 - Entrepreneur.com",
    type: "order",
    method: "Platform",
    amount: 530.0,
    status: "debit" // Advertiser: Order Completed (Deducted)
  },
  {
    id: "TXN-006",
    date: "2024-01-10T09:00:00",
    description: "Funds Deposit - Credit Card",
    type: "deposit",
    method: "Stripe",
    amount: 2000.0,
    status: "deposit" // Advertiser: Funds Added
  },
  {
    id: "TXN-007",
    date: "2024-01-09T15:30:00",
    description: "Refund - Order #GP-007",
    type: "order",
    method: "Platform",
    amount: 380.0,
    status: "credit" // Advertiser: Refunded (Credit back)
  },
  {
    id: "TXN-008",
    date: "2024-01-08T11:00:00",
    description: "Advertiser Withdrawal",
    type: "withdrawal",
    method: "Bank Transfer",
    amount: 1500.0,
    status: "withdraw" // Advertiser: Funds Withdrawn
  }],


  payoutMethods: [
  {
    id: "PM-001",
    type: "paypal",
    email: "john.doe@paypal.com",
    isDefault: true
  },
  {
    id: "PM-002",
    type: "crypto",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f3f4a",
    network: "TRC20",
    label: "My USDT Wallet",
    isDefault: false
  }],


  setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),

  setOnHoldAmount: (amount) => set({ onHoldAmount: amount }),
  setAwaitingClearanceAmount: (amount) =>
  set({ awaitingClearanceAmount: amount }),

  addPayoutMethod: (method) =>
  set((state) => ({
    payoutMethods: [...state.payoutMethods, method]
  })),

  updatePayoutMethod: (id, updates) =>
  set((state) => ({
    payoutMethods: state.payoutMethods.map((method) =>
    method.id === id ? { ...method, ...updates } : method
    )
  })),

  deletePayoutMethod: (id) =>
  set((state) => ({
    payoutMethods: state.payoutMethods.filter((method) => method.id !== id)
  })),

  setDefaultPayoutMethod: (id) =>
  set((state) => ({
    payoutMethods: state.payoutMethods.map((method) => ({
      ...method,
      isDefault: method.id === id
    }))
  })),

  submitWithdrawal: async (amount, methodId) => {
    const state = get();
    const role = useUserStore.getState().role;
    const method = state.payoutMethods.find((m) => m.id === methodId);

    if (!method) throw new Error("Payout method not found");
    if (amount > state.availableBalance)
    throw new Error("Insufficient balance");

    const platformFee = amount * 0.2;
    const processingFee = amount * 0.02;

    let netAmount = 0;
    if (role === "publisher") {
      netAmount = amount - platformFee - processingFee;
    } else {
      // Advertisers get fees refunded
      netAmount = amount + platformFee + processingFee;
    }

    const newTransaction = {
      id: `TXN-${Date.now()}`,
      date: new Date().toISOString(),
      description: `Withdrawal to ${method.type === "paypal" ? "PayPal" : method.type === "payoneer" ? "Payoneer" : "Crypto"}`,
      type: "withdrawal",
      method:
      method.type === "crypto" ?
      `USDT (${method.network})` :
      method.type.charAt(0).toUpperCase() + method.type.slice(1),
      amount,
      status: "processing", // Initial status for publisher withdrawal
      platformFee,
      processingFee,
      netAmount
    };

    set((state) => ({
      availableBalance: state.availableBalance - amount,
      transactions: [newTransaction, ...state.transactions]
    }));

    return newTransaction.id;
  },

  depositFunds: async (amount, method) => {
    const newTransaction = {
      id: `TXN-${Date.now()}`,
      date: new Date().toISOString(),
      description: `Funds Deposit via ${method === "card" ? "Credit Card" : method === "bank" ? "Bank Transfer" : "Crypto"}`,
      type: "deposit",
      method:
      method === "card" ?
      "Credit Card" :
      method === "bank" ?
      "Bank Transfer" :
      "USDT (TRC20)",
      amount,
      status: "deposit"
    };

    set((state) => ({
      availableBalance: state.availableBalance + amount,
      transactions: [newTransaction, ...state.transactions]
    }));

    return newTransaction;
  }
}));