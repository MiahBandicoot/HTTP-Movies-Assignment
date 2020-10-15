import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useHistory} from 'react-router-dom'


 
const initial = {
    title:'',
    director:'',
    metascore:'',
    stars:[]

}

const EditForm = (props) => {
    const [data, setData] = useState(initial)
    const {movieList, setMovieList} = props
    const {id} = useParams()
    const history = useHistory()

    const handleC = (event) => {
        event.preventDefault()
        setData({
            ...data,
            [event.target.name]:event.target.value
        })
    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setData(res.data)
            console.log(res)
        })
    },[id])

    const Submit = (props) => {
        axios.put(`http://localhost:5000/api/movies/${id}`, data)
        .then(res => {
            console.log(res)
            const newMovie = movieList.map(movie => {
                if (movie.id === res.data.id){
                    return res.data
                }
                else {
                    return movie
                }
            })
            setMovieList(newMovie)
            history.push("/")
            .catch(error => {
                console.log(error)
            })
        })
        
    } 

    return(
        <div>
            <form onSubmit = {Submit}>
                <input
                name = 'title'
                type = 'text'
                value = {data.title}
                onChange = {handleC}
                placeholder = 'title'
                />
                <input
                name = 'director'
                type = 'text'
                value = {data.director}
                onChange = {handleC}
                placeholder = 'director'
                />
                <input
                name = 'metascore'
                type = 'text'
                value = {data.metascore}
                onChange = {handleC}
                placeholder = 'metascore'
                />
                <input
                name = 'stars'
                type = 'text'
                value = {data.stars}
                onChange = {handleC}
                placeholder = 'stars'
                />
                <button >Submit</button>
            </form>
        </div>
    )
}

export default EditForm