import styles from '../styles/Home.module.css'
import Head from 'next/head'
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { prisma } from '../lib/prisma'
import { Navbar, Table } from "@nextui-org/react";
import { User } from "@prisma/client";

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany({
    orderBy: [{ email: 'asc' }]
  });
  return {
    props: { users },
  };
};

type Props = {
  users: User[];
};

const Upload: React.FC<Props> = (props) => {
  const router = useRouter();

  const handleUploadClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    const formData = new FormData();
    formData.append('file', file);
    const request = new Request('api/users', {
      method: 'POST',
      body: formData,
    });

    const response = await fetch(request);
    if (response.ok) {
      router.reload();
    } else {
      alert(JSON.stringify(response));
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>User</title>
        <meta name="description" content="User list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar>
        <Navbar.Content hideIn="xs">
          <Navbar.Link href="/">Home</Navbar.Link>
          <Navbar.Link isActive>Users</Navbar.Link>
        </Navbar.Content>
      </Navbar>

      <label htmlFor="upload-button" style={{ border: "1px solid #222", borderRadius: 10, padding: 10, cursor: "pointer" }}>
        <input
          accept=".csv"
          id="upload-button"
          type="file"
          onChange={handleUploadClick}
          hidden
        />
        Choose file
      </label>

      <Table aria-label="User table">
        <Table.Header>
          <Table.Column>email</Table.Column>
          <Table.Column>name</Table.Column>
        </Table.Header>
        <Table.Body>
          {props.users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div >
  );
};

export default Upload