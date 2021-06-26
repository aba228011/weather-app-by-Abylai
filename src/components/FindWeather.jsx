import React, {useEffect, useState} from 'react';
import axios from "axios";
import {AppBar, Button, Container, TextField} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import SearchIcon from '@material-ui/icons/Search';
import InformationAboutWeather from "./InformationAboutWeather";

const FindWeather = () => {
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [city, setCity] = useState(null);
    const [demoCity, setDemoCity] = useState([]);
    const [forecast, setForecast] = useState([]);

    useEffect(//dependOnLocation
        () => {
            const fetchForecast = async () => {
                const apiUrl = `${process.env.REACT_APP_API_URL}?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;
                await axios.get(apiUrl)
                    .then(resp => {
                        if (resp.status === 200) {
                            return resp.data;
                        } else {
                            console.log("error")
                            throw new Error("Please Enable your Location in your browser!");
                        }
                    })
                    .then((response) => {
                        setCity(null)
                        setForecast(response)
                    });
            }
            fetchForecast();
        }, [lat, long]
    );
    useEffect(//dependOnCity
        () => {
            const fetchForecast = async () => {
                const apiUrl = `${process.env.REACT_APP_API_URL}?q=${city},kz&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;
                await axios.get(apiUrl)
                    .then(resp => {
                        if (resp.status === 200) {
                            return resp.data;
                        } else {
                            throw new Error("Please Enable your Location in your browser!");
                        }
                    })
                    .then((response) => {
                        setLat([]);
                        setLong([]);
                        setForecast(response);
                    });
            }
            fetchForecast();
        }, [city]
    );

    const onFormSubmit = e => {
        e.preventDefault();
        setCity(demoCity);
    }

    const autoDefineForecast = e => {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });
    }

    const onCityChange = (e) => {
        setDemoCity(e.target.value);
    }
    return (
        <Container maxWidth={"md"}>
            <AppBar color={"primary"}>
                <div className="heading">
                    Weather forecast by Abylai
                </div>
            </AppBar>
            <section className={"main"}>
                <form autoComplete="off" onSubmit={onFormSubmit}>
                    <TextField id="filled-search" label="Your city in KZ (EN)" type="search" variant="filled"
                               onChange={onCityChange}/>
                    <Button onClick={onFormSubmit} variant="contained" color="action">
                        <SearchIcon color={"primary"} fontSize={"medium"} />
                    </Button>
                </form>
                <div className={"refreshLocation"}>
                    <div>Auto define location</div>
                    <Button onClick={autoDefineForecast} variant="contained" color="action">
                        <RefreshIcon color={"primary"} fontSize={"small"}/>
                    </Button>
                </div>
            </section>
            {(typeof forecast.main != 'undefined') ? (<InformationAboutWeather forecast = {forecast} />)
                : (
                    <div className={"forecastWeather"}>Loading...</div>
                )}
        </Container>
    );
};

export default FindWeather;