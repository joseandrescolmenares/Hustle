import axios from "axios";
import { z } from "zod";


export const schema = async (token:string) => {

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const urlDeals = `https://api.hubapi.com/crm/v3/properties/deals`;
    const responseData: any = await axios.get(urlDeals, { headers });
    const dataCompanies = responseData?.data;


    const filteredData = dataCompanies.results.filter((obj : any) => !obj.hasOwnProperty('hubspotDefined'));
    console.log('Objetos filtrados:', filteredData);

  return {
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
};
// import axios from "axios";
// import { z } from "zod";

// export const schema = async (token: string) => {
//   const headers = {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   };
//   const urlDeals = `https://api.hubapi.com/crm/v3/properties/deals`;
//   const responseData: any = await axios.get(urlDeals, { headers });
//   const dataCompanies = responseData?.data;

//   if (!dataCompanies || !dataCompanies.results || !Array.isArray(dataCompanies.results)) {
//     throw new Error('Error al obtener los datos de HubSpot');
//   }

//   const filteredData = dataCompanies.results.filter((obj: any) => !obj.hasOwnProperty('hubspotDefined'));
//   console.log('Objetos filtrados:', filteredData);

//   const defaultProperties = {
//     amount: z.number().description("represents the monetary amount or monetary value").optional(),
//     dealname: z.string().optional().description("represents the name of the deal(negocio)"),
//     dealstage: z.string().nullable().optional().default(null)
//       .description("Current stage of a deal(negocio) or commercial negotiation within the sales process. No identifier is required unless explicitly needed. Retrieve it using the 'getStageForDeal' function if necessary"),
//     closedate: z.string().optional().description("this property defines the date on which the operation will be closed, for this property it is important to follow this format, for example: '2019-12-07T16:50:06.678Z'."),
//     dealId: z.string().optional().description("Identifier of the deal(Negocio) to update. it is very important and mandatory to pass this parameter."),
//     ownerId: z.string().optional().description(`Owner ID associated with the deal(negocio). This field determines the ID of the user who appears as the owner of the deal.`),
//   };

//   const schemaProperties: { [key: string]: any } = { ...defaultProperties };
//   filteredData.forEach((obj: any) => {
//     schemaProperties[obj.name] = z.string().optional().description(obj.description || ''); // Puedes ajustar el tipo según corresponda
//     if (obj.fieldType === 'select') {
//       const options = obj.options.reduce((acc: any, option: any) => {
//         acc[option.value] = option.label;
//         return acc;
//       }, {});
//       schemaProperties[obj.name] = z.enum(options).description(obj.description || ''); // Aquí puedes ajustar el tipo de acuerdo a la propiedad
//     } else {
//       schemaProperties[obj.name] = z.string().optional().description(obj.description || ''); // Puedes ajustar el tipo según corresponda
//     }
//   });

//   return z.object(schemaProperties);
// };
