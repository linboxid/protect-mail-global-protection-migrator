import { createClient } from "redis";
import { REDIS_HOST, REDIS_PORT } from "@/constants.ts";

const redisClient = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Client Error", err);
});

redisClient.on("connect", () => {
  console.log("✅ Redis connected");
});

/**
 * Initialize Redis connection ONCE
 * Call this during app bootstrap
 */
export async function initRedis(): Promise<void> {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

export default redisClient;
