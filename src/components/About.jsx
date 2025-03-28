// 📌 Importación de la integración de GSAP con React
import { useGSAP } from "@gsap/react";
// 📌 Importación de la librería GSAP para animaciones
import gsap from "gsap";
// 📌 Importación del plugin ScrollTrigger para animaciones en scroll
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

// 📌 Registro del plugin ScrollTrigger en GSAP
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // 📌 Hook useGSAP ejecuta la animación cuando el componente se monta
  useGSAP(() => {
    // 📌 Se crea una timeline de GSAP controlada por ScrollTrigger
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip", // 📌 Elemento que dispara la animación al entrar en viewport
        start: "center center", // 📌 La animación inicia cuando el centro del elemento está en el centro de la pantalla
        end: "+=800 center", // 📌 La animación termina 800px después manteniendo el centro del viewport
        scrub: 0.5, // 📌 Sincroniza la animación con el scroll (scrub: suaviza el efecto)
        pin: true, // 📌 Fija el elemento #clip en pantalla mientras dura la animación
        pinSpacing: true, // 📌 Mantiene el espacio al hacer pin para evitar "saltos"
      },
    });

    // 📌 Animación: La máscara que contiene la imagen se expande a pantalla completa
    clipAnimation.to(".mask-clip-path", {
      width: "100vw", // 📌 La máscara se expande al ancho total de la ventana
      height: "100vh", // 📌 La máscara se expande al alto total de la ventana
      borderRadius: 0, // 📌 Elimina cualquier borde redondeado para crear una expansión completa
    });
  });

  return (
    <div id="about" className="min-h-screen">
      {/* 📌 Sección superior con el título y subtítulo */}
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        {/* 📌 Subtítulo introductorio */}
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Zentry
        </h2>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> l<b>a</b>rgest shared adventure"
          containerClass="mt-5 !text-black text-center"
        />

        {/* 📌 Texto descriptivo adicional */}
        <div className="about-subtext">
          <p>The Game of Games begins - your life, now an epic MMORPG</p>
          <p>Zentry unites every player from countless games and platforms</p>
        </div>
      </div>

      {/* 📌 Contenedor principal de la animación controlada por ScrollTrigger */}
      <div className="h-dvh w-screen" id="clip">
        {/* 📌 Elemento que será animado en tamaño y forma */}
        <div className="mask-clip-path about-image">
          {/* 📌 Imagen de fondo que se expande al hacer scroll */}
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
