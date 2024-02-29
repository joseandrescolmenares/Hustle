
import axios from "axios";
import { z } from "zod";

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
        fieldType === "calculation_equation"
      ) {
        const optionsString = options
          .map((option: any) => `'${option.label}' (Value: ${option.value})`)
          .join(", ");
        return `${description}, You must select the value that you feel most closely matches the user's requirements and that you feel is appropriate: ${optionsString} Be sure to select the correct value corresponding to your key.`;
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

export const schema = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const urlDeals = `https://api.hubapi.com/crm/v3/properties/deals`;
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

  let defaultProperties: { [key: string]: any } = {
    amount: z
      .number()
      .describe("represents the monetary amount or monetary value"),
    dealname: z.string().describe("represents the name of the deal(negocio)."),
    dealstage: z
      .string()
      .nullable()
      .describe(
        "Current stage of a deal(negocio) or commercial negotiation within the sales process. No identifier is required unless explicitly needed. Retrieve it using the 'getStageForDeal' function if necessary"
      )
      .optional()
      .default(null),
    closedate: z
      .string()
      .describe(
        "this property defines the date on which the operation will be closed, for this property it is important to follow this format, for example: '2019-12-07T16:50:06.678Z'."
      )
      .optional(),
    dealId: z
      .string()
      .describe(
        "Identifier of the deal(Negocio) to update. it is very important and mandatory to pass this parameter."
      )
      .optional(),
    ownerId: z
      .string()
      .describe(
        `Owner ID associated with the deal(negocio). This field determines the ID of the user who appears as the owner of the deal.`
      )
      .optional(),
  };

  const schemaProperties: { [key: string]: any } = { ...defaultProperties };
  filteredData.forEach((obj: any) => {
    const description = mapFieldTypeToDescription(
      obj.fieldType,
      obj.options,
      obj.type,
      obj.description
    );

    schemaProperties[obj.name] = z
      .any()
      .describe(description || "");
  });

  return z.object(schemaProperties);
};
