import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      isMenuOpen: false,
      isModalOpen: false,
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

  toggleModal() {
    this.setState({
        isModalOpen: !this.state.isModalOpen    // this will change the state of modal to negation of the isModalOpen
    });
}

  handleLogin(event) {
    this.toggleModal();
    alert("Username: " + this.username.value + " Password: " + this.password.value
        + " Remember: " + this.remember.checked);
    event.preventDefault();

}

  render () {
    return (
      <div>
        <Navbar dark fixed="top" className="d-flex flex-row justify-content-xl-around justify-content-center">
          <NavbarBrand href="/">
            <h1 className="italic golden" >Prarukh</h1>
          </NavbarBrand>
          <Nav navbar className="d-flex flex-row justify-content-end">
            <NavItem className="mx-lg-4 d-none d-lg-block">
              <HashLink smooth to="/home/#reservation" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                <button className="button2"><span className="fa fa-ticket fa-lg"></span> Reservation</button>
              </HashLink>
            </NavItem>
            <NavItem className="mr-lg-4 d-none d-lg-block">
              <button className="button2" color="success" onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</button>
            </NavItem>
          </Nav>
      </Navbar>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
        <ModalBody>
            <Form onSubmit={this.handleLogin}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" id="username" name="username"
                        innerRef={(input) => this.username = input} 
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" name="password"
                        innerRef={(input) => this.password = input} 
                    />
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="remember"
                        innerRef={(input) => this.remember = input}  />
                        Remember me
                    </Label>
                </FormGroup>
                <Button type="submit" value="submit" color="primary">Login</Button>
            </Form>
        </ModalBody>
      </Modal>
      <Menu width={"300px"} noOverlay isOpen={this.state.isMenuOpen} onClick={this.toggleMenu}
      onStateChange={(state) => this.handleStateChange(state)}>
          <Nav vertical className="navlinkStyle">
              <h1 className="mt-4">Prarukh</h1>
              <hr/>
            <NavItem>
                <NavLink className="nav-link" onClick={this.closeMenu} to='/home'>Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="nav-link"  onClick={this.closeMenu} to='/menu'>Menu</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="nav-link"  onClick={this.closeMenu} to='/aboutus'>About Us</NavLink>
            </NavItem>
            <NavItem className="my-5 d-lg-none">
              <HashLink smooth to="/home/#reservation" scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
              <button className="button2"><span className="fa fa-ticket fa-lg"></span> Reservation</button>
              </HashLink>
            </NavItem>
            <NavItem className="my-5 d-lg-none">
              <button className="button2" color="success" onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</button>
            </NavItem>
          </Nav>
        </Menu>
      </div>
    );
  }
}


export default Header;