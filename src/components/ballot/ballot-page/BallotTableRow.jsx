import { memo, useCallback } from 'react'

/**
 * BallotTableRow Component
 * 
 * Displays a single ballot row in the table.
 * 
 * @param {Object} ballot - Ballot data
 * @param {Function} onRemind - Handle remind button click
 * @param {Function} formatDate - Format date function
 */
const BallotTableRow = memo(({ ballot, onRemind, formatDate }) => {
  /**
   * Handle remind button click
   */
  const handleRemindClick = useCallback(() => {
    try {
      onRemind(ballot)
    } catch (error) {
      console.error('Error handling remind click:', error)
    }
  }, [ballot, onRemind])

  return (
    <tr key={ballot.id}>
      <td>{ballot.corporation || 'N/A'}</td>
      <td>{ballot.title || 'Untitled'}</td>
      <td>
        <span className={`status-badge ${ballot.status?.toLowerCase() === 'active' ? 'status-active' : 'status-closed'}`}>
          {ballot.status || 'Unknown'}
        </span>
      </td>
      <td>
        <div className="participation-cell">
          <div className="participation-header">
            <span className="participation-percentage">
              {ballot.participation ?? 0}%
            </span>
            <span className="participation-count">0/25</span>
          </div>
          <div className="participation-bar">
            <div 
              className="participation-fill" 
              style={{width: `${Math.min(100, Math.max(0, ballot.participation ?? 0))}%`}}
              role="progressbar"
              aria-valuenow={ballot.participation ?? 0}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </td>
      <td>{formatDate(ballot.deadline)}</td>
      <td>
        <button 
          className="action-btn"
          onClick={handleRemindClick}
          aria-label={`Send reminder for ${ballot.title}`}
        >
          Remind
        </button>
      </td>
    </tr>
  )
})

BallotTableRow.displayName = 'BallotTableRow'

export default BallotTableRow
