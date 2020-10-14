import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useHistory} from 'react-router-dom'


 
const initial = {
    title:'',
    director:'',
    metascore:'',
    stars:[]

}

const AddForm = (props) => {
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
    
    const Submit = () => {
        const newStars = data.stars.split(',')
        const newMovie = {
            title: data.title.trim(),
            director:data.director.trim(),
            metascore:data.metascore.trim(),
            stars:newStars
            
        }
        axios.post(`http://localhost:5000/api/movies/`, newMovie )
        .then(res => {
            console.log(res)

            setMovieList([...movieList, newMovie])
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

export default AddForm