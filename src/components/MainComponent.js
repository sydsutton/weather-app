import React, { useState } from "react"
import Current from "./CurrentComponent"
import Daily from "./DailyComponent"
import Hourly from "./HourlyComponent"

import {
    CircularProgress,
    InputBase,
    Button,
    Collapse,
    Slide, 
    Card,
    InputLabel,
 } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux"
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
import { 
    red,
    blue,
    purple,
    teal,
    grey
} from "@material-ui/core/colors"

const theme = createTheme({
    palette: {
        primary: {
            main: blue[700],
            dark: blue[900]
        },
        secondary: {
            main: purple[500],
            dark: purple[700]
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
    const [error, setError] = useState(false)
    const [tempZip, setTempZip] = useState()

    const API_KEY = process.env.REACT_APP_API_KEY

    const savedZipCodes = useSelector(state => state.zipReducer.savedZipCodes)
    const dispatch = useDispatch()

    const handleSearch = () => {
        setTempZip()
        setLoading(true)
        setCityData("")
        try {
            fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&units=imperial&appid=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setCity(data.name)
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&appid=${API_KEY}`)
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
                        <div className="jumbotron pt-3 text-light">
                            <h1>QWeather</h1>
                            <p className="small mt-4 font-weight-light">Search and save weather information. <br/>The Quickest way to get your weather without stepping outside<br/>
                            </p>
                        </div>
                        <div className="row">
                            <div className="col">
                                <InputLabel className="text-light">Enter a zip code</InputLabel>
                                <InputBase
                                    type="text" 
                                    onChange={e => {
                                        setError(false)
                                        setZipCode(e.target.value)}}
                                    className="input shadow-sm text-light pl-3"
                                    required={true}
                                    value={zipCode}
                                    error={error ? true : false}
                                />
                                <Button 
                                onClick={() => handleSearch()}
                                variant="contained"
                                color="secondary"
                                size="small"
                                className="ml-3"
                                >
                                    Search
                                </Button>
                                <div className="mx-auto justify-content-center mt-3">
                                    <div className=" text-danger small">{error ? "Please enter a valid zip code or city" : null}</div>
                                </div>
                            </div>
                        </div>
                        <ul className="list-unstyled d-flex flex-wrap justify-content-center">
                            {savedZipCodes.map(zip => {
                                return (
                                    <div>
                                        <button 
                                            className="btn btn-sm btn-primary py-0 my-2"
                                            style={{borderRadius: "20px 0 0 20px"}}
                                            onClick={() => setZipCode(zip)}
                                        >
                                            {zip} 
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-primary py-0 mr-2"
                                            style={{borderRadius: "0 20px 20px 0"}}
                                            id="remove-btn"
                                            onClick={() => dispatch({type: "DELETE_ZIP", payload: zip})}
                                        >
                                            -
                                        </button>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="row text-center justify-content-center">
                    {loading ? <CircularProgress className="mt-5"/> : null}
                </div>
                {cityData ?
                    <Slide in={cityData ? true : false} direction="up" timeout={1000}>
                        <div className="row">
                            <div className="col">
                                <div className="row justify-content-center">
                                    <button 
                                        className="btn btn-sm p-2" 
                                        id="tab-style" 
                                        style={currentOpen ? {backgroundColor: "rgb(229, 237, 243)", fontWeight: "bold", zIndex: "10"} : {backgroundColor: "grey"}} 
                                        onClick={() => {
                                            setCurrentOpen(true)
                                            setHourlyOpen(false)
                                            setDailyOpen(false)
                                        }}
                                    >
                                        Current Weather
                                    </button> 
                                    <button 
                                        className="btn btn-sm p-2" 
                                        id="tab-style" 
                                        style={hourlyOpen ? {backgroundColor: "rgb(229, 237, 243)", fontWeight: "bold", zIndex: "10"} : {backgroundColor: "grey"}} 
                                        onClick={() => {
                                            setCurrentOpen(false)
                                            setHourlyOpen(true)
                                            setDailyOpen(false)
                                        }}
                                    >
                                        Hourly Weather
                                    </button> 
                                    <button 
                                        className="btn btn-sm p-2" 
                                        id="tab-style" 
                                        style={dailyOpen ? {backgroundColor: "rgb(229, 237, 243)", fontWeight: "bold", zIndex: "10"} : {backgroundColor: "grey"}} 
                                        onClick={() => {
                                            setCurrentOpen(false)
                                            setHourlyOpen(false)
                                            setDailyOpen(true)
                                        }}
                                    >
                                        Daily Weather
                                    </button> 
                                </div>
                                <Current data={cityData.current} alerts={cityData.alerts} city={city} zipCode={tempZip} currentOpen={currentOpen}/>
                                <Hourly data={cityData.hourly} hourlyOpen={hourlyOpen} />
                                <Daily data={cityData.daily} dailyOpen={dailyOpen} />
                            </div>
                        </div>
                    </Slide>
                    : 
                    null
                }   
            </div>
        </ThemeProvider>
    )
}

export default MainComponent