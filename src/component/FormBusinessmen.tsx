import React, { useEffect, useContext, useState, useRef } from "react";
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
import { addDoc, getDoc, doc, collection, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  FormData,
  img,
  Product,
  productsConverter,
  PropsForm,
  UpdateProduct,
} from "../@types/Products";

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
const FormBusinessmen = ({
  productSelected: { id, pathServer },
  success,
}: PropsForm) => {
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

  const {
    UserData: { userToken, business },
  } = useContext(AuthContext);

  const [uploadValue, setUpladValue] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const inputFile = useRef<HTMLInputElement>(null);

  const getProductById = async (selected: string) => {
    if (selected) {
      const res = await getDoc<Product>(
        doc(db, "products", selected).withConverter(productsConverter)
      );
      const docs: Product | undefined = res.data();
      setValue("nameProduct", docs?.nameProduct, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("amount", docs?.amount, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("descriptionProduct", docs?.descriptionProduct, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  useEffect(() => {
    if (id !== "") {
      getProductById(id);
    }
  }, [id]);

  const resetForm = () => {
    setUrl("");
    setUpladValue(0);
    setLoading(false);
    if (inputFile.current) inputFile.current.value = "";
    reset(
      {
        nameProduct: "",
        amount: 0,
        descriptionProduct: "",
        image: null,
      },
      { keepDirty: true }
    );
  };

  const uploadImage = (image: File, fnSuccees: (param: img) => void) => {
    const filePath = import.meta.env.VITE_FIREBASE_PRODUCT_PATH;
    let pathServer: string = `${filePath}/${userToken}_product_${Math.floor(
      Math.random() * (10000 - 2 + 1) + 2
    )}`;
    const storageRef = ref(storage, pathServer);
    const task = uploadBytesResumable(storageRef, image);
    task.on(
      "state_changed",
      ({ bytesTransferred, totalBytes }) => {
        let porcentage;
        if (bytesTransferred < totalBytes) {
          porcentage = (bytesTransferred / totalBytes) * 100;
        } else {
          porcentage = 100;
        }
        setUpladValue(porcentage);
      },
      (error) => toast.error(`Ha ocurrido un error: ${error.message}`),
      () => {
        (async () => {
          const downloadURL = await getDownloadURL(task.snapshot.ref);
          setUrl(downloadURL);
          toast.success("Se ha subido la imagen correctamente");
          fnSuccees({ pathServer, downloadURL });
        })();
      }
    );
  };

  const update = async (data: FormData, imgData?: img) => {
    let newProduct: UpdateProduct = {
      amount: data.amount,
      descriptionProduct: data.descriptionProduct,
      nameProduct: data.nameProduct,
      updateOn: new Date(),
    };
    if (checked && imgData)
      newProduct = {
        ...newProduct,
        pathServer: imgData.pathServer,
        image: imgData.downloadURL,
      };

    await updateDoc(doc(db, "products", id), newProduct);
    toast.info("Producto actualizado exitosamente");
    resetForm();
    success();
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    if (id !== "") {
      if (checked) {
        if (data.image) {
          try {
            const desertImageRef = ref(storage, pathServer);
            await deleteObject(desertImageRef);
            uploadImage(data.image[0], (imgData: img) => update(data, imgData));
          } catch (e) {
            toast.error("hubo un error al actualizar");
            console.log(e);
            setLoading(false);
          }
        } else {
          toast.error("Seleciona una imagen");
          setLoading(false);
        }
      } else {
        update(data);
      }
    } else {
      if (data.image) {
        const fnNewProduct = async ({ pathServer, downloadURL }: img) => {
          const newProduct: Product = {
            amount: data.amount,
            descriptionProduct: data.descriptionProduct,
            nameProduct: data.nameProduct,
            createBy: userToken,
            image: downloadURL,
            pathServer,
            createdOn: new Date(),
            updateOn: new Date(),
          };
          console.log(newProduct);
          await addDoc(collection(db, "products"), newProduct);
          toast.success("Producto guardado exitosamente");
          resetForm();
        };
        uploadImage(data.image[0], fnNewProduct);
      } else {
        toast("Seleciona una imagen", { type: "error" });
        setLoading(false);
      }
    }
  };

  const imgChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile: File | null = target.files ? target.files[0] : null;
    const imageUrl = URL.createObjectURL(imageFile);
    setUrl(imageUrl);
    setValue("image", target.files);
  };

  return (
    <Box className={classes.center}>
      <Card elevation={5} className={classes.cardInputs}>
        <CardHeader
          title="Agregar Producto"
          subheader={`asociado al negocio "${business}"`}
        />
        <Box className="preview">
          {url !== "" ? (
            <Fade in={true} timeout={2000}>
              <Box>
                <img src={url} alt="Imagen del producto" />
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
                      helperText={
                        errors.nameProduct ? errors.nameProduct.message : ""
                      }
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
                        helperText={errors.amount ? errors.amount.message : ""}
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
                      helperText={
                        errors.descriptionProduct
                          ? errors.descriptionProduct.message
                          : ""
                      }
                    />
                  )}
                />
              </Grid>

              {id !== "" ? (
                <div>
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
                      justifyContent="center"
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
                </div>
              ) : (
                <Grid
                  item
                  container
                  direction="column"
                  justifyContent="center"
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
                    <Grid item xs={id !== "" ? 6 : 12}>
                      <Button
                        type="submit"
                        disabled={loading}
                        variant="contained"
                        className={classes.inputs}
                        color="secondary"
                      >
                        {id !== "" ? "Acutualizar" : "Guardar"}
                      </Button>
                    </Grid>
                    {id !== "" ? (
                      <Grid item xs={6}>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={loading}
                          color="primary"
                          className={classes.inputs}
                          onClick={() => {
                            success();
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
        ref={inputFile}
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
