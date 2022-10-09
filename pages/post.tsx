import styles from '../styles/Home.module.css'
import Head from 'next/head'
import type { GetServerSideProps } from "next";
import { prisma } from '../lib/prisma'
import { Table, Col, Row } from "@nextui-org/react";

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: [
      {
        id: 'asc',
      },
    ],
  });
  return {
    props: { feed },
  };
};

type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

type Props = {
  feed: PostProps[];
};

const Post: React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Upload</title>
        <meta name="description" content="Top page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Table
          aria-label="Example table"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            <Table.Column>title</Table.Column>
            <Table.Column>author</Table.Column>
            <Table.Column>content</Table.Column>
          </Table.Header>
          <Table.Body>
            {props.feed.map((post) => (
              <Table.Row key={post.id}>
                <Table.Cell>{post.title}</Table.Cell>
                <Table.Cell>
                  <Col>
                    <Row>{post.author?.name}</Row>
                    <Row>{post.author?.email}</Row>
                  </Col>
                </Table.Cell>
                <Table.Cell>{post.content}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </main>
    </div>
  );
};

export default Post