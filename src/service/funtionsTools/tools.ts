import {
  DynamicTool,
  DynamicStructuredTool,
} from "@langchain/community/tools/dynamic";
import { createDeals } from "./createDeals";
import { getSearchCompany } from "./getSearchCompany";
import { createDealBusinessAssociation } from "./createDealBusinessAssociation";
import { updateDealData } from "./updateDealsData";
import axios from "axios";

import { ZodObject, string, z } from "zod";

export const tools: any = [
  createDeals,
  getSearchCompany,
  createDealBusinessAssociation,
  updateDealData,
];
