import React, { useState } from "react"

import {
    Card,
    Button,
    Collapse,
    Slide,
    Slider,
    Dialog
} from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"

const CurrentComponent = ({data, alerts, city, zipCode, currentOpen}) => {

    const dispatch = useDispatch()
    const savedZipCodes = useSelector(state => state.zipReducer.savedZipCodes)

    const [alertOpen, setAlertOpen] = useState(false)
    const [alertDetailOpen, setAlertDetailOpen] = useState(false)
    const [detailsOpen, setDetailsOpen] = useState(false)

    //converting time from unix into readable time
    const getTime = (time) => {
        let unix_timestamp = time
        let date = new Date(unix_timestamp * 1000);
        let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
        let minutes = "0" + date.getMinutes();
        let formattedTime = hours + ':' + minutes.substr(-2) 
        
        return formattedTime
    }

    //getting wind direction
    let val = Math.floor(( data.wind_deg / 22.5) + .5)
    let arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
    let direction = arr[(val % 16)]
    console.log(savedZipCodes.includes(zipCode))
    return (
        <div className="container">
            <Collapse in={currentOpen}>
                <Card id="full-width" className="mb-5 bg-light pb-3">
                    <div className="row">
                        <div className="col justify-content-center">
                            <div className="row align-items-center">
                                <div className="col-md-6 mx-auto">
                                    <h3 className="mt-4">{city}</h3>
                                    {savedZipCodes.includes(zipCode) ? 
                                    <button 
                                        className="btn badge badge-pill badge-primary shadow-sm ml-2"
                                    >
                                            Saved
                                    </button>
                                    :
                                    <button 
                                        onClick={() => dispatch({type: "SAVE_ZIP", payload: zipCode})}
                                        className="btn badge badge-pill badge-success shadow-sm ml-2">
                                            Save {zipCode}
                                    </button>
                                    }
                                    <div className="row justify-content-center mt-3">
                                            <p>Weather conditions:<h5>{data.weather[0].description.toUpperCase()}</h5></p>
                                            {data.weather.map((condition,index) => {
                                                return (
                                                    <img height="50" key={index} src={`http://openweathermap.org/img/wn/${condition.icon}@2x.png`} alt={condition.description} />
                                                    )})
                                            }
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col">
                                            <ul className="list-unstyled">
                                                <li>Currently <strong>{Math.round(data.temp)}°</strong></li>
                                                <li>Feels like <strong>{Math.round(data.feels_like)}°</strong></li>
                                            </ul>
                                        </div>
                                        <div className="col">
                                            <ul className="list-unstyled">
                                                <li>Sunrise at <strong> {getTime(data.sunrise)} AM </strong></li>
                                                <li>Sunset at <strong>{getTime(data.sunset)} PM</strong></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {alerts ? 
                                        <div>
                                            <Button variant="contained" color="secondary" onClick={() => setAlertOpen(!alertOpen)}>{!alertOpen ? "See" : "Hide"} alerts</Button>
                                            <Collapse in={alertOpen} className="mb-3" timeout={1000}>
                                                <h4>Alert: {alerts[0].event}</h4>
                                                <h5>From {getTime(alerts[0].start)} until {getTime(alerts[0].end)}</h5>
                                                <Button variant="contained" size="small" onClick={() => setAlertDetailOpen(!alertDetailOpen)}>See alert details</Button>
                                                <Dialog open={alertDetailOpen} onClose={() => setAlertDetailOpen(!alertDetailOpen)}>
                                                    <p className="small m-3">Alert: {alerts[0].description}</p>
                                                </Dialog>
                                            </Collapse>
                                        </div>
                                        :
                                        null
                                    }
                                    <Button variant="outlined" color="primary" onClick={() => setDetailsOpen(!detailsOpen)}>{detailsOpen ? "Less details" : "More details"}</Button>
                                    <Collapse in={detailsOpen} timeout={1000}>
                                        <ul className="list-unstyled mt-3">
                                            <li>Humidity: {data.humidity}%</li>
                                            <li>UV index: {data.uvi}</li>
                                            <li>Average visibility: {Math.round(data.visibility / 3.28084)} feet</li>
                                            <li>Wind speed: {Math.round(data.wind_speed * 2.23693629)} mph</li>
                                            {data.wind_gust ? <li>Wind gusts: {Math.round(data.wind_gust * 2.23693629)} mph</li> : null}
                                            <li>Wind direction: {direction}</li>
                                        </ul>
                                    </Collapse>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </Collapse>
        </div>
    )
}
export default CurrentComponent