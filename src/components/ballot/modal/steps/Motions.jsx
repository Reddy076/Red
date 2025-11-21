import { memo } from 'react'
import Icon from '../../../common/Icon'
import MotionCard from '../parts/MotionCard'

/**
 * Motions Component
 * 
 * Second step of ballot creation - manage motions:
 * - Add new motions with title, description, and hurdle rate
 * - Attach files to motions
 * - View, edit, and remove existing motions
 * - Requires at least one motion to proceed
 * 
 * @param {Array} motions - Array of added motions
 * @param {Object} newMotion - Current motion being added
 * @param {Function} onMotionInputChange - Motion input change handler
 * @param {Function} onFileChange - File input change handler
 * @param {Function} onAddMotion - Add motion handler
 * @param {Function} onEditMotion - Edit motion handler
 * @param {Function} onRemoveMotion - Remove motion handler
 */
const Motions = ({ 
  motions, 
  newMotion, 
  onMotionInputChange, 
  onFileChange, 
  onAddMotion, 
  onEditMotion, 
  onRemoveMotion 
}) => (
  <div className="step-content">
    <div className="motions-header">
      <h2 className="motions-title">Add Motions</h2>
      <p className="motions-description">Add at least one motion for members to vote on</p>
    </div>

    <div className="motion-form-wrapper">
      <h3 className="motion-form-title">New Motion</h3>

      <div className="form-group">
        <label htmlFor="motionTitle" className="form-label">Motion Title</label>
        <input
          type="text"
          id="motionTitle"
          name="title"
          className="form-input"
          placeholder="e.g., Approve Annual Budget 2025"
          value={newMotion.title}
          onChange={onMotionInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="motionDescription" className="form-label">Motion Description</label>
        <div className="motion-description-label">The Committee resolve to</div>
        <textarea
          id="motionDescription"
          name="description"
          className="form-textarea"
          placeholder="approve the maintenance budget for the upcoming year..."
          rows="4"
          value={newMotion.description}
          onChange={onMotionInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="hurdleRate" className="form-label">Hurdle Rate (%)</label>
        <input
          type="number"
          id="hurdleRate"
          name="hurdleRate"
          className="form-input"
          placeholder="50"
          min="0"
          max="100"
          value={newMotion.hurdleRate}
          onChange={onMotionInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="motionAttachments" className="form-label">Motion Attachments (Optional)</label>
        <input
          type="file"
          id="motionAttachments"
          name="attachments"
          className="form-file-input"
          multiple
          onChange={onFileChange}
        />
      </div>

      <div className="motion-form-actions">
        <button className="btn-primary" onClick={onAddMotion}>
          <Icon name="plus" size={16} />
          Add Motion
        </button>
      </div>
    </div>

    {motions.length > 0 ? (
      <>
        <h3 className="added-motions-title">Added Motions ({motions.length})</h3>
        <div className="motions-list">
          {motions.map((motion, index) => (
            <MotionCard 
              key={motion.id}
              motion={motion}
              index={index}
              onEdit={onEditMotion}
              onRemove={onRemoveMotion}
            />
          ))}
        </div>
      </>
    ) : (
      <div className="motions-empty-message">
        <p>No motions added yet. Add at least one motion to continue.</p>
      </div>
    )}
  </div>
)

Motions.displayName = 'Motions'

export default memo(Motions)
