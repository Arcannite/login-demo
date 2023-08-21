const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const bodyJSON = await req.json()
    console.log(bodyJSON)
    const newPost = await prisma.post.create({ data: bodyJSON })

    if (newPost.id) {
      const success = new Response(JSON.stringify(newPost), { status: 200 })
      return success
    } else {
      const error = new Response('Something went wrong', { status: 500 })
      return error
    }
  }
  catch (e) {
    console.log(e);
    const error = new Response('Internal Server Error: ' + e, { status: 500 })
    return error
  }
}