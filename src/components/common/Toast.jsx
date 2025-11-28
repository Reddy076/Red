import { memo, useEffect } from 'react'
import '../../styles/Toast.css'

/**
 * Toast Component
 * 
 * Displays a toast notification that auto-dismisses after a delay.
 * 
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {Function} onClose - Callback when toast closes
 * @param {number} duration - Auto-dismiss duration in milliseconds (default: 3000)
 */
const Toast = memo(({ title, message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose()
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className="toast-container">
      <div className="toast">
        <div className="toast-content">
          <h3 className="toast-title">{title}</h3>
          <p className="toast-message">{message}</p>
        </div>
      </div>
    </div>
  )
})

Toast.displayName = 'Toast'

export default Toast
