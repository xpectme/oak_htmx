import type { Context } from "./deps.ts";
import { HXHeaders, Status } from "./deps.ts";

// generate a middleware for oak
export default async function htmxMiddleware(
  context: Context,
  next: () => Promise<unknown>,
) {
  const htmx = new HXHeaders(context.request.headers, context.response.headers);
  context.isHTMX = htmx.isHTMX;
  context.htmx = htmx;
  context.redirect = (url: string) => {
    if (htmx.isHTMX) {
      context.response.status = Status.NoContent;
      htmx.redirect(url);
    } else {
      context.response.redirect(url);
    }
  };

  // continue to the next middleware
  await next();
}
