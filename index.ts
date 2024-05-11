import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { campuses, NewCampus } from "./db/models/campus.schema.js";
import { buildings } from "./db/models/building.schema.js";
import { app } from "./drizzle.config.js";
import { eq } from "drizzle-orm";

const sqlite = new Database("./db/campus.db");
const db: any = drizzle(sqlite);

//Campus

app.post("/addCampus", async (c) => {
  const newCampus = await c.req.json();
  const campus = await db.insert(campuses).values(newCampus);
  return c.json({
    msg: "Successfully Created!",
  });
});

app.get("/campuses", async (res) => {
  const allCampuses = await db
    .select({
      campus_id: campuses.campus_id,
      name: campuses.name,
      address: campuses.address,
    })
    .from(campuses);
  return res.json({
    allCampuses,
  });
});

app.put("/campuses", async (c) => {
  const updatedCampus: NewCampus = await c.req.json();
  await db
    .update(campuses)
    .set(updatedCampus)
    .where(eq(campuses.name, "Campus 300"))
    .returning({ updatedId: campuses.campus_id });

  return c.json({
    msg: "Campus updated successfully!",
  });
});

app.delete("/campuses", async (c) => {
  await db.delete(campuses).where(eq(campuses.name, "Campus 400"));

  return c.json({
    msg: "Campus deleted successfully!",
  });
});

//Building

app.get("/building", async (building) => {
  try {
    const allBuilding = await db
      .select({
        _id: buildings._id,
        buildingName: buildings.buildingName,
        totalFloors: buildings.totalFloors,
      })
      .from(buildings);
    console.log(allBuilding);

    return building.json({
      allBuilding,
    });
  } catch (error) {
    console.error(error);
    return building.json({ error: "Internal Server Error" });
  }
});

app.post("/building", async (building: any) => {
  try {
    const buildingDtl = await building.req.json();
    const newBuilding = await db.insert(buildings).values(buildingDtl);
    return building.json({
      msg: "Building created successfully",
    });
  } catch (error) {
    console.error(error);
    return building.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/building", async (building: any) => {
  try {
    const updatedBuilding = await building.req.json();
    await db
      .update(buildings)
      .set(updatedBuilding)
      .where(eq(buildings.buildingName, "D Block"))
      .returning({ updatedId: buildings._id });

    return building.json({ msg: "Building updated successfully" });
  } catch (error) {
    console.error(error);
    return building.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/building", async (building: any) => {
  try {
    await db.delete(buildings).where(eq(buildings.buildingName, "C Block"));

    return building.json({ msg: "Building deleted successfully" });
  } catch (error) {
    console.error(error);
    return building.status(500).json({ error: "Internal Server Error" });
  }
});
