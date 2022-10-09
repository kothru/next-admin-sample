import styles from '../styles/Home.module.css'
import Head from 'next/head'
import { useRouter } from "next/router";

const Upload: React.FC = () => {
  const router = useRouter();

  const handleUploadClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = (target.files as FileList)[0];

    const formData = new FormData();
    formData.append('file', file);
    const request = new Request('api/upload', {
      method: 'POST',
      body: formData,
    });

    const response = await fetch(request);
    if (response.ok) {
      router.push("/");
    } else {
      alert(JSON.stringify(response));
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Upload</title>
        <meta name="description" content="Top page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
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
      </main>
    </div>
  );
};

export default Upload