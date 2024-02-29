import axios from "axios";

export const getStage = async (token: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    
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
      .map((stage) => `'${stage.values}' (ID: ${stage.id})`)
      .join(", ");

      console.log(stagesString,'strin')

    return `Please select the ID that corresponds to the value you consider appropriate from the following list: ${stagesString}. Make sure to choose the ID that corresponds to the stage you want.`;

  } catch (error) {
    console.error("Error creating associations:", error);
    return "Error retrieving stages. Please try again later. We apologize for the inconvenience.";
  }
};
