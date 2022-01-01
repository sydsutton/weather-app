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
import { useSelector, useDispatch } from "react-redux"
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
    const [error, setError] = useState(true)
    const [tempZip, setTempZip] = useState()

    const savedZipCodes = useSelector(state => state.zipReducer.savedZipCodes)
    const dispatch = useDispatch()

    const handleSearch = () => {
        setTempZip()
        setLoading(true)
        // setCityData("")
        try {
            fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${apiKey}`)
                .then(res => res.json())
                .then(data => {
                    setCity(data.name)
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${apiKey}`)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            setTempZip(zipCode)
                            setError(false)
                            setLoading(false)
                            setCityData(data)
                            setCurrentOpen(true)
                            setHourlyOpen(false)
                            setDailyOpen(false)
                        })
                })
                .catch(err => {
                    setError(true)
                    console.log(err)
                    setLoading(false)
                })
        } catch {
            setError(true)
            setLoading(false)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="container text-center mx-auto">
                <div className="row">
                    <div className="col">
                        <div className="jumbotron pt-3">
                            <h1>QWeather</h1>
                        </div>
                        <InputLabel className="text-light">Enter a zip code</InputLabel>
                            <InputBase
                                type="text" 
                                onChange={e => setZipCode(e.target.value)}
                                className="input px-2 mt-2 mr-3 mb-2 shadow-sm"
                                required={true}
                                value={zipCode}
                                error={error ? true : false}
                            />
                        <Button 
                            onClick={() => handleSearch()}
                            variant="contained"
                            color="primary"
                            size="small"
                        >
                            Search
                        </Button>
                        <div className="row mx-auto justify-content-center pr-5">
                                <div className="text-danger small d-inline">{error ? "Please enter a valid zip code" : null}</div>
                            </div>
                        <ul className="list-unstyled d-flex flex-wrap justify-content-center">
                            {savedZipCodes.map(zip => {
                                return (
                                    <button 
                                        className="btn btn-sm btn-primary py-0 mx-1 my-2"
                                        style={{borderRadius: "20px"}}
                                        onClick={() => setZipCode(zip)}
                                    >
                                        {zip} 
                                        <button 
                                            className="btn btn-sm btn-primary ml-2 py-0"
                                            id="remove-btn"
                                            onClick={() => dispatch({type: "DELETE_ZIP", payload: zip})}
                                        >
                                            -
                                        </button>
                                    </button>
                                )
                            })}
                        </ul>
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
                            <Current data={cityData.current} alerts={cityData.alerts} city={city} zipCode={tempZip} currentOpen={currentOpen}/>
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