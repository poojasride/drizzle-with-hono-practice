import { test } from "tap";
import { Hono } from "hono";
import tap from "tap";
import { serve } from "@hono/node-server";

const config: any = {
  schema: "./db/models",
  out: "./db/migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./db/campus.db",
  },
};

const app = new Hono(config);

tap.before(async () => {
  await new Promise<void>((resolve) => {
    serve(app, (info) => {
      console.log(`Server started on port ${info.port}`);
      resolve();
    });
  });
});

test("API Tests", async (t: any) => {
  const postData = {
    name: "Campus 900",
    address: "Cbe",
  };

  const postResponse = await app.request(`/addCampus`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  const responseBodyText = await postResponse.text();
  console.log("Response Text:", responseBodyText);

  t.end();
});
