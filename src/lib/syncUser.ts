import api from "./api";

export async function syncUser(name: string, email: string) {
  const response = await api.post("/users/sync", { name, email });
  return response.data;
}