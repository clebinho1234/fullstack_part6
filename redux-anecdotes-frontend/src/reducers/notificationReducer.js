import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
      setNotificationText(state, action) {
        return action.payload
      },
      clearNotification() {
        return ''
      }
    },
  })

  export const { setNotificationText, clearNotification } = notificationSlice.actions
  
  let notificationTimer = null
  
  export const setNotification = (text, timer) => {
    return dispatch => {
      if (notificationTimer) {
        clearTimeout(notificationTimer)
      }

      dispatch(setNotificationText(`${text}`))
      notificationTimer = setTimeout(() => {
        dispatch(clearNotification())
      }, timer*1000)
    }
  }
  
  export default notificationSlice.reducer