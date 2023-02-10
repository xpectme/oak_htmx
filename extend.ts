// deno-lint-ignore-file no-empty-interface
import { State } from "https://deno.land/x/oak@v11.1.0/application.ts";
import { RouteParams } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { HXHeaders } from "./deps.ts";

declare interface HTMXContext {
  isHTMX: boolean;
  htmx: HXHeaders;
  redirect: (url: string) => void;
}

declare module "https://deno.land/x/oak@v10.6.0/mod.ts" {
  interface Context extends HTMXContext {}
  interface RouterContext<
    R extends string,
    P extends RouteParams<R> = RouteParams<R>,
    // deno-lint-ignore no-explicit-any
    S extends State = Record<string, any>,
  > extends HTMXContext {
  }
}

declare module "https://deno.land/x/oak@v11.1.0/mod.ts" {
  interface Context extends HTMXContext {}
  interface RouterContext<
    R extends string,
    P extends RouteParams<R> = RouteParams<R>,
    // deno-lint-ignore no-explicit-any
    S extends State = Record<string, any>,
  > extends HTMXContext {
  }
}
