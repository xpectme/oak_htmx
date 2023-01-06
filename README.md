# HTMX Middleware

This is a middleware for [HTMX](https://htmx.org/) that allows you to use HTMX
with [OAK](https://oakserver.github.io/oak/).

It implements the
[HTMX Request and Response Headers](https://htmx.org/reference/#headers) and
provides a `ctx.state.htmx` object that contains information about the HTMX
request. It also provides a `ctx.state.isHTMX` boolean that is `true` if the
request is an HTMX request.

## Usage

```ts
import { Application } from "https://deno.land/x/oak/mod.ts";
import { htmxMiddleware } from "https://deno.land/x/htmx/mod.ts";

const app = new Application();

app.use(htmxMiddleware);

app.use((ctx) => {
  if (ctx.state.isHTMX) {
    // This is an HTMX request
    ctx.response.body = "Hello HTMX!";
  } else {
    // This is a normal request
    ctx.response.body = "Hello World!";
  }
});
```

## State references for `ctx.state.htmx` methods

### `ctx.state.htmx.location(hxLocation: string | Partial<HTMXLocation>)`

The `HX-Location` header is used to tell the client to navigate to a new URL.

```ts
ctx.state.htmx.location("/new/url");
```

### `ctx.state.htmx.pushUrl(hxPushUrl: string)`

The `HX-Push-Url` header is used to tell the client to push a new URL to the
history stack.

```ts
ctx.state.htmx.pushUrl("/new/url");
```

### `ctx.state.htmx.replaceUrl(hxReplaceUrl: string)`

The `HX-Replace-URL` header is used to tell the client to replace the current
URL in the history stack.

```ts
ctx.state.htmx.replaceUrl("/new/url");
```

### `ctx.state.htmx.redirect(hxRedirect: string)`

The `HX-Redirect` header is used to tell the client to redirect to a new URL.

```ts
ctx.state.htmx.redirect("/new/url");
```

### `ctx.state.htmx.refresh(hxRefresh: string)`

The `HX-Refresh` header is used to tell the client to refresh the current page.

```ts
ctx.state.htmx.refresh();
```

### `ctx.state.htmx.reswap(hxReswap: HTMXSwapModifiers)`

Allows you to specify how the response will be swapped. See hx-swap for possible
values

See [HX-Reswap](https://htmx.org/reference/#response_headers) for more
information.

```ts
ctx.state.htmx.reswap("innerHTML");
```

### `ctx.state.htmx.retarget(selector: string)`

A CSS selector that updates the target of the content update to a different
element on the page.

See [HX-Retarget](https://htmx.org/reference/#response_headers) for more
information.

```ts
ctx.state.htmx.retarget("#my-element");
```

### `ctx.state.htmx.trigger(event: string, mode: "aftersettle" | "afterswap" | null = null)`

The `HX-Trigger` header is used to tell the client to trigger an event on the
current page.

Trigger an event on the current page.

```ts
ctx.state.htmx.trigger({ "my-event": "my message" });
```

Resulting HTTP header:

```
HX-Trigger: {"my-event": "my message"}
```

Trigger an event on the current page after the page has settled.

```ts
ctx.state.htmx.trigger({ "my-event": "my message" }, "afterswap");
```

Resulting HTTP header:

```
HX-Trigger-After-Swap: {"my-event": "my message"}
```

Trigger an event on the current page after the page has settled.

```ts
ctx.state.htmx.trigger({ "my-event": "my message" }, "aftersettle");
```

Resulting HTTP header:

```
HX-Trigger-After-Settle: {"my-event": "my message"}
```

## State references for `ctx.state.htmx` properties

location pushUrl replaceUrl redirect refresh reswap retarget trigger

## License

BSD-2

## Author

- [Mario Stöcklein](https://github.com/mstoecklein)
