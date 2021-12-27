import { getAllByTestId } from "@testing-library/react"
import React, { useState } from "react"
import { apiKey } from "../apiKey"
import zipData from "../zipData"

const MainComponent = () => {
    const [zipCode, setZipCode] = useState("")
    const [data, setData] = useState("")
    const [iconLink, setIconLink] = useState("")

    const handleSearch = async() => {
        try {
            const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`)
            const data = await res.json()
            console.log(data)
            setData(data)
            setIconLink(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        } catch {
            console.log("There was an error")
        }
    }


    return (
        <div>
            <input 
                type="text" 
                onChange={e => setZipCode(e.target.value)}
            />
            {data ? <img src={iconLink} /> : null}
            <button onClick={() => handleSearch()}>Search</button>
        </div>
    )
}

export default MainComponent