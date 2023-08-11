const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const handler = async (req, res) => {
  console.log(req, res)
  if (req.method ==='GET') {
    try {
      const posts = await prisma.post.findMany();
      return res.json(posts);
    }
    catch (e) {
      console.log(e);
      return;
    }
  }
}

export {handler as GET}
