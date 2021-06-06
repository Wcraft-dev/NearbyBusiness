import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  InputAdornment,
  Menu,
  MenuItem,
  IconButton,
  Grid,
  Card,
  TextField,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
} from "@material-ui/core";
import TimeAgo from "react-timeago";
import espanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import SearchIcon from "@material-ui/icons/Search";
import { db } from "../../firebase";

export default function DashboardNormal() {
  const [products, setProducts] = useState([]);
  const [productsFB, setProductsFB] = useState([]);
  const [filter, setFilter] = useState("desc");
  const [error, setError] = useState(null);
  const formatter = buildFormatter(espanishStrings);

  const filterUp = () => {
    setFilter("asc");
    handleClose();
  };
  const filterDown = () => {
    setFilter("desc");
    handleClose();
  };

  const getProduct = async () => {
    let first = false;
    db.collection("products")
      .orderBy("createdOn", filter)
      .onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(data.nameProduct);
          docs.push({ ...data, id: doc.id });
        });
        setProductsFB(docs);
        if (!first) {
          setProducts(docs);
          first = true;
        }
      });
  };

  useEffect(() => {
    getProduct();
  }, [filter]);

  useEffect(() => {
    const d = productsFB;
    setProducts(d);
  }, [productsFB]);
  useEffect(() => {
    if (products.length === 0) {
      setProducts(productsFB);
    }
  }, [products]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const search = (input) => {
    const newData = [];
    if (products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        let val = products[i].nameProduct;
        let posicion = val.indexOf(input);
        if (posicion !== -1) {
          newData.push(products[i]);
          setError(null);
        } else {
          setError("No hay resultados");
        }
        setProducts(newData);
      }
    }
    if (input === "") {
      setProducts(productsFB);
    }
  };
  return (
    <Container maxWidth="lg">
      <TextField
        label="Buscar producto"
        placeholder="Zapatillas"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onKeyUp={(text) => search(text.target.value)}
        helperText={error !== null ? error : ""}
      />
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <FilterListIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={filterUp}>
          <ArrowDropUpIcon fontSize="small" />
          Antiguo
        </MenuItem>
        <MenuItem onClick={filterDown}>
          <ArrowDropDownIcon fontSize="small" />
          Mas reciente
        </MenuItem>
      </Menu>
      <Grid container spacing={3}>
        {products.map((obj) => {
          return (
            <Grid item xs={5} key={obj.id}>
              <Card>
                <CardHeader title={obj.nameProduct} />
                <CardContent>
                  <Typography> {obj.descriptionProduct}</Typography>
                  <Typography> {obj.amount}</Typography>
                  <Typography>
                    <TimeAgo
                      date={obj.createdOn.toDate()}
                      formatter={formatter}
                    />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="outlined" color="primary" size="small">
                    Conocer Mas
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
