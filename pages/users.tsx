import styles from '../styles/Home.module.css'
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { prisma } from '../lib/prisma'
import { Table } from "@nextui-org/react";
import { User } from "@prisma/client";
import { uploadFile } from '../lib/client';
import CustomNavBar from '../components/CustomNavbar';
import CustomHeader from '../components/CustomHeader';

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
    await uploadFile(e.target, router)
  };

  return (
    <div className={styles.container}>
      <CustomHeader page="users"></CustomHeader>
      <CustomNavBar page="users"></CustomNavBar>

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