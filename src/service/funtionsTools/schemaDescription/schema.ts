import axios from "axios";
import { z } from "zod";

interface SchemaProp {
  token: string;
  defaultProperties: any;
  object: string;
}

const mapFieldTypeToDescription = (
  fieldType: string,
  options: any[],
  type?: string,
  description?: string
) => {
  switch (type) {
    case "bool":

      return fieldType === "checkbox" || fieldType === "calculation_equation"
        ? "Un campo que contiene opciones binarias (por ejemplo, Yes o No, True o False)."
        : "El fieldType no es compatible con el type bool.";

    case "enumeration":
      if (
        fieldType === "checkbox" ||
        fieldType === "radio" ||
        fieldType === "select" ||
        fieldType === "calculation_equation" ||
        fieldType === "booleancheckbox"
      ) {
        const optionsString = options
          .map((option: any) => `'(key: ${option.label}': Value: ${option.value})`)
          .join(", ");
          console.log(optionsString,"optioness")
        return `${description}, You must select the value that best fits the user's requirements and that you consider appropriate: ${optionsString} Make sure you select the correct value corresponding to your key, if you do not find it place a 'null'`;
      } else {
        return "El fieldType no es compatible con el type enumeration.";
      }
    case "date":
      return fieldType === "date"
        ? "Un valor de fecha, que se muestra como un selector de fecha."
        : "El fieldType no es compatible con el type date.";
    case "dateTime":
      return fieldType === "date"
        ? "Un valor de fecha y hora, que se muestra como un selector de fecha y hora."
        : "El fieldType no es compatible con el type dateTime.";
    case "string":
      return fieldType === "file" ||
        fieldType === "text" ||
        fieldType === "textarea" ||
        fieldType === "calculation_equation" ||
        fieldType === "html" ||
        fieldType === "phonenumber"
        ? "Una cadena de texto sin formato, limitada a 65.536 caracteres."
        : "El fieldType no es compatible con el type string.";
    case "number":
      return fieldType === "number" || fieldType === "calculation_equation"
        ? "Un valor numérico que contiene dígitos numéricos y como máximo un decimal."
        : "El fieldType no es compatible con el type number.";
    default:
      return "El type proporcionado no es válido.";
  }
};

export const schema = async ({
  token,
  defaultProperties,
  object,
}: SchemaProp) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const urlDeals = `https://api.hubapi.com/crm/v3/properties/${object}`;
  const responseData: any = await axios.get(urlDeals, { headers });
  const dataCompanies = responseData?.data;

  if (
    !dataCompanies ||
    !dataCompanies.results ||
    !Array.isArray(dataCompanies.results)
  ) {
    throw new Error("Error al obtener los datos de HubSpot");
  }

  const filteredData = dataCompanies.results.filter(
    (obj: any) => !obj.hasOwnProperty("hubspotDefined")
  );

  const schemaProperties: { [key: string]: any } = { ...defaultProperties };
  filteredData.forEach((obj: any) => {
    const description = mapFieldTypeToDescription(
      obj.fieldType,
      obj.options,
      obj.type,
      obj.description
    );

    schemaProperties[obj.name] = z.any().describe(description || "").optional();
  });

  return z.object(schemaProperties);
};
