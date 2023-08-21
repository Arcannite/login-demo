const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

export async function GET(req){
  try {
    const postsList = await prisma.post.findMany();

    // turn nested objects into strings first, then cast to string using toString()
    const postsJSON = {};
    for (const post of postsList) {
      postsJSON[post.id] = post
    }

    const res = new Response(JSON.stringify(postsJSON), { status: 200 });
    return res
  }
  catch (e) {
    console.log(e);
    const error = new Response('Internal Server Error: ' + e, { status: 500 })
    return error
  }
}