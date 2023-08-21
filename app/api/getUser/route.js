const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

export async function POST(req){
  try {
    const bodyJSON = await req.json()

    var condition;
    if (bodyJSON['id'] !== undefined) {
      condition = { where: { 'id': bodyJSON['id'] }}
    }
    else if (bodyJSON['email'] !== undefined) {
      condition = { where: { 'email': bodyJSON['email'] }}
    }
    else if (bodyJSON['username'] !== undefined) {
      condition = { where: { 'username': bodyJSON['username'] }}
    }
    else {
      const error = new Response('Please provide at least one of these fields in the request: id, email, username', { status: 500 })
      return error
    }
    
    const user = await prisma.user.findUnique(condition)

    if (user.id) {
      delete user["password"];
      const success = new Response(JSON.stringify(user), { status: 200 })
      return success
    } else {
    }
  }
  catch (e) {
    console.log(e);
    const error = new Response('Internal Server Error', { status: 500 })
    return error
  }
}