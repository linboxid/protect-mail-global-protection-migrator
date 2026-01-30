import { whoIntegrateAllContainer } from "@/migrator/core/protection-who";
import { whatIntegrateAllContainer } from "@/migrator/core/protection-what";

import chalk from "chalk";

const log = {
  start: (msg: string) => console.log(chalk.cyan.bold(`⏳ Starting ${msg}...`)),
  success: (msg: string) => console.log(chalk.green(`✅ ${msg} integrated`)),
  section: (msg: string) => console.log(chalk.blue.bold(`🚀 ${msg}`)),
  done: (msg: string) => console.log(chalk.magenta.bold(`🎉 ${msg}`)),
};

async function bootstrap() {
  log.section("Starting Migration");

  log.start("Who container");
  await whoIntegrateAllContainer();
  log.success("Who container");

  log.start("What container");
  await whatIntegrateAllContainer();
  log.success("What container");

  log.done("Finishing Migration");
}

bootstrap();
