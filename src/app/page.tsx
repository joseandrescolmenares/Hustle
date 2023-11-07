"use client";
import { redirect } from "next/navigation";

export default function Home() {
  const ulrSlack = `https://slack.com/oauth/v2/authorize?scope=incoming-webhook,channels:read,commands&client_id=${process.env.SLACK_CLIENT_ID}`;
  return (
    <div>
      joseee
      <a href={ulrSlack}>slack</a>
    </div>
  );
}
