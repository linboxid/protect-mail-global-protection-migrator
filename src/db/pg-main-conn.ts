import { Pool } from "pg";
import {
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
} from "@/constants.ts";

export const pgMainConn = new Pool({
  user: POSTGRES_USERNAME,
  host: POSTGRES_HOST,
  database: "main",
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT || "5432"),
});
