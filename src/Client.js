import React, {Component} from 'react';
import {Table, Button, ButtonToolbar, Row, Col} from 'react-bootstrap';
import {ModalAddClient} from './ModalAddClient';
import {ModalEditClient} from './ModalEditClient';
import {ModalAddAddress} from './ModalAddAddress';
import {ModalAddContactInfo} from './ModalAddContactInfo';

export class Client extends Component {

    constructor(props) {
        super(props);
        this.state = {clients: [], clientInfo: [], addClientModalShow: false, editClientModalShow:false, delClientModalShow:false
            , addAddressModalShow:false, addContactInfoModalShow:false}
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'clients')
        .then(response => response.json())
        .then(data => {
            this.setState({ clients: data });
        });        

        fetch(process.env.REACT_APP_API + 'reports')
        .then(response => response.json())
        .then(dataInfo => {
            this.setState({ clientInfo: dataInfo });
        });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteClient (ID) {
        if(window.confirm('Are you sure you want to delete?')){
            fetch(process.env.REACT_APP_API + 'clients/' + ID, {
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
                .then(response=>response.json())
                .then((result)=>{
                    alert(result);
                },
                (error)=>{
                    alert(error);
                })
        }
    }

    exportCSV() {       
        if(Array.isArray(this.state.clientInfo)) {
            var csvRow = [];
            var cols = [['FirstName', 'LastName', 'Gender', 'PrimaryEmail', 'AddressType', 'AddressLine 1'
                        , 'AddressLine2', 'Suburb', 'City', 'PostalCode']];
            var rows = this.state.clientInfo;
    
            for(var i=0; i < rows.length; i++)
            {
                cols.push([rows[i].FirstName, rows[i].LastName, rows[i].Gender, rows[i].PrimaryEmail, rows[i].AddressType
                            , rows[i].AddressLine1, rows[i].AddressLine2, rows[i].Suburb, rows[i].City, rows[i].PostalCode
                            , rows[i].ContactDescription, rows[i].ContactInfo]);
            }
    
            for(var j=0; j < cols.length; j++)
            {
                csvRow.push(cols[j].join(","))
            }
    
            var csvString = csvRow.join("%0A");
    
            var a = document.createElement("a");
            a.href = 'data:attachment/csv,' + csvString;
            a.target = "_Blank";
            a.download = "ClientInformation.csv";
            document.body.appendChild(a);
            a.click();
        } else {
            alert('No records exist');
        }
    }

    render() {
        const {clients, ID, FirstName, LastName, Gender, PrimaryCell, PrimaryEmail, ClientID} = this.state;
        let addClientModalClose = () => this.setState({ addClientModalShow:false });
        let editClientModalClose = () => this.setState({ editClientModalShow:false });
        let addAddressModalClose = () => this.setState({ addAddressModalShow: false });
        let addContactInfoModalClose = () => this.setState({ addContactInfoModalShow: false });

        if(!Array.isArray(clients)) {
            var items = <tr><td colspan="7"><strong>No records exist.</strong></td></tr>
        } else {
            var items = clients.map(client =>
                <tr key={client.ID}>
                    <td>{client.ID}</td>
                    <td>{client.FirstName}</td>
                    <td>{client.LastName}</td>
                    <td>{(client.Gender === -1 ? "N/A" : (client.Gender === -0 ? "Female" : "Male"))}</td>
                    <td>{client.PrimaryCell}</td>
                    <td>{client.PrimaryEmail}</td>
                    <td>
                        <ButtonToolbar>
                            <Button variant="info" className="buttonSpace"
                                onClick={() => this.setState({ editClientModalShow: true, ID: client.ID, FirstName: client.FirstName, 
                                    LastName: client.LastName, Gender:client.Gender, PrimaryCell:client.PrimaryCell, PrimaryEmail:client.PrimaryEmail })}>
                                Update
                            </Button>                                               
                            <Button variant="primary" className="buttonSpace"
                                onClick={() => this.setState({ addAddressModalShow: true, ClientID: client.ID, LastName: client.LastName })}>
                                Add Address
                            </Button> 
                            <Button variant="primary" className="buttonSpace"
                                onClick={() => this.setState({ addContactInfoModalShow: true, ClientID: client.ID })}>
                                Add Contact Information
                            </Button> 
                            <Button className="mr-2" variant="danger" className="buttonSpace"
                                onClick={() => this.deleteClient(client.ID)}>
                                Delete
                            </Button>
                            <ModalEditClient show={this.state.editClientModalShow} onHide={editClientModalClose} 
                                ID={ID} FirstName={FirstName} LastName={LastName} Gender={Gender} PrimaryCell={PrimaryCell} PrimaryEmail={PrimaryEmail} />    
                            <ModalAddAddress show={this.state.addAddressModalShow} onHide={addAddressModalClose} 
                                ClientID={ClientID}/>     
                            <ModalAddContactInfo show={this.state.addContactInfoModalShow} onHide={addContactInfoModalClose} 
                                ClientID={ClientID}/>                                            
                        </ButtonToolbar>
                    </td>                                        
                </tr>
        )
        }

        return (
            <div className="pageMargin">
                <Row>
                    <Col sm={9}><h1 className="mainHeading">Clients</h1></Col>
                    <Col sm={3}>
                    <ButtonToolbar className="btnForceRight">
                        <Button variant="primary" className="buttonSpace" onClick={() => this.setState({ addClientModalShow: true })}>Add Client</Button>
                        <Button variant="primary" className="buttonSpace" onClick={() => this.exportCSV()}>Export Client Information</Button>
                        <ModalAddClient show={this.state.addClientModalShow} onHide={addClientModalClose} />
                    </ButtonToolbar>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Gender</th>
                                <th>Primary Cell Number</th>
                                <th>Primary Email</th>
                                <th>Action</th>                            
                            </tr>
                        </thead>
                        <tbody>
                            {items
                                }
                        </tbody>
                    </Table>          
                    </Col>
                </Row>
                    

                                 

</div>     
        )
    }
}