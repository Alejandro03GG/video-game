// Importación de hooks de React y librerías necesarias
import { useEffect, useRef, useState } from "react";
import Button from "./Button"; // Componente de botón personalizado
import { TiLocationArrow } from "react-icons/ti"; // Ícono de flecha de ubicación
import { useGSAP } from "@gsap/react"; // Hook para usar GSAP en React
import gsap from "gsap"; // Librería de animación
import { ScrollTrigger } from "gsap/all"; // Plugin de GSAP para animaciones en scroll

// Registro del plugin ScrollTrigger en GSAP
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // Estado que controla el índice del video actual mostrado
  const [currentIndex, setCurrentIndex] = useState(1);

  // Estado que detecta si el usuario hizo clic en el mini-video
  const [hasClicked, setHasClicked] = useState(false);

  // Estado que controla si la pantalla de carga debe mostrarse
  const [isLoading, setIsLoading] = useState(true);

  // Contador de videos que ya han terminado de cargar
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4; // Número total de videos en la galería
  const nextVdRef = useRef(null); // Referencia al video que se cargará como "siguiente"

  // Función que incrementa el contador de videos cargados
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // Calcula el índice del próximo video de forma cíclica
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  // Maneja el clic sobre el mini-video, actualiza el índice y marca que hubo clic
  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  // Cuando todos los videos (menos uno) están cargados, se quita la pantalla de carga
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  // Animación de transición entre videos al hacer clic
  useGSAP(
    () => {
      if (hasClicked) {
        // Hace visible el video siguiente
        gsap.set("#next-video", { visibility: "visible" });

        // Anima la expansión del próximo video hasta ocupar su contenedor
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(), // Reproduce el video al iniciar la animación
        });

        // Anima el video actual haciendo un efecto de zoom
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  // Animación del contenedor del video al hacer scroll con ScrollTrigger
  useGSAP(() => {
    // Define la forma inicial del clip-path del contenedor
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    // Define la animación al hacer scroll
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center", // La animación empieza cuando el elemento está en el centro
        end: "bottom center", // Termina cuando la parte inferior llega al centro
        scrub: true, // Sincroniza la animación con el scroll
      },
    });
  });

  // Función auxiliar que genera la ruta del video a partir de su índice
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  // Renderizado del componente
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Pantalla de carga mientras los videos no han terminado de cargar */}
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* Animación de tres puntos */}
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      {/* Contenedor principal del video con forma animada */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          {/* Mini-video que aparece al centro y permite cambiar al siguiente video */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500
              ease-in hover:scale-100 hover:opacity-100"
            >
              {/* Video en miniatura con efecto hover */}
              <video
                ref={nextVdRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          {/* Video oculto que se usa para la animación de transición */}
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          {/* Video de fondo principal en reproducción */}
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/* Título decorativo en la esquina inferior */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        {/* Texto principal y botón de llamada a la acción */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            {/* Botón con icono, llama a ver el trailer */}
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/* Repetición del título en negro (posible duplicado visual) */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

// Exporta el componente Hero para ser utilizado en otros archivos
export default Hero;
