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
        return newDate.toLocaleDateString()
    }

    let val = Math.floor(( data.wind_deg / 22.5) + .5)
    let arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
    let direction = arr[(val % 16)]

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {data.slice(1, 8).map((data, index) => {
                        console.log(data)
                        return (
                            <Collapse in={dailyOpen} timeout={0}> 
                                <Card className="bg-light">
                                    <Button className="w-100 shadow-sm bg-light text-dark" onClick={() => {
                                                    {index === selectedIndex ? setSelectedIndex() : setSelectedIndex(index)}
                                                }}
                                            >
                                        <div className="col">     
                                        <h4>{getDate(data.dt)}</h4>   
                                            <Collapse in={index === selectedIndex ? false : true} timeout={1000}>                               
                                                    <ul className="list-unstyled">
                                                        <li>Temperature: {Math.round(data.temp.max)}°</li>
                                                        <li>Feels like: {Math.round(data.feels_like.eve)}°</li>
                                                        <li>{data.weather[0].description}</li>
                                                    </ul>
                                            </Collapse>
                                        </div>
                                    </Button>
                                        <Collapse in={index === selectedIndex ? true : false} timeout={1000}>
                                        <div className="p-3 bg-light mx-auto mb-4" key={index}> 
                                            <div className="row justify-content-center">
                                                <div className="col">
                                                    {getDate(data.dt)}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-1 d-sm-block d-none">
                                                </div>
                                                <div className="col-sm-5">
                                                    {data.weather.length > 1 ? data.weather.map((condition,index) => {
                                                        return (
                                                            <img key={index} src={`http://openweathermap.org/img/wn/${condition.icon}@2x.png`} alt={condition.description} />
                                                            )})
                                                            :
                                                            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description} />
                                                    }
                                                </div>
                                                <div className="col-sm-6">
                                                    <ul className="list-unstyled">
                                                        <li>Temperature: {Math.round(data.temp)}°</li>
                                                        <li>Feels like: {Math.round(data.feels_like)}°</li>
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