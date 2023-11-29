export async function POST(request: Request) {
  const requestBody = await request.json();
  console.log(requestBody, "result");

  return Response.json({ hola: "hola" });
}
