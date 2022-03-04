import './App.css';
import Header from './components/HeaderComponent.js';
import CityInput from './components/CityInput.js'
import LeafletComponent from './components/LeafletComponent';
import Information from './components/Information';
import { Container, Row, Col } from 'react-bootstrap';


function App() {
  return (
    <Container className="app">
      <Row>
        <Col xs={{ span: 10, offset: 1}} className='text-center'>
          <Header />
            <CityInput />
            <LeafletComponent />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
