import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormContext, Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { Input } from "@/components/ui/input";
import { PacienteFormData } from "../../shared/interfaces/IPacient";
import { Label } from "../ui/label";

const animatedComponents = makeAnimated();

function StepOne() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<PacienteFormData>();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const genero = [
    { value: "masculino", label: "Masculino" },
    { value: "feminino", label: "Feminino" },
    { value: "prefiroNaoDizer", label: "Prefiro não dizer" }
  ];

  const colorStyles = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (styles: any) => ({
      ...styles,
      minHeight: "2.75em"
    })
  };

  const MINIMUM_AGE = 18;

  const isValidDate = (dateString: Date) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const isOfAge = (dateString: Date) => {
    const birthDate = new Date(dateString);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      return age - 1 >= MINIMUM_AGE;
    }

    return age >= MINIMUM_AGE;
  };

  const hasFourDigitYear = (dateString: Date) => {
    const year = new Date(dateString).getFullYear();
    return /^\d{4}$/.test(year.toString());
  };

  return (
    <fieldset className="grid grid-cols-4 gap-x-4  items-center">
      <div className="flex flex-col gap-6 col-span-4 m-2">
        <Label
          htmlFor="image"
          className=" cursor-pointer flex  justify-start  gap-14 items-center"
        >
          <div className="bg-white flex justify-center items-center rounded-full p-8">
            <Image
              src="/upload.svg"
              width={70}
              height={70}
              alt="Picture of the author"
            />
          </div>
          <div>
            <p className=" font-bold text-base leading-6 text-black  underline underline-offset-4">
              Selecione o arquivo
            </p>
            <p className=" font-medium text-xs leading-[18px] text-black ">
              Certifique-se de que o arquivo esteja abaixo de 2mb
            </p>
          </div>
        </Label>

        <input type="file" id="image" name="image" hidden />
      </div>

      <Input
        id="name"
        type="text"
        className="col-span-4"
        placeholder="Nome completo"
        label="Nome completo*"
        {...register("name", {
          required: {
            value: true,
            message: "Campo Nome é obrigatório"
          },
          maxLength: 255
        })}
        error={errors.name ? errors.name.message : ""}
      />
      <Input
        id="date"
        type="date"
        className="col-span-4"
        placeholder="Data de aniversário"
        label="Data de aniversario"
        {...register("date", {
          required: {
            value: true,
            message: "Campo data de aniversario é obrigatório"
          },
          validate: {
            validDate: (value) => isValidDate(value) || "Data inválida",
            fourDigitYear: (value) =>
              hasFourDigitYear(value) || "O ano deve ter 4 dígitos",
            ofAge: (value) => isOfAge(value) || "Você deve ser maior de idade"
          }
        })}
        error={errors.date ? errors.date.message : ""}
      />
      <div className="col-end-5 col-span-2 flex flex-col gap-3">
        <Label htmlFor="convenio">Gênero*</Label>
        <Controller
          control={control}
          name="gender"
          rules={{ required: true }}
          render={(renderProps) => {
            return (
              <Select
                className={`${errors.gender ? " focus-visible:ring-red-500 border-red-500  rounded-md  border-2" : ""}`}
                styles={colorStyles}
                id="genero"
                components={animatedComponents}
                placeholder="Selecionar"
                options={genero}
                menuPlacement="auto"
                isSearchable={false}
                menuPosition="fixed"
                menuPortalTarget={isClient ? document.body : undefined}
                {...register("gender", {
                  required: {
                    value: true,
                    message: "Campo de gênero é obrigatório"
                  }
                })}
                {...renderProps.field}
                onChange={(e) => {
                  renderProps.field.onChange(e);
                }}
              />
            );
          }}
        />
        <p className="min-h-4 text-sm  font-semibold text-red-500">
          {errors.gender ? errors.gender.message : ""}
        </p>
      </div>
    </fieldset>
  );
}

export default StepOne;
