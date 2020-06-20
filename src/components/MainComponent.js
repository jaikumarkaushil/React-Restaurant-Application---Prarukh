// 2.1 this file will contain/store all the state properties for all the child components
import React, { Component } from 'react';
import Home from './HomeComponent'; //w2.4
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent'; // Task1
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'; // w3.3.4redux
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// Now, the main component will obtain the state information from redux store - Flux architecture
// states were used to store the local information/ properties that the component make use of in the project.

import { postFeedback, postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';  //redux action 4

import { actions } from 'react-redux-form'; // react-redux-from revisited 2
//this will map the redux store's state into props that will become availabe to my component.
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
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
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
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leaderLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}
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
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} /> {/*Using arrow function we can pass the props to the child compoennts */}
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} /> } /> {/*No props are going to pass on*/}
              <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />  {/*W2 Assignment 2, Task1*/}
              <Redirect to="/home" />
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