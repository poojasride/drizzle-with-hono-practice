import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

const buildings = sqliteTable("building", {
  _id: integer("_id", { mode: "number" }).primaryKey({
    autoIncrement: true,
  }),
  buildingName: text("buildingName"),
  totalFloors: text("totalFloors"),
});

type Building = typeof buildings.$inferInsert;
type NewBuilding = typeof buildings.$inferInsert;

export { buildings, Building, NewBuilding };
