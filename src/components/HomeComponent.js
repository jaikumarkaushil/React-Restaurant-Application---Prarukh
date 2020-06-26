import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Col, Row} from 'reactstrap';
import { Loading } from './LoadingComponent';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { baseUrl } from '../shared/baseUrl';
// fetch 8, udated the src

import { FadeTransform } from 'react-animation-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function RenderCard({item, isLoading, errMess}) {
    
    if (isLoading)
        return(
                <Loading />
        );
    
    else if (errMess) {
        return(
            <h4>{errMess}</h4>
        );
    }
    else
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                    <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );

}
const MenuCarousel = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                speed: 500,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 480,
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
        <Slider {...settings} className="container">
            <div>
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <div className="d-flex justify-content-center">
                        <img width="300px" height="300px" src="assets/images/Home_Breakfast_2.jpg" alt="Breakfast" />
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
                        <img width="300px" height="300px" src="assets/images/Home_Dinner_2.jpg" alt="Lunch" />
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
                        <img width="300px" height="300px" src="assets/images/Home_Lunch_5.jpg" alt="Dinner"/>
                    </div>
                </FadeTransform>
            </div>
        </Slider>
    )
}




function Home(props) {

    return(
        <div>
            <div className="home_cover"></div>
            <div className="home_overlay">
                <div className="overlay-alignment">
                    <h3 className="bottom-spacing" >A Multicuisine Restaurant</h3>
                    <MenuCarousel />
                    <h4 className="top-spacing"><em>"We think we’re in love, made to perfection and a perfect fuel to start with."</em></h4>
                </div>
            </div>
            <section className="intro-view pt-5">
                <h1 className="display-4 text-center italic top-spacing" >Natural Ingredients</h1>
                <h1 className="text-center italic golden bottom-spacing" >-- Dynamic Flavours --</h1>
                <div className="view">
                    <span className="intro-view1"  >
                        <img width="500px" height="280px" src='assets/images/intro-view1.jpg' alt="img"/>
                    </span>
                    <span className="intro-view2" >
                        <img  width="500px" height="300px" src='assets/images/intro-view2.jpg' alt="img"/>
                    </span>
                    <span className="intro-view3" >
                        <img width="500px" height="300px" src='assets/images/intro-view3.jpg' alt="img"/>
                    </span>
                </div>
            </section>
            <section className="know-more">
                <Row>
                    <Col className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                        <h2>Breakfast</h2>
                        <h2>-- <em>Food Varieties --</em></h2>
                    </Col>
                    <Col className="col-12 col-md-6">
                        <imgTransition item='http://localhost:3001/assets/images/Home_Breakfast_4.jpg' />
                    </Col>
                </Row>
            </section>            
        </div>
        
		)
}
const imgTransition = (props) => {
        return(
            <div>
                <CSSTransition in={true} timeout={200} classNames="my-node">
                    <img src={props.item} alt="img" />
                </CSSTransition>
            </div>
        )
}

export default Home;