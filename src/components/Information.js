import { useSelector } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";

const Information = ({ info }) => {
  const stepInfo = info.stepInfo;
  const parseSeconds = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor(timeInSeconds / 60 - (hours * 60));
    const seconds = Math.round(timeInSeconds - (hours * 60 + minutes) * 60);

    return { hours, minutes, seconds };
  }

  const parsedTotalTime = parseSeconds(info.totalTime);

  return (
    <div className="info-container">
      <Container>

        <div id="totals-styling" className="text-center">
          <Row>
            <Col>
              <h5>Total Distance</h5>
            </Col>
            <Col>
              <h5>Elevation Gained</h5>
            </Col>
            <Col>
              <h5>Estimated Time</h5>
            </Col>
          </Row>
          <Row>
            <Col>
            </Col>
            <Col>
            </Col>
            <Col>
              <p><span className="time">{parsedTotalTime.hours + ' hours   '}</span></p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="distance"><span>{info.totalDistance}</span></p>
            </Col>
            <Col>
              <p className="total-elevation"><span >{info.elevationGain}</span></p>
            </Col>
            <Col>
              <p><span className="time">{parsedTotalTime.minutes + ' minutes   '}</span></p>
            </Col>
          </Row>
          <Row>
            <Col>
            </Col>
            <Col>
            </Col>
            <Col>
              <p><span className="time">{parsedTotalTime.seconds + ' seconds   '}</span></p>
            </Col>
          </Row>
        </div>

        <div id="directions-styling">
          <Row>
            <Col>
              <div>
                {'Directions'}
              </div>
            </Col>
            <Col>
          
            </Col>
          </Row>
        </div>

      </Container>
    </div>
  )
};

export default Information;