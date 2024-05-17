export const DateFormat = ({ date = new Date }) => {
  // retornar el formato de fecha en español con el nombre del mes completo y el año
  // ejemplo: miercoles 15 de enero de 2021
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("es-ES", options);
}

export const MoneyFormat = ({ amount = 0 }) => {
  // retornar el formato de moneda en español
  // ejemplo: $ 1,000.00
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
}

export const PhoneFormat = ({ phone = "" }) => {
  // validar que sea un número de teléfono válido de 10 dígitos
  if (!/^\d{10}$/.test(phone)) return phone;

  // retornar el formato (123) 456 78 90
  return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "($1) $2 $3 $4");
}
