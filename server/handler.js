import { S3 } from 'aws-sdk';

const Bucket = process.env.BUCKET_NAME;
console.log('🚀 ~ Bucket Name', Bucket);

const getAll = async () => {
  const s3 = new S3({});
  const params = {
    Bucket
  };


  return new Promise((resolve) => {
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        return resolve({ error: true, message: err });
      }

      return resolve({
        success: true,
        data: data.Contents,
      });
    });
  });
};

export async function images(event) {
  console.log(event.headers['X-API-KEY'], process.env.API_KEY);

  if (event.headers['X-API-KEY'] !== process.env.API_KEY) {
    return {
      statusCode: 403
    };
  }

  const data = await getAll();

  return {
    statusCode: 200,
    body: JSON.stringify(
      data,
      null,
      2
    ),
  };
};

const getImage = async (Key) => {
  const s3 = new S3({});
  const params = {
    Bucket,
    Key,
  };


  return new Promise((resolve) => {
    s3.getObject(params, (err, data) => {
      if (err) {
        console.log('getImage -> err', err);
        return resolve(err);
      }

      console.log('🚀 ~ file: handler.js ~ line 63 ~ s3.getObject ~ data.Body', data.Body);
      return resolve(data.Body);
    });
  });
};

export const image = async (event) => {
  console.log(event.headers['X-API-KEY'], process.env.API_KEY);

  if (event.headers['X-API-KEY'] !== process.env.API_KEY) {
    return {
      statusCode: 403
    };
  }

  const data = await getImage('altanbagana-jargal-_eMbrsvO7jc-unsplash.jpg');
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": 'http://localhost:3000',
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(data),
  };
};


export const signedUrl = async (event) => {
  if (event.headers['X-API-KEY'] !== process.env.API_KEY) {
    return {
      statusCode: 403
    };
  }

  const { key } = event.queryStringParameters;
  const s3 = new S3({});
  const presignedGetUrl = await s3.getSignedUrl('getObject', {
    Bucket,
    Key: key,
    Expires: 60 * 5 // time to expire in seconds 5
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": 'http://localhost:3000',
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(presignedGetUrl),
  };

};
