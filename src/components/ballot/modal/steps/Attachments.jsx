import { memo } from 'react'
import Icon from '../../../common/Icon'

/**
 * Attachments Component
 * 
 * Third step of ballot creation - attach general documents:
 * - Drag and drop file upload
 * - Browse for files
 * - View uploaded files with size
 * - Remove attachments
 * - Optional step
 * 
 * @param {Array} generalAttachments - Array of uploaded files
 * @param {boolean} isDragging - Drag state indicator
 * @param {Function} onDragOver - Drag over handler
 * @param {Function} onDragLeave - Drag leave handler
 * @param {Function} onDrop - Drop handler
 * @param {Function} onFileChange - File input change handler
 * @param {Function} onRemoveAttachment - Remove attachment handler
 */
const Attachments = ({ 
  generalAttachments, 
  isDragging, 
  onDragOver, 
  onDragLeave, 
  onDrop, 
  onFileChange, 
  onRemoveAttachment 
}) => (
  <div className="step-content">
    <div className="attachments-header">
      <h2 className="attachments-title">General Attachments</h2>
      <p className="attachments-description">Upload documents relevant to the entire ballot (optional)</p>
    </div>

    <div 
      className={`file-drop-zone ${isDragging ? 'dragging' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="file-drop-icon">
        <Icon name="fileUpload" size={48} strokeWidth={1.5} />
      </div>
      <p className="file-drop-text">Drag and drop files here, or click to browse</p>
      <label htmlFor="generalAttachments" className="file-drop-button">
        Choose Files
      </label>
      <input
        type="file"
        id="generalAttachments"
        className="file-input-hidden"
        multiple
        onChange={onFileChange}
      />
    </div>

    {generalAttachments.length > 0 && (
      <div className="attachments-list">
        <h3 className="attachments-list-title">Uploaded Files ({generalAttachments.length})</h3>
        {generalAttachments.map((file, index) => (
          <div key={index} className="attachment-item">
            <div className="attachment-info">
              <Icon name="file" size={20} className="attachment-icon" />
              <div className="attachment-details">
                <span className="attachment-name">{file.name}</span>
                <span className="attachment-size">{(file.size / 1024).toFixed(2)} KB</span>
              </div>
            </div>
            <button 
              className="attachment-remove-btn"
              onClick={() => onRemoveAttachment(index)}
              aria-label="Remove attachment"
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
)

Attachments.displayName = 'Attachments'

export default memo(Attachments)
