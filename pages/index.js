import Head from "next/head";
import Format from "@/layout/format";

// COMPONENTS
import Section1 from "@/components/section1";
import { Section2 } from "@/components/Section2";
import { Section3 } from "@/components/section3";
// import { Section4 } from "@/components/Section4";

export default function Home({ data }) {
  // console.log(data)
  return (
    <>
      <Head>
        <title>Blog App - Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Format>
        <Section1 props={data} />
        <Section2 blog={data} />
        <Section3 props={data} />
        {/* <Section4 /> */}
      </Format>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch("https://next-blog-ahmad.vercel.app/api/get-all-posts");
  const data = await response.json();

  return { props: { data } };
}
