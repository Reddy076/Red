import { useState, useCallback } from 'react'
import { DEFAULT_CORPORATION } from '../../constants'

/**
 * Custom hook for managing ballot form state and validation
 * 
 * Handles:
 * - Form data state
 * - Input change handlers
 * - Form validation
 * - Step navigation
 * 
 * @returns {Object} Form state and handlers
 */
export const useBallotForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadlineDate: '',
    deadlineTime: '05:00 PM',
    corporation: DEFAULT_CORPORATION,
    personName: '',
    personPosition: '',
    personAddress: '',
    personContact: '',
    secretaryName: ''
  })
  const [errors, setErrors] = useState({})

  /**
   * Handle form input change
   * @param {Event} e - Input change event
   */
  const handleInputChange = useCallback((e) => {
    try {
      const { name, value } = e.target
      
      if (!name) {
        console.error('Input element missing name attribute')
        return
      }

      setFormData(prev => ({ ...prev, [name]: value }))
      
      // Clear error for this field if it exists
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: undefined }))
      }
    } catch (error) {
      console.error('Error handling input change:', error)
    }
  }, [errors])

  /**
   * Validate current step
   * @returns {boolean} Whether step is valid
   */
  const isStepValid = useCallback(() => {
    try {
      switch (currentStep) {
        case 1:
          return !!(formData.title && formData.description)
        case 2:
          // Validation handled by motion management hook
          return true
        case 3:
          // Attachments are optional
          return true
        case 4:
          // Review step, always valid
          return true
        default:
          return false
      }
    } catch (error) {
      console.error('Error validating step:', error)
      return false
    }
  }, [currentStep, formData])

  /**
   * Go to next step
   */
  const handleNext = useCallback(() => {
    try {
      if (isStepValid() && currentStep < 4) {
        setCurrentStep(prev => prev + 1)
      }
    } catch (error) {
      console.error('Error proceeding to next step:', error)
    }
  }, [currentStep, isStepValid])

  /**
   * Go to previous step
   */
  const handleBack = useCallback(() => {
    try {
      if (currentStep > 1) {
        setCurrentStep(prev => prev - 1)
      }
    } catch (error) {
      console.error('Error going back:', error)
    }
  }, [currentStep])

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setCurrentStep(1)
    setFormData({
      title: '',
      description: '',
      deadlineDate: '',
      deadlineTime: '05:00 PM',
      corporation: DEFAULT_CORPORATION,
      personName: '',
      personPosition: '',
      personAddress: '',
      personContact: '',
      secretaryName: ''
    })
    setErrors({})
  }, [])

  return {
    currentStep,
    formData,
    errors,
    handleInputChange,
    isStepValid,
    handleNext,
    handleBack,
    resetForm
  }
}
