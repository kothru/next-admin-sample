import { NextRouter } from "next/router";

export async function uploadFile(target: HTMLInputElement, router: NextRouter) {
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
    router.push("/");
  }
  return false
}