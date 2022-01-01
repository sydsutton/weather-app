import React, { useState } from "react"
import Current from "./CurrentComponent"
import Daily from "./DailyComponent"
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
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
import { 
    indigo,
    red
} from "@material-ui/core/colors"

const theme = createTheme({
    palette: {
        primary: {
            main: indigo[500],
            dark: indigo[800]
        },
        secondary: {
            dark: red[900],
            main: red[600]
        }
    }
})


const MainComponent = () => {

    const [zipCode, setZipCode] = useState("")
    const [cityData, setCityData] = useState("")
    const [loading, setLoading] = useState(false)
    const [city, setCity] = useState("")
    const [currentOpen, setCurrentOpen] = useState(true)
    const [hourlyOpen, setHourlyOpen] = useState(false)
    const [dailyOpen, setDailyOpen] = useState(false)

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
                            setCurrentOpen(true)
                            setHourlyOpen(false)
                            setDailyOpen(false)
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
        <ThemeProvider theme={theme}>
            <div className="container text-center mx-auto">
                <div className="row">
                    <div className="col">
                        <div className="jumbotron bg-transparent pt-3">
                            <h3 className="text-dark float-left">KülWeather</h3>
                            <InputLabel className="mt-5 text-light">Enter a zip code</InputLabel>
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
                    {loading ? <CircularProgress className="mt-5"/> : null}
                </div>
                {cityData ?
                    <div className="row">
                        <div className="col">
                            <div className="row justify-content-center">
                                <button 
                                    className="btn btn-sm p-2" 
                                    id="tab-style" 
                                    style={currentOpen ? {backgroundColor: "#f7f7f7", fontWeight: "bold", zIndex: "10"} : {backgroundColor: "grey"}} 
                                    onClick={() => {
                                        setCurrentOpen(!currentOpen)
                                        setHourlyOpen(false)
                                        setDailyOpen(false)
                                    }}
                                >
                                    Current Weather
                                </button> 
                                <button 
                                    className="btn btn-sm p-2 shadow-sm" 
                                    id="tab-style" 
                                    style={hourlyOpen ? {backgroundColor: "#f7f7f7", fontWeight: "bold", zIndex: "10"} : {backgroundColor: "grey"}} 
                                    onClick={() => {
                                        setCurrentOpen(false)
                                        setHourlyOpen(!hourlyOpen)
                                        setDailyOpen(false)
                                    }}
                                >
                                    Hourly Weather
                                </button> 
                                <button 
                                    className="btn btn-sm p-2" 
                                    id="tab-style" 
                                    style={dailyOpen ? {backgroundColor: "#f7f7f7", fontWeight: "bold", zIndex: "10"} : {backgroundColor: "grey"}} 
                                    onClick={() => {
                                        setCurrentOpen(false)
                                        setHourlyOpen(false)
                                        setDailyOpen(!dailyOpen)
                                    }}
                                >
                                    Daily Weather
                                </button> 
                            </div>
                            <Current data={cityData.current} alerts={cityData.alerts} city={city} zipCode={zipCode} currentOpen={currentOpen}/>
                            <Daily data={cityData.daily} dailyOpen={dailyOpen} />
                        </div>
                    </div>
                    : 
                    null
                }   
            </div>
        </ThemeProvider>
    )
}

export default MainComponent