import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === 'POST') {
    try {
      const bodyJSON = JSON.parse(req.body)
      const post = await prisma.post.findUnique({
        where: {
          id: bodyJSON['id']
        },
      })
      if (post.id) {
        res.status(200).json(post)
      } else {
        return res.status(500).json({ error: 'Something went wrong' })
      }
    }
    catch (e) {
      console.log(e);
      return JSON.stringify({error: e});
    }
  }
}