import { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({ data }) {
  // const [imageUrl, setImage] = useState();

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     const imagesRes = await fetch('https://ntzw8s23u0.execute-api.eu-west-2.amazonaws.com/dev/images');
  //     console.log('🚀 ~ file: index.js ~ line 12 ~ fetchImage ~ imagesRes', imagesRes)
  //     const { data: imagesData } = await imagesRes.json();

  //     const images = [];
  //     imagesData.forEach(({ Key }) => images.push(`https://ntzw8s23u0.execute-api.eu-west-2.amazonaws.com/dev/signed-url?key=${Key}`));

  //     console.log('🚀 ~ file: index.js ~ line 12 ~ fetchImage ~ images', images);

  //   }

  //   fetchImage();
  // }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>dlw Nextjs image demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {data.map((imgUrl) => <Image src={imgUrl} width={640} height={300} />)}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://darrenwhite.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Demo by darrenwhite.dev
        </a>
      </footer>
    </div>
  )
}


export async function getServerSideProps() {
  const imagesRes = await fetch('https://ntzw8s23u0.execute-api.eu-west-2.amazonaws.com/dev/images');
  const { data: imagesData } = await imagesRes.json();

  const images = [];
  imagesData.forEach(({ Key }) => images.push(`https://ntzw8s23u0.execute-api.eu-west-2.amazonaws.com/dev/signed-url?key=${Key}`));

  // map every url to the promise of the fetch
  const requests = images.map(url => fetch(url));

  const responses = await Promise.all(requests)

  const data = [];
  await Promise.all(responses.map(async (r) => {
    const json = await r.json()

    data.push(json);
  }));

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data
    }, // will be passed to the page component as props
  }
}



