import { connectDB } from "./config/db";
import { env } from "./config/env";
import { app } from "./app";

const bootstrap = async () => {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`Backend listening on http://localhost:${env.port}`);
  });
};

bootstrap().catch((error) => {
  console.error("Server bootstrap failed:", error);
  process.exit(1);
});
