//Week 1 A1 This file contains the presentational components

import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';

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
                        <CardImg width="100%" height="200px" src={baseUrl + dish.image} alt={dish.name} />
                    </div>
                    <div className="col-md-9 col-sm-6 col-12">
                        <CardBody className="row">
                            <Col sm={12} md={7} lg={8}>
                                {dish.label === "Hot" ? <CardTitle><h1 className="d-none d-md-block">{dish.name}</h1><h3 className="d-block d-md-none">{dish.name}</h3> <span className="badge badge-danger">HOT</span></CardTitle> : <CardTitle><h1 className="d-none d-md-block">{dish.name}</h1><h3 className="d-block d-md-none">{dish.name}</h3></CardTitle> }
                                {dish.designation ? <CardSubtitle>{dish.designation}</CardSubtitle> : null }
                                <h4><CardText className="d-none d-md-block"> {dish.description}</CardText></h4>
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
        const commentsSelectedDish = comments.filter((comment) => comment.id === dishID.id).map((dish) => {
            return(
                <Fade in key={dish.id}>
                    <div>
                        <h3 className="top-spacing bottom-spacing" >Reviews {dish.reviews} | Average Rating {dish.averageRating} <i className="fa fa-star" aria-hidden="true"></i></h3>
                        <h3 className="text-center bottom-spacing">Customer Reviews</h3>
                        {dish.itemComments.map((itemComment) => (
                            <div key={itemComment.commentId}>
                                <Card className="row flex-row">
                                    <div className="col-12">
                                        <CardBody>
                                            <h4>
                                                <CardText>-- {itemComment.author} <span>{new Intl.DateTimeFormat('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: '2-digit'
                                                }).format(new Date(Date.parse(itemComment.date)))}</span> 
                                                </CardText>
                                            </h4>
                                            <CardText>{itemComment.comment}</CardText>
                                            <CommentForm commentId={itemComment.commentId}  postComment={postComment} />
                                        </CardBody>
                                    </div>
                                </Card>
                                
                            </div>
                        ))}
                        
                        
                    </div>
                </Fade>
            )
        })
        return(
            <div>
                <Stagger in>
                    {commentsSelectedDish}
                </Stagger>
                
            </div>
        )
    	// const dishcomment = comments.filter((comment) => comment.id === dish.id).map((comment) => { 
    	// 	return (
        //         <Fade in key={comment.id}>
        //             <li key={comment.id}>
        //                 <p>Reviews {comment.reviews}</p>
        //                 <p>{comment.comment}</p>
        //                 <p> -- {comment.author} , &nbsp;
                        
        //                 </p>
        //             </li>
        //         </Fade>
        //         )});
    	// return (
        //     <div>
        //         <h4>Comments</h4>
        //         <ul className="list-unstyled">
        //             <Stagger in>
        //                 {dishcomment}
        //             </Stagger>
        //         </ul>
        //         <CommentForm dishId={dishId} postComment={postComment} />
        //     </div>
        //     )
    }



// This is a cleaner code for showing empty space when nothing is selected from the menu component.

// redux thunk 8, state the conditions for isLoading, errMess and if any dish is clicked which will form dish array
const Dishdetail = (props) => {  
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
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
            <div className="container bottom-spacing">
                
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active >{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
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

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmitComment(values) {
        this.toggleModal();
        this.props.postComment(this.props.commentId, values.rating, values.author, values.comment);
    }

    render() {
        
        return(
            <div>
                <Button outline onClick={this.toggleModal} ><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>   {/*when the submit button will be clicked, it will be handled by the this.handleSubmit javascript object*/}
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control"> 
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>

                                    </Control.select>
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
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>

                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
};

export default Dishdetail;  //Task1 Week1 A2 Exporting the Dishdetail