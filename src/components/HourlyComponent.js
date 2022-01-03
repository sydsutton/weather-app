import React, { useState } from "react"

import {
    Card,
    Collapse
} from "@material-ui/core"

const HourlyComponent = ({data, hourlyOpen}) => {

    const getTime = (time) => {
        let unix_timestamp = time
        let date = new Date(unix_timestamp * 1000);
        let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
        let minutes = "0" + date.getMinutes();
        let formattedTime = hours + ':' + minutes.substr(-2) 
        
        return formattedTime
    }

    return (
        <div className="container">
            <Collapse in={hourlyOpen} timeout={0}>
                {data.slice(0, 24).map((data, index) => {
                    return (
                        <Card className="mb-1 full-width gradient" key={index}>
                            <p className="my-auto py-2">{getTime(data.dt) == "0:00" ? "Midnight" : getTime(data.dt) == "12:00" ? "Noon" : getTime(data.dt)}</p>
                        </Card>
                    )
                })}
            </Collapse>
        </div>
    )
}

export default HourlyComponent