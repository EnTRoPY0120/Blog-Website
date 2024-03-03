import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { cors } from "hono/cors";

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: any;
  };
}>();

app.use("/*",cors());

app.use("/api/v1/blog/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";
  const token = header.split(" ")[1];
  try {
    const response = await verify(token, c.env.JWT_SECRET);
    if (response.id) {
      c.set("userId", response.id);
      await next();
    } else {
      c.status(401);
      return c.json({
        error: "Unauthorized",
      });
    }
  } catch (e) {
    c.status(401);
    return c.json({
      error: "Unauthorized",
    });
  }
});

app.use("/api/v1/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  c.set("prisma", prisma);
  await next();
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
