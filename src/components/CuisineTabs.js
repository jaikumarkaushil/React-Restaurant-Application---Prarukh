import React, { Component } from 'react';
import { Collapse, Row, Col, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Fade } from 'react-awesome-reveal';
import { FadeTransform } from 'react-animation-components';
import { baseUrl } from '../shared/baseUrl';
import Trigger from '../styles/Trigger';
import DiagonalSwipe from '../styles/diagonalSwipe';

function DishesMenu({dishes, cuisine, category, subCategory}) {
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
            <Collapse key={dish.id} isOpen={true}>
                <Col md={4} sm={6} className="d-flex justify-content-center col-8 offset-2 " key={dish.id} style={{float: "left"}}>
                    <Fade>
                        <FadeTransform
                            in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                            <Card >
                                <CardImg width="100%" height="200px" top src={baseUrl + dish.image} alt={dish.name} />
                                <CardBody>
                                    <CardTitle><h3>{dish.name}</h3></CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </FadeTransform>
                    </Fade>
                </Col>
            </Collapse>
        )
    })    
    return (
            <div>
                {cuisinedishes}
            </div>
        );
};

class CuisineTabs extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleCategory = this.toggleCategory.bind(this);
        this.toggleSubCategory = this.toggleSubCategory.bind(this);
        this.state = { 
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
            <Row className="top-spacing bottom-spacing bg-white d-flex justify-content-center mx-md-5">
                <Col md={2} className="mx-2"> 
                    <h2 className="text-center italic golden bottom-spacing ml-3" >Category</h2>
                    <Col className="center-alignment">
                        {categories.map(index => {
                            return(
                                <button className={this.state.category === index ? "button-active m-4" : "button m-4"} onClick={this.toggleCategory} data-event={index}>
                                    <Trigger onClick={this.toggleCategory}>
                                        <span onClick={this.toggleCategory} data-event={index} className="button-content">{index}</span>  
                                        <DiagonalSwipe onClick={this.toggleCategory} data-event={index}></DiagonalSwipe> 
                                    </Trigger>
                                </button>
                            )
                        })}
                        <div className="center-alignment">
                            {
                                this.state.category === 'Lunch/Dinner' && this.state.cuisine === "" ?
                                    <div className="center-alignment justify-content-sm-around">
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
                                    <div className="center-alignment">
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
                            <div className="center-alignment">
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
                            <div className="center-alignment">
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
                            <div className="center-alignment">
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
                </Col>
                <Col md={9} >
                    <Row className="d-flex justify-content-around bottom-spacing">
                        {cuisines.map(index => {
                            return (
                                <button className={this.state.cuisine === index ? "button-active" : "button"} onClick={this.toggle} data-event={index}>
                                    <Trigger onClick={this.toggle}>
                                        <span onClick={this.toggle} data-event={index} className="button-content">{index}</span>  
                                        <DiagonalSwipe onClick={this.toggle} data-event={index}></DiagonalSwipe> 
                                    </Trigger>
                                </button>
                            )
                        })}
                        
                    </Row>
                    
                    <DishesMenu className="row"
                    dishes={this.props.dishes} 
                    cuisine={this.state.cuisine}
                    category={this.state.category}
                    subCategory={this.state.subCategory}
                    />
                    
                    
                </Col>
            </Row>
            
        )
        
    }
}

export default CuisineTabs;
