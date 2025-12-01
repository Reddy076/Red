import { useState, memo } from 'react'
import KeyDatesView from './KeyDatesView'
import '../styles/PodOverview.css'

/**
 * PodOverview Page Component
 * 
 * Dashboard page showing overview of all Owners Corporations
 * Features:
 * - Summary statistics cards
 * - Owners Corporations table
 * - Urgent Items section
 * - Recent Activity feed
 * - Tabbed navigation (Summary, Key Dates, Ballots, Discussions)
 */
const PodOverview = memo(() => {
  const [activeTab, setActiveTab] = useState('summary')

  // Mock data for demonstration
  const stats = {
    ownersCorps: 8,
    activeBallots: 12,
    openDiscussions: 23,
    upcomingDates: 6
  }

  const ownersCorps = [
    { name: 'Riverside Towers OC', activeBallots: 2, openDiscussions: 5, nextDate: 'Mar 15, 2025' },
    { name: 'Parkview Gardens OC', activeBallots: 3, openDiscussions: 8, nextDate: 'Mar 18, 2025' },
    { name: 'Harbour View Estate OC', activeBallots: 1, openDiscussions: 4, nextDate: 'Mar 22, 2025' },
    { name: 'Sunset Apartments OC', activeBallots: 4, openDiscussions: 3, nextDate: 'Mar 25, 2025' },
    { name: 'Green Valley OC', activeBallots: 2, openDiscussions: 3, nextDate: 'Apr 2, 2025' }
  ]

  const urgentItems = [
    { 
      type: 'Ballot', 
      corporation: 'Riverside Towers OC', 
      description: 'Annual Budget 2025', 
      deadline: 'Mar 15, 2025' 
    },
    { 
      type: 'Ballot', 
      corporation: 'Sunset Apartments OC', 
      description: 'Emergency repairs approval', 
      deadline: 'Mar 16, 2025' 
    }
  ]


  return (
    <main className="pod-overview-content">
      {/* Page Header */}
      <header className="pod-overview-header">
        <div>
          <h1 className="pod-overview-title">Pod Overview</h1>
          <p className="pod-overview-subtitle">Monitor all Owners Corporations and open items</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="pod-tabs">
        <button 
          className={`pod-tab ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          Summary
        </button>
        <button 
          className={`pod-tab ${activeTab === 'key-dates' ? 'active' : ''}`}
          onClick={() => setActiveTab('key-dates')}
        >
          Key Dates
        </button>
        <button 
          className={`pod-tab ${activeTab === 'ballots' ? 'active' : ''}`}
          onClick={() => setActiveTab('ballots')}
        >
          Ballots
        </button>
        <button 
          className={`pod-tab ${activeTab === 'discussions' ? 'active' : ''}`}
          onClick={() => setActiveTab('discussions')}
        >
          Discussions
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'summary' && (
        <>
          {/* Statistics Cards */}
          <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Owners Corporations</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-icon">
              <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
              <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
              <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
              <path d="M10 6h4"></path>
              <path d="M10 10h4"></path>
              <path d="M10 14h4"></path>
              <path d="M10 18h4"></path>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.ownersCorps}</div>
            <p className="stat-description">Active properties</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Active Ballots</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-icon">
              <path d="M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5"></path>
              <path d="m9 11 3 3L22 4"></path>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.activeBallots}</div>
            <p className="stat-description">Across all properties</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Open Discussions</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-icon">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.openDiscussions}</div>
            <p className="stat-description">Requiring attention</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-label">Upcoming Dates</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stat-icon">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.upcomingDates}</div>
            <p className="stat-description">Next 30 days</p>
          </div>
        </div>
      </div>

      {/* Content Grid with Tables Side by Side */}
      <div className="tables-grid">
        {/* Owners Corporations Table */}
        <section className="table-section">
          <h2 className="table-section-title">Owners Corporations</h2>
          <div className="pod-table-card">
            <table className="pod-table">
              <colgroup>
                <col style={{ width: '35%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '22%' }} />
                <col style={{ width: '25%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Name</th>
                  <th style={{ textAlign: 'center' }}>Active Ballots</th>
                  <th style={{ textAlign: 'center' }}>Open Discussions</th>
                  <th>Next Date</th>
                </tr>
              </thead>
              <tbody>
                {ownersCorps.map((corp, index) => (
                  <tr key={index}>
                    <td className="corp-name">{corp.name}</td>
                    <td style={{ textAlign: 'center' }}><span className="number-link">{corp.activeBallots}</span></td>
                    <td style={{ textAlign: 'center' }}><span className="number-link">{corp.openDiscussions}</span></td>
                    <td className="date-text">{corp.nextDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Urgent Items Table */}
        <section className="table-section">
          <h2 className="table-section-title">Urgent Items</h2>
          <div className="pod-table-card">
            <table className="pod-table">
              <colgroup>
                <col style={{ width: '18%' }} />
                <col style={{ width: '32%' }} />
                <col style={{ width: '30%' }} />
                <col style={{ width: '20%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Corporation</th>
                  <th>Description</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {urgentItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <span className="type-badge">{item.type}</span>
                    </td>
                    <td className="corp-secondary">{item.corporation}</td>
                    <td>{item.description}</td>
                    <td className="date-link">{item.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
        </>
      )}

      {/* Key Dates Tab */}
      {activeTab === 'key-dates' && <KeyDatesView />}

      {/* Other Tabs */}
      {activeTab === 'ballots' && (
        <div className="tab-placeholder">
          <p></p>
        </div>
      )}

      {activeTab === 'discussions' && (
        <div className="tab-placeholder">
          <p></p>
        </div>
      )}

    </main>
  )
})

PodOverview.displayName = 'PodOverview'

export default PodOverview
