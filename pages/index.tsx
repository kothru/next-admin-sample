import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Navbar } from "@nextui-org/react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar>
        <Navbar.Content hideIn="xs">
          <Navbar.Link isActive>Home</Navbar.Link>
          <Navbar.Link href="/users">Users</Navbar.Link>
        </Navbar.Content>
      </Navbar>
    </div>
  )
}

export default Home
