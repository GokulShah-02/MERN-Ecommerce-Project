import React, {Fragment, useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
// import Pagination from "react-js-pagination";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {Row, Col, Dropdown} from "react-bootstrap";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import StarIcon from '@mui/icons-material/Star';
import {useAlert} from "react-alert";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {clearErrors, getProduct} from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData/MetatData";
import {PRODUCT_DETAILS_RESET} from "../../constants/productConstants";
import "./Products.css";


const categories = ["Mobile", "Electronic", "Camera"];

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6347",
    }
  },
});

function Products() {
  const {keyword} = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const [price, setPrice] = useState([0, 25000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const handleSwitch1Change = (event) => {
    setChecked1(event.target.checked);
  };

  const handleSwitch2Change = (event) => {
    setChecked2(event.target.checked);
  };

  const handlePriceChange = (event, newPrice) => {
    setChecked1(false);
    setChecked2(false);
    setPrice(newPrice);
    setCurrentPage(1);
  };

  const handleRatingChange = (event, newRatings) => {
    setChecked2(false);
    setChecked1(false);
    setRatings(newRatings);
    setCurrentPage(1);
  }

  const setCurrentPageNo = (e, p) => {
    setCurrentPage(p);
  };

  const {products, loading, error, productsCount, resultPerPage, filteredProductsCount} = useSelector(
    state => state.products
  );

  useEffect(() => {
    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch({type: PRODUCT_DETAILS_RESET});
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error, alert]);

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title="PRODUCTS  -- ECOMMERCE"/>
          <Row>
            <Col lg={2} md={3} xs={12} style={{"textAlign": "center"}}>
              <Dropdown autoClose="outside"  style={{paddingTop: "12vw"}}>
                <Dropdown.Toggle id="dropdown-basic" style={{minWidth: "150px", maxWidth: "90%", backgroundColor: "tomato", color: "black"}}>
                  <Typography gutterBottom sx={{"fontSize": "100%", color: "black"}} style={{display: 'inline-block'}}>
                    FILTERS <FilterAltIcon />
                  </Typography>
                </Dropdown.Toggle>

                <Dropdown.Menu style={{maxWidth: "200px"}}>
                  <Dropdown.Item href="#action1">
                    <Box style= {{minWidth: "150px", textAlign: "center"}}>
                      <Dropdown>
                        <Dropdown.Toggle variant="warning" id="dropdown-basic" style={{minWidth: "150px"}}>
                          <Typography gutterBottom sx={{"fontSize": "100%"}} style={{display: 'inline-block'}}>Category</Typography>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{minWidth: "150px"}}>
                          {
                            categories.map((cat, idx) => (
                              <Dropdown.Item key={idx}>
                                  <Typography
                                    variant="h6"
                                    display="block"
                                    gutterBottom
                                    onClick={() => {
                                      setCategory(cat);
                                      setCurrentPageNo(1);
                                    }}
                                  >
                                    {cat}
                                  </Typography>
                              </Dropdown.Item>
                            ))
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                    </Box>
                  </Dropdown.Item>

                  <Dropdown.Item href="#action2">
                    <Box style={{textAlign: "center", minWidth: "150px"}}>
                      <Box sx={{backgroundColor: "#FFC107", '&:hover': {backgroundColor: "#FFCD39"}}}>
                        <FormGroup style={{textAlign: "center", marginLeft: "18%"}}>
                          <FormControlLabel
                            label=<Typography gutterBottom sx={{"fontSize": "100%", color: "Black"}}>Price</Typography>

                            control={<Switch onChange={handleSwitch1Change} inputProps={{ 'aria-label': 'SwitchControlled' }}/>}
                          />
                        </FormGroup>
                      </Box>
                      <Box style={{display: (checked1 ? "" : "none")}}>
                        <Box sx={{ minWidth: "100%"}}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item>
                              <CurrencyRupeeIcon />
                            </Grid>
                            <Grid item xs>
                              <Slider
                                getAriaLabel={() => "Price"}
                                value={price}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={3000}
                                style={{color: "tomato"}}
                                aria-labelledby="range-slider"
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Box>
                  </Dropdown.Item>

                  <Dropdown.Item href="#action3">
                    <Box style={{textAlign: "center", minWidth: "150px"}}>
                      <Box sx={{backgroundColor: "#FFC107", '&:hover': {backgroundColor: "#FFCD39"}}}>
                        <FormGroup style={{textAlign: "center", marginLeft: "18%"}}>
                          <FormControlLabel
                            label=<Typography gutterBottom sx={{"fontSize": "100%", color: "Black"}}>Rating</Typography>

                            control={<Switch onChange={handleSwitch2Change} inputProps={{ 'aria-label': 'SwitchControlled' }}/>}
                          />
                        </FormGroup>
                      </Box>
                      <Box style={{display: (checked2 ? "" : "none")}}>
                        <Box sx={{ minWidth: "100%"}}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item>
                              <StarIcon />
                            </Grid>
                            <Grid item xs>
                              <Slider
                                getAriaLabel={() => "Ratings"}
                                value={ratings}
                                onChange={handleRatingChange}
                                valueLabelDisplay="auto"
                                step={1}
                                min={0}
                                max={5}
                                marks
                                style={{color: "tomato"}}
                                aria-labelledby="rating-slider"
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Box>
                  </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col lg={10} md={9} xs={12}>
              <h2 className="productsHeading">Products</h2>
              <div className="products">
                {
                  products && products.map((product, idx) => (
                    <ProductCard key={idx} product={product}/>
                  ))
                }
              </div>
            </Col>

          </Row>

          {resultPerPage < filteredProductsCount && (
            <Grid container justifyContent="center" sx={{marginTop: "15vh"}}>
              <ThemeProvider theme={theme}>
                <Stack spacing={2} className="ms-5">
                  <Pagination
                    defaultPage={1}
                    count={Math.ceil(productsCount/resultPerPage)}
                    page={currentPage}
                    onChange={setCurrentPageNo}
                    showFirstButton
                    showLastButton
                    size="large"
                    shape="rounded"
                    siblingCount={1}
                    color="primary"
                  />
                </Stack>
              </ThemeProvider>
            </Grid>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Products;
