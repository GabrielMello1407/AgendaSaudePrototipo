"use client";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";

import { PacienteFormData } from "../../shared/interfaces/IPacient";
import { Input } from "../ui/input";

function StepFour() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext<PacienteFormData>();
  const password = watch("password");

  return (
    <fieldset className="grid grid-cols-2 gap-x-4  items-center ">
      <Input
        className="col-span-2"
        placeholder="Email"
        label="Email*"
        id="email"
        type="text"
        {...register("email", {
          required: {
            value: true,
            message: "Campo Email é obrigatório"
          },
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Formato inválido Ex. exemplo@email.com"
          }
        })}
        error={errors.email ? errors.email.message : ""}
      />
      <div className="col-span-2 relative">
        <Input
          placeholder="Senha"
          type={isShowPassword ? "text" : "password"}
          label="Senha*"
          id="password"
          {...register("password", {
            required: { value: true, message: "Campo Senha é obrigatório" },
            minLength: {
              value: 8,
              message: "Senha deve ter no minimo 8 caracters"
            },
            validate: {
              hasUppercase: (value) =>
                /^(?=.*[A-Z]).+$/.test(value) ||
                "Deve conter no minimo uma letra maiúscula",
              hasLowerCase: (value) =>
                /^(?=.*[a-z]).+$/.test(value) ||
                "Deve conter no minimo uma letra minuscula",
              hasSpecialChar: (value) =>
                /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~]).+$/.test(value) ||
                "Deve conter caracters especiaos Ex. @ # $"
            }
          })}
          error={errors.password ? errors.password.message : ""}
        />
        <span
          className=" cursor-pointer absolute  top-[46px]  right-4"
          onClick={() => setIsShowPassword((prev) => !prev)}
        >
          {isShowPassword ? (
            <LuEye size={"1.25em"} />
          ) : (
            <LuEyeOff size={"1.25em"} />
          )}
        </span>
      </div>
      <div className="col-span-2 relative">
        <Input
          placeholder="Repetir senha"
          label="Repetir senha*"
          id="confirmPassword"
          type={isShowConfirmPassword ? "text" : "password"}
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Campo Repetir senha é obrigatório"
            },
            validate: (value) => value === password || "A senha não corresponde"
          })}
          error={errors.confirmPassword ? errors.confirmPassword.message : ""}
        />
        <span
          className=" cursor-pointer absolute  top-[46px]  right-4"
          onClick={() => setIsShowConfirmPassword((prev) => !prev)}
        >
          {isShowConfirmPassword ? (
            <LuEye size={"1.25em"} />
          ) : (
            <LuEyeOff size={"1.25em"} />
          )}
        </span>
        <Input
          id="CPF"
          mask="cpf"
          type="text"
          className="col-span-2"
          placeholder="XX.XXX.XXX-XX"
          label="CPF*"
          {...register("cpf", {
            required: {
              value: true,
              message: "Campo CPF é obrigatório"
            },
            pattern: {
              value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
              message: "Formato inválido"
            }
          })}
          error={errors.cpf ? errors.cpf.message : ""}
        />
      </div>

      <div className="  grid  grid-cols-1 col-span-2 my-3 ">
        <div className="flex items-center  space-x-2  col-span-1">
          <input
            type="checkbox"
            id="acceptTerm"
            {...register("acceptTerm", {
              required: {
                value: true,
                message: "Deve aceitar os termos de condiçoes"
              }
            })}
          />
          <label
            htmlFor="acceptTerm"
            className="text-xs  font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Você aceita os
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className=" font-medium"
            >
              {" "}
              Termos e condições do Agenda Saúde
            </a>{" "}
            e a sua{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className=" font-medium"
            >
              Política de Privacidade?
            </a>
          </label>
        </div>
        <p className="flex items-center space-x-2  col-span-1 h-4 text-sm  font-semibold text-red-500 mt-1.5 ">
          {errors.acceptTerm ? errors.acceptTerm.message : ""}
        </p>
      </div>
    </fieldset>
  );
}

export default StepFour;
