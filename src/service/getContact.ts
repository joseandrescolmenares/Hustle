import axios from "axios";

export const getContact = async (cookieToken: string | undefined) => {
    try {
      const headers = {
        Authorization: `Bearer ${cookieToken}`,
        "Content-Type": "application/json",
      };
      // objectTypeId
      const Urldeal = "https://api.hubapi.com/crm/v3/objects/deals"
      const UrlTest = "https://api.hubapi.com/crm/v3/objects/0-48"
      const apiUrl = "https://api.hubapi.com/crm/v3/objects/contacts";
      const responseData: any = await axios.get(UrlTest, { headers });
      const dataContact = responseData.data;
      return dataContact  
    
    } catch (error) {
      if(error === 401){
        console.log("error token")
      }
        
      console.log(error)
     throw new Error
    
    }
  };
  