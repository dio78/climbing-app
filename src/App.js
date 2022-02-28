import './App.css';
import { Container, Row, Col } from 'react-bootstrap';


function App() {
  return (
    <Container>
      <Row>
        <Col xs={{ span: 10, offset: 1}} className='text-center'>
          <h1 className='m-5'>Climbing App</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
