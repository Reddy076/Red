import { useState, useCallback, useEffect, useRef, memo } from 'react'
import Icon from '../../common/Icon'
import { useClickOutside } from '../../../hooks/useClickOutside'
import '../../../styles/ReminderModal.css'

/**
 * ReminderModal Component
 * 
 * Modal for sending ballot reminder emails to committee members.
 * 
 * @param {boolean} isOpen - Controls modal visibility
 * @param {Function} onClose - Callback when modal closes
 * @param {Object} ballot - The ballot to send reminder for
 * @param {Function} onSend - Callback when reminder is sent
 */
const ReminderModal = memo(({ isOpen, onClose, ballot, onSend }) => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [template, setTemplate] = useState('Ballot Reminder')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false)

  // ============================================================================
  // REFS
  // ============================================================================

  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, () => {
    if (isTemplateDropdownOpen) {
      setIsTemplateDropdownOpen(false)
    }
  })

  // ============================================================================
  // INITIALIZE DEFAULT VALUES
  // ============================================================================
  
  // Set default values when ballot changes
  useEffect(() => {
    if (ballot) {
      setSubject(`Reminder: Please Vote on ${ballot.title}`)
      setMessage(
`Dear Committee Member,

This is a reminder to cast your vote on the ballot:
${ballot.title}.

Current Status:
- Total Votes: NaN/0
- Deadline: ${ballot.deadline ? new Date(ballot.deadline).toLocaleDateString() : 'N/A'}

Click the link below to view and vote on this ballot:
https://corp-connect-davidvien.replit.app/ballots?ballot=${ballot.id}

Best regards,
Owners Corporation Management`
      )
    }
  }, [ballot])

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Toggle template dropdown
   */
  const toggleTemplateDropdown = useCallback(() => {
    setIsTemplateDropdownOpen(prev => !prev)
  }, [])

  /**
   * Handle template selection
   */
  const handleTemplateSelect = useCallback((selectedTemplate) => {
    setTemplate(selectedTemplate)
    setIsTemplateDropdownOpen(false)
    
    // Update message based on template
    if (ballot) {
      if (selectedTemplate === 'Ballot Reminder') {
        setSubject(`Reminder: Please Vote on ${ballot.title}`)
        setMessage(
`Dear Committee Member,

This is a reminder to cast your vote on the ballot:
${ballot.title}.

Current Status:
- Total Votes: NaN/0
- Deadline: ${ballot.deadline ? new Date(ballot.deadline).toLocaleDateString() : 'N/A'}

Click the link below to view and vote on this ballot:
https://corp-connect-davidvien.replit.app/ballots?ballot=${ballot.id}

Best regards,
Owners Corporation Management`
        )
      } else if (selectedTemplate === 'New Ballot Notification') {
        setSubject(`New Ballot: ${ballot.title}`)
        setMessage(
`Dear Committee Member,

A new ballot has been created and is now available for voting:
${ballot.title}.

Ballot Information:
- Status: ${ballot.status}
- Deadline: ${ballot.deadline ? new Date(ballot.deadline).toLocaleDateString() : 'N/A'}
- Corporation: ${ballot.corporation}

Please review and cast your vote before the deadline.

Click the link below to view and vote on this ballot:
https://corp-connect-davidvien.replit.app/ballots?ballot=${ballot.id}

Best regards,
Owners Corporation Management`
        )
      }
    }
  }, [ballot])

  /**
   * Handle subject change
   */
  const handleSubjectChange = useCallback((e) => {
    setSubject(e.target.value)
  }, [])

  /**
   * Handle message change
   */
  const handleMessageChange = useCallback((e) => {
    setMessage(e.target.value)
  }, [])

  /**
   * Handle send reminder
   */
  const handleSend = useCallback(() => {
    try {
      if (!subject.trim()) {
        alert('Please enter a subject')
        return
      }

      if (!message.trim()) {
        alert('Please enter a message')
        return
      }

      const reminderData = {
        ballotId: ballot.id,
        template,
        subject,
        message
      }

      console.log('Sending reminder:', reminderData)
      
      if (onSend) {
        onSend(reminderData)
      }
    } catch (error) {
      console.error('Error sending reminder:', error)
      alert('Failed to send reminder. Please try again.')
    }
  }, [ballot, template, subject, message, onSend, onClose])

  /**
   * Handle modal close
   */
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  /**
   * Handle cancel
   */
  const handleCancel = useCallback(() => {
    onClose()
  }, [onClose])

  // ============================================================================
  // RENDER
  // ============================================================================

  if (!isOpen || !ballot) return null

  return (
    <div 
      className="modal-overlay" 
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reminder-modal-title"
    >
      <div className="reminder-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="reminder-modal-header">
          <div className="reminder-modal-header-content">
            <Icon name="mail" size={24} />
            <div className="reminder-modal-title-wrapper">
              <h2 id="reminder-modal-title" className="reminder-modal-title">
                Send Ballot Reminder
              </h2>
              <p className="reminder-modal-description">
                Send a reminder email to all committee members about this ballot
              </p>
            </div>
          </div>
          <button 
            className="reminder-modal-close-btn" 
            onClick={handleClose} 
            aria-label="Close modal"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Info Box */}
        <div className="reminder-info-box">
          <Icon name="info" size={20} />
          <span>This email will be sent to all committee members of {ballot.corporation}</span>
        </div>

        {/* Content */}
        <div className="reminder-modal-content">
          {/* Template Selection */}
          <div className="form-group">
            <label htmlFor="template-select" className="form-label">
              Select Template
            </label>
            <div className="custom-select-container" ref={dropdownRef}>
              <button
                type="button"
                id="template-select"
                className="custom-select-button"
                onClick={toggleTemplateDropdown}
                aria-expanded={isTemplateDropdownOpen}
                data-testid="select-template"
              >
                <span className="custom-select-value">{template}</span>
                <Icon name="chevronDown" size={16} className="custom-select-icon" />
              </button>
              {isTemplateDropdownOpen && (
                <div className="custom-select-dropdown">
                  <button
                    type="button"
                    className={`custom-select-option ${template === 'Ballot Reminder' ? 'selected' : ''}`}
                    onClick={() => handleTemplateSelect('Ballot Reminder')}
                  >
                    <span className="select-check-container">
                      {template === 'Ballot Reminder' && (
                        <Icon name="check" size={16} className="select-check-icon" />
                      )}
                    </span>
                    <span>Ballot Reminder</span>
                  </button>
                  <button
                    type="button"
                    className={`custom-select-option ${template === 'New Ballot Notification' ? 'selected' : ''}`}
                    onClick={() => handleTemplateSelect('New Ballot Notification')}
                  >
                    <span className="select-check-container">
                      {template === 'New Ballot Notification' && (
                        <Icon name="check" size={16} className="select-check-icon" />
                      )}
                    </span>
                    <span>New Ballot Notification</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Subject */}
          <div className="form-group">
            <label htmlFor="subject-input" className="form-label">Subject</label>
            <input
              id="subject-input"
              type="text"
              value={subject}
              onChange={handleSubjectChange}
              className="reminder-input"
              placeholder="Enter email subject"
            />
          </div>

          {/* Message */}
          <div className="form-group">
            <label htmlFor="message-textarea" className="form-label">Message</label>
            <textarea
              id="message-textarea"
              value={message}
              onChange={handleMessageChange}
              className="reminder-textarea"
              placeholder="Enter email message"
              rows={10}
            />
          </div>

          {/* Ballot Details */}
          <div className="ballot-details-section">
            <h3>Ballot Details:</h3>
            <ul>
              <li><strong>Title:</strong> {ballot.title}</li>
              <li><strong>Deadline:</strong> {ballot.deadline ? new Date(ballot.deadline).toLocaleDateString() : 'N/A'}</li>
              <li><strong>Current Participation:</strong> {ballot.participation ?? 'NaN'}/undefined</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="reminder-modal-footer">
          <button 
            className="reminder-cancel-btn" 
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button 
            className="reminder-send-btn" 
            onClick={handleSend}
          >
            Send Reminder
          </button>
        </div>
      </div>
    </div>
  )
})

ReminderModal.displayName = 'ReminderModal'

export default ReminderModal
