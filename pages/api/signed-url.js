// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async (req, res) => {

  const response = await fetch('https://ntzw8s23u0.execute-api.eu-west-2.amazonaws.com/dev/signed-url');
  console.log('🚀 ~ file: index.js ~ line 12 ~ fetchImage ~ res', res);

  const data = await response.json();
  console.log('🚀 ~ file: index.js ~ line 15 ~ fetchImage ~ data', data)

  res.statusCode = 200;

  res.json(data);

}
