import { LoginPage } from '@/components/auth/LoginPage';
import { SignupPage } from '@/components/auth/SignupPage';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { MobileMenu } from '@/components/MobileMenu';
import { useWindowSize } from '@/hooks/use-mobile';
import { OrderStatusCards } from '@/components/OrderStatusCards';
import { OrdersByDateChart } from '@/components/OrdersByDateChart';
import { QAStatisticsChart } from '@/components/QAStatisticsChart';
import { OrdersTable } from '@/components/OrdersTable';
import { VideoSection } from '@/components/VideoSection';
import { Footer } from '@/components/Footer';
import { ProfileSection } from '@/components/ProfileSection';
import { WalletContainer } from '@/components/wallet/WalletContainer';
import { Toaster } from "sonner";

import { SupportCenter } from '@/components/support/SupportCenter';
import { NotificationsPage } from '@/components/notifications/NotificationsPage';
import { CataloguePage } from '@/components/catalogue/CataloguePage';
import { MyPortalsPage } from '@/components/MyPortalsPage';
import { SalesPurchasesPage } from '@/components/SalesPurchasesPage';
import { CartPage } from '@/components/cart/CartPage';
import { MessagesPage } from '@/components/messages/MessagesPage';
import { useMessageStore } from '@/stores/messageStore';
import { OrderConfirmationPage } from '@/components/cart/OrderConfirmationPage';
import { PublicProfilePage } from '@/components/profile/PublicProfilePage';
import { PublisherProfilePage } from '@/components/profile/PublisherProfilePage';
import { RatingsPage } from '@/components/profile/RatingsPage';
import { ProjectsPage } from '@/components/projects/ProjectsPage';
import { LeaveFeedbackPage } from '@/components/sales/LeaveFeedbackPage';
import { CreateProjectPage } from '@/components/projects/CreateProjectPage';
import { ProjectDetailsPage } from '@/components/projects/ProjectDetailsPage';
import { WebsiteDetailsPage } from '@/components/catalogue/WebsiteDetailsPage';
import { WebsiteOrdersPage } from '@/components/portals/WebsiteOrdersPage';
import { useDashboardStore } from '@/stores/dashboardStore';
import { useUserStore } from '@/stores/userStore';
import { useEffect, useState, useCallback } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LiveChatWidget } from '@/components/livechat/LiveChatWidget';

function App() {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
   const [authView, setAuthView] = useState('login');
  const [authReady, setAuthReady] = useState(false);
  const { sidebarCollapsed } = useDashboardStore();
  const { isMobile } = useWindowSize();
  const { role, switchRole, restoreSession, isLoading: authLoading } = useUserStore();

const handleLogin = (accessToken, role) => {
  localStorage.setItem("accessToken", accessToken);
   localStorage.setItem("role", role);  
  setToken(accessToken);   // 🔥 IMPORTANT
  switchRole(role);
  setAuthView("app");
};
  // ----------------------------
  // SIGNUP
  // ----------------------------
 const handleSignup = (selectedRole) => {
  switchRole(selectedRole);
  setAuthView("login"); // after signup go to login
};
const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("role"); 
  setToken(null);          // 🔥 IMPORTANT
  switchRole(null);
  setCurrentView("dashboard");
  setAuthView("login");
};
  const { selectConversation, openConversationForOrder } = useMessageStore();

  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedWebsiteId, setSelectedWebsiteId] = useState(null);
  const [selectedWebsiteDomain, setSelectedWebsiteDomain] = useState(null);
  const [showEmptyPurchases, setShowEmptyPurchases] = useState(false);
  const [feedbackOrder, setFeedbackOrder] = useState(null);
  const [walletInitialPage, setWalletInitialPage] = useState(undefined);
  const [catalogueShowFavorites, setCatalogueShowFavorites] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

useEffect(() => {
  const initAuth = async () => {
    const storedToken = localStorage.getItem("accessToken");
    const storedRole = localStorage.getItem("role"); // 🔥 ADD

    if (!storedToken) {
      setAuthReady(true);
      return;
    }

    try {
      await restoreSession(storedToken);

      if (storedRole) {
        switchRole(storedRole); // 🔥 RESTORE ROLE
      }

      setToken(storedToken);
    } catch (err) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      setToken(null);
    } finally {
      setAuthReady(true);
    }
  };

  initAuth();
}, []);
  // Function to handle profile navigation
  const handleMyProfileClick = () => {
    setCurrentView('profile');
  };

  // Function to handle wallet navigation
  const handleWalletClick = () => {
    setWalletInitialPage(undefined);
    setCurrentView('wallet');
  };

  // Function to navigate directly to payment accounts (payout methods)
  const handlePaymentAccountsClick = () => {
    setWalletInitialPage('payout-methods');
    setCurrentView('wallet');
  };

  // Function to handle support navigation
  const handleSupportClick = () => {
    setCurrentView('support');
  };

  // Function to handle notifications navigation
  const handleNotificationsClick = () => {
    setCurrentView('notifications');
  };

  // Function to handle catalogue navigation (Advertiser only)
  const handleCatalogueClick = () => {
    if (role === 'advertiser') {
      setCatalogueShowFavorites(false);
      setCurrentView('catalogue');
    }
  };

  // Function to navigate to catalogue with Favorites filter pre-enabled
  const handleFavoritesClick = () => {
    if (role === 'advertiser') {
      setCatalogueShowFavorites(true);
      setCurrentView('catalogue');
    }
  };

  // Function to handle projects navigation (Advertiser only)
  const handleProjectsClick = () => {
    if (role === 'advertiser') {
      setCurrentView('projects');
    }
  };

  // Function to handle create project navigation
  const handleCreateProjectClick = () => {
    setCurrentView('create-project');
  };

  // Function to handle view project navigation
  const handleViewProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
    setCurrentView('project-details');
  };

  // Function to handle website details navigation
  const handleWebsiteClick = (websiteId) => {
    setSelectedWebsiteId(websiteId);
    setCurrentView('website-details');
  };

  // Function to handle my portals navigation (Publisher only)
  const handleMyPortalsClick = () => {
    if (role === 'publisher') {
      setCurrentView('my-portals');
    }
  };

  // Function to handle website orders navigation
  const handleViewWebsiteOrders = (domain) => {
    setSelectedWebsiteDomain(domain);
    setCurrentView('website-orders');
  };

  // Function to handle sales navigation (Publisher only)
  const handleSalesClick = () => {
    if (role === 'publisher') {
      setCurrentView('sales');
    }
  };

  // Function to handle purchases navigation (Advertiser only)
  const handlePurchasesClick = () => {
    if (role === 'advertiser') {
      setCurrentView('purchases');
      setShowEmptyPurchases(false);
    }
  };

  // Function to show empty purchases state
  const handleShowEmptyPurchases = () => {
    setShowEmptyPurchases(true);
  };

  // Function to handle cart navigation
  const handleCartClick = () => {
    setCurrentView('cart');
  };

  // Function to handle messages navigation
  const handleMessagesClick = () => {
    setCurrentView('messages');
  };

  // Function to handle navigation from order confirmation
  const handleOrderConfirmationNavigate = (page) => {
    if (page === 'purchases') {
      setCurrentView('purchases');
    } else if (page === 'catalogue') {
      setCurrentView('catalogue');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handlePublicProfileClick = (name) => {
    setSelectedProfile(name);
    setCurrentView('public-profile');
  };

  const handlePublisherProfileClick = (name) => {
    setSelectedPublisher(name);
    setCurrentView('publisher-profile');
  };

  const handleRatingsClick = (name) => {
    setSelectedPublisher(name);
    setCurrentView('ratings');
  };

  if (!authReady) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg className="animate-spin w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      </div>
    );
  }



 if (!authLoading && !token)  {
    if (authView === 'login') {
      return (
        <>
          <Toaster position="top-right" richColors />
          <LoginPage
            onLogin={handleLogin}

            onNavigateToSignup={() => setAuthView('signup')}
          />
        </>
      );
    }

    if (authView === 'signup') {
      return (
        <>
          <Toaster position="top-right" richColors />
          <SignupPage
            onSignup={handleSignup}
            onNavigateToLogin={() => setAuthView('login')}
          />
        </>
      );
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
  <Toaster position="top-right" richColors />

        <Sidebar
          onHomeClick={() => setCurrentView('dashboard')}
          onWalletClick={handleWalletClick}
          onSupportClick={handleSupportClick}
          onCatalogueClick={handleCatalogueClick}
          onMyPortalsClick={handleMyPortalsClick}
          onSalesClick={handleSalesClick}
          onPurchasesClick={handlePurchasesClick}
          onProjectsClick={handleProjectsClick} />

        <MobileMenu
          onHomeClick={() => setCurrentView('dashboard')}
          onWalletClick={handleWalletClick}
          onSupportClick={handleSupportClick}
          onCatalogueClick={handleCatalogueClick}
          onMyPortalsClick={handleMyPortalsClick}
          onSalesClick={handleSalesClick}
          onPurchasesClick={handlePurchasesClick}
          onProjectsClick={handleProjectsClick} />

        <Header
          onProfileClick={handleMyProfileClick}
          onNotificationsClick={handleNotificationsClick}
          onCartClick={handleCartClick}
          onMessagesClick={handleMessagesClick}
          onWalletClick={handleWalletClick}
          onPaymentAccountsClick={handlePaymentAccountsClick}
          onFavoritesClick={handleFavoritesClick}
          onLogout={handleLogout} />


        <main
          className="pt-20 sm:pt-22 pb-8 px-3 sm:px-4 md:px-6 transition-all duration-300 min-w-0"
          style={{
            marginLeft: isMobile ? '0px' : sidebarCollapsed ? '80px' : '240px',
            width: isMobile ? '100%' : sidebarCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 240px)'
          }}>

          {currentView === 'dashboard' ?
            <div className="max-w-[1600px] mx-auto space-y-4 md:space-y-6">
              <div className="pt-1 md:pt-2">
                <h1 className="text-xl sm:text-2xl font-medium text-foreground mb-0.5">Guest Posting Dashboard</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Manage your guest post orders, track performance, and monitor Q&amp;A activity</p>
              </div>

              <OrderStatusCards />

              <OrdersTable onOpenChat={(conversationId) => {
                selectConversation(conversationId);
                setCurrentView('messages');
              }} />

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
                <OrdersByDateChart />
                <VideoSection />
              </div>

              <QAStatisticsChart />
            </div> :
            currentView === 'profile' ?
              <ProfileSection onBack={() => setCurrentView('dashboard')} /> :
              currentView === 'wallet' ?
                <WalletContainer key={walletInitialPage ?? 'default'} initialPage={walletInitialPage} /> :
                currentView === 'notifications' ?
                  <NotificationsPage /> :
                  currentView === 'projects' ?
                    <ProjectsPage
                      onCreateProject={handleCreateProjectClick}
                      onViewProject={handleViewProjectClick} /> :

                    currentView === 'create-project' ?
                      <CreateProjectPage
                        onCancel={() => setCurrentView('projects')}
                        onComplete={() => setCurrentView('projects')} /> :

                      currentView === 'project-details' && selectedProjectId ?
                        <ProjectDetailsPage
                          projectId={selectedProjectId}
                          onBack={() => setCurrentView('projects')} /> :

                        currentView === 'catalogue' ?
                          <CataloguePage
                            key={catalogueShowFavorites ? 'fav' : 'all'}
                            onWebsiteClick={handleWebsiteClick}
                            onPublisherClick={handlePublisherProfileClick}
                            initialShowFavorites={catalogueShowFavorites} /> :

                          currentView === 'website-details' && selectedWebsiteId ?
                            <WebsiteDetailsPage
                              websiteId={selectedWebsiteId}
                              onBack={() => setCurrentView('catalogue')}
                              onPublisherClick={handlePublisherProfileClick} /> :

                            currentView === 'my-portals' ?
                              <MyPortalsPage onViewWebsiteOrders={handleViewWebsiteOrders} /> :
                              currentView === 'website-orders' && selectedWebsiteDomain ?
                                <WebsiteOrdersPage
                                  websiteDomain={selectedWebsiteDomain}
                                  onBack={() => setCurrentView('my-portals')}
                                  onNavigateToMessages={(convId) => {
                                    selectConversation(convId);
                                    setCurrentView('messages');
                                  }} /> :

                                currentView === 'leave-feedback' && feedbackOrder ?
                                  <LeaveFeedbackPage
                                    order={feedbackOrder}
                                    role={role}
                                    onBack={() => setCurrentView(role === 'advertiser' ? 'purchases' : 'sales')}
                                    onSubmit={(_orderId, _feedback) => {
                                      setCurrentView(role === 'advertiser' ? 'purchases' : 'sales');
                                    }} /> :

                                  currentView === 'sales' ?
                                    <SalesPurchasesPage
                                      onProfileClick={handlePublicProfileClick}
                                      onLeaveFeedback={(order) => {
                                        setFeedbackOrder(order);
                                        setCurrentView('leave-feedback');
                                      }}
                                      onNavigateToMessages={(convId) => {
                                        selectConversation(convId);
                                        setCurrentView('messages');
                                      }} /> :

                                    currentView === 'purchases' ?
                                      <SalesPurchasesPage
                                        onProfileClick={handlePublicProfileClick}
                                        showEmptyState={showEmptyPurchases}
                                        onShowEmptyState={handleShowEmptyPurchases}
                                        onLeaveFeedback={(order) => {
                                          setFeedbackOrder(order);
                                          setCurrentView('leave-feedback');
                                        }}
                                        onNavigateToMessages={(convId) => {
                                          selectConversation(convId);
                                          setCurrentView('messages');
                                        }} /> :

                                      currentView === 'public-profile' && selectedProfile ?
                                        <PublicProfilePage
                                          profileName={selectedProfile}
                                          onBack={() => setCurrentView(role === 'publisher' ? 'sales' : 'purchases')}
                                          onMessage={() => {
                                            const otherRole = role === 'publisher' ? 'Advertiser' : 'Publisher';
                                            const convId = openConversationForOrder(`profile-${selectedProfile}`, selectedProfile || 'User', otherRole);
                                            selectConversation(convId);
                                            setCurrentView('messages');
                                          }} /> :

                                        currentView === 'publisher-profile' && selectedPublisher ?
                                          <PublisherProfilePage
                                            publisherName={selectedPublisher}
                                            onBack={() => setCurrentView('catalogue')}
                                            onMessage={() => {
                                              const convId = openConversationForOrder(`profile-${selectedPublisher}`, selectedPublisher || 'Publisher', 'Publisher');
                                              selectConversation(convId);
                                              setCurrentView('messages');
                                            }}
                                            onWebsiteClick={handleWebsiteClick}
                                            onRatingsClick={handleRatingsClick} /> :

                                          currentView === 'ratings' && selectedPublisher ?
                                            <RatingsPage
                                              publisherName={selectedPublisher}
                                              onBack={() => setCurrentView('publisher-profile')} /> :

                                            currentView === 'cart' ?
                                              <CartPage onNavigate={(page) => setCurrentView(page)} /> :
                                              currentView === 'messages' ?
                                                <MessagesPage onPublisherClick={handlePublisherProfileClick} /> :
                                                currentView === 'order-confirmation' ?
                                                  <OrderConfirmationPage onNavigate={handleOrderConfirmationNavigate} /> :

                                                  <SupportCenter />
          }
        </main>

        <Footer />
        <LiveChatWidget />
      </div>
    </TooltipProvider>);

}

export default App;