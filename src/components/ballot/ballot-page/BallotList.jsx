import { useState, useCallback, useMemo, memo } from 'react'
import BallotHeader from './BallotHeader'
import BallotFilters from './BallotFilters'
import BallotTabs from './BallotTabs'
import BallotTable from './BallotTable'
import MotionsView from './MotionsView'
import BallotCreationModal from '../modal/BallotCreationModal'
import ReminderModal from '../modal/ReminderModal'
import Toast from '../../common/Toast'
import '../../../styles/BallotList.css'

/**
 * BallotList Component
 * 
 * Main component for displaying and managing ballots.
 * 
 * Features:
 * - Tabbed view (Active, Closed, Motions)
 * - Multi-corporation filtering
 * - Search functionality
 * - Sortable table columns
 * - Ballot creation modal
 * - Responsive design
 * 
 * @param {Array<Object>} ballots - Array of ballot objects
 * @param {Function} onAddBallot - Callback to add a new ballot
 */
const BallotList = memo(({ ballots, onAddBallot }) => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [activeTab, setActiveTab] = useState('active')
  const [filterCorporation, setFilterCorporation] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false)
  const [selectedBallot, setSelectedBallot] = useState(null)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [showToast, setShowToast] = useState(false)

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Open the ballot creation modal
   */
  const handleOpenModal = useCallback(() => {
    try {
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error opening modal:', error)
    }
  }, [])

  /**
   * Close the ballot creation modal
   */
  const handleCloseModal = useCallback(() => {
    try {
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error closing modal:', error)
    }
  }, [])
  
  /**
   * Handle ballot submission from the modal
   * @param {Object} ballotData - The ballot data to submit
   */
  const handleBallotSubmit = useCallback((ballotData) => {
    try {
      if (!ballotData) {
        console.error('No ballot data provided')
        return
      }

      onAddBallot(ballotData)
      handleCloseModal()
    } catch (error) {
      console.error('Error submitting ballot:', error)
      alert('Failed to create ballot. Please try again.')
    }
  }, [onAddBallot, handleCloseModal])

  /**
   * Handle search input change
   * @param {Event} e - Input change event
   */
  const handleSearchChange = useCallback((e) => {
    try {
      setSearchQuery(e.target.value)
    } catch (error) {
      console.error('Error updating search query:', error)
    }
  }, [])

  /**
   * Handle tab change
   * @param {string} tab - The tab to switch to
   */
  const handleTabChange = useCallback((tab) => {
    try {
      if (!tab || typeof tab !== 'string') {
        console.error('Invalid tab value:', tab)
        return
      }
      setActiveTab(tab)
    } catch (error) {
      console.error('Error changing tab:', error)
    }
  }, [])

  /**
   * Handle remind button click
   * @param {Object} ballot - The ballot to send reminder for
   */
  const handleRemind = useCallback((ballot) => {
    try {
      console.log('Opening reminder modal for ballot:', ballot.id)
      setSelectedBallot(ballot)
      setIsReminderModalOpen(true)
    } catch (error) {
      console.error('Error opening reminder modal:', error)
      alert('Failed to open reminder modal. Please try again.')
    }
  }, [])

  /**
   * Handle close reminder modal
   */
  const handleCloseReminderModal = useCallback(() => {
    setIsReminderModalOpen(false)
    setSelectedBallot(null)
  }, [])

  /**
   * Handle send reminder
   * @param {Object} reminderData - The reminder data to send
   */
  const handleSendReminder = useCallback((reminderData) => {
    try {
      console.log('Sending reminder:', reminderData)
      // In a real app, this would trigger an API call
      // API call would go here
      
      // Close the reminder modal
      setIsReminderModalOpen(false)
      setSelectedBallot(null)
      
      // Show success toast
      setShowToast(true)
    } catch (error) {
      console.error('Error sending reminder:', error)
      alert('Failed to send reminder. Please try again.')
    }
  }, [])

  /**
   * Handle close toast
   */
  const handleCloseToast = useCallback(() => {
    setShowToast(false)
  }, [])

  /**
   * Handle column sort
   * @param {string} key - The column key to sort by
   */
  const handleSort = useCallback((key) => {
    try {
      setSortConfig(prevConfig => {
        // If clicking the same column, toggle direction
        if (prevConfig.key === key) {
          return {
            key,
            direction: prevConfig.direction === 'asc' ? 'desc' : 'asc'
          }
        }
        // If clicking a new column, set to ascending
        return { key, direction: 'asc' }
      })
    } catch (error) {
      console.error('Error sorting column:', error)
    }
  }, [])

  // ============================================================================
  // FILTERED & COMPUTED DATA
  // ============================================================================

  /**
   * Filter and search ballots based on current filters
   * Memoized to prevent unnecessary recalculations
   */
  const filteredBallots = useMemo(() => {
    try {
      if (!Array.isArray(ballots)) {
        console.error('Ballots is not an array:', ballots)
        return []
      }

      let filtered = [...ballots]

      // Filter by selected corporations
      if (filterCorporation.length > 0) {
        filtered = filtered.filter(ballot => 
          filterCorporation.includes(ballot.corporation)
        )
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        filtered = filtered.filter(ballot =>
          ballot.title?.toLowerCase().includes(query) ||
          ballot.corporation?.toLowerCase().includes(query) ||
          ballot.description?.toLowerCase().includes(query)
        )
      }

      // Filter by active/closed status
      if (activeTab !== 'motions') {
        filtered = filtered.filter(ballot => {
          const isActive = ballot.status?.toLowerCase() === 'active'
          return activeTab === 'active' ? isActive : !isActive
        })
      }

      // Sort ballots based on sortConfig
      if (sortConfig.key) {
        filtered.sort((a, b) => {
          let aValue = a[sortConfig.key]
          let bValue = b[sortConfig.key]

          // Handle different data types
          if (sortConfig.key === 'deadline') {
            // Sort by date
            aValue = new Date(aValue).getTime()
            bValue = new Date(bValue).getTime()
          } else if (sortConfig.key === 'participation') {
            // Sort by number
            aValue = Number(aValue) || 0
            bValue = Number(bValue) || 0
          } else if (sortConfig.key === 'corporation' || sortConfig.key === 'title') {
            // Sort by string
            aValue = String(aValue || '').toLowerCase()
            bValue = String(bValue || '').toLowerCase()
          }

          if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1
          }
          if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1
          }
          return 0
        })
      }

      return filtered
    } catch (error) {
      console.error('Error filtering ballots:', error)
      return []
    }
  }, [ballots, filterCorporation, searchQuery, activeTab, sortConfig])

  /**
   * Format date for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  const formatDate = useCallback((dateString) => {
    try {
      if (!dateString) return 'N/A'
      
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString)
        return 'Invalid date'
      }

      return date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      })
    } catch (error) {
      console.error('Error formatting date:', error)
      return 'Error'
    }
  }, [])

  // ============================================================================
  // RENDER
  // ============================================================================

  // Calculate counts for tabs
  const activeCount = filteredBallots.filter(b => b.status?.toLowerCase() === 'active').length
  const closedCount = filteredBallots.filter(b => b.status?.toLowerCase() !== 'active').length

  return (
    <>
      {/* Ballot Creation Modal */}
      {isModalOpen && (
        <BallotCreationModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal}
          onSubmit={handleBallotSubmit}
        />
      )}

      {/* Reminder Modal */}
      <ReminderModal
        isOpen={isReminderModalOpen}
        onClose={handleCloseReminderModal}
        ballot={selectedBallot}
        onSend={handleSendReminder}
      />

      {/* Toast Notification */}
      {showToast && (
        <Toast
          title="Reminder Sent"
          message="Successfully sent reminder to 0 committee members"
          onClose={handleCloseToast}
        />
      )}
      
      <main className="main-content">
        {/* Page Header */}
        <BallotHeader onCreateBallot={handleOpenModal} />

        {/* Filters Section */}
        <BallotFilters
          filterCorporation={filterCorporation}
          setFilterCorporation={setFilterCorporation}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        {/* Tabs Section */}
        <BallotTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          activeCount={activeCount}
          closedCount={closedCount}
        />

        {/* Content Area */}
        {activeTab === 'motions' ? (
          <MotionsView />
        ) : (
          <BallotTable
            ballots={filteredBallots}
            sortConfig={sortConfig}
            onSort={handleSort}
            onRemind={handleRemind}
            formatDate={formatDate}
          />
        )}
      </main>
    </>
  )
})

export default BallotList
