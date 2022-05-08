import React, { useEffect, useState } from 'react'

const API_KEY = "eefd2c4f96f89986a396b0464a3ad513"

export default function SearchWeather() {

    const [search, setSearch] = useState("dubai")
    const [data, setData] = useState([])
    const [input, setInput] = useState("")
    let componentMounted = true

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`)
            if (componentMounted) {
                setData(await response.json())
                console.log(data)
            }
            return () => {
                componentMounted = false
            }
        }
        fetchWeather()
    }, [search])

    let emoji = null
    if (typeof data.main != "undefined") {
        if (data.weather[0].main == "Clouds")
            emoji = "fa-cloud"
        else if (data.weather[0].main == "Thunderstorm")
            emoji = "fa-bolt"
        else if (data.weather[0].main == "Drizzle")
            emoji = "fa-cloud-rain"
        else if (data.weather[0].main == "Rain")
            emoji = "fa-cloud-shower-heavy"
        else if (data.weather[0].main == "Snow")
            emoji = "fa-snow-flake"
        else
            emoji = "fa-smog"
    } else {
        return (
            <div>LOADING...</div>
        )
    }

    let temperature = (data.main.temp - 273.15).toFixed(2)
    let temperature_minimum = (data.main.temp_min - 273.15).toFixed(2)
    let temperature_maximum = (data.main.temp_max - 273.15).toFixed(2)

    let d = new Date()
    let date = d.getDate()
    let year = d.getFullYear()
    let month = d.toLocaleString("default", { month: 'long' })
    let day = d.toLocaleString("default", { weekday: 'long' })

    let time = d.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })

    function handleSubmit(e) {
        e.preventDefault()
        setSearch(input)

    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div class="card bg-dark text-white text-center border-0">
                            <img src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`} class="card-img" />
                            <div class="card-img-overlay">
                                <form action="" onSubmit={handleSubmit}>
                                    <div class="input-group mb-4 w-75 mx-auto">
                                        <input
                                            type="search"
                                            class="form-control"
                                            placeholder="Search City"
                                            aria-label="Search City"
                                            aria-describedby="basic-addon2"
                                            value={input}
                                            name="search"
                                            required
                                            onChange={(e) => setInput(e.target.value)}
                                        />
                                        <button type="submit" class="input-group-text" id="basic-addon2">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                                <div className="bg-dark bg-opacity-50 py-3">
                                    <h2 class="card-title">{data.name}</h2>
                                    <p class="card-text lead">
                                        {day}, {date} {month} {year}
                                        <br />
                                        {time}
                                    </p>
                                    <hr />
                                    <i className={`fas ${emoji} fa-4x`}></i>
                                    <h1 className='fw-bolder mb-5'>{temperature} &deg;C</h1>
                                    <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                                    <p class="lead">{temperature_minimum}&deg;C | {temperature_maximum}&deg;C</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

