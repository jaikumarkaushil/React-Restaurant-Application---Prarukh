import React from 'react';
import { Collapse, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Col, Row} from 'reactstrap';
import { Loading } from './LoadingComponent';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Fade } from 'react-awesome-reveal';
import { Slide } from 'react-awesome-reveal';
import ReservationForm from './ReservationForm';
import { HashLink} from 'react-router-hash-link';
import { Link } from 'react-scroll';
import Trigger from '../styles/Trigger';
import DiagonalSwipe from '../styles/diagonalSwipe';
import CuisineTabs from './CuisineTabs';
import { LightgalleryItem } from "react-lightgallery";
import { CSSTransition } from 'react-transition-group';


const MenuCarousel = () => {
    var settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        pauseOnHover: true,
        responsive: [
            {
            breakpoint: 1000,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 1000,
                autoplay: true,
                autoplaySpeed: 2000,
                pauseOnHover: true
                }
            }
        ]
    };
    return(
        
            <Slider {...settings} className="container row pb-4">
                    <div className="d-flex flex-column align-items-center">
                        <CSSTransition classNames="step" timeout={1000}>
                            <img style={{borderRadius: "6px"}} width="85%" height="300px" src="/assets/images/Home_Breakfast_2.jpg" alt="Breakfast" />
                        </CSSTransition>
                        <Link to="breakfast" smooth={true} offset={-280} duration={2000} className="col-11 mt-3">
                            <button className="button col-12">
                                <Trigger >
                                    <span className="button-content">Breakfast</span>  
                                    <DiagonalSwipe></DiagonalSwipe> 
                                </Trigger>
                            </button>
                        </Link>
                    </div>

                    <div className="d-flex flex-column align-items-center">
                        <CSSTransition classNames="step" timeout={1000}>
                            <img style={{borderRadius: "6px"}} width="85%" height="300px" src="/assets/images/Home_Dinner_2.jpg" alt="Lunch" />
                        </CSSTransition>
                        <Link to="lunch" smooth={true} offset={-100} duration={2000} className="col-11 mt-3">
                            <button className="button col-12">
                                <Trigger >
                                    <span className="button-content">Lunch</span>  
                                    <DiagonalSwipe></DiagonalSwipe> 
                                </Trigger>
                            </button>
                        </Link>
                    </div>
                
                    <div className="d-flex flex-column align-items-center">
                        <CSSTransition classNames="step" timeout={1000}>
                            <img style={{borderRadius: "6px"}} width="85%" height="300px" src="assets/images/Home_Lunch_5.jpg" alt="Dinner"/>
                        </CSSTransition>
                        <Link to="dinner" smooth={true} offset={-100} duration={2000} className="col-11 mt-3">
                            <button className="button col-12">
                                <Trigger >
                                    <span className="button-content">Dinner</span>  
                                    <DiagonalSwipe></DiagonalSwipe> 
                                </Trigger>
                            </button>
                        </Link>
                    </div>
            </Slider>
    )
}

const DishesCarousel =({dishes, dishesLoading, dishesErrMess}) => {
    
    var settings = {
        centerMode: true,
        centerPadding: "380px",
        slidesToShow: 1,
        dots:true,
        arrows: false,
        autoplay:true,
        autoplaySpeed:2000,
        pauseOnFocus:true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    centerMode: true,
                    centerPadding: "200px",
                    slidesToShow: 1,
                    infinite: true,
                    dots: true,
                    arrows: true,
                    autoplay:true,
                    autoplaySpeed:2000,
                    }
                },
            {
            breakpoint: 900,
            settings: {
                centerMode: true,
                centerPadding: "150px",
                slidesToShow: 1,
                infinite: true,
                arrows: true,
                autoplay:true,
                autoplaySpeed:2000,
                }
            },
            {
                breakpoint: 678,
                settings: {
                    centerMode: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight:true,
                    arrows: true,
                    autoplay:true,
                    autoplaySpeed:2000,
                    }
                }
            ]
    };
    const populardishes = dishes.map((dish) => {
        return(
            <Collapse key={dish.id} isOpen={true} className="p-0 bg-white">
                <LightgalleryItem group="any" src={dish.image} subHtml={".photocaption"} closable={true}>
                    <img style={{cursor: "pointer"}} width="100%" height="450vmin" src={dish.image} alt={dish.name} />                               
                </LightgalleryItem>
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
        return(
            <Slider {...settings} className="row container-fluid px-0 top-spacing">
                {populardishes}
            </Slider>
        )
}

function TrendItem ({item}){
    return(
        <Fade>
            <Card className=" row flex-row">
                <div className="col-md-3 col-sm-6 col-12 p-4">
                    <CardImg height="200px" src={item.image} alt={item.name} />
                </div>
                <div className="col-md-9 col-sm-6 col-12">
                    <CardBody className="row">
                        <Col sm={12} md={7} lg={8}>
                            {item.label === "Hot" ? <CardTitle><h1 className="d-none d-md-block">{item.name}</h1><h3 className="d-block d-md-none">{item.name}</h3> <span className="badge badge-danger">HOT</span></CardTitle> : <CardTitle><h1 className="d-none d-md-block">{item.name}</h1><h3 className="d-block d-md-none">{item.name}</h3></CardTitle> }
                            {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                            <h4><CardText className="d-none d-md-block"> {item.description}</CardText></h4>
                        </Col>
                        <Col sm={12} md={5} lg={4} className="d-flex justify-content-md-center">
                            <h4> Rs. {item.price}</h4>
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
            <div className="home_cover">
                <div className="home_overlay">
                    <div className="header-spacing center-alignment text-white">
                        <h1 className="p-3 d-none d-md-block text-center" >A Multicuisine Restaurant</h1>
                        <h2 className="p-5 d-block d-md-none text-center" >A Multicuisine Restaurant</h2>
                        <MenuCarousel />
                        <div className="col-8 p-2 d-flex justify-content-center">
                            <HashLink smooth to="/menu/#menu" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                                <button className="button col-12">
                                    <Trigger >
                                        <span className="button-content">Full Menu</span>  
                                        <DiagonalSwipe></DiagonalSwipe> 
                                    </Trigger>
                                </button>
                            </HashLink>
                        </div>
                        <h4 className="text-center"><em>"We think we’re in love, made to perfection and a perfect fuel to start with."</em></h4>
                        <Link to="introView" smooth={true} offset={-12} duration={600} className="text-center mt-4">
                            <i className="fa fa-arrow-down fa-lg" aria-hidden="true"></i>
                        </Link>
                        
                    </div>
                </div>
            </div>
            <section name="introView" className="intro-view mt-3 overlay-white">
                <h1 className="text-center italic golden top-spacing bottom-spacing" >-- Dynamic Flavours --</h1>
                <div className="view">
                    <div className="view-alignment">
                        <Fade cascade triggerOnce duration={2000} fraction={0}>
                            <div className="intro-view1">
                                <img src='/assets/images/intro-view1.jpg' alt="img"/>
                            </div>
                            <div className="intro-view2">
                                <img src='/assets/images/intro-view2.jpg' alt="img"/>
                            </div>
                            <div className="intro-view3" >
                                <img src='/assets/images/intro-view3.jpg' alt="img"/>
                            </div>
                        </Fade>
                    </div>
                    <h3 className="intro-text text-center d-md-none">Eat food, eat healthy!</h3>
                </div>
                
            </section>
            <section id="knowMore top-spacing">
                <Row className="know-more" name="breakfast">
                    <Col className="col-12 col-md-6 p-0 center-alignment">
                        <h1 className="bottom-spacing top-spacing view-heading">Breakfast</h1>
                        <h2 className="bottom-spacing">-- <em>Food Varieties --</em></h2>
                        <h3 className="text-center px-5 bottom-spacing">Ullamco commodo id quis do exercitation anim labore velit duis nisi ullamco officia sunt proident. Laborum aliquip ea anim reprehenderit veniam incididunt.</h3>
                    </Col>
                    <Col className="col-12 col-md-6 p-0 top-spacing">
                        <Slide direction="right" triggerOnce delay={1000} fraction={0}>
                            <img className="img-fluid" src="/assets/images/Home_Breakfast_4.jpg" alt="img" />
                        </Slide>
                    </Col>
                </Row>
                <Row className="know-more" name="lunch">
                    <Col className="col-12 col-md-6 p-0 bottom-spacing">
                        <Slide triggerOnce delay={1000} fraction={0}>
                            <img className="img-fluid" src="assets/images/Home_Lunch_7.jpg" alt="img" />
                        </Slide>
                    </Col>
                    <Col className="col-12 col-md-6 p-0 center-alignment">
                        <h1 className="top-spacing bottom-spacing">Lunch</h1>
                        <h2 className="bottom-spacing">-- <em>Food Varieties --</em></h2>
                        <h3 className="text-center px-5 bottom-spacing">Ullamco commodo id quis do exercitation anim labore velit duis nisi ullamco officia sunt proident. Laborum aliquip ea anim reprehenderit veniam incididunt.</h3>
                    </Col>
                </Row>
                <Row className="know-more" name="dinner">
                    <Col className="col-12 col-md-6 p-0 center-alignment">
                        <h1 className="bottom-spacing top-spacing">Dinner</h1>
                        <h2 className="bottom-spacing">-- <em>Food Varieties --</em></h2>
                        <h3 className="text-center px-5 bottom-spacing">Ullamco commodo id quis do exercitation anim labore velit duis nisi ullamco officia sunt proident. Laborum aliquip ea anim reprehenderit veniam incididunt.</h3>
                    </Col>
                    <Col className="col-12 col-md-6 p-0">
                        <Slide direction="right" triggerOnce delay={1000} fraction={0}>
                            <img className="img-fluid" src="/assets/images/Home_Dinner_3.jpg" alt="img" />
                        </Slide>
                    </Col>
                </Row>
            </section>

            <section className="trendslist botton-spacing">
                <h1 className="text-center italic golden top-spacing bottom-spacing view-heading overlay-white" >-- Trends --</h1>
                <div className="row m-0 align-items-center justify-content-center">
                    <div className="col-12 container-fluid">
                        {trends}
                    </div>
                    <div className="col-8 p-3 d-flex justify-content-center">
                        <HashLink smooth to="/menu/#menu" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                            <button className="button col-12">
                                <Trigger >
                                    <span className="button-content">Full Menu</span>  
                                    <DiagonalSwipe></DiagonalSwipe> 
                                </Trigger>
                            </button>
                        </HashLink>
                    </div>
                </div>
            </section>
            <section className="cuisine-gallery bottom-spacing">
                <h1 className="text-center italic golden view-heading top-spacing overlay-white mb-0" >-- Gallery --</h1>
                <h5 className="text-center italic golden bottom-spacing overlay-white" >"Cooking is like love. It should be entered into with abandon or not at all."</h5>
                <CuisineTabs 
                    dishes={props.dishes}
                    dishesLoading={props.dishesLoading}
                    dishesErrMess={props.dishesErrMess}
                    />
            </section> 
            <section className="popular-dishes-carousel bottom-spacing">
                <h1 className="top-spacing italic golden overlay-white text-center mb-0">--- Most Popular Dishes only for You! ---</h1>
                <h4 className="bottom-spacing golden overlay-white text-center"><em>“One cannot think well, love well, sleep well, if one has not dined well.” ...</em></h4>
                <DishesCarousel 
                    dishes={props.promotions}
                    dishesLoading={props.dishesLoading}
                    dishesErrMess={props.dishesErrMess}
                />
            </section>
            <section id="reservation" className="book-or-order d-flex flex-row align-items-center">
                <ReservationForm 
                    resetReservationForm={props.resetReservationForm} 
                    postReservation={props.postReservation}
                />
            </section> 
        </div>
		)
}

export default React.memo(Home);