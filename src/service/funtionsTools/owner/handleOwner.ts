import axios from "axios";

interface Owner {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}
interface PropsOwner {
  token: string;
  ownerName?: string;
  emailOwner?: string;
}

export const handleOwners = async ({
  token,
  ownerName,
  emailOwner,
}: PropsOwner): Promise<string> => {
  const url = `https://api.hubapi.com/crm/v3/owners`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get<{ results: Owner[] }>(url, { headers });
    const owners = response.data.results;
    const ownerDetails = owners.map(
      (owner) =>
        `${owner.firstName} ${owner.lastName} - ${owner.email} - ID ${owner.id}`
    );

    const ownerDetailsString = ownerDetails.join(", ");

    return `You should select the ID corresponding to the owner you deem appropriate: ${ownerDetailsString}. Ensure you select the ID corresponding to the desired owner.`;
  } catch (error) {
    console.error("Error fetching owners:", error);
    return "An error occurred while fetching owners.";
  }
};
