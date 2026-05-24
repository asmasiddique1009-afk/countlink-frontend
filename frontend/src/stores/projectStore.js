import { create } from 'zustand';
import { persist } from 'zustand/middleware';






























export const useProjectStore = create()(
  persist(
    (set, get) => ({
      projects: [
      {
        id: 'PRJ-001',
        name: 'Q1 SEO Campaign',
        description: 'Backlink building for the main e-commerce site to improve organic rankings.',
        purpose: 'Increase SEO Traffic',
        status: 'active',
        spent: 2450,
        ordersCount: 8,
        activeOrders: 3,
        completedOrders: 5,
        startDate: '2024-01-15',
        language: 'English',
        targetWebsite: 'https://example.com',
        categories: ['Technology', 'Business'],
        sensitiveTopics: [],
        languages: ['English'],
        countries: ['United States', 'United Kingdom'],
        publishInstructions: 'Please ensure links are dofollow and placed naturally within the content.',
        targetPages: [
        { id: '1', anchor: 'Best SEO Tools', url: 'https://example.com/seo-tools' },
        { id: '2', anchor: 'Marketing Guide', url: 'https://example.com/marketing' }]

      },
      {
        id: 'PRJ-002',
        name: 'Blog Content Expansion',
        description: 'Sourcing high-quality guest posts for the new blog section.',
        purpose: 'Boost Visibility',
        status: 'active',
        spent: 850,
        ordersCount: 3,
        activeOrders: 1,
        completedOrders: 2,
        startDate: '2024-02-01',
        language: 'Spanish',
        targetWebsite: 'https://blog.example.com',
        categories: ['Lifestyle', 'Travel'],
        sensitiveTopics: [],
        languages: ['Spanish', 'English'],
        countries: ['Spain', 'Mexico'],
        publishInstructions: '',
        targetPages: [
        { id: '1', anchor: 'Travel Blog', url: 'https://blog.example.com/travel' }]

      },
      {
        id: 'PRJ-003',
        name: 'Competitor Analysis Outreach',
        description: 'Targeting competitor backlink profiles for outreach.',
        purpose: 'Build Authority',
        status: 'paused',
        spent: 0,
        ordersCount: 0,
        activeOrders: 0,
        completedOrders: 0,
        startDate: '2024-02-10',
        language: 'French',
        targetWebsite: '',
        categories: ['Marketing'],
        sensitiveTopics: [],
        languages: ['French'],
        countries: ['France'],
        publishInstructions: '',
        targetPages: []
      }],

      getProject: (id) => {
        return get().projects.find((p) => p.id === id);
      },
      addProject: (project) => set((state) => ({
        projects: [
        {
          ...project,
          id: `PRJ-${Date.now()}`,
          ordersCount: 0,
          activeOrders: 0,
          completedOrders: 0,
          spent: 0
        },
        ...state.projects]

      })),
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id)
      }))
    }),
    {
      name: 'project-storage'
    }
  )
);