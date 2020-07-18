import React, { Component } from 'react';
import { Collapse, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardImgOverlay, Breadcrumb, BreadcrumbItem, Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Fade } from 'react-reveal';
import { FadeTransform } from 'react-animation-components';
import { baseUrl } from '../shared/baseUrl';
import Trigger from '../styles/Trigger';
import DiagonalSwipe from '../styles/diagonalSwipe';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import { Loading } from './LoadingComponent';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ReservationForm from './ReservationForm';
import Dishdetail from './DishdetailComponent';


function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "block", position: "absolute", top: "50vh", right: "5%" }}
        onClick={onClick}
        />
    );
}
function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "block", position: "absolute", top: "50vh", left: "5%", zIndex: "4" }}
        onClick={onClick}
        />
    );
}

const MenuCarousel =({dishesLoading, dishesErrMess}) => {
    
    var settings = {
        dots: true,
        slidesToShow: 1,
        arrows: true,
        autoplay:true,
        autoplaySpeed:3000,
        pauseOnFocus:true,
        slidesToScroll: 1,
        fade: true,
        
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        appendDots: dots => (
                <ul style={{
                    position: "absolute",
                    top:"95vh",
            }}> {dots} </ul>
        ),
        customPaging: function(i) {
            return (
                <a>
                    <img width="10px" height="10px" style={{borderRadius: "50%"}} src={`${baseUrl}/assets/images/breakfast2.jpg`} />
                </a>
            );
            },
        responsive: [
            {
                breakpoint: 678,
                settings: {
                    dots: false,
                    slidesToShow: 1,
                    arrows: false,
                    autoplay:true,
                    autoplaySpeed:3000,
                    pauseOnFocus:true,
                    slidesToScroll: 1,
                    fade: true,
                    }
                },
        ]
        
    };
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
            <Slider {...settings}>
                <div className="menu_cover_1">
                    <div className="home_overlay">
                        <div className="content-center text-center">
                            <h1 className="text-white top-spacing">Breakfast</h1>
                            <h3 className="text-white">"Breakfast was only worth having when somebody else made it for you ....."</h3>
                            <Link to="menu" smooth={true} offset={-20} duration={2000} className="d-flex justify-content-center top-spacing bottom-spacing">
                                <button className="button">
                                    <Trigger >
                                        <span className="button-content">Menu</span>  
                                        <DiagonalSwipe></DiagonalSwipe> 
                                    </Trigger>
                                </button>
                            </Link>
                            <Link to="menu" smooth={true} offset={-20} duration={600} className="text-center mt-5 text-white">
                                <i className="fa fa-arrow-down fa-lg top-spacing" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="menu_cover_2">
                    <div className="home_overlay">
                        <div className="content-center text-center">
                            <h1 className="text-white">Lunch</h1>
                            <h3 className="text-white">"All you need is love, but sometimes, a lunch break works, too."</h3>
                            <Link to="menu" smooth={true} offset={-20} duration={2000} className="d-flex justify-content-center top-spacing bottom-spacing">
                                <button className="button">
                                    <Trigger >
                                        <span className="button-content">Menu</span>  
                                        <DiagonalSwipe></DiagonalSwipe> 
                                    </Trigger>
                                </button>
                            </Link>
                            <Link to="menu" smooth={true} offset={-20} duration={600} className="text-center mt-5 text-white">
                                <i className="fa fa-arrow-down fa-lg top-spacing" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="menu_cover_3">
                    <div className="home_overlay">
                        <div className="home_overlay">
                            <div className="content-center text-center">
                                <h1 className="text-white">Dinner</h1>   
                                <h3 className="text-white">"If a restaurant offers crayons, I always take them and color throughout the meal. It beats talking to people I came to dinner with"</h3>
                                <Link to="menu" smooth={true} offset={-20} duration={2000} className="d-flex justify-content-center top-spacing bottom-spacing">
                                    <button className="button">
                                        <Trigger >
                                            <span className="button-content">Menu</span>  
                                            <DiagonalSwipe></DiagonalSwipe> 
                                        </Trigger>
                                    </button>
                                </Link>
                                <Link to="menu" smooth={true} offset={-20} duration={600} className="text-center mt-5 text-white">
                                    <i className="fa fa-arrow-down fa-lg top-spacing" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
        )
}

function RenderMenuItem({dish, toggleHover, hover, onDishSelect}) {
        
        return(
                
            <div key={dish.id}>
                <div className="photocaption d-none">{dish.name} | Rs. {dish.price}</div>
                <Fade>
                    <Card style={{cursor:"pointer"}}>
                        <CardImg width="100%" height="320px" src={baseUrl + dish.image} alt={dish.name} />
                        <Fade className="text-white" triggerOnce>
                            <CardImgOverlay onMouseEnter={toggleHover} onMouseLeave={toggleHover}  data-event={dish.id}>
                                {hover === dish.id ? 
                                    <CardBody className="text-center transparent-black-overlay bottom-position-parent">
                                        <CardTitle><h3 className="d-none d-md-block">{dish.name}</h3><h4 className="d-block d-md-none">{dish.name}</h4></CardTitle>                                    
                                        <CardText className="bottom-position-center d-block" >
                                            <button className="top-spacing bottom-spacing button">Rs. {dish.price}</button>
                                            <span className="clicking-button top-spacing bottom-spacing d-block"  onClick={() => onDishSelect(dish)} >Click for more details</span>
                                        </CardText>
                                    </CardBody>
                                    : null
                                }
                            </CardImgOverlay>
                        </Fade>
                    </Card>
                </Fade>
            </div>
            
    
            )
        
        
}
function DishesMenu({dishes, dishesLoading, dishesErrMess, cuisine, category, subCategory, toggleHover, hover, selectedDish, onDishSelect, comments, commentsErrMess, postComment}) {
    
    const cuisinedishes = dishes.filter((filtereddish) => {
        if(cuisine) {
            return(
                filtereddish.cuisine === cuisine
            )
        }
        if(category) {
            return(
                filtereddish.category === category
            )
        }
        else {
            return filtereddish.id
        }
    }).filter((filtereddish) => {
        if(cuisine) {
            if(category) {
                if(category === 'Lunch/Dinner' && subCategory) {
                    return(
                        filtereddish.subCategory === subCategory
                    )
            }
                else
                    return(
                        filtereddish.category === category
                    )
            }           
            else
                return(
                    filtereddish.cuisine === cuisine
                )
        }
        
        if(category === 'Lunch/Dinner' && subCategory) {
                return(
                    filtereddish.subCategory === subCategory
                )
        }
        
        else {
            return filtereddish.id
        }
    }).map((dish) => {
        return(
            <Collapse isOpen={true} style={{height: "max-content"}} className="col-8 col-sm-6 col-md-4 col-lg-3 p-0 bg-white" key={dish.id}>
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                        <RenderMenuItem 
                            dish={dish} 
                            toggleHover={toggleHover}
                            hover={hover}
                            selectedDish={selectedDish}
                            onDishSelect={onDishSelect}
                        />
                </FadeTransform>                   
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

    else {
        
        if(selectedDish != null) 
            
            return(
                <Dishdetail 
                    dish={selectedDish}
                    isLoading={dishesLoading} // isLoading is perfectly fine here since we are using only one dish here
                    errMess={dishesErrMess}
                    comments={comments}
                    commentsErrMess={commentsErrMess}
                    postComment={postComment}
                    />
            )
        else
        return (
                <div className="bottom-spacing row ">
                    {cuisinedishes}
                </div>    
            );
        }
};

class Menu extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onDishSelect = this.onDishSelect.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
        this.toggleCategory = this.toggleCategory.bind(this);
        this.toggleSubCategory = this.toggleSubCategory.bind(this);
        this.state = { 
            selectedDish: null,
            hover: null,
            cuisine: "",
            cuisines: ["Indian", "Italian", "Chinese", "Thai"],
            category: "",
            categories: ["Breakfast", "Lunch/Dinner"],
            subCategory: "",
            subCategories: {
                "All": ["Starters", "Starters/Main Course", "Main Course", "Pasta", "Pizza"],
                "Indian": ["Starters", "Main Course"],
                "Italian": ["Starters", "Pasta", "Pizza"],
                "Chinese": ["Starters", "Starters/Main Course"],
                "Thai": ["Starters", "Main Course" ]
            }
            
        }
    }
    onDishSelect(dish) {
        this.setState({selectedDish: dish});
    }

    handleLogin(event) {
        this.toggleMenuItem();
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();

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
            subCategory: ""            
        });
    }
    toggleCategory(e) {
        let event = e.target.dataset.event;
        this.setState({ 
            category: this.state.category === String(event) ? "" : String(event),
            subCategory: ""
        });
    }
    toggleSubCategory(e) {
        let event = e.target.dataset.event;
        this.setState({ 
            subCategory: this.state.subCategory === String(event) ? "" : String(event)
        });
    }
    render() {
        const {cuisines, categories, subCategories} = this.state;
        return( 
            <div>
                <MenuCarousel />
                <section name="menu">
                    <Row className="top-spacing bottom-spacing bg-white d-flex justify-content-center mx-md-5">
                        <Col className="mx-2 col-12"> 
                            <h2 className="text-center italic golden" >-- Menu --</h2>
                            <Col className="center-alignment">
                                {categories.map(index => {
                                    return(
                                        <button className={this.state.category === index ? "button-active m-4" : "button m-4"} onClick={this.toggleCategory} data-event={index} key={index}>
                                            <Trigger onClick={this.toggleCategory}>
                                                <span onClick={this.toggleCategory} data-event={index} className="button-content">{index}</span>  
                                                <DiagonalSwipe onClick={this.toggleCategory} data-event={index}></DiagonalSwipe> 
                                            </Trigger>
                                        </button>
                                    )
                                })}
                            </Col>
                        </Col>
                        <Col className="col-9" >
                            <Row className="d-flex justify-content-around bottom-spacing">
                                {cuisines.map(index => {
                                    return (
                                        <button className={this.state.cuisine === index ? "button-active" : "button"} onClick={this.toggle} data-event={index} key={index}>
                                            <Trigger onClick={this.toggle}>
                                                <span onClick={this.toggle} data-event={index} className="button-content">{index}</span>  
                                                <DiagonalSwipe onClick={this.toggle} data-event={index}></DiagonalSwipe> 
                                            </Trigger>
                                        </button>
                                    )
                                })}
                                
                            </Row>
                            {console.log(this.state.hover)}
                            <div className="center-alignment">
                                    {
                                        this.state.category === 'Lunch/Dinner' && this.state.cuisine === "" ?
                                            <div className="d-flex justify-content-around">
                                                {subCategories.All.map(index => {
                                                    return(
                                                        <button className={this.state.subCategory === index ? "button-active m-4" : "button m-4"} onClick={this.toggleSubCategory} data-event={index}>
                                                            <Trigger onClick={this.toggleSubCategory}>
                                                                <span onClick={this.toggleSubCategory} data-event={index} className="button-content">{index}</span>  
                                                                <DiagonalSwipe onClick={this.toggleSubCategory} data-event={index}></DiagonalSwipe> 
                                                            </Trigger>
                                                        </button>
                                                    )
                                        })}
                                                
                                            </div>
                                        : null
                                    }
                                    {
                                        this.state.category === 'Lunch/Dinner' && this.state.cuisine === "Indian" ?
                                            <div className="d-flex justify-content-around">
                                                {subCategories.Indian.map(index => {
                                                    return(
                                                        <button className={this.state.subCategory === index ? "button-active m-4" : "button m-4"} onClick={this.toggleSubCategory} data-event={index}>
                                                            <Trigger onClick={this.toggleSubCategory}>
                                                                <span onClick={this.toggleSubCategory} data-event={index} className="button-content">{index}</span>  
                                                                <DiagonalSwipe onClick={this.toggleSubCategory} data-event={index}></DiagonalSwipe> 
                                                            </Trigger>
                                                        </button>
                                                    )
                                        })}
                                                
                                            </div>
                                        : null
                                    }
                                
                                {
                                    this.state.category === 'Lunch/Dinner' && this.state.cuisine === 'Italian' ? 
                                    <div className="d-flex justify-content-around">
                                        {subCategories.Italian.map(index => {
                                            return(
                                                <button className={this.state.subCategory === index ? "button-active m-4" : "button m-4"} onClick={this.toggleSubCategory} data-event={index}>
                                                    <Trigger onClick={this.toggleSubCategory}>
                                                        <span onClick={this.toggleSubCategory} data-event={index} className="button-content">{index}</span>  
                                                        <DiagonalSwipe onClick={this.toggleSubCategory} data-event={index}></DiagonalSwipe> 
                                                    </Trigger>
                                                </button>
                                            )
                                        })}
                                    </div>
                                    : null
                                }
                                {
                                    this.state.category === 'Lunch/Dinner' && this.state.cuisine === 'Chinese' ? 
                                    <div className="d-flex justify-content-around">
                                        {subCategories.Chinese.map(index => {
                                            return(
                                                <button className={this.state.subCategory === index ? "button-active m-4" : "button m-4"} onClick={this.toggleSubCategory} data-event={index}>
                                                    <Trigger onClick={this.toggleSubCategory}>
                                                        <span onClick={this.toggleSubCategory} data-event={index} className="button-content">{index}</span>  
                                                        <DiagonalSwipe onClick={this.toggleSubCategory} data-event={index}></DiagonalSwipe> 
                                                    </Trigger>
                                                </button>
                                            )
                                        })}
                                    </div>
                                    : null
                                }
                                {
                                    this.state.category === 'Lunch/Dinner' && this.state.cuisine === 'Thai' ? 
                                    <div className="d-flex justify-content-around">
                                        {subCategories.Thai.map(index => {
                                            return(
                                                <button className={this.state.subCategory === index ? "button-active m-4" : "button m-4"} onClick={this.toggleSubCategory} data-event={index}>
                                                    <Trigger onClick={this.toggleSubCategory}>
                                                        <span onClick={this.toggleSubCategory} data-event={index} className="button-content">{index}</span>  
                                                        <DiagonalSwipe onClick={this.toggleSubCategory} data-event={index}></DiagonalSwipe> 
                                                    </Trigger>
                                                </button>
                                            )
                                        })}
                                    </div>
                                    : null
                                }
                                </div>
                        </Col>
                    </Row>
                </section>
                <section height="100%" className="p-0 bg-white top-spacing bottom-spacing">
                    <DishesMenu
                        dishes={this.props.dishes}
                        dishesLoading={this.props.dishesLoading}
                        dishesErrMess={this.props.dishesErrMess}
                        cuisine={this.state.cuisine}
                        category={this.state.category}
                        subCategory={this.state.subCategory}
                        toggleHover={this.toggleHover}
                        hover={this.state.hover}
                        selectedDish={this.state.selectedDish}
                        onDishSelect={this.onDishSelect}
                        comments={this.props.comments} 
                        commentsErrMess={this.props.commentsErrMess}
                        postComment={this.props.postComment}
                        />
                </section>
                <section className="book-or-order d-flex flex-row align-items-center">
                    <ReservationForm
                        resetReservationForm={this.props.resetReservationForm} 
                        postReservation={this.props.postReservation}
                    />
                </section>
                {console.log(this.state.selectedDish + "hiskj")}
            </div>
        )
        
    }
}

export default Menu;