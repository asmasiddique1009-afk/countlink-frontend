import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, setTokens, clearTokens, getAccessToken } from '@/lib/api';
import axios from 'axios';

const API = '/api/user';

export const useUserStore = create()(
  persist(
    (set, get) => ({
      // ── STATE ──
      role: 'advertiser',
      user: null,
      isLoading: false,
      error: null,

      switchRole: (role) => set({ role }),

      // ── LOGIN ──
      login: async ({ email, password }) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authApi.login({ email, password });
          setTokens(res.token);
          set({
            user: { id: res.userId, role: res.userRole, email },
            role: res.userRole,
            isLoading: false,
          });
          // Full profile fetch karo login ke baad
          await get().fetchProfile();
          return { success: true, role: res.userRole };
        } catch (err) {
          set({ isLoading: false, error: err?.message || 'Login failed' });
          return { success: false, error: err };
        }
      },

      // ── SIGNUP ──
      signup: async ({ fullName, email, password, role }) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authApi.signup({ fullName, email, password, role });
          setTokens(res.token);
          set({
            user: { id: res.userId, role: res.userRole, email },
            role: res.userRole,
            isLoading: false,
          });
          await get().fetchProfile();
          return { success: true };
        } catch (err) {
          set({ isLoading: false, error: err?.message || 'Signup failed' });
          return { success: false, error: err };
        }
      },

      // ── LOGOUT ──
      logout: () => {
        clearTokens();
        set({ user: null, role: 'advertiser', error: null });
      },

      // ── RESTORE SESSION ──
      restoreSession: async () => {
        const token = getAccessToken();
        if (!token) return;
        try {
          set({ isLoading: true });
          await get().fetchProfile();
        } catch (err) {
          set({ user: null, role: 'advertiser', isLoading: false });
        }
      },

      // ── FETCH FULL PROFILE ──
      fetchProfile: async () => {
        try {
          const token = getAccessToken();
          const res = await axios.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const u = res.data.data.user;
          set({
            user: {
              id: u._id,
              fullName: u.fullName,
              email: u.email,
              role: u.role,
              avatar: u.avatar,
              phone: u.phone,
              phoneCode: u.phoneCode,
              timezone: u.timezone,
              walletBalance: u.walletBalance,
              onHoldAmount: u.onHoldAmount,
              awaitingClearanceAmount: u.awaitingClearanceAmount,
              membershipTier: u.membershipTier,
              business: u.business,
              paymentMethods: u.paymentMethods,
              averageRating: u.averageRating,
              totalReviews: u.totalReviews,
            },
            role: u.role,
            isLoading: false,
          });
        } catch (err) {
          set({ isLoading: false });
        }
      },

      // ── UPDATE PERSONAL INFO ──
      updateProfile: async (data) => {
        set({ isLoading: true });
        try {
          const token = getAccessToken();
          const res = await axios.put(`${API}/profile`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const u = res.data.data.user;
          set((state) => ({
            user: { ...state.user, fullName: u.fullName, phone: u.phone, phoneCode: u.phoneCode, timezone: u.timezone },
            isLoading: false,
          }));
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          return { success: false, error: err.message };
        }
      },

      // ── UPDATE PASSWORD ──
      updatePassword: async (data) => {
        set({ isLoading: true });
        try {
          const token = getAccessToken();
          await axios.put(`${API}/password`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({ isLoading: false });
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          return { success: false, error: err.response?.data?.message || err.message };
        }
      },

      // ── UPDATE BUSINESS INFO ──
      updateBusiness: async (data) => {
        set({ isLoading: true });
        try {
          const token = getAccessToken();
          const res = await axios.put(`${API}/business`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const u = res.data.data.user;
          set((state) => ({
            user: { ...state.user, business: u.business },
            isLoading: false,
          }));
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          return { success: false, error: err.message };
        }
      },

      // ── UPDATE AVATAR ──
      updateAvatar: async (file) => {
        set({ isLoading: true });
        try {
          const token = getAccessToken();
          const formData = new FormData();
          formData.append('avatar', file);
          const res = await axios.post(`${API}/avatar`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          set((state) => ({
            user: { ...state.user, avatar: res.data.data.avatar },
            isLoading: false,
          }));
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          return { success: false, error: err.message };
        }
      },

      // ── ADD PAYMENT METHOD ──
      addPaymentMethod: async (data) => {
        set({ isLoading: true });
        try {
          const token = getAccessToken();
          const res = await axios.post(`${API}/payment-methods`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set((state) => ({
            user: { ...state.user, paymentMethods: res.data.data.paymentMethods },
            isLoading: false,
          }));
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          return { success: false, error: err.message };
        }
      },

      // ── DELETE PAYMENT METHOD ──
      deletePaymentMethod: async (methodId) => {
        set({ isLoading: true });
        try {
          const token = getAccessToken();
          const res = await axios.delete(`${API}/payment-methods/${methodId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set((state) => ({
            user: { ...state.user, paymentMethods: res.data.data.paymentMethods },
            isLoading: false,
          }));
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          return { success: false, error: err.message };
        }
      },

      // ── SET DEFAULT PAYMENT METHOD ──
      setDefaultPaymentMethod: async (methodId) => {
        set({ isLoading: true });
        try {
          const token = getAccessToken();
          const res = await axios.patch(`${API}/payment-methods/${methodId}/default`, {}, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set((state) => ({
            user: { ...state.user, paymentMethods: res.data.data.paymentMethods },
            isLoading: false,
          }));
          return { success: true };
        } catch (err) {
          set({ isLoading: false });
          return { success: false, error: err.message };
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ role: state.role, user: state.user }),
    }
  )
);