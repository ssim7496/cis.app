import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

export class ModalAddAddress extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'addresses', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ClientID:event.target.ClientID.value,
                AddressType:event.target.AddressType.value,
                AddressLine1:event.target.AddressLine1.value,
                AddressLine2:event.target.AddressLine2.value,
                Suburb:event.target.Suburb.value,
                City:event.target.City.value,
                PostalCode:event.target.PostalCode.value 
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
                                Add Address
                            </Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ClientID">
                                        <Form.Control type="hidden" name="ClientID" required
                                        defaultValue={this.props.ClientID} />
                                    </Form.Group>
                                    <Form.Group controlId="AddressType">
                                        <Form.Label>Address Type</Form.Label>
                                        <Form.Control type="text" name="AddressType" required placeholder="e.g. Residential, Work, Postal, etc." />
                                    </Form.Group>
                                    <Form.Group controlId="AddressLine1">
                                        <Form.Label>Address Line 1</Form.Label>
                                        <Form.Control type="text" name="AddressLine1" required placeholder="Address Line 1" />
                                    </Form.Group>
                                    <Form.Group controlId="AddressLine2">
                                        <Form.Label>Address Line 2</Form.Label>
                                        <Form.Control type="text" name="AddressLine2" placeholder="Address Line 2" />
                                    </Form.Group>
                                    <Form.Group controlId="Suburb">
                                        <Form.Label>Suburb</Form.Label>
                                        <Form.Control type="text" name="Suburb" required placeholder="Suburb" />
                                    </Form.Group>
                                    <Form.Group controlId="City">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text" name="City" required placeholder="City" />
                                    </Form.Group>
                                    <Form.Group controlId="PostalCode">
                                        <Form.Label>Postal Code</Form.Label>
                                        <Form.Control type="text" name="PostalCode" required placeholder="Postal Code" />
                                    </Form.Group>
                                    <Button className="btnForceRight" variant="primary" type="submit">Save</Button>
                                </Form>
                            </Modal.Body>                      
                </Modal>
            </div>
        )
    }
}