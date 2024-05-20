import { test } from "tap";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import fetch from "node-fetch";
import tap from "tap";

// Create an instance of Hono
export const app = new Hono();
const server = serve(app);

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Teardown after tests
tap.teardown(async () => {
  console.log("Tests completed, server closed");
  await server.close();
});

// Test for getting all campuses

test("API 'campus'", async (t) => {
  test("API 'campus' - GET /campuses", async (t) => {
    const res = await fetch("http://localhost:3000/campuses");

    const response: any = await res.json();
    console.log("Response:", response);
    t.ok(
      response.allCampuses.length > 0,
      "Should retrieve campuses successfully"
    );
  });

  test("API 'campus' - POST /addCampus", async (t) => {
    const newCampus = { name: "New Campus", address: "123 Street" };
    const res = await fetch("http://localhost:3000/addCampus", {
      method: "POST",
      body: JSON.stringify(newCampus),
      headers: { "Content-Type": "application/json" },
    });

    var response: any = await res.json();

    console.log("Response:", response);
    t.ok(
      response.msg === "Successfully Created!",
      "Campus should be created successfully"
    );
  });

  // Test for updating a campus
  test("API 'campus' - PUT /campuses", async (t) => {
    const updatedCampus = { name: "Updated Campus", address: "456 Street" };
    const res = await fetch("http://localhost:3000/campuses", {
      method: "PUT",
      body: JSON.stringify(updatedCampus),
      headers: { "Content-Type": "application/json" },
    });

    const response: any = await res.json();
    console.log("Response:", response);
    t.ok(
      response.msg === "Campus updated successfully!",
      "Campus should be updated successfully"
    );
  });

  // Test for deleting a campus
  test("API 'campus' - DELETE /campuses", async (t) => {
    const res = await fetch("http://localhost:3000/campuses", {
      method: "DELETE",
      body: JSON.stringify({ name: "Campus 900" }),
      headers: { "Content-Type": "application/json" },
    });

    const response: any = await res.json();
    console.log("Response:", response);
    t.ok(
      response.msg === "Campus deleted successfully!",
      "Campus should be deleted successfully"
    );
  });

  // Test for adding a building
  test("API 'building' - POST /building", async (t) => {
    const newBuilding = { buildingName: "New Building", totalFloors: 5 };
    const res = await fetch("http://localhost:3000/building", {
      method: "POST",
      body: JSON.stringify(newBuilding),
      headers: { "Content-Type": "application/json" },
    });

    const response: any = await res.json();
    console.log("Response:", response);
    t.equal(res.status, 200, "Status code should be 200");
    t.ok(
      response.msg === "Building created successfully",
      "Building should be created successfully"
    );
  });

  // Test for getting all buildings
  test("API 'building' - GET /building", async (t) => {
    const res = await fetch("http://localhost:3000/building");

    const response: any = await res.json();
    console.log("Response:", response);
    t.equal(res.status, 200, "Status code should be 200");
    t.ok(
      response.allBuilding.length > 0,
      "Should retrieve buildings successfully"
    );
  });

  // Test for updating a building
  test("API 'building' - PUT /building", async (t) => {
    const updatedBuilding = {
      buildingName: "Updated Building",
      totalFloors: 10,
    };
    const res = await fetch("http://localhost:3000/building", {
      method: "PUT",
      body: JSON.stringify(updatedBuilding),
      headers: { "Content-Type": "application/json" },
    });

    const response: any = await res.json();
    console.log("Response:", response);
    t.equal(res.status, 200, "Status code should be 200");
    t.ok(
      response.msg === "Building updated successfully",
      "Building should be updated successfully"
    );
  });

  // Test for deleting a building
  test("API 'building' - DELETE /building", async (t) => {
    const res = await fetch("http://localhost:3000/building", {
      method: "DELETE",
      body: JSON.stringify({ buildingName: "C Block" }),
      headers: { "Content-Type": "application/json" },
    });

    const response: any = await res.json();
    console.log("Response:", response);
    t.equal(res.status, 200, "Status code should be 200");
    t.ok(
      response.msg === "Building deleted successfully",
      "Building should be deleted successfully"
    );
  });
});
