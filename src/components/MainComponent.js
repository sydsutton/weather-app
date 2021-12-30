import React, { useState } from "react"
import Current from "./CurrentComponent"
import {
    CircularProgress,
    InputBase,
    Button,
    Collapse,
    Slide, 
    Card,
    InputLabel
 } from '@material-ui/core';
import { useSelector } from "react-redux"
import { apiKey } from "../apiKey"


const MainComponent = () => {

    const [zipCode, setZipCode] = useState("")
    const [cityData, setCityData] = useState("")
    const [loading, setLoading] = useState(false)
    const [city, setCity] = useState("")

    const savedZipCodes = useSelector(state => state.saveZipReducer.savedZipCodes)

    const handleSearch = () => {
        setLoading(true)
        setCityData("")
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
                    <div className="jumbotron bg-transparent pt-3">
                        <h3 className="text-dark float-left">KülWeather</h3>
                        <InputLabel className="mt-5">Enter a zip code</InputLabel>
                        <InputBase
                            type="text" 
                            onChange={e => setZipCode(e.target.value)}
                            className="input px-2 mt-2 mr-3 mb-2 shadow-sm"
                            required={true}
                        />
                        <Button 
                            onClick={() => handleSearch()}
                            variant="contained"
                            color="primary"
                            size="small"
                        >
                            Search
                        </Button>
                        <ul className="list-unstyled">
                            {savedZipCodes.map(zip => {
                                return (
                                    <li>{zip}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row text-center justify-content-center">
                {loading ? <CircularProgress color="success" className="mt-5"/> : null}
            </div>
            {cityData ?
                <Current data={cityData.current} alerts={cityData.alerts} city={city} zipCode={zipCode}/>  
                : 
            null
            }   
        </div>
    )
}

export default MainComponent