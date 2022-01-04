import React, { useState } from "react"

import {
    Card,
    Collapse
} from "@material-ui/core"

const HourlyComponent = ({data, hourlyOpen}) => {

    const [selectedIndex, setSelectedIndex] = useState()

    const getTime = (time) => {
        let unix_timestamp = time
        let date = new Date(unix_timestamp * 1000);
        
        return date.toLocaleString()
    }
    const getDeg = (deg) => {
        let val = Math.floor(( deg / 22.5) + .5)
        let arr = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"]
        return arr[(val % 16)]
    }

    return (
        <div className="container">
            <Collapse in={hourlyOpen} timeout={0}>
                {data.slice(0, 24).map((data, index) => {
                    return (
                        <Card className="mb-1 full-width bg-light" key={index}>
                            <button
                                className="w-100 px-4 py-0 gradient button" 
                                style={{border: "none"}}
                                onClick={() => index === selectedIndex ? setSelectedIndex() : setSelectedIndex(index)}
                            >
                                <div className="col">
                                    <h4 className="p-0 m-0 float-right pb-2">{index === selectedIndex ? "-" : "+"}</h4>
                                    <h6 className="mt-3">{getTime(data.dt)}</h6>
                                    <Collapse in={index === selectedIndex ? false : true} timeout={1000}>
                                        <hr className="my-0" />
                                        <ul className="list-unstyled small">
                                            <p className="m-0">Temp: {Math.round(data.temp)}° F</p>
                                            <p>{data.weather[0].description}</p>
                                        </ul>
                                    </Collapse>
                                </div>
                            </button>
                            <Collapse in={index === selectedIndex ? true : false} timeout={1000}>
                                <div className="p-3 bg-light mx-auto" key={index}> 
                                    <div className="row">
                                        <div className="col-1 d-sm-block d-none">
                                        </div>
                                        <div className="col-sm-5 text-center text-sm-right">
                                            {data.weather.length > 1 ? data.weather.map((condition,index) => {
                                                return (
                                                    <img key={index} src={`http://openweathermap.org/img/wn/${condition.icon}@2x.png`} alt={condition.description} />
                                                    )})
                                                    :
                                                    <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description} />
                                            }
                                        </div>
                                        <div className="col-sm-6">
                                            <ul className="list-unstyled mt-3 text-center text-sm-left">
                                                <li>Temperature: {Math.round(data.temp)}° F</li>
                                                <li>{data.clouds}% cloud coverage</li>
                                                <li>{data.weather[0].description}</li>
                                                <li>Humidity: {data.humidity}%</li>
                                                <li>UV index: {data.uvi}</li>
                                                <li>Average visibility: {Math.round(data.visibility / 3.28084)} feet</li>
                                                <li>Wind speed: {Math.round(data.wind_speed * 2.23693629)} mph</li>
                                                {data.wind_gust ? <li>Wind gusts: {Math.round(data.wind_gust * 2.23693629)} mph</li> : null}
                                                <li>Wind direction: {getDeg(data.wind_deg)}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Collapse>
                        </Card>
                    )
                })}
            </Collapse>
        </div>
    )
}

export default HourlyComponent