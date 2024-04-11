import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../requests'
import { useContext } from 'react'
import TextContext from '../TextContext'

const AnecdoteList = () => {
    const queryClient = useQueryClient()
    const [text, dispatch] = useContext(TextContext)

    const updateAnecdoteMutation = useMutation({ 
        mutationFn: updateAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            const updatedAnecdotes = anecdotes.map(anecdote => 
                anecdote.id !== newAnecdote.id ? anecdote : newAnecdote
            )
            queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
            dispatch(`anecdote '${newAnecdote.content}' voted`)
        },
    })

    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes
    })
    console.log(JSON.parse(JSON.stringify(result)))

    if ( result.isLoading ) {
        return <div>loading data...</div>
    }

    const anecdotes = result.data

    return (
        <div>
          {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
            </div>
      )}
        </div>
      )
}

export default AnecdoteList