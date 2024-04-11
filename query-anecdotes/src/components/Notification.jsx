import { useContext, useEffect, useRef } from 'react'
import TextContext from '../TextContext'

const Notification = () => {
  const [text, dispatch] = useContext(TextContext)
  const notificationTimerRef = useRef(null)

  useEffect(() => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current)
    }

    notificationTimerRef.current = setTimeout(() => {
      dispatch('')
    }, 5000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: text ? '' : 'none'
  }

  return (
    <div style={style}>
      {text}
    </div>
  )
}

export default Notification