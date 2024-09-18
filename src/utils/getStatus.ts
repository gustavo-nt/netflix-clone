export const getStatus = (status: string) => {
  const statusMap = {
    "returning series": "Renovada",
    released: "Lançado",
    ended: "Finalizada",
  } as { [key: string]: string };

  return statusMap[status.toLowerCase()] || "Não definido";
};
