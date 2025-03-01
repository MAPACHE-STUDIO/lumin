import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { Navbar } from "../components/Navbar";
import { DeleteModal } from "../components/DeleteModal";
import { AppContext } from "../../../context/context";
import { deleteUser, updateUser } from "../../auth/services/userService";
import axios from "axios";
import { changeImage } from "../services/imageService";
import socket from "../../../core/utils/socket/socket";
import Alert from "../../message/components/Alert";
import Spinner from "../../message/components/Spinner"; // Asegúrate de importar correctamente

export const SettingsPage = () => {
  const navigate = useNavigate();

  const { userInfo } = useContext(AppContext);
  const [formData, setFormData] = useState({
    userId: userInfo.id,
    profileImage: userInfo.profileImage,
    username: userInfo.username,
    email: userInfo.email,
    status: "Disponible",
    password: "",
    newPassword: "",
  });
  const [uploadImage, setUploadImage] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadImage(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));
    }
  };

  const handleUpload = async () => {
    if (!uploadImage) {
      setAlert({ message: "No attachment selected", type: "warning" });
      return;
    }

    if (!(uploadImage instanceof File)) {
      setAlert({ message: "The file is not valid", type: "error" });
      return;
    }

    setIsUploading(true); // Mostrar el spinner

    try {
      const formDataImage = new FormData();
      formDataImage.append("image", uploadImage);

      const newImage = await changeImage(formDataImage);

      setFormData((prev) => ({ ...prev, profileImage: newImage }));
      console.log("Carga completa", newImage);
      socket.emit("upload");

      setAlert({ message: "Image upload successful", type: "success" });
    } catch (error) {
      setAlert({ message: "Error to upload the image", type: "error" });
    } finally {
      setIsUploading(false); // Ocultar el spinner
    }
  };

  const toggleQRCode = () => {
    setShowQRCode(!showQRCode);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    console.log("Account deleted");
    await deleteUser(userInfo.id);
    navigate("/login");
    setDeleteModalOpen(false);
  };

  const handleUpdateInfo = async () => {
    const response = await updateUser(formData)
    if (response.status === 400) {
      setAlert({
        message: response.response.data.message,
        type: "error",
      })
    } else {
      setAlert({
        message: response.data.message,
        type: "success",
      })
    }
    setFormData({
      userId: userInfo.id,
      profileImage: formData.profileImage,
      username: formData.username,
      email: userInfo.email,
      status: "Disponible",
      password: "",
      newPassword: "",
    })
  };

  // En tu JSX:

  return (
    <div className="bg-violet-500 min-h-screen">
      {/* Banner */}
      <div className="bg-violet-500 p-8">
        <h2 className="text-3xl text-white font-bold">Settings</h2>
      </div>

      {/* Contenedor principal */}
      <div className="bg-white text-violet-900 rounded-3xl p-3 shadow-lg">
        {/* Perfil */}
        <div className="mb-5 bg-violet-100 rounded-3xl shadow-md p-3">
          <h3 className="text-xl font-semibold mb-4">Profile</h3>
          
          
          <div className="row items-left justify-left mb-4">
            {isUploading ? (
              <div className="w-40 h-40 flex items-center justify-center">
                <Spinner /> {/* ⬅ Aquí se usa el componente personalizado */}
              </div>
            ) : (
              <img
                src={formData.profileImage}
                alt="Foto de perfil"
                className="w-40 h-40 rounded-3xl object-cover border border-violet-500"
              />
            )}
            <div>
              <input
                type="file"
                accept="image/*"
                id="profileImageInput"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                className="bg-violet-500 text-white p-3 mt-4 rounded-3xl shadow-md"
                onClick={() =>
                  document.getElementById("profileImageInput").click()
                }
              >
                Change Image
              </button>
              <button
                className="bg-violet-500 text-white p-3 ml-2 mt-4 rounded-3xl shadow-md"
                onClick={handleUpload}
                disabled={isUploading}
              >
                Update
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label
              className="block text-violet-700 font-medium mb-2"
              htmlFor="status"
            >
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-violet-400 rounded-3xl shadow-sm"
            >
              <option value="Disponible">Available</option>
              <option value="Away">Away</option>
              <option value="Busy">Busy</option>
              <option value="In a meeting">In a meeting</option>
              <option value="On vacation">On vacation</option>
            </select>
          </div>
        </div>

        {/* Información del usuario */}
        <div className="mb-5 bg-violet-100 rounded-3xl shadow-md p-3">
          <h3 className="text-xl font-semibold mb-4">User Information</h3>
          <div className="mb-3">
            <label
              className="block text-violet-700 font-medium mb-2"
              htmlFor="name"
            >
              Full name
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border rounded-3xl shadow-sm"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-violet-700 font-medium mb-2"
              htmlFor="email"
                          >
              E-mail
            </label>
            <input
              type="text"
              id="email"
              value={formData.email}
              className="bg-white w-full p-3 border rounded-3xl shadow-sm text-gray-400"
              disabled
              autoComplete="off"
            />
          </div>
          <div className="w-50 mt-3 flex items-center justify-center">
            <button
              className="bg-violet-500 text-white p-3 rounded-3xl shadow-lg"
              onClick={handleUpdateInfo}
            >
              Update
            </button>
          </div>
        </div>

        {/* Configuración de seguridad */}
        <div className="mb-5 bg-violet-100 rounded-3xl shadow-md p-3">
          <h3 className="text-xl font-semibold mb-4">Security</h3>
          <div className="mb-3 relative">
            <label
              className="block text-violet-700 font-medium mb-2"
              htmlFor="password"
            >
              Current Password
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-3xl shadow-sm"
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 text-gray-500"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="mb-3 relative">
            <label
              className="block text-violet-700 font-medium mb-2"
              htmlFor="newpassword"
            >
              New Password
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full p-3 border rounded-3xl shadow-sm"
                placeholder="Enter your new password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 text-gray-500"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="w-50 mt-3 flex items-center justify-center">
            <button
              className="bg-violet-500 text-white p-3 rounded-3xl shadow-lg w-100"
              onClick={handleUpdateInfo}
            >
              Update
            </button>
          </div>
        </div>

        {/* Código QR */}
        <div className="mb-5 bg-violet-100 rounded-3xl shadow-md p-3">
          <h3 className="text-xl font-semibold mb-4">QR Code</h3>
          <div className="flex items-center justify-center">
            <button
              onClick={toggleQRCode}
              className="bg-violet-500 text-white p-3 rounded-3xl shadow-lg w-50 mb-4"
            >
              {showQRCode ? "Hide QR Code" : "Share QR Code"}
            </button>
          </div>

          {showQRCode && (
            <div className="flex justify-center m-4">
              <QRCode value={formData.username} size={150} />
            </div>
          )}
        </div>

        <div className="mb-2 flex items-center justify-center">
          <div className="w-60">
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="bg-violet-500 text-white p-3 rounded-3xl shadow-lg w-full"
            >
              Delete Account
            </button>
          </div>
        </div>
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteAccount}
        />
        <div className="mb-20 flex items-center justify-center">
          <div className="w-60">
            <button
              onClick={handleLogout}
              className="w-full py-3 text-center border border-primary text-primary rounded-3xl hover:bg-primary-dark hover:text-white hover:border-primary-dark transition duration-300"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          duration={3000}
          onClose={() => setAlert(null)} // Ocultar alerta después de que se cierre
        />
      )}

      <Navbar />
    </div>
  );
};
