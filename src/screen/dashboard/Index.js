import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
} from "@material-ui/core";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { Create, Close } from "@material-ui/icons/";
import FormBusinessmen from "../../component/FormBusinessmen";

function Index() {
  const [products, setProducts] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getProduct = async () => {
    db.collection("products").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setProducts(docs);
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const deleteProduct = async (id) => {
    if (window.confirm("Estas seguro de borrar este produto")) {
      db.collection("products").doc(id).delete();
      toast("Producto borrado exitosamente", { type: "warning" });
    }
  };

  return (
    <Container maxWidth="lg">
      <FormBusinessmen currentId={currentId} ok={() => setCurrentId("")} />
      <Button variant="contained" color="primary">
        Cambiar Informacion de contacto
      </Button>
      <Grid container spacing={3}>
        {products.map((obj) => {
          return (
            <Grid item xs={5} key={obj.id}>
              <Card>
                <CardHeader
                  title={obj.nameProduct}
                  action={
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteProduct(obj.id)}
                    >
                      <Close />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Typography> {obj.descriptionProduct}</Typography>
                  <Typography> {obj.amount}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<Create>send</Create>}
                    onClick={() => setCurrentId(obj.id)}
                  >
                    Editar
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

export default Index;
