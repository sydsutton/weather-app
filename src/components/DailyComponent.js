import React, { useState } from "react"

import {
    Card,
    Button,
    Collapse,
} from "@material-ui/core"

const DailyComponent = ({data, dailyOpen}) => {

    const [selectedIndex, setSelectedIndex] = useState()

    const getTime = (time) => {
        let unix_timestamp = time
        let date = new Date(unix_timestamp * 1000);
        let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
        let minutes = "0" + date.getMinutes();
        let formattedTime = hours + ':' + minutes.substr(-2) 
        
        return formattedTime
    }

    const getDate = (date) => {
        let unix_timestamp = date
        let newDate = new Date(unix_timestamp * 1000);
        let calendarDate = newDate.toLocaleDateString()
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let dayOfWeek = newDate.getDay()
        return `${days[dayOfWeek]} ${calendarDate}`
    }

    let val = Math.floor(( data.wind_deg / 22.5) + .5)
    let arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
    let direction = arr[(val % 16)]


    return (
        <div className="container mb-5">
            <div className="row">
                <div className="col">
                    {data.slice(1, 8).map((data, index) => {
                        return (
                            <Collapse in={dailyOpen} timeout={0} key={index}> 
                                <Card className="full-width bg-light mb-1">
                                    <Button variant="contained" className="w-100 shadow-md text-dark gradient" onClick={() => {
                                                    {index === selectedIndex ? setSelectedIndex() : setSelectedIndex(index)}
                                                }}
                                            >
                                        <div className="col pt-2">     
                                            <div className="col d-flex flex-row justify-content-between align-items-center">
                                                <div/>
                                                <h5>{getDate(data.dt)}</h5>   
                                                <h4>{index === selectedIndex ? "-" : "+"}</h4>
                                            </div>
                                                <Collapse in={index === selectedIndex ? false : true} timeout={1000}> 
                                                    <hr className="mt-0" />
                                                    <div className="row">
                                                        <div className="col-5 my-auto text-right pb-3">
                                                            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description} />
                                                        </div>
                                                        <div className="col-5 my-auto text-left">
                                                            <ul className="list-unstyled small">
                                                                <li>High: <strong>{Math.round(data.temp.max)}°</strong></li>
                                                                <li>Low: <strong>{Math.round(data.temp.min)}°</strong></li>
                                                                <li>{data.weather[0].description}</li>
                                                                <li>Sunrise: <strong>{getTime(data.sunrise)} AM</strong></li>
                                                                <li>Sunset: <strong>{getTime(data.sunset)} AM</strong></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </Collapse>
                                        </div>
                                    </Button>
                                        <Collapse in={index === selectedIndex ? true : false} timeout={1000}>
                                        <div className="p-3 bg-light mx-auto mb-4" key={index}> 
                                            <div className="row">
                                                <div className="col-1 d-sm-block d-none">
                                                </div>
                                                <div className="col-sm-5 ">
                                                    {data.weather.length > 1 ? data.weather.map((condition,index) => {
                                                        return (
                                                            <img key={index} src={`http://openweathermap.org/img/wn/${condition.icon}@2x.png`} alt={condition.description} />
                                                            )})
                                                            :
                                                            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description} />
                                                    }
                                                </div>
                                                <div className="col-sm-6">
                                                    <ul className="list-unstyled text-left mt-3">
                                                        <li>Max temperature: {Math.round(data.temp.max)}° F</li>
                                                        <li>Min temperature: {Math.round(data.temp.min)}° F</li>
                                                        <br/>
                                                        <li>Day temperature: {Math.round(data.temp.day)}° F</li>
                                                        <li>Feels like: {Math.round(data.feels_like.day)}° F</li>
                                                        <br/>
                                                        <li>Night temperature: {Math.round(data.temp.night)}° F</li>
                                                        <li>Feels like: {Math.round(data.feels_like.night)}° F</li>
                                                        <hr/>
                                                        <li>{data.weather[0].description}</li>
                                                        <li>Humidity: {data.humidity}%</li>
                                                        <li>UV index: {data.uvi}</li>
                                                        <li>Average visibility: {Math.round(data.visibility / 3.28084)} feet</li>
                                                        <li>Wind speed: {Math.round(data.wind_speed * 2.23693629)} mph</li>
                                                        {data.wind_gust ? <li>Wind gusts: {Math.round(data.wind_gust * 2.23693629)} mph</li> : null}
                                                        <li>Wind direction: {direction}</li>
                                                        <li>Sunrise: {getTime(data.sunrise)} AM</li>
                                                        <li>Sunset: {getTime(data.sunset)} PM</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </Collapse>
                                </Card>
                            </Collapse>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default DailyComponent