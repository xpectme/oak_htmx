import { Context, HXHeaders, Status } from "./deps.ts";

export interface HTMXState {
  isHTMX: boolean;
  htmx: HXHeaders;
  redirect(url: string): void;
}

// generate a middleware for oak
export default async function htmxMiddleware(
  context: Context,
  next: () => Promise<unknown>,
) {
  const htmx = new HXHeaders(context.request.headers, context.response.headers);
  context.state.isHTMX = htmx.isHTMX;
  context.state.htmx = htmx;
  context.state.redirect = (url: string) => {
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
