type CompaniesProps = {
  name: string;
};

export const getCompanies = (companies: CompaniesProps[]) => {
  const names = companies.map((company) => company.name);
  const joinedNames = names.join(", ");

  if (joinedNames.length > 50) {
    return joinedNames.substring(0, 50) + "...";
  }

  return joinedNames;
};
