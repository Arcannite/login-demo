const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

export async function POST(req){
  try {
    const bodyJSON = await req.json()
    const postsToDelete = bodyJSON["postsToDelete"].split(",").map(i => parseInt(i))
    for (const i of postsToDelete) {
      
    }

    const error = new Response('Cannot find specified post', { status: 500 })
    return error
      
  }
  catch (e) {
    console.log(e);
    const error = new Response('Internal Server Error: ' + e, { status: 500 })
    return error
  }
}