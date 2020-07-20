import React, { Component } from 'react';
import { Collapse, Row, Col, Card, CardImg, CardBody, CardTitle, CardImgOverlay, CardText } from 'reactstrap';
import { Fade } from 'react-awesome-reveal';
import { FadeTransform } from 'react-animation-components';
import Trigger from '../styles/Trigger';
import DiagonalSwipe from '../styles/diagonalSwipe';
import { Loading } from './LoadingComponent';
import { LightgalleryItem } from 'react-lightgallery';


function RenderMenuItem({dish, toggleHover, hover}) {
    return(
        <div>
            <div className="photocaption d-none">{dish.name} | Rs. {dish.price}</div>
            <LightgalleryItem group="any" src={dish.image} subHtml={".photocaption"} closable={true}>
                    <Card key={dish.id} style={{cursor: "pointer"}}>
                        <CardImg width="100%" top src={dish.image} alt={dish.name} />
                        <CardImgOverlay onMouseEnter={toggleHover} onMouseLeave={toggleHover} data-event={dish.id}>
                            {hover === dish.id ? 
                                <Fade className="text-white transparent-black-overlay d-flex flex-row align-items-center text-center">
                                    <CardBody>
                                    <h1><CardTitle>{dish.name}</CardTitle></h1>
                                    <CardText><i className="fa fa-search-plus"></i> Click to expand</CardText>
                                    </CardBody>
                                </Fade>
                                : null
                            }
                        </CardImgOverlay>
                    </Card>
            </LightgalleryItem>
        </div>
        )
}

function DishesMenu({dishes, dishesLoading, dishesErrMess, cuisine, toggleHover, hover}) {
    const cuisinedishes = dishes.filter((filtereddish) => filtereddish.cuisine === cuisine).map((dish) => {
        return(
            <Collapse key={dish.id} isOpen={true} className="gallery p-0">
                    <Fade key={dish.id}>
                        <FadeTransform
                            in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                                {dish.cuisineId < 9 ?  
                                    <RenderMenuItem 
                                        dish={dish} 
                                        toggleHover={toggleHover}
                                        hover={hover}
                                    />
                                : null}
                                
                        </FadeTransform>
                    </Fade>
            </Collapse>
        )
    })
    if (dishesLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (dishesErrMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{dishesErrMess}</h4>
                </div>
            </div>
        )
    }

    else    
        return (
                <div className="masonry mx-4">
                    {cuisinedishes}
                </div>
            );
};

class CuisineTabs extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
        this.state = { 
            hover: false,
            cuisine: "Indian",
            cuisines: ["Italian", "Chinese", "Thai"],
            }
            
        }
    toggleHover(e) {
        let event = e.target.dataset.event;
        this.setState(
            {
                hover:  this.state.hover  === String(event) ? false : Number(event),
            }
        )
    }

    toggleClass() {
        this.setState({active: !this.state.active})
    }

    toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ 
            cuisine: this.state.cuisine === String(event) ? "" : String(event),          
        });
    }

    render() {
        const {cuisines} = this.state;
        return( 
            <div>
                <Row className="top-spacing bottom-spacing d-flex justify-content-center mx-md-5">
                    <Col className="col-9" >
                        <div className="d-flex flex-column flex-md-row justify-content-around">
                            <button className={this.state.cuisine === 'Indian' ? "button-active" : "button"} onClick={this.toggle} data-event="Indian">
                                <Trigger onClick={this.toggle} data-event="Indian">
                                    <span onClick={this.toggle} data-event="Indian" className="button-content">Indian</span>  
                                    <DiagonalSwipe onClick={this.toggle} data-event="Indian"></DiagonalSwipe> 
                                </Trigger>
                            </button>
                            {cuisines.map(index => {
                                return (
                                    <button className={this.state.cuisine === index ? "button-active my-1 my-md-0" : "button my-1 my-md-0"} onClick={this.toggle} data-event={index} key={index}>
                                        <Trigger onClick={this.toggle} data-event={index}>
                                            <span onClick={this.toggle} data-event={index} className="button-content">{index}</span>  
                                            <DiagonalSwipe onClick={this.toggle} data-event={index}></DiagonalSwipe> 
                                        </Trigger>
                                    </button>
                                )
                            })}
                        </div>
                    </Col>
                </Row>
                <div height="100%" className="p-0">
                    <DishesMenu
                        dishes={this.props.dishes}
                        dishesLoading={this.props.dishesLoading}
                        dishesErrMess={this.props.dishesErrMess} 
                        cuisine={this.state.cuisine}
                        toggleHover={this.toggleHover}
                        hover={this.state.hover}
                        />
                </div>
            </div>
        )
        
    }
}

export default React.memo(CuisineTabs);
