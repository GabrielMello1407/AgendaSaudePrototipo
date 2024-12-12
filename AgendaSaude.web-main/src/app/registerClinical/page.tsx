"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MdKeyboardArrowRight } from "react-icons/md";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

import StepFour from "../../components/clinicRegistrationForm/stepFour";
import StepOne from "../../components/clinicRegistrationForm/stepOne";
import StepThree from "../../components/clinicRegistrationForm/stepThree";
import StepTwo from "../../components/clinicRegistrationForm/stepTwo";
import { Button } from "../../components/ui/button";
import UseMulitstepForm from "../../hooks/UseMultistepForm";
import { ClinicaFormData } from "../../shared/interfaces/IClinica";

export default function registerClinical() {
  const [openModal, setOpenModal] = useState(false);
  const [progress, setProgress] = useState(25);
  const router = useRouter();

  const methods = useForm<ClinicaFormData>({
    defaultValues: { isWhatsapp: false, acceptTerm: false, hasNumber: false }
  });

  const acceptTerm = methods.watch("acceptTerm");

  const { currentStep, step, isFirstStep, back, next, isLastStep } =
    UseMulitstepForm([
      <StepOne key="stepOne" />,
      <StepTwo key="stepTwo" />,
      <StepThree key="stepThree" />,
      <StepFour key="stepFour" />
    ]);

  useEffect(() => {
    function getProgress() {
      if (currentStep + 1 === 1) {
        return setProgress(25);
      }
      if (currentStep + 1 === 2) {
        return setProgress(50);
      }
      if (currentStep + 1 === 3) {
        return setProgress(75);
      }
      if (currentStep + 1 === 4) {
        return setProgress(100);
      }
    }
    getProgress();
  }, [currentStep]);

  const onSubmit: SubmitHandler<ClinicaFormData> = (data, event) => {
    event?.preventDefault();
    console.log(data);
    if (!isLastStep) return next();
    setOpenModal(true);
  };

  function sendEmail() {
    setOpenModal(false);
    router.push("/");
  }
  return (
    <>
      <div className="min-h-screen  bg-gradient-to-b md:bg-gradient-to-r  from-white from-50% to-[#C2C1C1] to-50%">
        <div className="flex container  justify-between flex-col md:flex-row ">
          <div className=" flex flex-1 gap-6 flex-col justify-center  md:justify-start min-h-screen ">
            <hgroup className="max-w-sm pr-4 md:pt-32">
              <h2 className=" text-5xl font-bold text-black leading-[75px]">
                Lorem ipsum dolor sit amet.
              </h2>
            </hgroup>
            <p className=" text-base text-gray-900 max-w-md pr-4  font-medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              non sollicitudin tellus. Vivamus venenatis libero suscipit sem
              venenatis finibus. Maecenas orci enim, sodales quis porttitor a,
              feugiat in est.
            </p>
          </div>
          <div className=" flex flex-1 justify-center items-center md:justify-start md:items-start min-h-screen ">
            <div className="md:pt-[72px] w-full md:pl-10 lg:pl-20">
              <hgroup className="flex flex-col justify-start gap-2">
                <p className=" text-4xl  font-thin text-slate-900 italic mb-1">
                  LOGO
                </p>
                <h3 className=" text-3xl font-semibold">
                  Lorem ipsum dolor sit amet.
                </h3>
                <span className=" text-base font-medium">
                  Lorem ipsum dolor sit amet.
                </span>
              </hgroup>
              <Progress value={progress} className="w-full mt-12  mb-10" />
              <FormProvider {...methods}>
                <form
                  className=" w-full  h-[500px] flex justify-between flex-col"
                  onSubmit={methods.handleSubmit((e) => onSubmit(e))}
                >
                  {step}
                  <div className="flex items-center gap-4 justify-center ">
                    {!isFirstStep && (
                      <Button
                        variant={"secondary"}
                        onClick={back}
                        type="button"
                        className="w-2/5 bg-white text-black"
                      >
                        Voltar
                      </Button>
                    )}

                    <Button
                      type="submit"
                      className=" w-2/5"
                      disabled={!acceptTerm && isLastStep}
                    >
                      <span>{isLastStep ? "Finalizar" : "Continuar"}</span>
                      {isLastStep ? null : (
                        <MdKeyboardArrowRight
                          color="white"
                          className=" size-8"
                        />
                      )}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={openModal}
        defaultOpen={openModal}
        modal
        onOpenChange={() => setOpenModal((prev) => !prev)}
      >
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader className="gap-5">
            <DialogTitle className="font-semibold text-5xl text-center  text-black">
              Cadastro realizado com sucesso
            </DialogTitle>
            <DialogDescription className="font-normal text-base  text-center leading-6  text-[#2D2E2E]">
              Confirme sua conta através do link enviado para seu e-mail
              cadastrado.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="   items-center sm:justify-center flex">
            <Button
              type="submit"
              className="w-2/5 px-4 py-7 "
              onClick={sendEmail}
            >
              Concluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
