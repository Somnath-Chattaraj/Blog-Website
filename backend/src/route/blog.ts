import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
// import { bearerAuth } from 'hono/bearer-auth'
// import zod from 'zod';
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@somnath910/medium-common'

export const blogRouter = new Hono<{
    Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	},
    Variables: {
        userId: string;
    }
}>();

blogRouter.use('/*',async(c, next) => {
      const token = c.req.header("authorization") || "";

    try {
      const user = await verify(token, c.env.JWT_SECRET);
      
      if (user) {
        c.set("userId", user.id);
        await next();
      } else {
        c.status(403)
        return (c.json({
            msg: "You are not logged in"
        }))
      }
    } catch (err) {
        c.status(403)
        return (c.json({
            msg: "You are not logged in"
        }))
    }
    
    
})

blogRouter.post('/', async(c)=> {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411)
        return c.json({
            msg: "Incorrect Inputs"
        })
    }
    const userId = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId 
        }
        
    })

    const postID = post.id;

    return c.json({
        msg: "Successfully Posted!",
        id: postID
    })
});

blogRouter.put('/', async(c)=> {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            msg: "Incorrect Inputs"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const post = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
        
    })

    const postID = post.id;

    return c.json({
        msg: "Successfully Updated!",
        id: postID
    })
});


//TODO: Add pagination
blogRouter.get('/bulk', async(c)=> {

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id:  true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        posts
    })
})


blogRouter.get('/:id', async(c)=> {
    const id = c.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const post = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                content: true,
                title: true,
                id:  true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
                
        })
        if (post) {
        return c.json({
            msg: "Successfully Fetched!",
            post
        })
        }
        return c.json({
            msg: "No post available on this id"
        })
    }
    catch (err) {
        console.log(err)
        c.status(411);
        return c.json({
            msg: "Error occured while fetching data!"
        })
    }
    
});

