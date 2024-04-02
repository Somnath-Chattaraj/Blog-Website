import { Hono } from 'hono';
import { userRouter } from './route/user'
import { blogRouter } from './route/blog';
import { cors } from 'hono/cors';




const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	}
}>();


app.use('/*', cors())
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);
  





export default app

//DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiYzQ4MmI3NzItYTBmOS00YmQ1LTk1ZWEtZjgxNmFkOWRhYjNmIiwidGVuYW50X2lkIjoiMWU1MmE3NGZjNTliM2VlOWFkMmRhNjhiMTdkZjFiN2I4Mzg2NjRlYjMwNWMxYmIwYjk4YThjMjk5ODAyYTk4MSIsImludGVybmFsX3NlY3JldCI6IjIzY2NkZWNkLWNkZTYtNDkxOS1iMzMzLWViZTcxOGU3ZmVmNyJ9.P4n9G9NCtT6TfEC6ObQaCqLjphj83D0HX6Tnj5h3dQk"
