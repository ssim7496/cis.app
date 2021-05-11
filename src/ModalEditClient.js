import React, {Component} from 'react';
import {Modal, Button, Col, Form} from 'react-bootstrap';

export class ModalEditClient extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'clients', {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ID:event.target.ID.value,
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
                                Update Client
                            </Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ID">
                                        <Form.Control type="hidden" name="ID" required
                                        defaultValue={this.props.ID} />
                                    </Form.Group>
                                        
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="FirstName">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control type="text" name="FirstName" required
                                                    placeholder="First Name" defaultValue={this.props.FirstName} />
                                            </Form.Group>
                                                
                                            <Form.Group as={Col} controlId="LastName">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control type="text" name="LastName" required
                                                    placeholder="Last Name" defaultValue={this.props.LastName}/>
                                            </Form.Group>
                                        </Form.Row>

                                        <Form.Row>
                                        <Form.Group as={Col} controlId="PrimaryCell">
                                            <Form.Label>Primary Cell Number</Form.Label>
                                            <Form.Control type="tel" name="PrimaryCell" required 
                                                placeholder="Cell Number" defaultValue={this.props.PrimaryCell} />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="PrimaryEmail">
                                            <Form.Label>Primary Email</Form.Label>
                                            <Form.Control type="email" name="PrimaryEmail" required 
                                                placeholder="Primary Email" defaultValue={this.props.PrimaryEmail} />
                                        </Form.Group>
                                    </Form.Row>

                                        <Form.Group controlId="Gender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control as="select" defaultValue={this.props.Gender} required>
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