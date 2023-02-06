
export default async (request, context) => {
  return Response.json({ hello: "world" });
};
export const config = {
  path: "/api/crew-verified"
}