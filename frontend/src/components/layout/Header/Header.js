import React, {Fragment} from 'react';
import { Navbar, Nav, Container} from 'react-bootstrap';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBox from "./SearchBox";
import Typography from '@mui/material/Typography';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UserOptions from "./UserOptions";
import store from "../../../store";
import {loadUser} from "../../../actions/userActions";
import {useSelector} from "react-redux";


function Header() {

  const {isAuthenticated, user} = useSelector(state => state.user);
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return(
    <header>
      <Navbar style={{"backgroundColor" : "tomato"}} expand='md' className="mb-3 py-3">
        <Container fluid>
          <Navbar.Brand href="/" className='ms-4'>
          <Typography variant="h4" gutterBottom component="div" sx={{fontSize: "130%"}}>
            ECOMMERCE
          </Typography>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              style={{ maxHeight: '100px' }}
              navbarScroll
              className="ms-auto"
            >
              <Nav.Item className="me-5 mt-2"><SearchBox/></Nav.Item>
              <Nav.Link href="/products" className="me-4 mt-2"><InventoryIcon /></Nav.Link>
              {!isAuthenticated ? (
                <Fragment>
                  <Nav.Item className="me-2 mt-2">
                    <Nav.Link href="/Cart" className="me-4"><ShoppingCartIcon /></Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="me-2 mt-2">
                    <Nav.Link href="/login" className="me-4"><AccountCircleIcon /></Nav.Link>
                  </Nav.Item>
                </Fragment>
              ) : (
                <Nav.Item className="me-2 mt-2">
                  <Nav.Link><UserOptions user = {user} /></Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
