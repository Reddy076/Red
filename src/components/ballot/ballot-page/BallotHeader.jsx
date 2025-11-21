import { memo } from 'react'
import Icon from '../../common/Icon'

/**
 * BallotHeader Component
 * 
 * Displays the page header with title and create ballot button.
 * 
 * @param {Function} onCreateBallot - Handle create ballot button click
 */
const BallotHeader = memo(({ onCreateBallot }) => {
  return (
    <div className="content-header">
      <div className="header-row">
        <div className="header-text">
          <h1 className="page-title">All Ballots</h1>
          <p className="page-subtitle">Manage ballots across all Owners Corporations</p>
        </div>
        <button 
          className="create-ballot-btn" 
          onClick={onCreateBallot}
          aria-label="Create new ballot"
        >
          <Icon name="plus" size={20} />
          Create Ballot
        </button>
      </div>
    </div>
  )
})

BallotHeader.displayName = 'BallotHeader'

export default BallotHeader
