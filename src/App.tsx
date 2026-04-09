import { useCallback, useEffect, useState } from 'react'
import viteLogo from './assets/vite.svg'
import { Home } from './components/Home'
import './App.css'

const appVersion = __APP_VERSION__;
const versionCheckInterval = __VERSION_CHECK_INTERVAL__;

function App() {
  const [newVersion, setNewVersion] = useState("");
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const fetchRemoteVersion = useCallback(async () => {
    setIsChecking(true);
    try {
      const response = await fetch(`/signature.json?t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await response.json();
      setNewVersion(data.version);
      setLastChecked(new Date());
      setIsChecking(false);
      return data.version;
    } catch (error) {
      console.error("Failed to fetch version:", error);
      setIsChecking(false);
      return null;
    }
  }, []);

  const hardReloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    // Initial check
    fetchRemoteVersion().then((remoteVersion) => {
      if (remoteVersion && remoteVersion !== appVersion) {
        hardReloadPage();
      }
    });

    // Periodic check
    const timer = setInterval(() => {
      fetchRemoteVersion().then((remoteVersion) => {
        if (remoteVersion && remoteVersion !== appVersion) {
          setShowToast(true);
        }
      });
    }, versionCheckInterval);

    return () => clearInterval(timer);
  }, [fetchRemoteVersion]);

  return (
    <div className="layout">
      <header className="navbar">
        <div className="nav-logo">
          <img src={viteLogo} className="mini-logo" alt="Vite logo" />
          <span>Vite + React Update Demo</span>
        </div>
        <div className="version-pill">
          v{appVersion}
        </div>
      </header>

      <main className="content">
        <Home />
      </main>

      {/* Modern Toast Message */}
      <div className={`toast ${showToast ? 'visible' : ''}`}>
        <div className="toast-icon">✨</div>
        <div className="toast-body">
          <strong>Update Available!</strong>
          <p>A newer version (<span>{newVersion}</span>) is ready.</p>
        </div>
        <button className="toast-action" onClick={hardReloadPage}>
          Reload
        </button>
        <button className="toast-close" onClick={() => setShowToast(false)}>
          ✕
        </button>
      </div>

      <footer className="status-bar">
        <span className={`pulse ${isChecking ? 'active' : ''}`}></span>
        {isChecking ? 'Syncing...' : `Last check: ${lastChecked?.toLocaleTimeString() || 'Never'}`}
      </footer>
    </div>
  )
}

export default App
