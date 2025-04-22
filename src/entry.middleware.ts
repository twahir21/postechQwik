import type { RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = async ({ redirect, url }) => {
  console.log("Middleware triggered for:", url.pathname); // Debugging
  
  // Allow public access to auth pages
  if (url.pathname.startsWith("/auth")) {
    console.log("Public auth route, skipping auth check.");
    return;
  }


  try {
    // Call the backend to validate the session
    const response = await fetch('https://api.mypostech.store/validate-session', {
      method: 'GET',
      credentials: 'include', // Include cookies in the request
    });

    const result = await response.json();

    if (!result.success) {
      console.log("Session invalid. Redirecting to /auth");
      throw redirect(302, "/auth");
    }

    console.log("Session valid. User ID:", result.userId);
  } catch (error) {
    console.error("Error validating session:", error);
    throw redirect(302, "/auth");
  }
};
