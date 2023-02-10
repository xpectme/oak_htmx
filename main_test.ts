import { testing } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.177.0/testing/asserts.ts";
import htmxMiddleware from "./main.ts";

Deno.test("HTMX exists", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);
  assertEquals(ctx.isHTMX, true);
});

Deno.test("HTMX does not exist", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);
  assertEquals(ctx.isHTMX, false);
});

Deno.test("Request has ajax boost", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
      ["HX-Boosted", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  assertEquals(ctx.isHTMX, true);
  assertEquals(ctx.htmx.state?.boosted, true);
});

Deno.test("Request has restore history", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
      ["HX-History-Restore-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  assertEquals(ctx.isHTMX, true);
  assertEquals(ctx.htmx.state?.historyRestoreRequest, true);
});

Deno.test("Request has Prompt", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
      ["HX-Prompt", "test"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  assertEquals(ctx.isHTMX, true);
  assertEquals(ctx.htmx.state?.prompt, "test");
});

Deno.test("Request has Current URL", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
      ["HX-Current-URL", "http://example.com/test"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  assertEquals(ctx.isHTMX, true);
  assertEquals(ctx.htmx.state?.currentUrl, "http://example.com/test");
});

Deno.test("Request has target ID", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
      ["HX-Target", "test"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  assertEquals(ctx.isHTMX, true);
  assertEquals(ctx.htmx.state?.targetId, "test");
});

Deno.test("Request has Trigger Name", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
      ["HX-Trigger-Name", "test"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  assertEquals(ctx.isHTMX, true);
  assertEquals(ctx.htmx.state?.triggerName, "test");
});

Deno.test("Request has Trigger ID", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
      ["HX-Trigger", "test"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  assertEquals(ctx.isHTMX, true);
  assertEquals(ctx.htmx.state?.triggerId, "test");
});

Deno.test("Respond with location string", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.htmx.location("/test");
  assertEquals(ctx.response.headers.get("HX-Location"), "/test");
});
Deno.test("Respond with location object (only path)", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.htmx.location({ path: "/test" });
  assertEquals(ctx.response.headers.get("HX-Location"), "/test");
});

Deno.test("Respond with location object", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.htmx.location({ path: "/test", event: "my-event" });
  assertEquals(
    ctx.response.headers.get("HX-Location"),
    '{"path":"/test","event":"my-event"}',
  );
});

Deno.test("Respond with push URL", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.htmx.pushUrl("/test");
  assertEquals(ctx.response.headers.get("HX-Push-Url"), "/test");
});

Deno.test("Respond with push URL disabled", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.htmx.pushUrl(false);
  assertEquals(ctx.response.headers.get("HX-Push-Url"), "false");
});

Deno.test("Respond with replace URL", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.htmx.replaceUrl("/test");
  assertEquals(ctx.response.headers.get("HX-Replace-Url"), "/test");
});

Deno.test("Respond with replace URL disabled", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.htmx.replaceUrl(false);
  assertEquals(ctx.response.headers.get("HX-Replace-Url"), "false");
});

Deno.test("Respond with redirect", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.redirect("/test");
  assertNotEquals(ctx.response.headers.get("Location"), "/test");
  assertEquals(ctx.response.headers.get("HX-Redirect"), "/test");
  assertEquals(ctx.response.status, 204);
});

Deno.test("Respond with redirect without HX-Request", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.redirect("/test");
  assertNotEquals(ctx.response.headers.get("HX-Redirect"), "/test");
  assertEquals(ctx.response.headers.get("Location"), "/test");
  assertEquals(ctx.response.status, 302);
});

Deno.test("Respond with refresh", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.htmx.refresh();
  assertEquals(ctx.response.headers.get("HX-Refresh"), "true");
});

Deno.test("Respond with single reswap", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.htmx.reswap("innerHTML");
  assertEquals(ctx.response.headers.get("HX-Reswap"), "innerHTML");
});

Deno.test("Respond with reswap [innerHTML scroll:top swap:1s]", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.htmx.reswap("innerHTML", "scroll:top", "swap:1s");
  assertEquals(
    ctx.response.headers.get("HX-Reswap"),
    "innerHTML scroll:top swap:1s",
  );
});

Deno.test("Respond with Retarget CSS Selector", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.htmx.retarget("#css-selector");
  assertEquals(ctx.response.headers.get("HX-Retarget"), "#css-selector");
});

Deno.test("Respond with trigger event", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.htmx.trigger({ "my-event": "my-value" });
  assertEquals(
    ctx.response.headers.get("HX-Trigger"),
    '{"my-event":"my-value"}',
  );
});

Deno.test("Respond with trigger event with multiple values", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.htmx.trigger({ "my-event": ["my-value", "my-value2"] });
  assertEquals(
    ctx.response.headers.get("HX-Trigger"),
    '{"my-event":["my-value","my-value2"]}',
  );
});

Deno.test("Respond with trigger event with multiple values and multiple events", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.htmx.trigger({
    "my-event": { prop: "value" },
    "my-event2": "my-value3",
  });
  assertEquals(
    ctx.response.headers.get("HX-Trigger"),
    '{"my-event":{"prop":"value"},"my-event2":"my-value3"}',
  );
});

Deno.test("Respond with trigger after settle", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.htmx.trigger({ "my-event": "my-value" }, "aftersettle");
  assertEquals(
    ctx.response.headers.get("HX-Trigger-After-Settle"),
    '{"my-event":"my-value"}',
  );
});

Deno.test("Respond with trigger after swap", async () => {
  const ctx = testing.createMockContext({
    path: "/a",
    headers: [
      ["HX-Request", "true"],
    ],
  });
  const next = testing.createMockNext();

  await htmxMiddleware(ctx, next);

  ctx.htmx.trigger({ "my-event": "my-value" }, "afterswap");
  assertEquals(
    ctx.response.headers.get("HX-Trigger-After-Swap"),
    '{"my-event":"my-value"}',
  );
});
