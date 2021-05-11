import React, {Component} from 'react';
import {Modal, Button, Col, Form} from 'react-bootstrap';

export class ModalAddClient extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'clients', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                FirstName:event.target.FirstName.value,
                LastName:event.target.LastName.value,
                Gender:event.target.Gender.value,
                PrimaryCell:event.target.PrimaryCell.value,
                PrimaryEmail:event.target.PrimaryEmail.value 
            })
        })
            .then(response=>response.json())
            .then((result)=>{
                alert(result);
                this.props.onHide();
            },
            (error)=>{
                alert(error);
            })
    }

    render() {
        return (
            <div className="container">
                <Modal
                {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add Client
                            </Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="FirstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="text" name="FirstName" required placeholder="First Name" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="LastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" name="LastName" required placeholder="Last Name" />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="PrimaryCell">
                                            <Form.Label>Primary Cell Number</Form.Label>
                                            <Form.Control type="tel" name="PrimaryCell" required placeholder="Cell Number" />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="PrimaryEmail">
                                            <Form.Label>Primary Email</Form.Label>
                                            <Form.Control type="email" name="PrimaryEmail" required placeholder="Primary Email" />
                                        </Form.Group>
                                    </Form.Row>
                                    
                                    <Form.Group controlId="Gender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control as="select" defaultValue="-1" required>
                                            <option value="-1">Please select your gender</option>
                                            <option value="0">Female</option>
                                            <option value="1">Male</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button className="btnForceRight" variant="primary" type="submit">Save</Button>
                                </Form>
                            </Modal.Body>                      
                </Modal>
            </div>
        )
    }
}