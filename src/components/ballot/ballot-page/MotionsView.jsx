import { useState, memo } from 'react'

/**
 * MotionsView Component
 * 
 * Displays a tabbed view of motion outcomes across all corporations.
 * Tracks approved, not approved, and ratified motions.
 */
const MotionsView = memo(() => {
  const [motionTab, setMotionTab] = useState('approved')

  /**
   * Handle motion tab change
   * @param {string} tab - The tab to switch to
   */
  const handleTabChange = (tab) => {
    try {
      if (!tab || typeof tab !== 'string') {
        console.error('Invalid tab value:', tab)
        return
      }
      setMotionTab(tab)
    } catch (error) {
      console.error('Error changing motion tab:', error)
    }
  }

  /**
   * Get display text for current tab
   */
  const getEmptyMessage = () => {
    switch (motionTab) {
      case 'approved':
        return 'No approved motions'
      case 'not-approved':
        return 'No not approved motions'
      case 'ratified':
        return 'No ratified motions'
      default:
        return 'No motions'
    }
  }

  return (
    <div className="motions-view">
      <p className="motions-subtitle">Track individual motion outcomes across all Owners Corporations</p>
      
      {/* Motion Tabs */}
      <div className="tabs-section motion-tabs">
        <button 
          className={`tab ${motionTab === 'approved' ? 'active' : ''}`}
          onClick={() => handleTabChange('approved')}
          aria-pressed={motionTab === 'approved'}
        >
          Approved (0)
        </button>
        <button 
          className={`tab ${motionTab === 'not-approved' ? 'active' : ''}`}
          onClick={() => handleTabChange('not-approved')}
          aria-pressed={motionTab === 'not-approved'}
        >
          Not Approved (0)
        </button>
        <button 
          className={`tab ${motionTab === 'ratified' ? 'active' : ''}`}
          onClick={() => handleTabChange('ratified')}
          aria-pressed={motionTab === 'ratified'}
        >
          Ratified (0)
        </button>
      </div>

      {/* Empty State */}
      <div className="motions-empty-state">
        <p className="empty-message">{getEmptyMessage()}</p>
      </div>
    </div>
  )
})

MotionsView.displayName = 'MotionsView'

export default MotionsView
