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
    <label htmlFor="upload-button" style={{ border: "1px solid #222", borderRadius: 10, padding: 10, cursor: "pointer" }}>
      <input
        accept=".json"
        id="upload-button"
        type="file"
        onChange={handleUploadClick}
        hidden
      />
      Choose file
    </label>
  );
};

export default Upload