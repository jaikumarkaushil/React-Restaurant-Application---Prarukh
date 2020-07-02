import React, { Component } from 'react';
import { Collapse, Row, Col } from 'reactstrap';
import { Fade } from 'react-awesome-reveal';
import { baseUrl } from '../shared/baseUrl';

function Indiandishes({dish}) {
        return (
            <div key={dish.id}>
                <img width="30%" height-md="200px" height="150px" height-lg="350px" style={{float: "left", margin: "1.66%"}} src={baseUrl + dish.image} alt="img"/>
            </div>
        );
};

class CuisineTabs extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: 0, cuisines: ["Indian", "Italian", "Chinese", "Thai"] };
    }

    toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : String(event) });
    }
    render() {
        const {cuisines, collapse} = this.state;
        return( 
            <Row>
                <Col sm={2}>
                
                </Col>
                <Col sm={10} className="d-flex flex-column justify-content-around">
                    {cuisines.map(index => {
                        const cuisine = this.props.dishes.filter((filterdish) => filterdish.cuisine === index).map((dish) => {  
                            return (
                                <div>
                                    <Collapse isOpen={collapse === index}>
                                        <div key={dish.id}>
                                            <Indiandishes dish={dish} />
                                        </div>
                                    </Collapse>
                                </div>
                            );
                        })
                        return(
                            <div key={index} className="row">
                                <div className="col-12">
                                    <button className="button" onClick={this.toggle} data-event={index} >{index}</button>   
                                </div>
                                <div className="col-12">
                                    {cuisine}
                                </div>
                            </div>
                        )
                    })}
                </Col>
            </Row>
            
        )
        
    }
}

export default CuisineTabs;
