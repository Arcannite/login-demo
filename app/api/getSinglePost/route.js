const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

export async function POST(req){
  try {
    const bodyJSON = await req.json()
    const post = await prisma.post.findUnique({
      where: {
        id: bodyJSON['id']
      },
    })
    if (post.id) {
      const success = new Response(JSON.stringify(post), { status: 200 })
      return success
    } else {
      const error = new Response('Cannot find specified post', { status: 500 })
      return error
    }
  }
  catch (e) {
    console.log(e);
    const error = new Response('Internal Server Error: ' + e, { status: 500 })
    return error
  }
}