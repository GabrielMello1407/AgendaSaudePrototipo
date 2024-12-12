export const handleKeyup = (
  event: React.FormEvent<HTMLInputElement>,
  mask: "default" | "phone" | "cnpj" | "cep" | "cpf" | "cellphone" | "number"
) => {
  if (mask === "phone") {
    event.currentTarget.maxLength = 14;
    const value = event.currentTarget.value;
    const noMask = value.replace(/\D/g, "");
    const Masked = noMask
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
    event.currentTarget.value = Masked;
    return event;
  }
  if (mask === "cellphone") {
    event.currentTarget.maxLength = 15;
    const value = event.currentTarget.value;
    const noMask = value.replace(/\D/g, "");
    const Masked = noMask
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
    event.currentTarget.value = Masked;
    return event;
  }
  if (mask === "cnpj") {
    event.currentTarget.maxLength = 18;
    const value = event.currentTarget.value;
    const noMask = value.replace(/\D/g, "");
    const Masked = noMask
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
    event.currentTarget.value = Masked;
    return event;
  }
  if (mask === "cep") {
    event.currentTarget.maxLength = 9;
    const value = event.currentTarget.value;
    const noMask = value.replace(/\D/g, "");
    const Masked = noMask
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
    event.currentTarget.value = Masked;
    return event;
  }
  if (mask === "cpf") {
    event.currentTarget.maxLength = 14;
    const value = event.currentTarget.value;
    const noMask = value.replace(/\D/g, "");
    const Masked = noMask
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
    event.currentTarget.value = Masked;
    return event;
  }
  if (mask === "number") {
    event.currentTarget.maxLength = 6;
    const value = event.currentTarget.value;
    const noMask = value.replace(/[^a-zA-Z0-9]/g, ""); // Permite apenas letras e números
    const masked = noMask.replace(/([a-zA-Z0-9]{6})/, "$1");

    event.currentTarget.value = masked;
    return event;
  }
};

export const noMask = (value: string | undefined) => {
  if (!value) return "";

  return value.replace(/[^0-9]/g, "");
};
