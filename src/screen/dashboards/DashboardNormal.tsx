import React, { useState, useEffect } from "react";
import {
  Container,
  Collapse,
  InputAdornment,
  Menu,
  MenuItem,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  TextField,
  Box,
  Modal,
  Backdrop,
  Fade,
  Grow,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import TimeAgo from "react-timeago";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import espanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import SearchIcon from "@material-ui/icons/Search";
import { db } from "../../firebase";
import {
  doc,
  query,
  orderBy,
  collection,
  getDoc,
  OrderByDirection,
  onSnapshot,
} from "firebase/firestore";
import { Zoom } from "react-awesome-reveal";

const useStyles = makeStyles((theme) => ({
  search: {
    width: "400px",
    [theme.breakpoints.down("xs")]: {
      width: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      width: "200px",
    },
    [theme.breakpoints.up("md")]: {
      width: "400px",
    },
  },
  card: {
    borderRadius: 0,
    maxWidth: "350px",
    margin: "0 auto",
  },
  modal: {
    display: "block",
    alignItems: "center",
    justifyContent: "center",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));
export default function DashboardNormal() {
  const [products, setProducts] = useState([]);
  const [productsFB, setProductsFB] = useState([]);
  const [filter, setFilter] = useState<OrderByDirection>("desc");
  const [open, setOpen] = useState(false);
  const [whoView, setWhoView] = useState<any>({});
  const [expanded, setExpanded] = useState(false);

  const [error, setError] = useState(null);
  const formatter = buildFormatter(espanishStrings);

  const classes = useStyles();

  const filterUp = () => {
    setFilter("asc");
    handleClose();
  };
  const filterDown = () => {
    setFilter("desc");
    handleClose();
  };

  const user = async (data) => {
    try {
      const creator = await getDoc(doc(db, "users", data.creator));
      const d = creator.data();
      const state = {
        creator: {
          name: `${d?.firstName} ${d?.lastName}`,
          email: d?.email,
          business: d?.business,
        },
        obj: {
          ...data,
        },
      };
      setWhoView(state);
    } catch (e) {
      //return {};
    }
  };
  useEffect(() => {
    let first = false;
    const q = query(collection(db, "products"), orderBy("createdOn", filter));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        docs.push({
          ...data,
          id: doc.id,
        });
      });
      setProductsFB(docs);
      if (!first) {
        setProducts(docs);
        first = true;
      }
    });
    return () => {
      unsub();
    };
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
  const modalData = async (data) => {
    await user(data);
    setOpen(true);
  };
  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Box mb={4}>
          <Zoom>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <TextField
                  label="Buscar producto"
                  placeholder="Zapatillas"
                  variant="outlined"
                  className={classes.search}
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
              </Grid>
              <Grid item>
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                  <FilterListIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Zoom>
        </Box>
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
        <Grid container spacing={2}>
          {products.map((obj) => {
            return (
              <Grow
                in={true}
                key={obj.id}
                style={{ transformOrigin: "0 0 0" }}
                timeout={1000}
              >
                <Grid item xs={12} sm={4} md={2}>
                  <Card elevation={3} className={classes.card}>
                    <CardActionArea onClick={() => modalData(obj)}>
                      <CardMedia
                        image={obj.image}
                        style={{ height: 0, paddingTop: "56.25%" }}
                        title={obj.nameProduct}
                      />
                      <CardContent>
                        <Typography variant="subtitle1" noWrap>
                          {obj.nameProduct}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          align="justify"
                          paragraph
                        >
                          {obj.descriptionProduct}
                        </Typography>
                      </CardContent>
                      <Box m={1}>
                        <Grid container>
                          <Grid item xs={12}>
                            {"Subido "}
                            <Typography variant="caption">
                              <TimeAgo
                                date={obj.createdOn.toDate()}
                                formatter={formatter}
                              />
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="h6"
                              style={{ fontWeight: "bold" }}
                            >
                              $ {new Intl.NumberFormat().format(obj.amount)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Grow>
            );
          })}
        </Grid>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box mt={5}>
            <Card elevation={3} className={classes.card}>
              <CardMedia
                image={whoView.obj?.image}
                style={{ height: 0, paddingTop: "56.25%" }}
                title={whoView.obj?.nameProduct}
              />
              <CardContent>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box>
                    <Typography variant="subtitle1" noWrap>
                      {whoView.obj?.nameProduct}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      align="justify"
                      paragraph
                    >
                      {whoView.obj?.descriptionProduct}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => setExpanded(!expanded)}
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Grid>
              </CardContent>
              <Collapse in={expanded} timeout="auto" mountOnEnter unmountOnExit>
                <Typography variant="body1">
                  {"Publicado por: " + whoView.creator
                    ? whoView.creator?.name
                    : ""}
                </Typography>

                <Typography variant="body1">
                  {"Su micro empresa: " + whoView.creator
                    ? whoView.creator?.email
                    : ""}
                </Typography>
                <Typography variant="body1">
                  {"Su negocio: " + whoView?.creator
                    ? whoView.creator?.business
                    : ""}
                </Typography>
              </Collapse>
              <Box m={1}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="caption">
                      {"Subido "}
                      <TimeAgo
                        date={
                          whoView.obj?.createdOn
                            ? whoView.obj?.createdOn.toDate()
                            : ""
                        }
                        formatter={formatter}
                      />
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                      $ {new Intl.NumberFormat().format(whoView.obj?.amount)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
}
