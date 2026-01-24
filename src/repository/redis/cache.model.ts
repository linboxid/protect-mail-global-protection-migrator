import redisClient from "@/db/redis-conn.ts";

type CacheSetParams<T> = {
  key: string;
  value: T;
  ttlSeconds?: number;
};

export class CacheModel {
  async get<T>(key: string): Promise<T | null> {
    const raw = await redisClient.get(key);
    if (!raw) return null;

    return JSON.parse(raw) as T;
  }

  async set<T>({
    key,
    value,
    ttlSeconds = 3600,
  }: CacheSetParams<T>): Promise<void> {
    await redisClient.set(key, JSON.stringify(value), {
      EX: ttlSeconds,
    });
  }

  async del(key: string): Promise<number> {
    return await redisClient.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await redisClient.exists(key)) === 1;
  }
}
