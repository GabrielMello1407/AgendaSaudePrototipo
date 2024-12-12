import React, { ReactNode } from "react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <article className=" relative  max-w-5xl w-full  flex flex-col justify-center items-center rounded-3xl bg-white p-8 md:py-16 m-4 md:m-6 shadow-md ">
        {children}
      </article>
    </div>
  );
};

export default RegisterModal;
