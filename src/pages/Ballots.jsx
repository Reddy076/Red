import { memo } from 'react'
import BallotList from '../components/ballot/ballot-page/BallotList'

/**
 * Ballots Page Component
 * 
 * Wrapper component for the BallotList
 */
const Ballots = memo(({ ballots, onAddBallot }) => {
  return <BallotList ballots={ballots} onAddBallot={onAddBallot} />
})

Ballots.displayName = 'Ballots'

export default Ballots
