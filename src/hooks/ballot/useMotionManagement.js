import { useState, useCallback } from 'react'

/**
 * Custom hook for managing motions in ballot creation
 * 
 * Handles:
 * - Motion list state
 * - New motion form state
 * - Adding, editing, removing motions
 * - Motion attachments
 * 
 * @returns {Object} Motion state and handlers
 */
export const useMotionManagement = () => {
  const [motions, setMotions] = useState([])
  const [newMotion, setNewMotion] = useState({
    title: '',
    description: '',
    hurdleRate: '',
    attachments: []
  })

  /**
   * Handle motion input change
   * @param {Event} e - Input change event
   */
  const handleMotionInputChange = useCallback((e) => {
    try {
      const { name, value } = e.target
      
      if (!name) {
        console.error('Input element missing name attribute')
        return
      }

      setNewMotion(prev => ({ ...prev, [name]: value }))
    } catch (error) {
      console.error('Error handling motion input change:', error)
    }
  }, [])

  /**
   * Handle motion file attachments
   * @param {Event} e - File input change event
   */
  const handleFileChange = useCallback((e) => {
    try {
      const files = Array.from(e.target.files)
      setNewMotion(prev => ({ ...prev, attachments: files }))
    } catch (error) {
      console.error('Error handling file change:', error)
    }
  }, [])

  /**
   * Add a new motion to the list
   */
  const handleAddMotion = useCallback(() => {
    try {
      if (!newMotion.title || !newMotion.description || !newMotion.hurdleRate) {
        alert('Please fill in all motion fields')
        return
      }

      const motion = {
        id: Date.now(),
        title: newMotion.title,
        description: newMotion.description,
        hurdleRate: newMotion.hurdleRate,
        attachments: newMotion.attachments
      }

      setMotions(prev => [...prev, motion])
      
      // Reset form
      setNewMotion({
        title: '',
        description: '',
        hurdleRate: '',
        attachments: []
      })
    } catch (error) {
      console.error('Error adding motion:', error)
    }
  }, [newMotion])

  /**
   * Remove a motion from the list
   * @param {number} id - Motion ID to remove
   */
  const handleRemoveMotion = useCallback((id) => {
    try {
      if (!id) {
        console.error('No motion ID provided')
        return
      }
      setMotions(prev => prev.filter(m => m.id !== id))
    } catch (error) {
      console.error('Error removing motion:', error)
    }
  }, [])

  /**
   * Edit a motion (populate form with motion data)
   * @param {Object} motion - Motion to edit
   */
  const handleEditMotion = useCallback((motion) => {
    try {
      if (!motion || !motion.id) {
        console.error('Invalid motion object')
        return
      }

      // Populate form with motion data
      setNewMotion({
        title: motion.title,
        description: motion.description,
        hurdleRate: motion.hurdleRate,
        attachments: motion.attachments || []
      })

      // Remove the motion from the list (will be re-added when saved)
      setMotions(prev => prev.filter(m => m.id !== motion.id))
    } catch (error) {
      console.error('Error editing motion:', error)
    }
  }, [])

  /**
   * Check if at least one motion exists
   * @returns {boolean}
   */
  const hasMotions = useCallback(() => {
    return motions.length > 0
  }, [motions])

  return {
    motions,
    newMotion,
    handleMotionInputChange,
    handleFileChange,
    handleAddMotion,
    handleRemoveMotion,
    handleEditMotion,
    hasMotions
  }
}
