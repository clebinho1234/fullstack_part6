import { useReducer } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import TextContext from './TextContext'

const textReducer = (state, action) => {
  return action
}

const App = () => {
  const [text, textDispatch] = useReducer(textReducer, '')
  return (
    <TextContext.Provider value={[text,textDispatch]}>
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList />
      </div>
    </TextContext.Provider>
  )
}

export default App
