import { useState, useRef, memo } from 'react'
import Icon from '../components/common/Icon'
import { useClickOutside } from '../hooks/useClickOutside'
import '../styles/KeyDatesView.css'

/**
 * KeyDatesView Component
 * 
 * Displays all key dates across corporations with filtering options
 */
const KeyDatesView = memo(() => {
  const [selectedCorporations, setSelectedCorporations] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([])
  const [isCorpDropdownOpen, setIsCorpDropdownOpen] = useState(false)
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false)
  const [corpSearchQuery, setCorpSearchQuery] = useState('')
  const [typeSearchQuery, setTypeSearchQuery] = useState('')
  
  const corpDropdownRef = useRef(null)
  const typeDropdownRef = useRef(null)
  
  useClickOutside(corpDropdownRef, () => {
    setIsCorpDropdownOpen(false)
    setCorpSearchQuery('')
  })
  useClickOutside(typeDropdownRef, () => {
    setIsTypeDropdownOpen(false)
    setTypeSearchQuery('')
  })

  // Mock data for key dates
  const keyDates = [
    {
      id: 1,
      corporation: 'Riverside Towers OC',
      event: 'Annual General Meeting',
      date: 'June 15, 2025',
      time: '6:00 PM',
      location: 'Community Hall',
      type: 'AGM',
      typeColor: 'purple'
    },
    {
      id: 2,
      corporation: 'Parkview Gardens OC',
      event: 'Committee Meeting',
      date: 'April 20, 2025',
      time: '7:00 PM',
      location: 'Online via Zoom',
      type: 'Committee Meeting',
      typeColor: 'blue'
    },
    {
      id: 3,
      corporation: 'Harbour View Estate OC',
      event: 'Financial Year End',
      date: 'June 30, 2025',
      time: '-',
      location: '-',
      type: 'Financial',
      typeColor: 'green'
    },
    {
      id: 4,
      corporation: 'Sunset Apartments OC',
      event: 'Quarterly Review Meeting',
      date: 'May 10, 2025',
      time: '6:30 PM',
      location: 'Building Lobby',
      type: 'Committee Meeting',
      typeColor: 'blue'
    },
    {
      id: 5,
      corporation: 'Green Valley OC',
      event: 'Annual General Meeting',
      date: 'July 8, 2025',
      time: '5:30 PM',
      location: 'Recreation Center',
      type: 'AGM',
      typeColor: 'purple'
    },
    {
      id: 6,
      corporation: 'Riverside Towers OC',
      event: 'Levy Payment Due',
      date: 'March 31, 2025',
      time: '-',
      location: '-',
      type: 'Financial',
      typeColor: 'green'
    }
  ]

  const filteredDates = keyDates.filter(date => {
    const corpMatch = selectedCorporations.length === 0 || selectedCorporations.includes(date.corporation)
    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(date.type)
    return corpMatch && typeMatch
  })

  const allCorporations = [
    'Riverside Towers OC',
    'Parkview Gardens OC',
    'Harbour View Estate OC',
    'Sunset Apartments OC',
    'Green Valley OC'
  ]

  const allTypes = [
    'AGM',
    'Committee Meeting',
    'Financial',
    'Other'
  ]

  const filteredCorporations = allCorporations.filter(corp =>
    corp.toLowerCase().includes(corpSearchQuery.toLowerCase())
  )

  const filteredTypes = allTypes.filter(type =>
    type.toLowerCase().includes(typeSearchQuery.toLowerCase())
  )

  const toggleCorporation = (corp) => {
    if (selectedCorporations.includes(corp)) {
      setSelectedCorporations(selectedCorporations.filter(c => c !== corp))
    } else {
      setSelectedCorporations([...selectedCorporations, corp])
    }
  }

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const clearCorporations = () => setSelectedCorporations([])
  const clearTypes = () => setSelectedTypes([])

  return (
    <div className="key-dates-view">
      {/* Filters */}
      <div className="key-dates-filters">
        {/* Corporation Dropdown */}
        <div className="custom-dropdown-container" ref={corpDropdownRef}>
          <button
            className="custom-dropdown-trigger"
            onClick={() => setIsCorpDropdownOpen(!isCorpDropdownOpen)}
          >
            <div className="selected-tags">
              {selectedCorporations.length === 0 ? (
                <span className="placeholder">All Corporations</span>
              ) : selectedCorporations.length === 1 ? (
                selectedCorporations.map(corp => (
                  <div key={corp} className="selected-tag">
                    <span>{corp}</span>
                    <button
                      className="remove-tag"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleCorporation(corp)
                      }}
                      aria-label={`Remove ${corp}`}
                    >
                      <Icon name="close" size={14} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="selection-counter">
                  {selectedCorporations.length} Selected
                </div>
              )}
            </div>
            
            {/* Control Buttons */}
            <div className="dropdown-controls">
              {selectedCorporations.length > 0 && (
                <button 
                  className="clear-all" 
                  onClick={(e) => {
                    e.stopPropagation()
                    clearCorporations()
                  }}
                  aria-label="Clear all selections"
                >
                  <Icon name="close" size={16} />
                </button>
              )}
              <Icon name="chevronDown" size={16} className="chevron-icon" />
            </div>
          </button>
          {isCorpDropdownOpen && (
            <div className="custom-dropdown-menu">
              {/* Search Input */}
              <div className="dropdown-search">
                <Icon name="search" size={16} className="search-icon" />
                <input
                  type="text"
                  className="dropdown-search-input"
                  placeholder="Search..."
                  value={corpSearchQuery}
                  onChange={(e) => setCorpSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Options */}
              <div className="dropdown-options-list">
                {filteredCorporations.length > 0 ? (
                  filteredCorporations.map((corp, index) => {
                    const isSelected = selectedCorporations.includes(corp)
                    return (
                      <label key={index} className="dropdown-option">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleCorporation(corp)}
                          className="checkbox-input"
                          aria-label={corp}
                        />
                        <div className="checkbox-custom">
                          {isSelected && (
                            <Icon name="check" size={12} strokeWidth={3} />
                          )}
                        </div>
                        <span className="option-label">{corp}</span>
                      </label>
                    )
                  })
                ) : (
                  <div className="no-results">No corporations found</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Type Dropdown */}
        <div className="custom-dropdown-container" ref={typeDropdownRef}>
          <button
            className="custom-dropdown-trigger"
            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
          >
            <div className="selected-tags">
              {selectedTypes.length === 0 ? (
                <span className="placeholder">All Types</span>
              ) : selectedTypes.length === 1 ? (
                selectedTypes.map(type => (
                  <div key={type} className="selected-tag">
                    <span>{type}</span>
                    <button
                      className="remove-tag"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleType(type)
                      }}
                      aria-label={`Remove ${type}`}
                    >
                      <Icon name="close" size={14} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="selection-counter">
                  {selectedTypes.length} Selected
                </div>
              )}
            </div>
            
            {/* Control Buttons */}
            <div className="dropdown-controls">
              {selectedTypes.length > 0 && (
                <button 
                  className="clear-all" 
                  onClick={(e) => {
                    e.stopPropagation()
                    clearTypes()
                  }}
                  aria-label="Clear all selections"
                >
                  <Icon name="close" size={16} />
                </button>
              )}
              <Icon name="chevronDown" size={16} className="chevron-icon" />
            </div>
          </button>
          {isTypeDropdownOpen && (
            <div className="custom-dropdown-menu">
              {/* Search Input */}
              <div className="dropdown-search">
                <Icon name="search" size={16} className="search-icon" />
                <input
                  type="text"
                  className="dropdown-search-input"
                  placeholder="Search..."
                  value={typeSearchQuery}
                  onChange={(e) => setTypeSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Options */}
              <div className="dropdown-options-list">
                {filteredTypes.length > 0 ? (
                  filteredTypes.map((type, index) => {
                    const isSelected = selectedTypes.includes(type)
                    return (
                      <label key={index} className="dropdown-option">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleType(type)}
                          className="checkbox-input"
                          aria-label={type}
                        />
                        <div className="checkbox-custom">
                          {isSelected && (
                            <Icon name="check" size={12} strokeWidth={3} />
                          )}
                        </div>
                        <span className="option-label">{type}</span>
                      </label>
                    )
                  })
                ) : (
                  <div className="no-results">No types found</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="key-dates-table-container">
        <table className="key-dates-table">
          <thead>
            <tr>
              <th>Corporation</th>
              <th>Event</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredDates.map((date) => (
              <tr key={date.id}>
                <td className="corp-name">{date.corporation}</td>
                <td>
                  <div className="event-cell">
                    <svg className="calendar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    <span>{date.event}</span>
                  </div>
                </td>
                <td>{date.date}</td>
                <td className="time-text">{date.time}</td>
                <td className="location-text">{date.location}</td>
                <td>
                  <span className={`type-badge type-${date.typeColor}`}>{date.type}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})

KeyDatesView.displayName = 'KeyDatesView'

export default KeyDatesView
