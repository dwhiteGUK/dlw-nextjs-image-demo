import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const response = await fetch(`https://dev-blog-nextjs-image-demo.s3.eu-west-2.amazonaws.com/xavier-von-erlach-RtlnT6RwTg0-unsplash.jpg`);
  console.log(response.body)

  const data = await response.blob();
  console.log(data)

  res.statusCode = 200;
  //res.contentType('image/jpeg');
  res.send(data.toString(), null, 2));
  // Rest of the API logic
  //res.json({ message: 'Hello Everyone!' })
}

export default handler;
