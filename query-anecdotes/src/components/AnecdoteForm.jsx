import { useMutation, useQueryClient  } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import TextContext from '../TextContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [text, dispatch] = useContext(TextContext)

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch(`anecdote '${newAnecdote.content}' voted`)
    },
    onError: () => {
      dispatch('too short anecdote, must have length 5 or more')
  },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
