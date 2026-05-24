import { create } from 'zustand';































export const useCartStore = create((set, get) => ({
  items: [
  {
    id: 1,
    domain: 'TechDaily.com',
    flag: 'us',
    country: 'United States',
    basePrice: 150,
    writingPrice: 30,
    sensitivePrice: 50,
    casinoPrice: 100,
    status: 'missing_details',
    project: 'Main Campaign',
    orderType: 'standard',
    isSelected: false
  },
  {
    id: 2,
    domain: 'FinanceToday.net',
    flag: 'gb',
    country: 'United Kingdom',
    basePrice: 220,
    writingPrice: 45,
    sensitivePrice: 75,
    casinoPrice: 150,
    status: 'details_added',
    project: 'Main Campaign',
    orderType: 'sensitive',
    writingOption: 'outsource',
    submissionData: { links: [], instructions: '' },
    isSelected: true
  },
  {
    id: 3,
    domain: 'HealthWeekly.org',
    flag: 'ca',
    country: 'Canada',
    basePrice: 95,
    writingPrice: 20,
    sensitivePrice: 30,
    casinoPrice: 60,
    status: 'missing_details',
    project: 'Main Campaign',
    orderType: 'standard',
    isSelected: false
  },
  {
    id: 4,
    domain: 'MarketingPro.io',
    flag: 'au',
    country: 'Australia',
    basePrice: 180,
    writingPrice: 35,
    sensitivePrice: 50,
    casinoPrice: 100,
    status: 'details_added',
    project: 'Main Campaign',
    orderType: 'sensitive',
    writingOption: 'submit',
    submissionData: { content: 'Sample content', links: [] },
    isSelected: true
  },
  {
    id: 5,
    domain: 'EcoLifeStyle.com',
    flag: 'de',
    country: 'Germany',
    basePrice: 120,
    writingPrice: 25,
    sensitivePrice: 35,
    casinoPrice: 70,
    status: 'details_added',
    project: 'Main Campaign',
    orderType: 'standard',
    writingOption: 'outsource',
    submissionData: { links: [], instructions: '' },
    isSelected: true
  }],

  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  updateItem: (id, updates) =>
  set((state) => ({
    items: state.items.map((item) => item.id === id ? { ...item, ...updates } : item)
  })),
  toggleSelection: (id) => set((state) => ({
    items: state.items.map((item) =>
    item.id === id ? { ...item, isSelected: !item.isSelected } : item
    )
  })),
  calculateItemTotal: (item) => {
    let total = item.basePrice;
    if (item.orderType === 'sensitive') total += item.sensitivePrice;
    if (item.orderType === 'casino') total += item.casinoPrice;
    if (item.writingOption === 'outsource') total += item.writingPrice;
    return total;
  },
  calculateTotal: () => {
    const state = get();
    return state.items.
    filter((item) => item.isSelected).
    reduce((acc, item) => acc + state.calculateItemTotal(item), 0);
  }
}));