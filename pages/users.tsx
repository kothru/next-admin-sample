import styles from '../styles/Home.module.css'
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { prisma } from '../lib/prisma'
import { User } from "@prisma/client";
import { uploadFile } from '../lib/client';
import CustomNavBar from '../components/CustomNavbar';
import CustomHeader from '../components/CustomHeader';
import CustomTable from '../components/CustomTable';

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

      <CustomTable<User> rows={props.users} tablename="users" keycol="id" cols={['email', 'name']}></CustomTable>
    </div >
  );
};

export default Upload