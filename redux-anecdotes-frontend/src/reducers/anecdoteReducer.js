import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state
              .map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)
              .sort((a, b) => b.votes - a.votes)   
    }
  },
})

export const { setAnecdotes, addAnecdote, voteAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes.sort((a, b) => b.votes - a.votes)))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const updateVote = anecdote => {
  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  return async dispatch => {
    await anecdoteService.update(updatedAnecdote)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer