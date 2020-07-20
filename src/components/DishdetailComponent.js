//Week 1 A1 This file contains the presentational components

import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Row, Label, Col} from 'reactstrap';
import { HashLink as Link} from 'react-router-hash-link';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent'
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
	
	function RenderDish({dish}) {
        
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card className="row flex-row">
                    <div className="col-md-3 col-sm-6 col-12 p-4">
                        <CardImg width="100%" height="200px" src={dish.image} alt={dish.name} />
                    </div>
                    <div className="col-md-9 col-sm-6 col-12">
                        <CardBody className="row">
                            <Col sm={12} md={7} lg={8}>
                                {dish.label === "Hot" ? <CardTitle><h1 className="d-none d-md-block">{dish.name}</h1><h3 className="d-block d-md-none">{dish.name}</h3> <span className="badge badge-danger">HOT</span></CardTitle> : <CardTitle><h1 className="d-none d-md-block">{dish.name}</h1><h3 className="d-block d-md-none">{dish.name}</h3></CardTitle> }
                                <h4><CardText> {dish.description}</CardText></h4>
                            </Col>
                            <Col sm={12} md={5} lg={4} className="d-flex justify-content-md-center">
                                <h4> Rs. {dish.price}</h4>
                            </Col>
                        </CardBody>
                    </div>
                </Card>
            </FadeTransform>
            );   
    }
 // redux action 5, pass the attributes to the RenderComments and CommentForm, configured the submit button to add the comment
    
    function RenderComments({comments, postComment, dishID}) {
        const commentsSelectedDish = comments.filter((filteredDish) => filteredDish.dishId === dishID.id).map((dish) => {
            return(
                <Fade in key={dish.id}>
                    <Card className="row flex-row">
                        <CardBody>
                            <CardTitle>-- {dish.author} | Rating: {dish.rating} <i className="fa fa-star" aria-hidden="true"></i> | <span>{new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: '2-digit'
                                        }).format(new Date(Date.parse(dish.date)))}</span> 
                            </CardTitle>
                            <CardText>{dish.comment}</CardText>
                        </CardBody>
                    </Card>
                </Fade>
            )
        })
        return(
            <div className="top-spacing">
                <h2 className="top-spacing bottom-spacing pl-3" >Reviews {dishID.reviews} | Average Rating {dishID.averageRating} <i className="fa fa-star" aria-hidden="true"></i></h2>
                <h2 className="text-center bottom-spacing pl-3">Customer Reviews</h2>
                {console.log(dishID.id + "know")}
                <Stagger in>
                    {commentsSelectedDish}
                    <CommentForm dishId={dishID.id} postComment={postComment} />
                </Stagger>
            </div>
        )
    }



// This is a cleaner code for showing empty space when nothing is selected from the menu component.

// redux thunk 8, state the conditions for isLoading, errMess and if any dish is clicked which will form dish array
const Dishdetail = (props) => {  
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row text-center">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.dish != null) {
        return (
            <div name="dishdetail" className="col-12 col-lg-10 offset-lg-1 containter-fluid bottom-spacing">
                <h2>
                    <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu/#menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                </h2>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
                <RenderDish dish={props.dish} />
                <RenderComments 
                        comments={props.comments} 
                        postComment={props.postComment}
                        dishID={props.dish}
                    />
                </div> 
        
            );
    }
    else {
        return (
            <div></div>
            );
    }
}

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);

        this.state = {
            isModalOpen: false
        };
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.next !== this.props.next  
    }

    toggleModal() {
        
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmitComment(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        
        return(
            <div className="d-flex flex-row justify-content-center top-spacing">
                <button className="button2" outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmitComment(values)} >   {/*when the submit button will be clicked, it will be handled by the this.handleSubmit javascript object*/}
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control"
                                    validators={{
                                        required, 
                                    }}
                                    > 
                                        <option>Rating</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    <Errors 
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                            required: 'Required'
                                        }} 
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author"md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control" 
                                    validators={{
                                        required, 
                                        minLength: minLength(3), 
                                        maxLength: maxLength(15)
                                    }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} 
                                    /> 
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group d-flex justify-content-center">
                                <Col className="text-center py-3">
                                    <button type="submit" className="button2">
                                        Submit
                                    </button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
};

export default React.memo(Dishdetail);