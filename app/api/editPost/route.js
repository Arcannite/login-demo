const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

function zeroPad(num) { return ( (num >= 10) ? '' + num : '0' + num )}

function formattedCurrentDateTime() {
  const rawDateTime = new Date();
  const dateTimeString = rawDateTime.getUTCFullYear() + '-'
                          + zeroPad(rawDateTime.getUTCMonth()+1) + '-'
                          + zeroPad(rawDateTime.getUTCDate()) + 'T'
                          + zeroPad(rawDateTime.getUTCHours()) + ':'
                          + zeroPad(rawDateTime.getUTCMinutes()) + ':'
                          + zeroPad(rawDateTime.getUTCSeconds()) + 'Z' 

  return dateTimeString
}

export async function PUT(req){
  try {
    const bodyJSON = await req.json()
    const updatePost = await prisma.post.update({
      where: {
        id: bodyJSON['id']
      },
      data: {
        title: bodyJSON['title'],
        content: bodyJSON['content'],
        lastEditDate: formattedCurrentDateTime()
      }
    })
    
    if (updatePost.id) {
      const success = new Response(JSON.stringify(updatePost), { status: 200 })
      return success
    } else {
      const error = new Response('update failed', { status: 500 })
      return error
    }
  }
  catch (e) {
    console.log(e);
    const error = new Response('Internal Server Error: ' + e, { status: 500 })
    return error
  }
}