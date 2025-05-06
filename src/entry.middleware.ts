import type { RequestHandler } from "@builder.io/qwik-city";

const isPublicRoute = (path: string) =>
  path.startsWith("/auth") || path.startsWith("/api/translate");


export const onRequest: RequestHandler = async ({ redirect, url }) => {

  const path = url.pathname;

  if (isPublicRoute(path)) return;

  try {
    // Call the backend to validate the session
    const response = await fetch('https://api.mypostech.store/validate-session', {
      method: 'GET',
      credentials: 'include', // Include cookies in the request
    });

    const result = await response.json();

    if (!result.success) {
      throw redirect(302, "/auth");
    }

  } catch (error) {
    throw redirect(302, "/auth");
  }
};
