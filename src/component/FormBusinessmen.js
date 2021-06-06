import React, { useEffect, useContext } from "react";
import { TextField, Button } from "@material-ui/core";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from "../context/auth/AuthContext";

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

  const { userToken } = useContext(AuthContext);

  const getProductById = async (id) => {
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
  };
  useEffect(() => {
    if (props.currentId !== "") {
      getProductById(props.currentId);
    }
  }, [props.currentId]);
  const resetForm = () => {
    reset(
      {
        nameProduct: "",
        amount: NaN,
        descriptionProduct: "",
      },
      {
        keepErrors: true,
        keepDirty: true,
        keepIsSubmitted: false,
        keepTouched: false,
        keepIsValid: false,
        keepSubmitCount: false,
      }
    );
  };

  const onSubmit = async (data) => {
    if (props.currentId !== "") {
      await db.collection("products").doc(props.currentId).update(data);
      toast("Producto actualizado exitosamente", { type: "info" });
      resetForm();
      props.ok();
    } else {
      const king = {
        amount: data.amount,
        descriptionProduct: data.descriptionProduct,
        nameProduct: data.nameProduct,
        creator: userToken,
        createdOn: new Date(),
        updateOn: new Date(),
      };
      await db.collection("products").doc().set(king);
      toast("Producto guardado exitosamente", { type: "success" });
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="nameProduct"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            label="Nombre del producto"
            error={errors.nameProduct ? true : false}
            helperText={errors.nameProduct?.message}
          />
        )}
      />
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
            multiline
            error={errors.descriptionProduct ? true : false}
            helperText={errors.descriptionProduct?.message}
          />
        )}
      />
      <Button type="submit" variant="contained" color="secondary">
        {props.currentId !== "" ? "Acutualizar" : "Guardar"}
      </Button>
      {props.currentId !== "" ? (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            props.ok();
            resetForm();
          }}
        >
          Cancelar
        </Button>
      ) : (
        ""
      )}
    </form>
  );
};

export default FormBusinessmen;
