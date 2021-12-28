import React, { useState } from "react"

import Current from "./CurrentComponent"

import {
    CircularProgress,
    InputBase,
    Button,
    Collapse,
    Slide
 } from '@material-ui/core';

import { apiKey } from "../apiKey"

const MainComponent = () => {
    const [zipCode, setZipCode] = useState("")
    const [cityData, setCityData] = useState("")
    const [loading, setLoading] = useState(false)
    const [city, setCity] = useState("")
    const [currentOpen, setCurrentOpen] = useState(false)

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
                    console.log(err)
                    setLoading(false)
                })
        } catch {
            alert("There was an error")
            setLoading(false)
        }
    }


    return (
        <div className="container text-center mx-auto">
            <div className="row">
                <div className="col">
                    <InputBase
                        type="text" 
                        onChange={e => setZipCode(e.target.value)}
                        className="input px-2 mr-3 mt-5 shadow"
                        required={true}
                    />
                    <Button 
                        onClick={() => handleSearch()}
                        variant="contained"
                    >
                        Search
                    </Button>
                </div>
            </div>
            <div className="row">
                {loading ? <CircularProgress /> : null}
            </div>
            {cityData ?
                <Current data={cityData.current} alerts={cityData.alerts} city={city}/>  
                : 
            null
            }   
        </div>
    )
}

export default MainComponent