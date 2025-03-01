import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar"; // Importar el componente de navegación

export const StatusPage = () => {
  // Estados de ejemplo de personas
  const statusList = [
    {
      id: "1",
      name: "Juan Miranda",
      time: "recently",
      src: "https://randomuser.me/api/portraits/men/1.jpg",
      images: [
        "https://picsum.photos/1500/1500?random=10",
        "https://picsum.photos/1500/1500?random=11",
      ],
    },
    {
      id: "2",
      name: "María Lucas",
      time: "1 min ago",
      src: "https://randomuser.me/api/portraits/women/20.jpg",
      images: [
        "https://picsum.photos/1500/1500?random=12",
        "https://picsum.photos/1500/1500?random=13",
      ],
    },
    {
      id: "3",
      name: "Luis Fernandez",
      time: "2 min ago",
      src: "https://randomuser.me/api/portraits/men/22.jpg",
      images: [
        "https://picsum.photos/1500/1500?random=14",
        "https://picsum.photos/1500/1500?random=15",
      ],
    },
    {
      id: "4",
      name: "Lucía Chacón",
      time: "3 min ago",
      src: "https://randomuser.me/api/portraits/women/9.jpg",
      images: [
        "https://picsum.photos/1500/1500?random=16",
        "https://picsum.photos/1500/1500?random=17",
      ],
    },
    {
      id: "5",
      name: "Marcos Betancourt",
      time: "4 min ago",
      src: "https://randomuser.me/api/portraits/men/50.jpg",
      images: [
        "https://picsum.photos/1500/1500?random=18",
        "https://picsum.photos/1500/1500?random=19",
        "https://picsum.photos/1500/1500?random=20",
      ],
    },
    {
      id: "6",
      name: "Luz Parra",
      time: "7 min ago",
      src: "https://randomuser.me/api/portraits/women/6.jpg",
      images: [
        "https://picsum.photos/1500/1500?random=21",
        "https://picsum.photos/1500/1500?random=22",
        "https://picsum.photos/1500/1500?random=23",
      ],
    },
    {
      id: "7",
      name: "Carlos Medina",
      time: "10 min ago",
      src: "https://randomuser.me/api/portraits/men/45.jpg",
      images: [
        "https://picsum.photos/1500/1500?random=24",
        "https://picsum.photos/1500/1500?random=25",
      ],
    },
    {
      id: "8",
      name: "Emma Ortiz",
      time: "15 min ago",
      src: "https://randomuser.me/api/portraits/women/33.jpg",
      images: [
        "https://picsum.photos/1500/1500?random=26",
        "https://picsum.photos/1500/1500?random=27",
      ],
    },
    {
      id: "9",
      name: "Diego Vargas",
      time: "20 min ago",
      src: "https://randomuser.me/api/portraits/men/18.jpg",
      images: [
        "https://picsum.photos/1500/1500?random=28",
        "https://picsum.photos/1500/1500?random=29",
      ],
    },
    {
      id: "10",
      name: "Isabella Fuentes",
      time: "30 min ago",
      src: "https://randomuser.me/api/portraits/women/48.jpg",
      images: [
        "https://picsum.photos/1500/1500?random=30",
        "https://picsum.photos/1500/1500?random=31",
      ],
    },

    // Agregar más personas aquí
  ];

  const [currentStatus, setCurrentStatus] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openStatus = (status) => {
    setCurrentStatus(status);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (currentStatus && currentImageIndex < currentStatus.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentStatus && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const closeStatus = () => {
    setCurrentStatus(null);
  };

  return (
    <div className="bg-violet-500">
      {" "}
      {/* / background messages atras */}
      {!currentStatus ? (
        <>
          {/* Primera sección (título) */}
          <div className="bg-violet-500 p-8">
            {" "}
            {/* // background titulo  */}
            <h2 className="text-3xl text-white font-bold">News</h2>
          </div>

          {/* Segunda sección (lista de personas con sus estados) */}
          <div className="bg-white pt-6 mb-20 rounded-t-3xl">
            <ul className="Down-side space-y-3 px-3">
              {" "}
              {/* // background messages atras */}
              {statusList.map((status) => (
                <li
                  key={status.id}
                  className="bg-violet-100 p-3 rounded-2xl shadow-md flex items-center space-x-4"
                >
                  {/* Imagen de perfil */}
                  <img
                    src={status.src}
                    alt={status.name}
                    className="w-14 h-15 rounded-xl "
                  />

                  {/* Información del estado */}
                  <div className="flex-grow">
                    <Link
                      to="#"
                      onClick={() => openStatus(status)}
                      className="font-semibold text-violet-900" /* hover:underline */
                    >
                      {status.name}
                    </Link>
                  </div>
                  <span className="text-gray-500 font-extralight text-sm

">{status.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div>
          {/* Botón para cerrar el estado */}
          <button
            onClick={closeStatus}
            className="absolute top-10 right-4 text-white text-2xl z-10"
          >
            &times; {/* Símbolo de X para cerrar */}
          </button>

          {/* Contenedor para la imagen */}
          <div className="relative my-10">
            {" "}
            {/* Margin-top para evitar que se quede detrás del navbar */}
            <img
              src={currentStatus.images[currentImageIndex]}
              alt="Estado"
              className="w-full h-[80vh] object-cover"
            />
            {/* Botón de flecha hacia la izquierda */}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl"
            >
              &#10094;
            </button>
            {/* Botón de flecha hacia la derecha */}
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl"
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
      <Navbar />
    </div>
  );
};
