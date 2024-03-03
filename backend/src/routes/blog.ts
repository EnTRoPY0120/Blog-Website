import { Hono } from "hono";
import { createPostInput, updatePostInput } from "@vj-npm/common-app";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
    prisma: any;
  };
}>();

blogRouter.post("/", async (c) => {
  const userId = c.get("userId");

  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = createPostInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ message: "Invalid inputs" });
  }
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  c.status(201);
  return c.json({ id: post.id });
});

blogRouter.put("/", async (c) => {
  const userId = c.get("userId");
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ message: "Invalid inputs" });
  }
  const post = await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  c.status(201);
  return c.json({ message: "Post has been updated" });
});

// Todo : Add pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = c.get("prisma");
  try{
    const posts = await prisma.post.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });
  return c.json({
    posts,
  });
}catch(e){
  console.log("Error fetching the blogs",e);
}
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = c.get("prisma");
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
        select:{
          title:true,
          content:true,
          author:{
            select:{
              name:true
            }
          }
        }
    });
    c.status(200);
    return c.json(post);
  } catch (e) {
    c.status(411);
    return c.json({ message: "Error while fetching the blog post" });
  }
});


