import React, { useState } from "react"

const CurrentComponent = ({data, alerts}) => {
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
        <div>
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description} />
            {alerts ? 
                <h2>Alert: {alerts[0].description}</h2>
                :
                null
            }
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
    )
}
export default CurrentComponent