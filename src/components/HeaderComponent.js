import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, Button } from 'reactstrap';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {
      isMenuOpen: false,
    };
  }
  toggleMenu() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
      });
    }
  closeMenu() {
      this.setState({isMenuOpen: false})
    }
  handleStateChange (state) {
    this.setState({isMenuOpen: state.isOpen})  
  } 

  render () {
    return (
      <div>
        <Navbar dark fixed="top" className="navStyle">
          <NavbarToggler className="ml-5" onClick={this.toggleMenu} />
          <NavbarBrand href="/">
            <h1 className="m-auto italic" >Prarukh</h1>
          </NavbarBrand>
          <Nav className="mr-5" navbar>
              <NavItem>
              <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
              </NavItem>
          </Nav>
      </Navbar>
      <Menu width="400px" noOverlay isOpen={this.state.isMenuOpen}
      onStateChange={(state) => this.handleStateChange(state)} disableAutoFocus customBurgerIcon={ false }>
          <Nav vertical className="navlinkStyle">
              <h1 className="mt-4" >Prarukh</h1>
              <hr/>
            <NavItem>
                <NavLink className="nav-link" onClick={this.closeMenu} to='/home'>Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="nav-link"  onClick={this.closeMenu} to='/menu'>Menu</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="nav-link" onClick={this.closeMenu} to='/contactus'>Contact Us</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="nav-link"  onClick={this.closeMenu} to='/aboutus'>About Us</NavLink>
            </NavItem>
          </Nav>
        </Menu>
      </div>
    );
  }
}


export default Header;