const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const createPost = async (req, res) => {
    const reader = req.body.getReader();
    const newStream = new ReadableStream({
        start(controller) {
            return pump();
            function pump() {
                return reader.read().then(({ done, value }) => {
                    // When no more data needs to be consumed, close the stream
                    if (done) {
                        controller.close();
                        return;
                    }
                    // Enqueue the next data chunk into our target stream
                    controller.enqueue(value);
                    return pump();
                });
            }
        },
    });
    const resp = new Response(newStream)
    const result = await resp.json()
    const post = await prisma.post.create({
        data: result
    })

    console.log(res)

    if (post.id) {
        return res.json(post)
    } else {
        return res.json({ error: 'Something went wrong' })
    }
}

export { createPost as POST }