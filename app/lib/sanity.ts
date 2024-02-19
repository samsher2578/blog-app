import { createClient } from "next-sanity";

export const client = createClient({
  apiVersion: "2023-05-03",
  dataset: "production",
  projectId: "e6wvu7cq",
  useCdn: false,
});
