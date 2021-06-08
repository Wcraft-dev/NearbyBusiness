import React, { useEffect, useContext, useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  Collapse,
  Card,
  CardHeader,
  CardContent,
  FormControlLabel,
  LinearProgress,
  Typography,
  Grid,
  Fade,
  Box,
  makeStyles,
} from "@material-ui/core";
import { db, storage } from "../firebase";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from "../context/auth/AuthContext";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const schema = yup.object().shape({
  nameProduct: yup
    .string()
    .required("Este campo es requerido")
    .max(30, "Este campo no debe superar los 30 caracteres"),
  amount: yup
    .number()
    .typeError("Debe ser un numero")
    .required("Este campo es requerido"),
  descriptionProduct: yup
    .string()
    .required("Este campo es obligatorio")
    .max(500, "Solo debe contener 500 caracteres"),
});

const useStyles = makeStyles((theme) => ({
  center: { display: "flex", justifyContent: "center" },
  inputs: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  cardInputs: {
    width: "400px",
  },
}));
const FormBusinessmen = (props) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const classes = useStyles();

  const { userToken, business } = useContext(AuthContext);
  const [uploadValue, setUpladValue] = useState(0);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);

  const getProductById = async (id) => {
    if (id) {
      const doc = await db.collection("products").doc(id).get();
      const docs = doc.data();
      setValue("nameProduct", docs.nameProduct, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("amount", docs.amount, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("descriptionProduct", docs.descriptionProduct, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };
  useEffect(() => {
    if (props.currentId.id !== "") {
      getProductById(props.currentId.id);
    }
  }, [props.currentId.id]);
  const resetForm = () => {
    setUrl(null);
    setLoading(false);
    let input = document.getElementById("button-file");
    input.value = "";
    reset(
      {
        nameProduct: "",
        amount: "",
        descriptionProduct: "",
        image: null,
      },
      { keepDirty: true }
    );
  };

  const uploadImage = (data, next) => {
    let file = data.image[0];
    let nameI = `pictureProducts/${userToken}_product_${Math.floor(
      Math.random() * (10000 - 2 + 1) + 2
    )}`;
    const storageRef = storage.ref(nameI);
    const task = storageRef.put(file);
    task.on(
      "state_change",
      (snapshot) => {
        const { byteTransferred, totalBytes } = snapshot;
        let porcentage;
        if (byteTransferred < totalBytes) {
          porcentage = (byteTransferred / totalBytes) * 100;
        } else {
          porcentage = 100;
        }
        setUpladValue(porcentage);
      },
      (error) => {
        toast(`Ha ocurrido un error: ${error.message}`, {
          type: "error",
        });
      },
      async () => {
        const downloadURL = await task.snapshot.ref.getDownloadURL();
        setUrl(downloadURL);
        toast("Se ha subido la imagen correctamente", {
          type: "success",
        });
        next({ nameI, downloadURL });
      }
    );
  };
  const update = async (data, img) => {
    let upKing = {
      amount: data.amount,
      descriptionProduct: data.descriptionProduct,
      nameProduct: data.nameProduct,
      updateOn: new Date(),
    };
    if (checked) {
      const { nameI, downloadURL } = img;
      upKing = { ...upKing, nameI, image: downloadURL };
    }
    await db.collection("products").doc(props.currentId.id).update(upKing);
    toast("Producto actualizado exitosamente", { type: "info" });
    resetForm();
    props.ok();
  };
  const onSubmit = async (data) => {
    setLoading(true);
    if (props.currentId.id !== "") {
      if (checked) {
        if (data.image) {
          var desertRef = storage.ref(`${props.currentId.name}`);
          try {
            await desertRef.delete();
            uploadImage(data, (d) => update(data, d));
          } catch (e) {
            toast("hubo un error al actualizar", { type: "error" });
            setLoading(false);
          }
        } else {
          toast("Seleciona una imagen", { type: "error" });
          setLoading(false);
        }
      } else {
        update(data);
      }
    } else {
      if (data.image) {
        uploadImage(data, async ({ nameI, downloadURL }) => {
          const king = {
            amount: data.amount,
            descriptionProduct: data.descriptionProduct,
            nameProduct: data.nameProduct,
            creator: userToken,
            image: downloadURL,
            nameI,
            createdOn: new Date(),
            updateOn: new Date(),
          };
          await db.collection("products").doc().set(king);
          toast("Producto guardado exitosamente", { type: "success" });
          resetForm();
        });
      } else {
        toast("Seleciona una imagen", { type: "error" });
        setLoading(false);
      }
    }
  };

  const imgChange = (event) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setUrl(imageUrl);
    setValue("image", event.target.files, true);
  };
  return (
    <Box className={classes.center}>
      <Card elevation={5} className={classes.cardInputs}>
        <CardHeader
          title="Agregar Producto"
          subheader={`asociado al negocio "${business}"`}
        />
        <Box className="preview">
          {url !== null ? (
            <Fade in={true} timeout={2000}>
              <Box>
                <img src={url} alt="Imagen del producto" />{" "}
                <Box display="flex" alignItems="center">
                  <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" value={uploadValue} />
                  </Box>
                  <Box minWidth={35}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >{`${Math.round(uploadValue)}%`}</Typography>
                  </Box>
                </Box>
              </Box>
            </Fade>
          ) : (
            ""
          )}
        </Box>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid item xs={12}>
                <Controller
                  name="nameProduct"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="Nombre del producto"
                      className={classes.inputs}
                      error={errors.nameProduct ? true : false}
                      helperText={errors.nameProduct?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="amount"
                  defaultValue=""
                  render={({ field: { onChange, value } }) => {
                    return (
                      <NumberFormat
                        customInput={TextField}
                        thousandSeparator={true}
                        variant="outlined"
                        className={classes.inputs}
                        onValueChange={(v) => onChange(v.value)}
                        prefix={"$ "}
                        value={value}
                        error={errors.amount ? true : false}
                        label="Valor del producto"
                        helperText={errors.amount?.message}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="descriptionProduct"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="Descripcion del producto"
                      placeholder="Es de color rosdo"
                      className={classes.inputs}
                      multiline
                      error={errors.descriptionProduct ? true : false}
                      helperText={errors.descriptionProduct?.message}
                    />
                  )}
                />
              </Grid>

              {props.currentId.id !== "" ? (
                <>
                  <FormControlLabel
                    className={classes.inputs}
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    }
                    label="Acutualizar imagen"
                  />
                  <Collapse in={checked}>
                    <Grid
                      item
                      container
                      direction="column"
                      justify="center"
                      alignItems="flex-start"
                    >
                      <label htmlFor="button-file">
                        <Button
                          variant="contained"
                          startIcon={<CloudUploadIcon />}
                          className={classes.inputs}
                          color="primary"
                          component="span"
                        >
                          Upload
                        </Button>
                      </label>
                      <Typography
                        variant="caption"
                        style={{ color: "red" }}
                      ></Typography>
                    </Grid>
                  </Collapse>
                </>
              ) : (
                <Grid
                  item
                  container
                  direction="column"
                  justify="center"
                  alignItems="flex-start"
                >
                  <label htmlFor="button-file">
                    <Button
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      className={classes.inputs}
                      color="primary"
                      component="span"
                    >
                      Upload
                    </Button>
                  </label>
                  <Typography
                    variant="caption"
                    style={{ color: "red" }}
                  ></Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Box mt={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={props.currentId.id !== "" ? 6 : 12}>
                      <Button
                        type="submit"
                        disabled={loading}
                        variant="contained"
                        className={classes.inputs}
                        color="secondary"
                      >
                        {props.currentId.id !== "" ? "Acutualizar" : "Guardar"}
                      </Button>
                    </Grid>
                    {props.currentId.id !== "" ? (
                      <Grid item xs={6}>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={loading}
                          color="primary"
                          className={classes.inputs}
                          onClick={() => {
                            props.ok();
                            resetForm();
                          }}
                        >
                          Cancelar
                        </Button>
                      </Grid>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Typography variant="caption" color="textSecondary">
              **Tu informacion de contacto sera publicad
            </Typography>
          </form>
        </CardContent>
      </Card>
      <input
        type="file"
        name="image"
        onChange={(e) => imgChange(e)}
        style={{ display: "none" }}
        id="button-file"
        accept="image/*"
      />
    </Box>
  );
};

export default FormBusinessmen;
