import { memo } from 'react'
import { CORPORATIONS } from '../../../../constants'

/**
 * BasicInfo Component
 * 
 * First step of ballot creation - collects basic information:
 * - Ballot title and description
 * - Voting deadline (date and time)
 * - Corporation selection
 * - Notice giver details
 * - Secretary information
 * 
 * @param {Object} formData - Form data object
 * @param {Function} handleInputChange - Input change handler
 * @param {Object} errors - Validation errors object
 */
const BasicInfo = ({ formData, handleInputChange, errors }) => (
  <div className="step-content">
    <div className="form-group">
      <label htmlFor="title" className="form-label">Ballot Title</label>
      <input
        type="text"
        id="title"
        name="title"
        className={`form-input ${errors.title ? 'error' : ''}`}
        placeholder="e.g., Annual Budget 2025"
        value={formData.title}
        onChange={handleInputChange}
      />
      {errors.title && <p className="error-message">{errors.title}</p>}
    </div>

    <div className="form-group">
      <label htmlFor="description" className="form-label">Description</label>
      <textarea
        id="description"
        name="description"
        className={`form-textarea ${errors.description ? 'error' : ''}`}
        placeholder="Describe the purpose of this ballot..."
        rows="4"
        value={formData.description}
        onChange={handleInputChange}
      />
      {errors.description && <p className="error-message">{errors.description}</p>}
    </div>

    <div className="form-row">
      <div className="form-group">
        <label htmlFor="deadlineDate" className="form-label">Voting Deadline (Date)</label>
        <input
          type="date"
          id="deadlineDate"
          name="deadlineDate"
          className="form-input"
          value={formData.deadlineDate}
          onChange={handleInputChange}
        />
        <p className="form-hint">Must be at least 14 days from today</p>
      </div>

      <div className="form-group">
        <label htmlFor="deadlineTime" className="form-label">Voting Deadline (Time)</label>
        <input
          type="time"
          id="deadlineTime"
          name="deadlineTime"
          className="form-input"
          value={formData.deadlineTime}
          onChange={handleInputChange}
        />
      </div>
    </div>

    <div className="form-group">
      <label htmlFor="corporation" className="form-label">Owners Corporation</label>
      <select
        id="corporation"
        name="corporation"
        className="form-select"
        value={formData.corporation}
        onChange={handleInputChange}
      >
        {CORPORATIONS.map(corp => (
          <option key={corp} value={corp}>{corp}</option>
        ))}
      </select>
    </div>

    <div className="form-section">
      <h3 className="section-title">Details of Person Giving This Notice</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="personName" className="form-label">Name</label>
          <input
            type="text"
            id="personName"
            name="personName"
            className="form-input"
            placeholder="Dasthagiri"
            value={formData.personName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="personPosition" className="form-label">Position</label>
          <input
            type="text"
            id="personPosition"
            name="personPosition"
            className="form-input"
            placeholder="Owners Corporation Manager"
            value={formData.personPosition}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="personAddress" className="form-label">Address</label>
          <input
            type="text"
            id="personAddress"
            name="personAddress"
            className="form-input"
            placeholder="Kadapa"
            value={formData.personAddress}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="personContact" className="form-label">Contact Number</label>
          <input
            type="tel"
            id="personContact"
            name="personContact"
            className="form-input"
            placeholder="9999999999"
            value={formData.personContact}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>

    <div className="form-section">
      <h3 className="section-title">Alternative Return Via Secretary</h3>
      <div className="form-group">
        <label htmlFor="secretaryName" className="form-label">Secretary Name</label>
        <input
          type="text"
          id="secretaryName"
          name="secretaryName"
          className="form-input"
          placeholder="Dasthagiri"
          value={formData.secretaryName}
          onChange={handleInputChange}
        />
      </div>
    </div>
  </div>
)

BasicInfo.displayName = 'BasicInfo'

export default memo(BasicInfo)
