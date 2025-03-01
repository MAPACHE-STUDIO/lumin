import { useCustomFormik } from "../hooks/useCustomFormik";
import { loginSchema } from "../schemas/validationSchemas";

import { FormInput } from "./FormInput";
import { Popup } from "./Popup";
import { Link } from "react-router-dom";
import logo from "../../../assets/logotipo.svg";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

export const LoginForm = () => {
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
      email: "",
      password: "",
    },
    loginSchema,
    "login"
  );

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <div className="mb-6 flex justify-center">
          <img
            src={logo}
            alt="logo"
            className="w-2/3 h-auto object-cover" // Ajuste para hacer el logo responsivo
          />
        </div>

        {!showPopup ? (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-text-primary text-center">
                Bienvenido
              </h3>
              <p className="text-center text-text-secondary">Accede a tu Cuenta</p>
            </div>

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

            <div className="text-center">
              <a className="text-body text-text-link" href="#">
                ¿Has olvidado tu contraseña?
              </a>
            </div>

            <div className="w-full flex justify-between space-x-2">
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-3xl hover:bg-primary-dark transition duration-300"
              >
                Ingresar
              </button>
              <Link
                to="/register"
                className="w-full py-3 text-center border border-primary text-primary rounded-3xl hover:bg-primary-dark hover:text-white hover:border-primary-dark transition duration-300"
              >
                Regístrate
              </Link>
            </div>
          </form>
        ) : (
          <Popup
            onClose={closePopup}
            success={formResult.success}
            UserId={formResult.userId}
            formType="login"
          />
        )}
      </div>
    </div>
  );
};
