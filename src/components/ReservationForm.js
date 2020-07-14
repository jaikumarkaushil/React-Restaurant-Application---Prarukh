import React, { Component } from 'react';
import { Button, Row, Label, Col} from 'reactstrap'; // form feedbackback will validate our form.
import { Control, Form, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class ReservationForm extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        this.props.postReservation(values);
        this.props.resetReservationForm();
    }

    render() {
        return(
            <div className="ml-3 ml-md-5 bg-white col-10 col-md-6 col-xl-4" style={{borderRadius: "16px"}}>
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center top-spacing bottom-spacing">Book a Table or Home Delivery</h1>
                    </div>
                    <div className="col-12">
                        <Form model='reservation' onSubmit={(values) => this.handleSubmit(values)}>   {/*when the submit button will be clicked, it will be handled by the this.handleSubmit javascript object*/}
                            <Row className="form-group d-flex justify-content-center my-4">
                                <Label htmlFor="firstname"></Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname" placeholder="Enter your First Name*" className="form-control" 
                                    validators={{
                                        required, 
                                        minLength: minLength(3), 
                                        maxLength: maxLength(15)
                                    }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} 
                                    /> 
                                </Col>
                            </Row>
                            <Row className="form-group d-flex justify-content-center my-4">
                                <Label htmlFor="lastname"></Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname" placeholder="Enter your Last Name*" className="form-control" 
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} 
                                    />
                                    
                                </Col>
                            </Row>
                            <Row className="form-group d-flex justify-content-center my-4">
                                <Label htmlFor="telnum"></Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum" placeholder="Enter your Phone Number*" className="form-control" 
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                    }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 number',
                                            maxLength: 'Must be 15 numbers or less',
                                            isNumber: 'Must be a number'
                                        }} 
                                    />
                                    
                                </Col>
                            </Row>
                            <Row className="form-group d-flex justify-content-center my-4">
                                <Label htmlFor="email"></Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email" placeholder="Enter your E-mail*" className="form-control" 
                                    validators={{
                                        required, validEmail
                                    }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            validEmail: 'Invalid Email Address'
                                        }} 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group d-flex justify-content-center my-4">
                                <Label htmlFor="message"></Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message" rows="1" placeholder="Type your Message" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group d-flex justify-content-center my-3">
                                <Col md={10} className="d-flex justify-content-center">
                                    <Button type="submit" color="info">
                                        <i className="fa fa-cutlery" aria-hidden="true"></i>  Submit
                                    </Button>
                                </Col>
                            </Row>

                        </Form>
                    </div>
                </div>
            </div>
        );
    } 
}

export default ReservationForm; 