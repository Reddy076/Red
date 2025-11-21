import { useState, useCallback } from 'react'

/**
 * Custom hook for managing file attachments
 * 
 * Handles:
 * - General attachments state
 * - Drag and drop functionality
 * - File upload and removal
 * 
 * @returns {Object} Attachment state and handlers
 */
export const useAttachmentManagement = () => {
  const [generalAttachments, setGeneralAttachments] = useState([])
  const [isDragging, setIsDragging] = useState(false)

  /**
   * Handle file input change
   * @param {Event} e - File input event
   */
  const handleGeneralAttachmentChange = useCallback((e) => {
    try {
      const files = Array.from(e.target.files)
      setGeneralAttachments(prev => [...prev, ...files])
    } catch (error) {
      console.error('Error handling attachment change:', error)
    }
  }, [])

  /**
   * Remove an attachment
   * @param {number} index - Index of attachment to remove
   */
  const handleRemoveGeneralAttachment = useCallback((index) => {
    try {
      if (index < 0 || index >= generalAttachments.length) {
        console.error('Invalid attachment index')
        return
      }
      setGeneralAttachments(prev => prev.filter((_, i) => i !== index))
    } catch (error) {
      console.error('Error removing attachment:', error)
    }
  }, [generalAttachments])

  /**
   * Handle drag over event
   * @param {DragEvent} e - Drag event
   */
  const handleDragOver = useCallback((e) => {
    try {
      e.preventDefault()
      setIsDragging(true)
    } catch (error) {
      console.error('Error handling drag over:', error)
    }
  }, [])

  /**
   * Handle drag leave event
   * @param {DragEvent} e - Drag event
   */
  const handleDragLeave = useCallback((e) => {
    try {
      e.preventDefault()
      setIsDragging(false)
    } catch (error) {
      console.error('Error handling drag leave:', error)
    }
  }, [])

  /**
   * Handle file drop event
   * @param {DragEvent} e - Drop event
   */
  const handleDrop = useCallback((e) => {
    try {
      e.preventDefault()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      setGeneralAttachments(prev => [...prev, ...files])
    } catch (error) {
      console.error('Error handling file drop:', error)
    }
  }, [])

  return {
    generalAttachments,
    isDragging,
    handleGeneralAttachmentChange,
    handleRemoveGeneralAttachment,
    handleDragOver,
    handleDragLeave,
    handleDrop
  }
}
