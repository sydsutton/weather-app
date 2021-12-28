import React, { useState } from "react"

import Current from "./CurrentComponent"

import {
    CircularProgress
} from "@material-ui/core"
import { apiKey } from "../apiKey"

const MainComponent = () => {
    const [zipCode, setZipCode] = useState("")
    const [cityData, setCityData] = useState("")
    const [loading, setLoading] = useState(false)
    const [city, setCity] = useState("")

    const handleSearch = () => {
        setLoading(true)
        try {
            fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${apiKey}`)
                .then(res => res.json())
                .then(data => {
                    setCity(data.name)
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}`)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            setLoading(false)
                            setCityData(data)
                        })
                })
                .catch(err => {
                    alert("Please enter a valid zip code")
                    setLoading(false)
                })
        } catch {
            alert("There was an error")
            setLoading(false)
        }
    }


    return (
        <div>
            <input 
                type="text" 
                onChange={e => setZipCode(e.target.value)}
            />
            {loading ? <CircularProgress /> : null}
            <button onClick={() => handleSearch()}>Search</button>
            {city ? <h1>{city}</h1> : null}
            {cityData ? 
                <Current data={cityData.current} alerts={cityData.alerts}/>
            : 
            null
            }   
        </div>
    )
}

export default MainComponent