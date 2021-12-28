import React, { useState } from "react"

import {
    Card,
    Button,
    Collapse,
    Slide
} from "@material-ui/core"

const CurrentComponent = ({data, alerts, city}) => {

    const [alertOpen, setAlertOpen] = useState(false)
    const [alertDetailOpen, setAlertDetailOpen] = useState(false)

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

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Slide in={true} direction="right" timeout={2000}>
                        <Card className="p-3 mt-4">
                            <div className="row justify-content-center">
                                <h3>{city}</h3>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    {data.weather.length > 1 ? data.weather.map((condition,index) => {
                                        return (
                                            <img key={index} src={`http://openweathermap.org/img/wn/${condition.icon}@2x.png`} alt={condition.description} />
                                            )})
                                            :
                                            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description} />
                                    }
                                    {alerts ? 
                                        <div>
                                            <Button variant="contained" color="secondary" className="mb-3" onClick={() => setAlertOpen(!alertOpen)}>See alerts</Button>
                                            <Collapse in={alertOpen} className="shadow p-3" timeout={1000}>
                                                <h4>Alert: {alerts[0].event}</h4>
                                                <h5>From {getTime(alerts[0].start)} until {getTime(alerts[0].end)}</h5>
                                                <Button variant="contained" size="small" onClick={() => setAlertDetailOpen(!alertDetailOpen)}>See more details</Button>
                                                <Collapse className="mt-3" in={alertDetailOpen} timeout={1000}>
                                                    <p className="small">Alert: {alerts[0].description}</p>
                                                </Collapse>
                                            </Collapse>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                <div className="col-sm-6">
                                    <p>Temperature: {Math.round(data.temp)}°</p>
                                    <p>Feels like: {Math.round(data.feels_like)}°</p>
                                    <p>{data.weather[0].description}</p>
                                    <p>Humidity: {data.humidity}%</p>
                                    <p>UV index: {data.uvi}</p>
                                    <p>Average visibility: {Math.round(data.visibility / 3.28084)} feet</p>
                                    <p>Wind speed: {Math.round(data.wind_speed * 2.23693629)} mph</p>
                                    {data.wind_gust ? <p>Wind gusts: {Math.round(data.wind_gust * 2.23693629)} mph</p> : null}
                                    <p>Wind direction: {direction}</p>
                                    <p>Sunrise: {getTime(data.sunrise)} AM</p>
                                    <p>Sunset: {getTime(data.sunset)} PM</p>
                                </div>
                            </div>
                        </Card>
                    </Slide>
                </div>
            </div>
        </div>
    )
}
export default CurrentComponent