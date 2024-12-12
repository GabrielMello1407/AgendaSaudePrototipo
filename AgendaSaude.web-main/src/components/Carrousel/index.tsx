"use client";
import { useState, useEffect, useRef } from "react";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";

import Button from "../Button";

interface Page {
  tab: string;
  title: string;
  content: string;
  linkTo: string;
  customButtonName: string;
}

const Carousel: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const shouldClearIntervalRef = useRef<boolean>(false); // Nova referência
  const intervalRef = useRef<number | null>(null);

  const pages: Page[] = [
    {
      tab: "Paciente",
      title: "Busque clínicas e consultório",
      content:
        "Para você que deseja pesquisar uma clínica ou consultório especialista perto de você e agendar uma consulta em poucos cliques.",
      linkTo: "/map",
      customButtonName: "Encontrar clinicas"
    },
    {
      tab: "Médico",
      title:
        "Facilite sua agenda e históricos de tratamento de seus pacientes.",
      content:
        "Em um único lugar é possível gerenciar sua agenda de atendimento, o histórico de tratamento de seus pacientes e facilitar sua organização diária.",
      linkTo: "/",
      customButtonName: ""
    },
    {
      tab: "Clinica",
      title: "Aumente suas base de clientes e sua eficiência.",
      content:
        "Através do Agenda Saúde será possível aumentar o alcance de sua clínica em sua região e ter acesso a algumas funcionalidades que simplificará o dia a dia de seu negócio.",
      linkTo: "/",
      customButtonName: ""
    }
  ];

  const handlePageChange = (pageNumber: number) => {
    // Define a referência para limpar o intervalo imediatamente
    shouldClearIntervalRef.current = true;
    // Atualiza a página
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    const nextPage = (currentPage % 3) + 1;
    setCurrentPage(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = currentPage === 1 ? 3 : currentPage - 1;
    setCurrentPage(prevPage);
  };
  useEffect(() => {
    // Inicia o intervalo apenas se ainda não estiver em execução e não estiver configurado para limpar
    if (!intervalRef.current && !shouldClearIntervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        handleNextPage();
      }, 10000);
      console.log("Intervalo iniciado");
    }
    // Limpa o intervalo imediatamente se a referência indicar
    if (shouldClearIntervalRef.current && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      shouldClearIntervalRef.current = false;
      console.log("Intervalo limpo ao clicar em um botão de página");
    }
    // Limpa o intervalo ao desmontar o componente
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log("Intervalo limpo ao desmontar o componente");
      }
    };
  }, [currentPage]);

  return (
    <>
      <section className=" w-full items-center flex justify-center pt-14 ">
        <div className=" relative  flex    w-full max-w-7xl flex-col   items-center justify-between  gap-12 p-12  md:items-start">
          <div className="flex w-auto items-center justify-center rounded-full border border-slate-900  overflow-hidden">
            {pages.map((page, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2   border-l border-slate-900  ${
                  currentPage === index + 1
                    ? " bg-slate-900 text-white"
                    : "bg-white text-slate-900"
                }  `}
              >
                {page.tab}
              </button>
            ))}
          </div>
          <div className="  min-h-[400px] flex  flex-col items-center justify-center gap-8 md:flex-row md:gap-0">
            <div className="flex flex-col justify-between  md:w-7/12">
              <h2 className="mb-10 font-mono  text-3xl font-semibold leading-tight text-black sm:text-4xl md:text-5xl">
                {pages[currentPage - 1].title}
              </h2>
              <p className=" font-mono text-xl font-medium tracking-tight text-black">
                {pages[currentPage - 1].content}
              </p>
            </div>
            <div className="flex items-end justify-center md:w-5/12">
              {pages[currentPage - 1].customButtonName !== "" && (
                <Button
                  href={pages[currentPage - 1].linkTo}
                  className=" h-16 w-auto rounded-full px-8 py-4 text-lg font-bold md:text-xl lg:text-2xl text-center"
                >
                  {pages[currentPage - 1].customButtonName}
                </Button>
              )}
            </div>
          </div>

          {/* Botões para avançar e retroceder */}
          <div className="flex gap-8">
            <Button
              className="-left-14 top-[17rem] xl:absolute"
              variant="plain"
              leftAccessory={<IoArrowBackCircle size={48} color="black" />}
              onClick={handlePrevPage}
            />
            <Button
              className="-right-14 top-[17rem]  xl:absolute"
              variant="plain"
              rightAccessory={<IoArrowForwardCircle size={48} color="black" />}
              onClick={handleNextPage}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Carousel;
