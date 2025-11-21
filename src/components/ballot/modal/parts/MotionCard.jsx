import { memo } from 'react'
import Icon from '../../../common/Icon'

/**
 * MotionCard Component
 * 
 * Displays a single motion card with:
 * - Motion title and description
 * - Hurdle rate
 * - Attachment count
 * - Edit and remove actions
 * 
 * @param {Object} motion - Motion object
 * @param {number} index - Motion index
 * @param {Function} onEdit - Edit handler
 * @param {Function} onRemove - Remove handler
 */
const MotionCard = ({ motion, index, onEdit, onRemove }) => (
  <div className="motion-card">
    <div className="motion-card-header">
      <h4 className="motion-card-title">{motion.title}</h4>
      <div className="motion-card-actions">
        <button 
          className="motion-edit-btn"
          onClick={() => onEdit(motion)}
          title="Edit"
        >
          Edit
        </button>
        <button 
          className="motion-remove-btn"
          onClick={() => onRemove(motion.id)}
          title="Delete"
          aria-label="Delete motion"
        >
          <Icon name="close" size={16} />
        </button>
      </div>
    </div>
    <p className="motion-card-description">The Committee resolve to {motion.description}</p>
    <div className="motion-card-meta">
      <span className="motion-meta-item">Hurdle: {motion.hurdleRate}%</span>
      {motion.attachments.length > 0 && (
        <span className="motion-meta-item">{motion.attachments.length} file(s) attached</span>
      )}
    </div>
  </div>
)

MotionCard.displayName = 'MotionCard'

export default memo(MotionCard)
