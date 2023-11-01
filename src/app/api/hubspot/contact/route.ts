import axios from "axios";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";



export async function GET(request: Request) {
   
  return  NextResponse.json({funca: "funcaa"})
}
