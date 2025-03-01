import { useCustomFormik } from "../hooks/useCustomFormik";
import { registerSchema } from "../schemas/validationSchemas";
import { FormInput } from "./FormInput";
import { Popup } from "./Popup";
import { Link } from "react-router-dom";
import logo from "../../../assets/logotipo.svg";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

export const RegisterForm = () => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
    showPopup,
    formResult,
    closePopup,
  } = useCustomFormik(
    {
      name: "",
      email: "",
      password: "",
    },
    registerSchema,
    "register"
  );

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <div className="mb-6 flex justify-center">
          <img
            src={logo}
            alt="logo"
            className="w-2/3 h-auto object-cover" // Responsivo
          />
        </div>

        {!showPopup ? (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-text-primary">
                Regístrate
              </h3>
              <p className="text-center text-text-secondary">Crea tu cuenta</p>
            </div>

            <FormInput
              icon={faUser}
              type="text"
              placeholder="Nombre completo"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.name}
              error={errors.name}
            />

            <FormInput
              icon={faEnvelope}
              type="email"
              placeholder="Correo electrónico"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.email}
              error={errors.email}
            />

            <FormInput
              icon={faLock}
              type="password"
              placeholder="Contraseña"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.password}
              error={errors.password}
            />

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-3xl hover:bg-primary-dark transition duration-300"
            >
              Registrarme
            </button>

            <div className="text-center">
              <Link
                className="text-body text-text-link"
                to="/login"
              >
                ¿Ya tienes una cuenta?
              </Link>
            </div>
          </form>
        ) : (
          <Popup
            success={formResult.success}
            formType="register"
            UserId={formResult.userId}
            onClose={closePopup}
          />
        )}
      </div>
    </div>
  );
};
