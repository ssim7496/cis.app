import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';


export class Home extends Component {
    render() {
        return (          
            <Container fluid className="pageMargin">
                <Row className="justify-content-left">
                    <Col>
                        <h1 className="mainHeading">Welcome to Client Information System (CIS) Landing Page.</h1>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <p>CIS is a free, online tool which allows for the capture and maintenance of client information. This free service
                            allows you to take control and manage your personal information.
                        </p>
                        <p>CIS will begin by capturing your first name, last name, gender and basic details. Once this information is captured, 
                            you may continue to adding your singular or multiple address and contact information.
                        </p>
                        <p>Click on the GO button below to begin the process.
                        </p>
                        <Button href="/client">GO</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}