import { memo } from 'react'

/**
 * Review Component
 * 
 * Fourth step of ballot creation - review all details:
 * - Ballot details summary
 * - Notice giver information
 * - List of motions
 * - Attached files
 * - Final check before publishing
 * 
 * @param {Object} formData - Complete form data
 * @param {Array} motions - Array of motions
 * @param {Array} generalAttachments - Array of attachments
 */
const Review = ({ formData, motions, generalAttachments }) => (
  <div className="step-content">
    <div className="review-page-header">
      <h2 className="review-page-title">Review Ballot</h2>
      <p className="review-page-subtitle">Review all details before publishing</p>
    </div>

    {/* Ballot Details Section */}
    <div className="review-card">
      <h3 className="review-card-title">Ballot Details</h3>
      
      <div className="review-field">
        <label className="review-field-label">Title</label>
        <div className="review-field-value">{formData.title}</div>
      </div>

      <div className="review-field">
        <label className="review-field-label">Description</label>
        <div className="review-field-value">{formData.description}</div>
      </div>

      <div className="review-field-row">
        <div className="review-field">
          <label className="review-field-label">Votes must be submitted by</label>
          <div className="review-field-value">
            {formData.deadlineTime} on {new Date(formData.deadlineDate).toLocaleDateString('en-GB', { 
              day: '2-digit', 
              month: 'short', 
              year: '2-digit' 
            }).toUpperCase()}
          </div>
        </div>
        <div className="review-field">
          <label className="review-field-label">Owners Corporation</label>
          <div className="review-field-value">{formData.corporation}</div>
        </div>
      </div>
    </div>

    {/* Notice Giver Details Section */}
    <div className="review-card">
      <h3 className="review-card-title">Notice Giver Details</h3>
      
      <div className="review-field-inline">
        <span className="review-inline-label">Name:</span>
        <span className="review-inline-value">{formData.personName || 'Not provided'}</span>
      </div>

      <div className="review-field-inline">
        <span className="review-inline-label">Position:</span>
        <span className="review-inline-value">{formData.personPosition || 'Not provided'}</span>
      </div>

      <div className="review-field-inline">
        <span className="review-inline-label">Address:</span>
        <span className="review-inline-value">{formData.personAddress || 'Not provided'}</span>
      </div>

      <div className="review-field-inline">
        <span className="review-inline-label">Contact:</span>
        <span className="review-inline-value">{formData.personContact || 'Not provided'}</span>
      </div>

      {formData.secretaryName && (
        <>
          <div className="review-field-divider"></div>
          <p className="review-alternative-label">Alternatively, return to Secretary via:</p>
          <div className="review-field-inline">
            <span className="review-inline-label">Name:</span>
            <span className="review-inline-value">{formData.secretaryName}</span>
          </div>
        </>
      )}
    </div>

    {/* Motions Section */}
    {motions.length > 0 && (
      <div className="review-card">
        <h3 className="review-card-title">Motions ({motions.length})</h3>
        {motions.map((motion, index) => (
          <div key={motion.id} className="review-motion-item">
            <div className="review-motion-number">{index + 1}. {motion.title}</div>
            <div className="review-motion-desc">The Committee resolve to {motion.description}</div>
            <div className="review-motion-hurdle">Hurdle: {motion.hurdleRate}%</div>
          </div>
        ))}
      </div>
    )}

    {/* Attachments Section */}
    {generalAttachments.length > 0 && (
      <div className="review-card">
        <h3 className="review-card-title">General Attachments ({generalAttachments.length})</h3>
        {generalAttachments.map((file, index) => (
          <div key={index} className="review-attachment-item">
            <span>{file.name}</span>
            <span className="review-attachment-size">{(file.size / 1024).toFixed(2)} KB</span>
          </div>
        ))}
      </div>
    )}
  </div>
)

Review.displayName = 'Review'

export default memo(Review)
