import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
export const GET: APIRoute = async ({ params, request }) => {
  const projectsCollection = await getCollection('projects')
  return new Response(JSON.stringify(projectsCollection))
}

