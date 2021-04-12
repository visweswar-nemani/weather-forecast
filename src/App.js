import './App.css';
import { React, useState } from 'react'
import CurrentDay from './CurrentDay/CurrentDay';
import Forecast from './CurrentDay/Forecast';
import { Button, Col, Container, Form, Navbar, Row } from 'react-bootstrap';
import '../src/assets/weatherForecast_bck.jpg'


function App() {

  const [locationEntered, setLocationEntered] = useState(null)
  const [textEntered, setTextEntered] = useState('')
  const [showForecastData,setShowForecastData]=useState(false)

  return (
    <div className='bck_img'>

      <Navbar bg="dark" variant='dark' fixed='top' expand='lg' >
        <Navbar.Brand>Weather Forecast</Navbar.Brand>
      </Navbar>

      <Container className='content'>
        <Row>
          <Form>
            <Row>
              <Col>
                  <Form.Control name='location' type="text" placeholder="Enter City Name" onChange={event => setTextEntered(event.target.value)} />
              </Col>
              <Col md='auto'>
                <Form.Check inline label="2" type='switch' id='custom-switch' label="Turn on for 3 days Weather Forecast" default={showForecastData}  onChange={event => setShowForecastData(event.target.checked)}/>
              </Col>
              <Col>
                  <Button variant='secondary' onClick={() => setLocationEntered(textEntered)}>Get {showForecastData===true? 'Weather Forecast':'Current Weather'} </Button>
              </Col>
            </Row>
          </Form>
        </Row>
        <Row  className='content'>
          {showForecastData===true?
                <>
                  {locationEntered &&  <Forecast getForecastData={locationEntered}  ></Forecast>}
                </> : 
                <>
                  {locationEntered &&  <CurrentDay getWeatherData={locationEntered}></CurrentDay>}
                </>
          }
          
        </Row>      
        {<>POWERED BY <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a></>}
      </Container>
    </div>
  );
}

export default App;
