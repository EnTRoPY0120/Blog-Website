import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@vj-npm/common-app";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    prisma: any;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ message: "Invalid inputs" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (err) {
    console.log(err);
    c.status(403);
    return c.json({ error: "Error while signing up" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ message: "Invalid inputs" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.username,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: " User not found" });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    message: "You have signed in successfully",
    token,
  });
});
