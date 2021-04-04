import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Card, Col, Container, Form, Row, Spinner, Table } from 'react-bootstrap'
import moment from 'moment-timezone'
import '../CurrentDay/CurrentDay.css'


const CURRENT_WEATHER_DATA_API = 'https://weatherapi-com.p.rapidapi.com/current.json'

function CurrentDay(props) {

    const [isCurrentWeatherDataFetched, setIsCurrentWeatherDataFetched] = useState(false)
    const [currentWeatherData, setCurrentWeatherData] = useState([])

    const degree = <> <sup> o</sup></>
    function getCurrentWeatherData(location) {
        axios.get(CURRENT_WEATHER_DATA_API, {
            params: {
                q: location,

            },
            headers: {
                'x-rapidapi-key': '4d75e28875msh0350f3ed28c24bcp13b60fjsn73fef07c1805',
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
            }
        }).then(Response => {
            console.log('the current weatther data is ', Response.data)
            if (Response.status === 200) {

                setCurrentWeatherData(Response.data)
                setIsCurrentWeatherDataFetched(true)

            }

        }).catch(error => {
            console.log("error occured while fetching data ", error)
        })

    }

    useEffect(() => {
        getCurrentWeatherData(props.getWeatherData)
    }, [props.getWeatherData])

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
                                        <Card.Subtitle className="mb-2 text-muted">{currentWeatherData.current.condition.text + '  ,  ' + currentWeatherData.location.localtime + ' ' + moment.tz(currentWeatherData.location.tz_id).format('z')}</Card.Subtitle>
                                    </Col>
                                    <Col md='auto'>
                                        <Card.Img variant="top" src={currentWeatherData.current.condition.icon} />
                                    </Col>
                                </Row>


                                <Card.Text>
                                    <Container>
                                        <Row style={{ fontSize: '1em' }}>
                                            <Col>
                                                Cloud : {currentWeatherData.current.cloud} %
                                                </Col>
                                            <Col md='auto'>
                                                UV Index : {currentWeatherData.current.uv}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                Visibility : {currentWeatherData.current.vis_miles} Miles
                                                </Col>
                                            <Col md='auto'>
                                                Wind Direction :{currentWeatherData.current.wind_degree} {degree}{' , ' + currentWeatherData.current.wind_dir}
                                            </Col>
                                        </Row>
                                    </Container>
                                    <Container fluid>
                                        <Row>
                                            <Col >
                                                <Table striped bordered hover responsive>
                                                    <tbody>
                                                        <tr>
                                                            <td>Feels Like</td>
                                                            <td>{currentWeatherData.current.feelslike_c} {degree}C</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Temperature</td>
                                                            <td>{currentWeatherData.current.temp_c} {degree}C</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Humidity</td>
                                                            <td>{currentWeatherData.current.humidity} %</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Pressure</td>
                                                            <td>{currentWeatherData.current.pressure_in} inches</td>
                                                        </tr>
                                                        <tr>
                                                            <td>precipitation</td>
                                                            <td>{currentWeatherData.current.precip_in} inches</td>
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

export default CurrentDay
