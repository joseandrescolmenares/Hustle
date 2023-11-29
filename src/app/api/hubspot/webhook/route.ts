export async function POST(request: Request) {
  const requestBody = request.json();
  console.log(requestBody, "result");

  return Response.json({ hola: "hola" });
}
