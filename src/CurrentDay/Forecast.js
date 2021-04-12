import { React, useState, useEffect } from 'react'
import axios from 'axios'
import {  Card, Col, Container, Dropdown, DropdownButton, Row, Table } from 'react-bootstrap'
import moment from 'moment-timezone'
import '../CurrentDay/CurrentDay.css'


const CURRENT_WEATHER_DATA_API = 'https://weatherapi-com.p.rapidapi.com/forecast.json'

function Forecast(props) {

    const [isCurrentWeatherDataFetched, setIsCurrentWeatherDataFetched] = useState(false)
    const [currentWeatherData, setCurrentWeatherData] = useState([])
    const [dataDisplayed,setDataDisplayed]=useState({})

    const degree = <> <sup> o</sup></>
    function getCurrentWeatherData(location) {
        axios.get(CURRENT_WEATHER_DATA_API, {
            params: {
                q: location,
                days:3,
            },
            headers: {
                'x-rapidapi-key': '4d75e28875msh0350f3ed28c24bcp13b60fjsn73fef07c1805',
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
            }
        }).then(Response => {
            console.log('the forecast weather data is ', Response.data)
            if (Response.status === 200) {

                setCurrentWeatherData(Response.data)
                setIsCurrentWeatherDataFetched(true)               

            }

        }).catch(error => {
            console.log("error occured while fetching data ", error)
        })

    }

    useEffect(() => {
        getCurrentWeatherData(props.getForecastData)
    }, [props.getForecastData])

    useEffect(()=>{
        if(Object.keys(currentWeatherData).length>0){
            setDataDisplayed(currentWeatherData.forecast.forecastday[0])
        }
    },[currentWeatherData])

    return (
        <div>
            {isCurrentWeatherDataFetched &&

                <Container>

                    <Row>
                        <Card bg='light' >
                            <Card.Body>
                                <Row>
                                    <Col >
                                        <Card.Title className='text-muted'>{currentWeatherData.location.name + ' , ' + currentWeatherData.location.country}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted" >
                                              <DropdownButton size='sm' variant="light" id="dropdown-basic-button" title={Object.keys(dataDisplayed).length===0?'Select Date':dataDisplayed.date}>
                                                { currentWeatherData.forecast.forecastday.map( forecastData =>
                                                    <Dropdown.Item key={forecastData.date} onClick={ ()=> setDataDisplayed(forecastData) } >{forecastData.date}</Dropdown.Item>
                                                    
                                                )}                                            
                                            </DropdownButton>
                                            {dataDisplayed.day.condition.text}
                                            
                                        </Card.Subtitle>
                                    </Col>
                                    <Col md='auto'>
                                        <Card.Img variant="top" src={dataDisplayed.day.condition.icon} />
                                    </Col>
                                </Row>


                                <Card.Text>
                                    <Container>
                                        <Row style={{ fontSize: '1em' }}>
                                            <Col>
                                                Chance of Rain : {dataDisplayed.day.daily_chance_of_rain} %
                                               
                                            </Col>
                                            <Col md='auto'>
                                                UV Index : {dataDisplayed.day.uv}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            Chance of Snow : {dataDisplayed.day.daily_chance_of_snow} %
                                                </Col>
                                            <Col md='auto'>
                                            Sunrise : {dataDisplayed.astro.sunrise} 
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                Visibility : {currentWeatherData.current.vis_miles} Miles
                                                </Col>
                                            <Col md='auto'>
                                            Sunset : {dataDisplayed.astro.sunset}
                                            </Col>
                                        </Row>
                                    </Container>
                                    <Container fluid>
                                        <Row>
                                            <Col >
                                                <Table striped bordered hover responsive>
                                                    <tbody>
                                                        <tr>
                                                            <td>Maximum Temp.</td>
                                                            <td>{dataDisplayed.day.maxtemp_c} {degree}C</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Temperature (Avg)</td>
                                                            <td>{dataDisplayed.day.avgtemp_c} {degree}C</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Minimum Temp.</td>
                                                            <td>{dataDisplayed.day.mintemp_c} {degree}C</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Humidity</td>
                                                            <td>{dataDisplayed.day.avghumidity} %</td>
                                                        </tr>
                                                        <tr>
                                                            <td>precipitation</td>
                                                            <td>{dataDisplayed.day.totalprecip_in} inches</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            }
        </div>
    )


}

export default Forecast
