// Esquema para validar mensajes antes de enviarlos.

import * as Yup from "yup";

export const messageSchema = Yup.object().shape({
  message: Yup.string()
    .required("El mensaje no puede estar vacío")
    .max(500, "El mensaje no puede exceder los 500 caracteres"),
});

