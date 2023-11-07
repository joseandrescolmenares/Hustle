import axios from "axios";
import { renewToken } from "./renewToken";

export const getContact = async (cookieToken: string | undefined) => {
    try {
      const headers = {
        Authorization: `Bearer ${cookieToken}`,
        "Content-Type": "application/json",
      };
    //  asociasones
"    crm/v4/associations/contact/company/labels"
      const Urldeal = "https://api.hubapi.com/crm/v3/objects/deals"
    
      const UrlTest = "https://api.hubapi.com/crm/v3/objects/contacts"
      const apiUrl = "https://api.hubapi.com/crm/v3/objects/contacts";
      const responseData: any = await axios.get(UrlTest, { headers });
      const dataContact = responseData.data;
      return dataContact  
    
    } catch (error) {
        
   throw new Error
    
    }
  };

  