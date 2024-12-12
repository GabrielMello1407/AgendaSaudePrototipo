"use client";

import { useState } from "react";
import { FaClinicMedical } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TbUser } from "react-icons/tb";

import Button from "../Button";
import Logo from "../Logo";
import Modal from "../RegisterModal";

export default function Navbar() {
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };
  return (
    <nav className="bg-slate-600 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <ul className="flex space-x-4">
            <li className="list-none text-xl font-bold text-white">
              <Logo imagePath={"/logo_soujunior.png"} />
            </li>
          </ul>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Button variant="plain" className="text-lg">
              Entrar
            </Button>
          </li>
          <li>
            <Button variant="plain" onClick={abrirModal} className="text-lg">
              Cadastrar
            </Button>
          </li>
        </ul>
        <Modal isOpen={modalAberto} onClose={fecharModal}>
          <Button
            className="absolute right-4 top-4"
            variant="plain"
            leftAccessory={<IoClose size={28} color="black" />}
            onClick={fecharModal}
          />

          <header className="mb-8 flex w-full flex-col items-center gap-4 font-sans">
            <h2 className=" text-3xl font-bold text-black md:text-4xl  lg:text-5xl">
              Cadastrar
            </h2>
            <p className=" text-center text-lg font-medium  text-gray-900  lg:text-2xl">
              Cadastre uma conta em nosso serviço
            </p>
          </header>

          <div className=" flex  flex-col gap-4 sm:w-8/12">
            <Button
              className="flex h-14 gap-6 rounded-lg sm:h-auto"
              leftAccessory={<TbUser size={32} />}
            >
              <a href="/registerPatient" target="_self">
                <p className="text-left text-lg font-bold text-black">
                  Paciente
                </p>
                {/* <p className="hidden text-left font-semibold text-black sm:inline-block ">
                Lorem ipsum dolor sit amet consectetur
              </p> */}
              </a>
            </Button>

            <Button
              className="flex   h-14 gap-6 rounded-lg sm:h-auto"
              leftAccessory={<FaClinicMedical size={32} />}
            >
              <a href="/registerClinical" target="_self">
                <p className="text-left text-lg font-bold text-black">
                  Clínica
                </p>
                {/* <p className=" hidden text-left font-semibold text-black sm:inline-block ">
                  Lorem ipsum dolor sit amet consectetur
                </p> */}
              </a>
            </Button>
          </div>
        </Modal>
      </div>
    </nav>
  );
}
