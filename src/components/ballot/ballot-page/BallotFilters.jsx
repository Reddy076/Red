import MultiSelectDropdown from '../../common/MultiSelectDropdown'
import Icon from '../../common/Icon'

/**
 * BallotFilters Component
 * 
 * Handles filtering and searching of ballots.
 * 
 * @param {Array<string>} filterCorporation - Selected corporations to filter by
 * @param {Function} setFilterCorporation - Update corporation filter
 * @param {string} searchQuery - Current search query
 * @param {Function} onSearchChange - Handle search input change
 */
const BallotFilters = ({ 
  filterCorporation, 
  setFilterCorporation, 
  searchQuery, 
  onSearchChange 
}) => {
  return (
    <div className="filters-section">
      <div className="filter-row">
        {/* Multi-select corporation filter */}
        <MultiSelectDropdown 
          selectedCorporations={filterCorporation}
          setSelectedCorporations={setFilterCorporation}
        />

        {/* Search input */}
        <div className="search-box">
          <Icon name="search" size={20} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search ballots..."
            value={searchQuery}
            onChange={onSearchChange}
            aria-label="Search ballots"
          />
        </div>
      </div>
    </div>
  )
}

export default BallotFilters
