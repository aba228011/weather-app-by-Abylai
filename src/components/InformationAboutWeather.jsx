import React from 'react';

const InformationAboutWeather = (props) => {
    return (
        <div>
            <section className={"forecastWeather"}>
                <div>
                    <div className={"partOfDescr"}>
                        <div>Location:</div>
                        <div>{props.forecast.name}</div>
                    </div>
                    <div className={"partOfDescr"}>
                        <div>Temprature:</div>
                        <div>{Math.round(props.forecast.main.temp)} ℃ </div>
                    </div>
                    <div className={"partOfDescr"}>
                        <div>Sunrise:</div>
                        <div>{new Date(props.forecast.sys.sunrise * 1000).toLocaleTimeString('en-GB')}</div>
                    </div>
                    <div className={"partOfDescr"}>
                        <div>Sunset: </div>
                        <div>{new Date(props.forecast.sys.sunset * 1000).toLocaleTimeString('en-GB')}</div>
                    </div>
                    <div className={"partOfDescr"}>
                        <div>Description:</div>
                        <div className={"lastDescr"}>
                            <div>{props.forecast.weather[0].description}</div>
                            <img src={`https://api.openweathermap.org/img/w/${props.forecast.weather[0].icon}.png`}
                                 alt={"icon"}/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InformationAboutWeather;