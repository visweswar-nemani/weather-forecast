import logo from './logo.svg';
import './App.css';
import { React, useState } from 'react'
import CurrentDay from './CurrentDay/CurrentDay';
import { Button, Col, Container, Form, Navbar, Row } from 'react-bootstrap';
import '../src/assets/weatherForecast_bck.jpg'
function App() {

  const [locationEntered, setLocationEntered] = useState(null)
  const [textEntered, setTextEntered] = useState('')

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
              <Col>
                  <Button variant='secondary' onClick={() => setLocationEntered(textEntered)}>Get Weather Data</Button>
              </Col>
            </Row>
          </Form>
        </Row>
        <Row  className='content'>
          {locationEntered &&  <CurrentDay getWeatherData={locationEntered}></CurrentDay>}

        </Row>
        

      </Container>
    </div>
  );
}

export default App;
