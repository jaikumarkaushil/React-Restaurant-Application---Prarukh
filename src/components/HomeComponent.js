import React, { Component } from 'react';
import { Media, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Col, Row} from 'reactstrap';
import { Loading } from './LoadingComponent';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Slide, Fade } from 'react-awesome-reveal';
import { baseUrl } from '../shared/baseUrl';
// fetch 8, udated the src

import { FadeTransform } from 'react-animation-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Trigger from '../styles/Trigger';
import DiagonalSwipe from '../styles/diagonalSwipe';
import CuisineTabs from './CuisineTabs';

const MenuCarousel = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
            breakpoint: 976,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                infinite: true,
                dots: true,
                autoplay: true,
                autoplaySpeed: 2000,
            }
            }
            ]
    };
    return(
        <Slider {...settings} className="container row">
            <div>
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <div className="d-flex justify-content-center">
                        <img width="85%" height="300px" src="assets/images/Home_Breakfast_2.jpg" alt="Breakfast" />
                    </div>
                </FadeTransform>
            </div>
            <div>
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <div className="d-flex justify-content-center">
                        <img width="85%" height="300px" src="assets/images/Home_Dinner_2.jpg" alt="Lunch" />
                    </div>
                </FadeTransform>
            </div>
            <div>
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <div className="d-flex justify-content-center">
                        <img width="85%" height="300px" src="assets/images/Home_Lunch_5.jpg" alt="Dinner"/>
                    </div>
                </FadeTransform>
            </div>
        </Slider>
    )
}

function TrendItem ({item}){
    return(
        <Fade cascade>
            <Card className="row flex-row">
                <div className="col-md-3 col-sm-6 col-12 p-4">
                    <CardImg height-md="100px" height="200px" src={baseUrl + item.image} alt={item.name} />
                </div>
                <div className="col-md-9 col-sm-6 col-12">
                    <CardBody className="row">
                        <Col sm={12} md={7} lg={8}>
                            {item.label === "Hot" ? <CardTitle>{item.name} <span className="badge badge-danger">HOT</span></CardTitle> : <CardTitle>{item.name}</CardTitle> }
                            {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                            <CardText className="d-none d-md-block">{item.description}</CardText>
                        </Col>
                        <Col sm={12} md={5} lg={4} className="d-flex justify-content-md-center">
                            {item.price}
                        </Col>
                    </CardBody>
                </div>
            </Card>
        </Fade>
    )
}

function Home(props) {
    const trends = props.dishes.filter((filterdish) => filterdish.trend).map((dish) => {  
        return (
            <div key={dish.id}>
                <TrendItem item={dish} />
            </div>
        );
    });
    return(
        <div>
            <div className="home_cover"></div>
            <div className="home_overlay">
                <div className="header-spacing center-alignment text-white">
                    <h3 className="bottom-spacing" >A Multicuisine Restaurant</h3>
                    <MenuCarousel />
                    <h4 className="top-spacing"><em>"We think we’re in love, made to perfection and a perfect fuel to start with."</em></h4>
                </div>
            </div>
            <section className="intro-view mt-3">
                    <h1 className="display-4 text-center italic top-spacing" >Natural Ingredients</h1>
                    <h1 className="text-center italic golden bottom-spacing view-heading" >-- Dynamic Flavours --</h1>
                <div className="view">
                    <div className="view-alignment">
                        <div className="intro-view1"  >
                            <img src='assets/images/intro-view1.jpg' alt="img"/>
                        </div>
                        <div className="intro-view2" >
                            <img src='assets/images/intro-view2.jpg' alt="img"/>
                        </div>
                        <div className="intro-view3" >
                            <img src='assets/images/intro-view3.jpg' alt="img"/>
                        </div>
                    </div>
                    <h3 className="intro-text text-center d-md-none">Adipisicing velit id pariatur amet fugiat consequat duis quis dolore aute et.</h3>
                </div>
                
            </section>
            <section className="know-more">
                <Row className="m-0">
                    <Col className="col-12 col-md-6 p-0 center-alignment">
                        <h2>Breakfast</h2>
                        <h2>-- <em>Food Varieties --</em></h2>
                        <p className="text-center px-5">Ullamco commodo id quis do exercitation anim labore velit duis nisi ullamco officia sunt proident. Nostrud consectetur dolore aliquip ad eiusmod labore reprehenderit sint exercitation tempor adipisicing. Sunt officia et anim mollit culpa sit ad. Do sit dolor tempor est cillum ea. Laborum aliquip ea anim reprehenderit veniam incididunt. Sit in nostrud officia aliqua.</p>
                    </Col>
                    <Col className="col-12 col-md-6 p-0">
                    <Slide direction="right">
                        <img className="img-fluid" src="http://localhost:3001/assets/images/Home_Breakfast_4.jpg" alt="img" />
                    </Slide>
                    </Col>
                </Row>
                <Row className="m-0">
                    <Col className="col-12 col-md-6 p-0">
                    <Slide>
                        <img className="img-fluid" src="http://localhost:3001/assets/images/Home_Breakfast_4.jpg" alt="img" />
                    </Slide>
                    </Col>
                    <Col className="col-12 col-md-6 p-0 center-alignment">
                        <h2>Lunch</h2>
                        <h2>-- <em>Food Varieties --</em></h2>
                        <p className="text-center px-5">Ullamco commodo id quis do exercitation anim labore velit duis nisi ullamco officia sunt proident. Nostrud consectetur dolore aliquip ad eiusmod labore reprehenderit sint exercitation tempor adipisicing. Sunt officia et anim mollit culpa sit ad. Do sit dolor tempor est cillum ea. Laborum aliquip ea anim reprehenderit veniam incididunt. Sit in nostrud officia aliqua.</p>
                    </Col>
                </Row>
                <Row className="m-0">
                    <Col className="col-12 col-md-6 p-0 center-alignment">
                        <h2>Dinner</h2>
                        <h2>-- <em>Food Varieties --</em></h2>
                        <p className="text-center px-5">Ullamco commodo id quis do exercitation anim labore velit duis nisi ullamco officia sunt proident. Nostrud consectetur dolore aliquip ad eiusmod labore reprehenderit sint exercitation tempor adipisicing. Sunt officia et anim mollit culpa sit ad. Do sit dolor tempor est cillum ea. Laborum aliquip ea anim reprehenderit veniam incididunt. Sit in nostrud officia aliqua.</p>
                    </Col>
                    <Col className="col-12 col-md-6 p-0">
                    <Slide direction="right">
                        <img className="img-fluid" src="http://localhost:3001/assets/images/Home_Breakfast_4.jpg" alt="img" />
                    </Slide>
                    </Col>
                </Row>
            </section>

            <section className="trendslist top-spacing botton spacing">
                <h1 className="text-center italic golden bottom-spacing view-heading" >-- Trends --</h1>
                <div className="row m-0 align-items-center justify-content-center">
                    <div className="col-8">
                        {trends}
                    </div>
                    <div className="col-8 p-3 d-flex justify-content-center">
                        <button className="button">
                            <Trigger >
                                <span className="button-content">Full Menu</span>  
                                <DiagonalSwipe></DiagonalSwipe> 
                            </Trigger>
                        </button>
                    </div>
                </div>
            </section>
            <section className="cuisine-gallery top-spacing bottom-spacing">
                <h1 className="text-center italic golden bottom-spacing view-heading" >-- Gallery --</h1>
                <CuisineTabs 
                    dishes={props.dishes}
                    dishesLoading={props.dishesLoading}
                    dishesErrMess={props.dishesErrMess}
                    />
            </section>            
        </div>
		)
}

export default Home;