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
              <h5>Total Elevation Change</h5>
            </Col>
            <Col>
              <h5>Total Time</h5>
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
              <p className="distance"><span>{info.totalDistance} meters</span></p>
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
          <h3 className="text-center directions-title">Instructions</h3>
          {stepInfo.map((step, index) => {
            return (
              <div key={index} className="direction">
                <Row>
                  <Col md={5}>
                    <div>{`${index + 1}.  ${step.instruction}`}</div>
                  </Col>
                  <Col>
                      <Container>
                        <Row>
                          <Col>
                            <h6>Distance To Cover</h6>
                            <p>{step.distance_to_cover} meters</p>
                          </Col>
                          <Col>
                            <h6>Elevation Change </h6>
                            <p>{step.elevation_gain} meters</p>
                          </Col>
                          <Col>
                            <h6>Time</h6>
                            <p>{parseSeconds(step.time).hours} hours, {parseSeconds(step.time).minutes} minutes</p>
                          </Col>
                        </Row>
                      </Container>
                  </Col>
                </Row>
              </div>
            )
          })}
        </div>

      </Container>
    </div>
  )
};

export default Information;