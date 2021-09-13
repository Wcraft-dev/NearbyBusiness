import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Box,
  Fade,
  Container,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { db, storage } from "../../firebase";
import { toast } from "react-toastify";
import { Create, Close } from "@material-ui/icons/";
import FormBusinessmen from "../../component/FormBusinessmen";
import AuthContext from "../../context/auth/AuthContext";
import TimeAgo from "react-timeago";
import espanishStrings from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { JackInTheBox } from "react-awesome-reveal";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

function Index() {
  const [products, setProducts] = useState([]);
  const [currentId, setCurrentId] = useState({ id: "", name: "" });
  const formatter = buildFormatter(espanishStrings);
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        const d = doc.data();
        if (d.creator === userToken) {
          docs.push({ ...d, id: doc.id });
        }
      });
      setProducts(docs);
    });
    return () => {
      unsub();
    };
  }, []);

  const deleteProduct = async (id, nameI) => {
    if (window.confirm("Estas seguro de borrar este produto")) {
      let desertRef = ref(storage, nameI);
      try {
        await deleteObject(desertRef);
        await deleteDoc(doc(db, "products", id));
        toast("Producto borrado exitosamente", { type: "warning" });
      } catch (e) {
        toast.error("Hubo un error al borrar");
        console.log(e);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Box mb={4}>
          <JackInTheBox>
            <FormBusinessmen
              currentId={currentId}
              ok={() => setCurrentId({ id: "", name: "" })}
            />
          </JackInTheBox>
        </Box>
        <Grid container spacing={2}>
          {products.map((obj) => {
            return (
              <Fade in={true} timeout={1000} key={obj.id}>
                <Grid item xs={12} sm={4} md={4}>
                  <Card elevation={3}>
                    <CardHeader
                      title={obj.nameProduct}
                      subheader={
                        <div>
                          {"se actualizo "}
                          <TimeAgo
                            date={obj.updateOn.toDate()}
                            formatter={formatter}
                          />
                        </div>
                      }
                      action={
                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteProduct(obj.id, obj.nameI)}
                        >
                          <Close />
                        </IconButton>
                      }
                    />
                    <CardMedia
                      image={obj.image}
                      style={{ height: 0, paddingTop: "56.25%" }}
                      title={obj.nameProduct}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        align="justify"
                        paragraph
                      >
                        {obj.descriptionProduct}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="caption">
                            {"Se subio "}
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
                      <IconButton
                        aria-label="edit"
                        size="small"
                        onClick={() =>
                          setCurrentId({ id: obj.id, name: obj.nameI })
                        }
                      >
                        <Create />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              </Fade>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}

export default Index;
