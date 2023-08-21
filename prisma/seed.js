const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcrypt')

const prisma = new PrismaClient();

// package.json

// "prisma": {
//   "seed": "node prisma/seed.js"
// },

async function main() {
  const password = await hash('superduperpowerfulamazingpassword111', 12)

  const user = await prisma.user.upsert({
    where: {email: 'th.hui2002@gmail.com'},
    update: {},
    create: {
      email: 'th.hui2002@gmail.com',
      password: password,
      username: 'Admin',
      posts: {
        create: {
          title: "hello world",
          content: "first post"
        }
      }
    }
  })

  console.log({user})
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })