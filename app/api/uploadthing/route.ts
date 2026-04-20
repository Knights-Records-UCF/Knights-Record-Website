import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

console.log("secret exists?", !!process.env.UPLOADTHING_SECRET);
console.log("app id exists?", !!process.env.UPLOADTHING_APP_ID);

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
