import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

export class ModalAddContactInfo extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'contactInformation', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ClientID:event.target.ClientID.value,
                ContactType:event.target.ContactType.value,
                ContactDescription:event.target.ContactDescription.value,
                ContactInfo:event.target.ContactInfo.value
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
                                Add Contact Information
                            </Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ClientID">
                                        <Form.Control type="hidden" name="ClientID" required
                                        defaultValue={this.props.ClientID} />
                                    </Form.Group>
                                    <Form.Group controlId="ContactDescription">
                                        <Form.Label>Contact Description</Form.Label>
                                        <Form.Control type="text" name="ContactDescription" required placeholder="e.g. Cell Number, Work Number, Work Email etc." />
                                    </Form.Group>
                                    <Form.Group controlId="ContactType">
                                        <Form.Label>Contact Type</Form.Label>
                                        <Form.Control as="select" defaultValue="0" required>
                                            <option value="0">Email</option>
                                            <option value="1">Number</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="ContactInfo">
                                        <Form.Label>Contact Information</Form.Label>
                                        <Form.Control type="text" name="ContactInfo" required placeholder="Contact Information" />
                                    </Form.Group>
                                    <Button className="btnForceRight" variant="primary" type="submit">Save</Button>
                                </Form>
                            </Modal.Body>                      
                </Modal>
            </div>
        )
    }
}