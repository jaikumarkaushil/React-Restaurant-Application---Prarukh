import React from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';
import Contact from './ContactComponent';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Fade } from 'react-animation-components';
import Trigger from '../styles/Trigger';
import DiagonalSwipe from '../styles/diagonalSwipe';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Slide } from 'react-awesome-reveal';
import { HashLink} from 'react-router-hash-link';
import { Link } from 'react-scroll';


function RenderLeader({leader, isLoading, errMess}) {
    
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
        return (
            <Card key={leader.id} className="mx-xl-4 mx-lg-3 mx-1" >
                <CardImg width="100%" height="300vh" top src={baseUrl + leader.image} alt={leader.name} />
                <CardBody >
                    <CardTitle><h3>{leader.name}</h3></CardTitle>
                    <CardText className="d-none d-md-block">{leader.description}</CardText>
                </CardBody>
            </Card>
        )
}

function LeaderList(props) {
    var settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                infinite: true,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 2000,
                }
            }
        ]
    };
    const leaders = props.leaders.leaders.map((leader) => {
        return (
            <Fade in key={leader._id}>
                <RenderLeader leader={leader} />
            </Fade>
        );
    });
    if (props.leaders.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.leaders.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.leaders.errMess}</h4>
                </div>
            </div>
        )
    }
    else
        return(
            <Slider {...settings} className="container chefs">
                {leaders}
            </Slider>
        );
}

function About(props) {
    return(
        <div>
            <div className="overlay-viewport"></div>
            <div className="popular_dishes_cover bottom-spacing mb-5">
                <div className="overlay-content-center">
                    <div className="text-white text-center container">
                        <h3 className="bottom-spacing" >A place where your wishes come true!!</h3>
                        <h4 className="bottom-spacing"><em>“One cannot think well, love well, sleep well, if one has not dined well.” ...</em></h4>
                        <div className="d-flex-inline d-none d-md-block">
                            <Link to="send-feedback" smooth={true} offset={-80} duration={2000}>
                                <button className="button m-4">
                                    <Trigger >
                                        <span className="button-content">Send FeedBack</span>  
                                        <DiagonalSwipe></DiagonalSwipe> 
                                    </Trigger>
                                </button>
                            </Link>
                            <HashLink smooth to="/home/#reservation" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                                <button className="button m-4">
                                    <Trigger >
                                        <span className="button-content">Reservation</span>  
                                        <DiagonalSwipe></DiagonalSwipe> 
                                    </Trigger>
                                </button>
                            </HashLink>
                        </div>
                    </div>
                </div>
                <div className="center-alignment chefs">
                    <LeaderList leaders={props.leaders} />
                </div>
            </div>
            <div className="row top-spacing mt-md-5">
                <div className="col-12 container top-spacing mt-md-5">
                    <h1 className="bottom-spacing italic golden text-center">--- Our Story ---</h1>
                    <h3 className="bottom-spacing italic text-center">"We provide a wide range of services and food choices to meet the wishes of our customers."</h3>
                </div>
                <div className="row bottom-spacing">
                    <div className="col-12 col-md-6 top-spacing bottom-spacing center-alignment ">
                        <Slide delay={600} triggerOnce >
                            <img width="100%" src={baseUrl + "assets/images/OurStory.jpeg"} alt="OurStory.jpg" />
                        </Slide>
                    </div>
                    <div className="col-12 col-md-6 center-alignment top-spacing">
                        <h5 className="text-center px-2 px-md-5">Our chiefs and staff members consists of highly motivated and skilled specialists who know how to deal with any issue that you may come across. This creates a basis for lasting relationships with our clients built on trust and mutual understanding. We are devoted to prepare world class unique variety of cuisines from all over the world along with the high-quality supporting services that will never let you go unsatisfied.</h5>
                        <h5 className="text-center px-2 px-md-5 d-none d-md-block">Ea mollit labore fugiat ut sunt cupidatat laborum duis. Sunt occaecat enim mollit reprehenderit nostrud excepteur ea sunt incididunt exercitation non aliquip ut qui. Ex est sunt officia fugiat Lorem labore pariatur nisi ut quis sit exercitation nisi culpa.</h5>
                    </div>
                </div>
                <div className="col-12">
                    <h1 className="bottom-spacing italic golden text-center">--- Our Results ---</h1>
                    <h3 className="bottom-spacing italic text-center">"We are very happy about our achievements and don't hide them"</h3>
                    <div className="d-md-flex justify-content-around p-5">
                        <div className="col-12 col-md-3 p-md-4 text-center ">
                            <h2 className="bottom-spacing">421</h2>
                            <h3>Food Items to serve</h3>
                            <p>Variety that makes customers happy</p>
                        </div>
                        <div className="col-12 col-md-3 p-4 text-center ">
                            <h2 className="bottom-spacing">2823</h2>
                            <h3>Prarukh Happy Customers</h3>
                            <p>In 6 months</p>
                        </div>
                        <div className="col-12 col-md-3 p-4 text-center">
                            <h2 className="bottom-spacing">50</h2>
                            <h3>Staff Members</h3>
                            <p>To serve you better</p>
                        </div>
                        <div className="col-12 col-md-3 p-4 text-center">
                            <h2 className="bottom-spacing">15</h2>
                            <h3>World class Chefs</h3>
                            <p>To serve you the best</p>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote text-center">
                                <p>You better cut the pizza in four pieces because
                                    I'm not hungry enough to eat six.</p>
                                <footer className="blockquote-footer">Yogi Berra,
                                <cite title="Source Title">The Wit and Wisdom of Yogi Berra,
                                    P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <Contact resetFeedbackForm={props.resetFeedbackForm} postFeedback={props.postFeedback} />
            
        </div>
    );
}

export default React.memo(About);    