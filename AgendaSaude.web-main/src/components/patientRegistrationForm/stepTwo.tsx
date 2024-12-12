import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { noMask } from "../../hooks/useMask";
import { Input } from "../ui/input";
import { PacienteFormData } from "@/shared/interfaces/IPacient";

function StepTwo() {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<PacienteFormData>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cep = noMask(watch("zipcode"));
  const hasNumber = watch("hasNumber");

  useEffect(() => {
    if (hasNumber) return setValue("houseNumber", "", { shouldValidate: true });
  }, [hasNumber, setValue]);

  return (
    <fieldset className="grid grid-cols-6 gap-x-4 ">
      <Input
        className="col-span-6 lg:col-span-6"
        placeholder="Endereço"
        label="Endereço*"
        id="street"
        type="text"
        {...register("street", {
          required: {
            value: true,
            message: "Campo de endereço é obrigatório"
          },
          maxLength: 255
        })}
        error={errors.street ? errors.street.message : ""}
      />
      <Input
        className="col-span-3"
        mask="cep"
        placeholder="CEP"
        label="Cep*"
        id="zipcode"
        type="text"
        {...register("zipcode", {
          required: {
            value: true,
            message: "Campo CEP é obrigatório"
          },
          pattern: {
            value: /^\d{5}-\d{3}$/,
            message: "Formato inválido"
          }
        })}
        error={errors.zipcode ? errors.zipcode.message : ""}
      />
      <Input
        className="col-span-3"
        placeholder="Estado"
        label="Estado*"
        id="state"
        type="text"
        {...register("state", {
          required: {
            value: true,
            message: "Campo Estado é obrigatório"
          }
        })}
        error={errors.state ? errors.state.message : ""}
      />
      <Input
        className="col-span-3"
        placeholder="Cidade"
        label="Cidade*"
        id="city"
        type="text"
        {...register("city", {
          required: {
            value: true,
            message: "Campo Cidade é obrigatório"
          }
        })}
        error={errors.city ? errors.city.message : ""}
      />
      <Input
        className="col-span-3"
        placeholder="Bairro"
        label="Bairro*"
        id="neighborhood"
        type="text"
        {...register("neighborhood", {
          required: {
            value: true,
            message: "Campo Bairro é obrigatório"
          }
        })}
        error={errors.neighborhood ? errors.neighborhood.message : ""}
      />
      <Input
        className="col-span-6"
        placeholder="Complemento"
        label="Complemento"
        id="addressComplement"
        type="text"
      />
    </fieldset>
  );
}

export default StepTwo;
