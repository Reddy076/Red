import { useCallback, memo } from 'react'
import Icon from '../../common/Icon'
import ProgressSteps from './parts/ProgressSteps'
import ModalFooter from './parts/ModalFooter'
import BasicInfo from './steps/BasicInfo'
import Motions from './steps/Motions'
import Attachments from './steps/Attachments'
import Review from './steps/Review'
import { useBallotForm } from '../../../hooks/ballot/useBallotForm'
import { useMotionManagement } from '../../../hooks/ballot/useMotionManagement'
import { useAttachmentManagement } from '../../../hooks/ballot/useAttachmentManagement'
import '../../../styles/BallotCreationModal.css'

/**
 * BallotCreationModal Component (Refactored)
 * 
 * Multi-step modal for creating a new ballot.
 * 
 * Steps:
 * 1. Basic Info - Title, description, deadline, corporation
 * 2. Motions - Add motions for voting
 * 3. Attachments - Upload supporting documents
 * 4. Review - Review all information before publishing
 * 
 * Features:
 * - Step-by-step wizard interface
 * - Form validation
 * - Progress indicator
 * - Draft saving capability
 * - Drag-and-drop file upload
 * - Edit motion functionality
 * 
 * @param {boolean} isOpen - Controls modal visibility
 * @param {Function} onClose - Callback when modal closes
 * @param {Function} onSubmit - Callback when ballot is published
 */
const BallotCreationModal = memo(({ isOpen, onClose, onSubmit }) => {
  // ============================================================================
  // CUSTOM HOOKS
  // ============================================================================
  
  const ballotForm = useBallotForm()
  const motionManager = useMotionManagement()
  const attachmentManager = useAttachmentManagement()

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handle save draft
   */
  const handleSaveDraft = useCallback(() => {
    try {
      console.log('Saving draft...')
      
      const draftData = {
        formData: ballotForm.formData,
        motions: motionManager.motions,
        generalAttachments: attachmentManager.generalAttachments
      }
      
      // In a real app, save to localStorage or backend
      console.log('Draft data:', draftData)
      alert('Draft saved successfully!')
    } catch (error) {
      console.error('Error saving draft:', error)
      alert('Failed to save draft. Please try again.')
    }
  }, [ballotForm.formData, motionManager.motions, attachmentManager.generalAttachments])

  /**
   * Handle final submission
   */
  const handleSubmit = useCallback(() => {
    try {
      // Validate all required data
      if (!motionManager.hasMotions()) {
        alert('Please add at least one motion before publishing.')
        return
      }

      const ballotData = {
        ...ballotForm.formData,
        motions: motionManager.motions,
        attachments: attachmentManager.generalAttachments
      }

      console.log('Submitting ballot:', ballotData)
      onSubmit(ballotData)
      
      // Reset form and close modal
      ballotForm.resetForm()
      onClose()
    } catch (error) {
      console.error('Error submitting ballot:', error)
      alert('An error occurred while publishing the ballot. Please try again.')
    }
  }, [ballotForm, motionManager, attachmentManager, onSubmit, onClose])

  /**
   * Enhanced step validation including motions check
   */
  const isStepValid = useCallback(() => {
    if (ballotForm.currentStep === 2) {
      return motionManager.hasMotions()
    }
    return ballotForm.isStepValid()
  }, [ballotForm, motionManager])

  /**
   * Handle modal close with confirmation if data exists
   */
  const handleClose = useCallback(() => {
    const hasData = ballotForm.formData.title || 
                    ballotForm.formData.description || 
                    motionManager.motions.length > 0

    if (hasData) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to close?')
      if (!confirmed) return
    }

    ballotForm.resetForm()
    onClose()
  }, [ballotForm, motionManager, onClose])

  // ============================================================================
  // RENDER STEP CONTENT
  // ============================================================================

  /**
   * Render current step content
   */
  const renderStepContent = () => {
    try {
      switch (ballotForm.currentStep) {
        case 1:
          return (
            <BasicInfo 
              formData={ballotForm.formData} 
              handleInputChange={ballotForm.handleInputChange} 
              errors={ballotForm.errors} 
            />
          )
        case 2:
          return (
            <Motions
              motions={motionManager.motions}
              newMotion={motionManager.newMotion}
              onMotionInputChange={motionManager.handleMotionInputChange}
              onFileChange={motionManager.handleFileChange}
              onAddMotion={motionManager.handleAddMotion}
              onEditMotion={motionManager.handleEditMotion}
              onRemoveMotion={motionManager.handleRemoveMotion}
            />
          )
        case 3:
          return (
            <Attachments
              generalAttachments={attachmentManager.generalAttachments}
              isDragging={attachmentManager.isDragging}
              onDragOver={attachmentManager.handleDragOver}
              onDragLeave={attachmentManager.handleDragLeave}
              onDrop={attachmentManager.handleDrop}
              onFileChange={attachmentManager.handleGeneralAttachmentChange}
              onRemoveAttachment={attachmentManager.handleRemoveGeneralAttachment}
            />
          )
        case 4:
          return (
            <Review
              formData={ballotForm.formData}
              motions={motionManager.motions}
              generalAttachments={attachmentManager.generalAttachments}
            />
          )
        default:
          console.error('Invalid step:', ballotForm.currentStep)
          return null
      }
    } catch (error) {
      console.error('Error rendering step content:', error)
      return (
        <div className="error-state">
          <p>An error occurred while loading this step. Please try again.</p>
        </div>
      )
    }
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  if (!isOpen) return null

  return (
    <div 
      className="modal-overlay" 
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-text">
            <h2 id="modal-title" className="modal-title">Create Ballot</h2>
            <p className="modal-subtitle">Create a new ballot for member voting</p>
          </div>
          <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
            <Icon name="close" size={24} />
          </button>
        </div>

        {/* Progress Steps */}
        <ProgressSteps currentStep={ballotForm.currentStep} />

        {/* Content */}
        <div className="modal-content">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <ModalFooter
          currentStep={ballotForm.currentStep}
          onBack={ballotForm.handleBack}
          onNext={ballotForm.handleNext}
          onSaveDraft={handleSaveDraft}
          onSubmit={handleSubmit}
          isStepValid={isStepValid()}
        />
      </div>
    </div>
  )
})

BallotCreationModal.displayName = 'BallotCreationModal'

export default BallotCreationModal
