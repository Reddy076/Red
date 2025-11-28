import { BALLOT_STEPS } from '../../../../constants'
import Icon from '../../../common/Icon'

/**
 * ProgressSteps Component
 * 
 * Displays the progress indicator for the ballot creation wizard
 * Shows current step, completed steps, and upcoming steps
 * 
 * @param {number} currentStep - Current active step (1-4)
 */
const ProgressSteps = ({ currentStep }) => (
  <div className="progress-steps">
    {BALLOT_STEPS.map((step, index) => (
      <div key={step.number} className="step-wrapper">
        <div className={`step-item ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
          <div className="step-circle">
            {currentStep > step.number ? (
              <Icon name="check" size={16} strokeWidth={3} />
            ) : (
              step.number
            )}
          </div>
          <div className="step-labels">
            <div className="step-label">{step.label}</div>
            <div className="step-subtitle">{step.subtitle}</div>
          </div>
        </div>
        {index < BALLOT_STEPS.length - 1 && (
          <div className={`step-connector ${currentStep > step.number ? 'completed' : ''}`}></div>
        )}
      </div>
    ))}
  </div>
)

export default ProgressSteps
