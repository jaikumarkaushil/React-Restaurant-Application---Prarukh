// 2.1 this file will contain/store all the state properties for all the child components
import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'; // w3.3.4redux
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// Now, the main component will obtain the state information from redux store - Flux architecture
// states were used to store the local information/ properties that the component make use of in the project.

import { postReservation, postFeedback, postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';  //redux action 4

import { actions } from 'react-redux-form';
const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}
//redux action 4, dispatched the parameters or payloads and added attributes to the dishdetail view
// action is passed to the dispatch, we have defined the action in the commment reducer function
// fetch 6, fetchComments, fetchPromos, updated the Home props and Dishdetail props 
const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message, date) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message, date)),
  postReservation: (firstname, lastname, telnum, email, agree, contactType, message, date) => dispatch(postReservation(firstname, lastname, telnum, email, agree, contactType, message, date)),
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  resetReservationForm: () => { dispatch(actions.reset('reservation')) },
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())}
})

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  
  // redux thunk 7, add the dishesLoading, dishesErrMess for homepage, having multiple dishes and isLoading and errMess for single dish in the dishdetail component 
  render() {
    const HomePage = () => {
      
      return(
        <Home 
              dishes={this.props.dishes.dishes}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotions={this.props.promotions.promotions}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leaderLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}
              resetReservationForm={this.props.resetReservationForm} 
              postReservation={this.props.postReservation}
          />
      );
    }

    const DishWithId = ({match}) => {
      return (
        <Dishdetail 
            dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading} // isLoading is perfectly fine here since we are using only one dish here
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
        />
        )
    }

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} /> {/*w2.4 Configuring the route for home*/}
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes.dishes}
                                                              dishesLoading={this.props.dishes.isLoading}
                                                              dishesErrMess={this.props.dishes.errMess}
                                                              resetReservationForm={this.props.resetReservationForm} 
                                                              postReservation={this.props.postReservation} />} />
              {/* <Route path="/menu/:dishId" component={DishWithId} /> */}
              <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} /> 
              <Redirect to="/home"/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />      
      </div>
    );
  }
}
//UI components were used here.
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));