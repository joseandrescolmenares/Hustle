import axios from "axios";

export const getStage = async (token: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // const data = await createNewDeals(dataProp);
    const resul = await axios.get(
      "https://api.hubapi.com/crm/v3/pipelines/deals",
      { headers }
    );
    const data = resul.data;

    const stages: Storage[] = data.results[0].stages.map((stage: any) => ({
      values: stage.label,
      id: stage.id,
    }));

    const stagesString = stages
      .map((stage) => `'${stage.values}' (id: ${stage.id})`)
      .join(", ");

    return `You should select the id corresponding to the value you deem appropriate: ${stagesString} Ensure you select the id corresponding to the desired stage.`;

  } catch (error) {
    console.error("Error creating associations:", error);
    return "Error retrieving stages. Please try again later. We apologize for the inconvenience.";
  }
};
