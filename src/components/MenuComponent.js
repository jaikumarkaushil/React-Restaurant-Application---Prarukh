// the component are initialized with capital letters.
import React from 'react';
//  media is module from reactstrap which is helpful in creating the list of objects.
// media is replaced with card 
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

import { baseUrl } from '../shared/baseUrl';
// fetch 7, update the src
function RenderMenuItem({dish}) {
    return(
        <Card>
            <Link to={`/menu/${dish.id}`}> {/*whatever is inside the backquote will get evaluated through javascript and output is given.*/}
                <CardImg  width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
        )
}
// redux thunk 9, add the dishes.dishes and conditions for isLoading, error message and menu objects.
const Menu = (props) => {
    const menu = props.dishes.dishes.map((dish) => {  // props is used to pass the parent information to menu component. A Map object iterates its elements in insertion order — a for...of loop returns an array of [key, value] for each iteration.
        return (
            // key attribute is used whenever there is array of objects, the key helps when React is rendering these items on the screen and helps in recognizing the items uniquely for each item
            <div className="col-12 col-md-5 m-1" key={dish.id}>
                <RenderMenuItem dish={dish} />
            </div>
        );
    });

    if (props.dishes.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (props.dishes.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.dishes.errMess}</h4>
                    </div>
                </div>
            )
        }
    
    else
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active >Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {menu}  {/* this is a javascript variable that we have defined in the const menu above. */}
                </div>    
            </div>
        );
}

export default Menu;