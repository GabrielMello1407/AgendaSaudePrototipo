import { useFormContext, Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { ClinicaFormData } from "../../shared/interfaces/IClinica";
import { Label } from "../ui/label";

const animatedComponents = makeAnimated();

function StepThree() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<ClinicaFormData>();

  const convenios = [
    { value: "semConvenios", label: "Sem convênios" },
    { value: "bradesco", label: "Bradesco" },
    { value: "unimed", label: "Unimed" },
    { value: "amil", label: "Amil" },
    { value: "assim", label: "Assim" },
    { value: "notreDame", label: "NotreDame" },
    { value: "sulAmerica", label: "SulAmérica" },
    { value: "portoSeguro", label: "Porto Seguro" }
  ];
  const especialidadesMedicas = [
    { value: "cardiologia", label: "Cardiologia" },
    { value: "dermatologia", label: "Dermatologia" },
    { value: "ginecologia", label: "Ginecologia" },
    { value: "ortopedia", label: "Ortopedia" },
    { value: "pediatria", label: "Pediatria" }
  ];

  const colorStyles = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: (styles: any) => ({
      ...styles,
      minHeight: "2.75em"
    })
  };
  return (
    <fieldset className=" grid grid-cols-1 gap-4 ">
      <div className="col-span-1 flex flex-col gap-3">
        <Label htmlFor="Especialidadesmedica">Especialidades médicas*</Label>
        <Controller
          control={control}
          name="specialty"
          rules={{ required: true }}
          render={(renderProps) => {
            return (
              <Select
                styles={colorStyles}
                className={`${errors.specialty ? " focus-visible:ring-red-500 border-red-500  rounded-md  border-2" : ""}`}
                id="Especialidadesmedica"
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                placeholder="Selecionar"
                options={especialidadesMedicas}
                menuPlacement="auto"
                isSearchable={false}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                {...register("specialty", {
                  required: {
                    value: true,
                    message: "Campo Especialidades médicas é obrigatório"
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
          {errors.specialty ? errors.specialty.message : ""}
        </p>
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        <Label htmlFor="convenio">Convênio*</Label>
        <Controller
          control={control}
          name="healthInsurance"
          rules={{ required: true }}
          render={(renderProps) => {
            return (
              <Select
                className={`${errors.healthInsurance ? " focus-visible:ring-red-500 border-red-500  rounded-md  border-2" : ""}`}
                styles={colorStyles}
                closeMenuOnSelect={false}
                id="convenio"
                components={animatedComponents}
                isMulti
                placeholder="Selecionar"
                options={convenios}
                menuPlacement="auto"
                isSearchable={false}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                {...register("healthInsurance", {
                  required: {
                    value: true,
                    message: "Campo Convênio é obrigatório"
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
          {errors.healthInsurance ? errors.healthInsurance.message : ""}
        </p>
      </div>
    </fieldset>
  );
}

export default StepThree;
