import { useState, useEffect } from 'react';

export function useAppState() {
  const [activeTab, setActiveTab] = useState('Budget');
  const [showLanding, setShowLanding] = useState(true);
  const [roadMode, setRoadMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [viewEventId, setViewEventId] = useState(null);

  // Form Inputs
  const [newBudgetName, setNewBudgetName] = useState('');
  const [newBudgetCost, setNewBudgetCost] = useState('');
  const [newScheduleName, setNewScheduleName] = useState('');
  const [newScheduleDate, setNewScheduleDate] = useState('');
  const [newScheduleNote, setNewScheduleNote] = useState('');
  const [newPackingItem, setNewPackingItem] = useState('');
  const [newSquadMember, setNewSquadMember] = useState('');
  const [costumeDetails, setCostumeDetails] = useState({ band: '', section: '', total: '', paid: '' });

  // Notifications & Modals
  const [toastMessage, setToastMessage] = useState(null);
  const [showAutoPilotModal, setShowAutoPilotModal] = useState(false);
  const [notifySquadOnRoadReady, setNotifySquadOnRoadReady] = useState(true);
  const [isSendingRoadReadyAlert, setIsSendingRoadReadyAlert] = useState(false);
  const [isOnline, setIsOnline] = useState(true); // default to true, useEffect will update it if running in browser
  
  const [activeLegalPage, setActiveLegalPage] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(() => {
    try {
      return !localStorage.getItem('carnival-planner-welcomed');
    } catch {
      return false;
    }
  });
  const [showHelpGuide, setShowHelpGuide] = useState(false);
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [showBandLeaderDashboard, setShowBandLeaderDashboard] = useState(false);

  // Scraped Events State
  const [scrapedEvents, setScrapedEvents] = useState([]);
  const [isLoadingScrapedEvents, setIsLoadingScrapedEvents] = useState(false);
  const [scrapedEventsLastUpdated, setScrapedEventsLastUpdated] = useState(null);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    activeTab, setActiveTab,
    showLanding, setShowLanding,
    roadMode, setRoadMode,
    darkMode, setDarkMode,
    isCheckingOut, setIsCheckingOut,
    viewEventId, setViewEventId,
    newBudgetName, setNewBudgetName,
    newBudgetCost, setNewBudgetCost,
    newScheduleName, setNewScheduleName,
    newScheduleDate, setNewScheduleDate,
    newScheduleNote, setNewScheduleNote,
    newPackingItem, setNewPackingItem,
    newSquadMember, setNewSquadMember,
    costumeDetails, setCostumeDetails,
    toastMessage, setToastMessage,
    showAutoPilotModal, setShowAutoPilotModal,
    notifySquadOnRoadReady, setNotifySquadOnRoadReady,
    isSendingRoadReadyAlert, setIsSendingRoadReadyAlert,
    isOnline, setIsOnline,
    activeLegalPage, setActiveLegalPage,
    showWelcomeModal, setShowWelcomeModal,
    showHelpGuide, setShowHelpGuide,
    showProfileEditor, setShowProfileEditor,
    showBandLeaderDashboard, setShowBandLeaderDashboard,
    scrapedEvents, setScrapedEvents,
    isLoadingScrapedEvents, setIsLoadingScrapedEvents,
    scrapedEventsLastUpdated, setScrapedEventsLastUpdated
  };
}
