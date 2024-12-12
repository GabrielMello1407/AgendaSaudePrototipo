import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { ClinicaFormData } from "../../shared/interfaces/IClinica";
import { Label } from "../ui/label";

function StepOne() {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<ClinicaFormData>();

  const isWhatsapp: boolean = watch("isWhatsapp");
  const cellPhoneNumber: string = watch("cellPhone");

  useEffect(() => {
    if (isWhatsapp)
      return setValue("whatsapp", cellPhoneNumber, { shouldValidate: true });
  }, [cellPhoneNumber, isWhatsapp, setValue]);

  return (
    <fieldset className="grid grid-cols-4 gap-x-4  items-center  ">
      <Input
        id="name"
        type="text"
        className="col-span-4"
        placeholder="Nome da clínica"
        label="Nome da clínica*"
        {...register("name", {
          required: {
            value: true,
            message: "Campo Nome da clínica é obrigatório"
          },
          maxLength: 255
        })}
        error={errors.name ? errors.name.message : ""}
      />
      <Input
        id="phone"
        mask="phone"
        type="tel"
        className=" col-span-4 lg:col-span-2"
        placeholder="(00) 0000-0000"
        label="Telefone*"
        {...register("phone", {
          required: {
            value: true,
            message: "Campo Telefone é obrigatório"
          },
          pattern: {
            value:
              /^\(?(?:(?:\+|00)?(55)\s?)?(?:(?:(?:(?:\d{2})|\((?:0?[1-9]|[1-9][0-9])\))\s?)?(?:[2-9]\d{3})[-.\s]?(\d{4}))$/,
            message: "Formato inválido"
          }
        })}
        error={errors.phone ? errors.phone.message : ""}
      />
      <Input
        id="cellPhone"
        mask="cellphone"
        type="tel"
        className="col-span-2 lg:col-span-1"
        placeholder="(00) 00000-0000"
        label="Celular*"
        {...register("cellPhone", {
          required: {
            value: true,
            message: "Campo obrigatório"
          },
          pattern: {
            value:
              /^\(?(?:(?:\+|00)?(55)\s?)?(?:(?:(?:(?:\d{2})|\((?:0?[1-9]|[1-9][0-9])\))\s?)?(?:9\d{4})[-.\s]?(\d{4}))$/,
            message: "Formato inválido"
          }
        })}
        error={errors.cellPhone ? errors.cellPhone.message : ""}
      />
      <div className=" col-span-2 lg:col-span-1 flex  w-full  justify-start gap-1 items-center  ">
        <input
          type="checkbox"
          id="isWhatsapp"
          {...register("isWhatsapp", {
            required: false
          })}
        />
        <Label htmlFor="isWhatsapp" className=" text-xs">
          É whatsapp ?
        </Label>
      </div>
      <Input
        disabled={isWhatsapp}
        id="whatsapp"
        mask="cellphone"
        type="tel"
        className="col-span-2"
        placeholder="(00) 00000-0000"
        label="Whatapp*"
        {...register("whatsapp", {
          required: {
            value: isWhatsapp ? false : true,
            message: "Campo Whatapp é obrigatório"
          },
          pattern: {
            value:
              /^\(?(?:(?:\+|00)?(55)\s?)?(?:(?:(?:(?:\d{2})|\((?:0?[1-9]|[1-9][0-9])\))\s?)?(?:9\d{4})[-.\s]?(\d{4}))$/,
            message: "Formato inválido"
          }
        })}
        error={errors.whatsapp ? errors.whatsapp.message : ""}
      />
    </fieldset>
  );
}

export default StepOne;
