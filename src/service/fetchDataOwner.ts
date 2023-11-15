import { getIOwner } from "./hubspot/owners/getIdOwner";
import { getAllDeals } from "@/service/hubspot/deals/getAllDeals";

export const asyncFetchDataOwner = async () => {
  try {
    const resultDeals = await getAllDeals();
    if (!resultDeals) return;
    const results = resultDeals.results;
    const promises = results.map(
      (deals: {
        properties: {
          hubspot_owner_id: string;
          dealname: string;
          hs_object_id: string;
          num_associated_contacts: any;
        };
      }) =>
        getIOwner(
          deals.properties.hubspot_owner_id,
          deals.properties.dealname,
          deals.properties.hs_object_id,
          deals.properties.num_associated_contacts
        )
    );
    const data = await Promise.all(promises);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error();
  }
};
