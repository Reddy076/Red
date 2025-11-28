import Icon from '../../../common/Icon'

/**
 * ModalFooter Component
 * 
 * Footer section of the ballot creation modal with navigation buttons
 * 
 * @param {number} currentStep - Current step number
 * @param {Function} onBack - Back button handler
 * @param {Function} onNext - Next button handler
 * @param {Function} onSaveDraft - Save draft handler
 * @param {Function} onSubmit - Submit/Publish handler
 * @param {boolean} isStepValid - Whether current step is valid
 */
const ModalFooter = ({ 
  currentStep, 
  onBack, 
  onNext, 
  onSaveDraft, 
  onSubmit, 
  isStepValid 
}) => (
  <div className="modal-footer">
    <button className="btn-text" onClick={onSaveDraft}>
      Save Draft
    </button>
    <div className="footer-actions">
      {currentStep > 1 && (
        <button className="btn-secondary" onClick={onBack}>
          Back
        </button>
      )}
      {currentStep < 4 ? (
        <button 
          className="btn-primary" 
          onClick={onNext}
          disabled={!isStepValid}
        >
          Next
          <Icon name="chevronRight" size={16} />
        </button>
      ) : (
        <button className="btn-primary" onClick={onSubmit}>
          Publish Ballot
        </button>
      )}
    </div>
  </div>
)

export default ModalFooter
