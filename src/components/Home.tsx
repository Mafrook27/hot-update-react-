import { useState } from 'react'

export function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="home-content">
      <h2>Interactive Home Component</h2>
      <p>hiiiii .</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Interactions</h3>
          <p className="stat-value">{count}</p>
          <button onClick={() => setCount(c => c + 1)} className="accent-btn">
            Register Action
          </button>
        </div>
        <div className="stat-card">
          <h3>System Status</h3>
          <p className="stat-value">Active</p>
          <div className="status-indicator"></div>
        </div>
      </div>

      <div className="features">
        <h3>Current Features</h3>
        <ul>
          <li>Real-time rendering</li>
    
        </ul>
      </div>
    </div>
  )
}
