import axios from "axios";

export const getStage = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  // const data = await createNewDeals(dataProp);
  const resul = await axios.get(
    "https://api.hubapi.com/crm/v3/pipelines/deals",
    { headers }
  );
  const data = resul.data;
  const resultstage = data.results[0].stages.map((stage: any) => {
    return { values: stage.label, id: stage.id };
  });
  
  const stagesString = resultstage.map((stage: any) => `'${stage.values}' (id: ${stage.id})`).join(', ');
  
  return `To define the dealstage property, you need to choose one of these values along with their respective ids: ${stagesString}. Please make sure to select the ID of the desired stage.`;
  
};
