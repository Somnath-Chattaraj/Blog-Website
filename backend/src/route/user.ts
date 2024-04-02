import { Context, Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt'
import { signupInput, signinInput } from '@somnath910/medium-common';

export const userRouter = new Hono<{
    Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	}
}>();

  
  userRouter.get('/me', async (c) => {
   
    const token = c.req.header('authorization') || '';
    try {
        const user = await verify(token , c.env.JWT_SECRET)        
        
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate())
        
        const userData = await prisma.user.findFirst({
            where: {id: user.id}
        })

        if (userData) {
            return c.json(userData.name)
        }

        return c.json({
            msg: "Some error occured!! Please try again later"
        })
        

    } catch (err) {
        console.log(err);
        c.status(403)
        return c.json({
            msg: "You are not logged in"
        })
    }
    
  });



userRouter.post('/signup', async(c)=> {
    // return c.text("hello from hono!")
    
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        console.log(signupInput.safeParse(c.body))
        console.log(c.body)
        c.status(411);
        return c.json({
            message: " Incorrect inputs"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                name: body.name,
            }
        })
        const userID = user.id;
        const token = await sign({id: userID}, c.env.JWT_SECRET);
        return c.json({
            msg: "User Registered Successfully",
            token: token
        })
    }
    catch(err){
        c.status(411);
        return c.text("User Already Exists with this email.")

    }     
});

userRouter.post('/signin', async(c)=> {
    const body = await c.req.json();

    const { success } = signinInput.safeParse(body);

    if (!success) {
        c.status(411);
        return c.json({msg: "Check and reenter credentials"});
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
        where: {
            username: body.username,
            password: body.password
        }
        
    })
    if (user) {
        const userID = user.id;
        const token = await sign({id: userID}, c.env.JWT_SECRET);
        return c.json({
            msg: "Successfully Logged In",
            token: token,
            user
        })
    }
    else {
        c.status(411);
        return c.json({msg: "Error while logging in"})
    }
});


