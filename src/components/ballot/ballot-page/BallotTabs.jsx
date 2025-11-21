import { memo } from 'react'

/**
 * BallotTabs Component
 * 
 * Displays tab navigation for Active, Closed, and Motions views.
 * 
 * @param {string} activeTab - Currently active tab
 * @param {Function} onTabChange - Handle tab change
 * @param {number} activeCount - Count of active ballots
 * @param {number} closedCount - Count of closed ballots
 */
const BallotTabs = memo(({ 
  activeTab, 
  onTabChange, 
  activeCount, 
  closedCount 
}) => {
  return (
    <div className="tabs-section">
      <button 
        className={`tab ${activeTab === 'active' ? 'active' : ''}`}
        onClick={() => onTabChange('active')}
        aria-pressed={activeTab === 'active'}
      >
        Active ({activeCount})
      </button>
      <button 
        className={`tab ${activeTab === 'closed' ? 'active' : ''}`}
        onClick={() => onTabChange('closed')}
        aria-pressed={activeTab === 'closed'}
      >
        Closed ({closedCount})
      </button>
      <button 
        className={`tab ${activeTab === 'motions' ? 'active' : ''}`}
        onClick={() => onTabChange('motions')}
        aria-pressed={activeTab === 'motions'}
      >
        Motions
      </button>
    </div>
  )
})

BallotTabs.displayName = 'BallotTabs'

export default BallotTabs
