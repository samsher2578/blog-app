import { simpleBlogCard } from "./lib/interface";
import { client } from "./lib/sanity";

async function getData() {
  const query = `*[_type == 'blog'] 
  {
    title,
  smallDescription,
 'currentSlug' : slug.current   
 titleImage
}`;

  const data = await client.fetch(query);

  return data;
}
export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return <div className="grid grid-cols-1 lg:grid-cols-4 mt-5"></div>;
}
