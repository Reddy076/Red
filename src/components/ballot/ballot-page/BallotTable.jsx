import { memo } from 'react'
import Icon from '../../common/Icon'
import BallotTableRow from './BallotTableRow'

/**
 * BallotTable Component
 * 
 * Displays the ballot table with sortable columns.
 * 
 * @param {Array<Object>} ballots - Array of ballot objects to display
 * @param {Object} sortConfig - Current sort configuration {key, direction}
 * @param {Function} onSort - Handle column sort
 * @param {Function} onRemind - Handle remind button click
 * @param {Function} formatDate - Format date function
 */
const BallotTable = memo(({ 
  ballots, 
  sortConfig, 
  onSort, 
  onRemind, 
  formatDate 
}) => {
  return (
    <div className="relative w-full overflow-auto">
      <table className="ballots-table" role="table" aria-label="Ballots table">
        <thead>
          <tr>
            <th className="th-sortable" style={{width: '220px'}} onClick={() => onSort('corporation')}>
              <div className="th-content">
                <span>Corporation</span>
                <Icon 
                  name="sort" 
                  size={24} 
                  className={`sort-icon ${sortConfig.key === 'corporation' ? 'sort-active' : ''}`}
                />
              </div>
            </th>
            <th className="th-sortable" style={{width: '280px'}} onClick={() => onSort('title')}>
              <div className="th-content">
                <span>Title</span>
                <Icon 
                  name="sort" 
                  size={24} 
                  className={`sort-icon ${sortConfig.key === 'title' ? 'sort-active' : ''}`}
                />
              </div>
            </th>
            <th style={{width: '120px'}}>Status</th>
            <th className="th-sortable" style={{width: '200px'}} onClick={() => onSort('participation')}>
              <div className="th-content">
                <span>Participation</span>
                <Icon 
                  name="sort" 
                  size={24} 
                  className={`sort-icon ${sortConfig.key === 'participation' ? 'sort-active' : ''}`}
                />
              </div>
            </th>
            <th className="th-sortable" style={{width: '140px'}} onClick={() => onSort('deadline')}>
              <div className="th-content">
                <span>Deadline</span>
                <Icon 
                  name="sort" 
                  size={24} 
                  className={`sort-icon ${sortConfig.key === 'deadline' ? 'sort-active' : ''}`}
                />
              </div>
            </th>
            <th style={{width: '100px'}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {ballots.map((ballot) => (
            <BallotTableRow
              key={ballot.id}
              ballot={ballot}
              onRemind={onRemind}
              formatDate={formatDate}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
})

BallotTable.displayName = 'BallotTable'

export default BallotTable
