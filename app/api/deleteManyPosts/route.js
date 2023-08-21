const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

export async function DELETE(req){
  try {
    const bodyJSON = await req.json()
    const IDsOfpostsToDelete = bodyJSON["postsToDelete"].split(",").map(i => parseInt(i))
    
    Promise
      .all( 
        IDsOfpostsToDelete.map( postID => prisma.post.delete({
          where: {
            id: postID
          },
        }))
      )
      .then( (value) => { console.log(value) })

    const success = new Response('Successfully deleted posts', { status: 200 })
    return success
      
  }
  catch (e) {
    console.log(e);
    const error = new Response('Internal Server Error: ' + e, { status: 500 })
    return error
  }
}