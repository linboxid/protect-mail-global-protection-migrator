import { initRedis } from "@/db/redis-conn.ts";

async function bootstrap() {
  await initRedis();
}

bootstrap();
