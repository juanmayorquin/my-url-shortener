import { redirect } from "next/navigation";

interface Props {
  params: { code: string };
}

export default async function ShortRedirect({ params }: Props) {
  const { code } = await params;
  console.log(code);
  let url: string | null = null;
  let error: boolean = false;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${code}`);
    console.log(response);
    if (!response.ok) {
      error = true;
    } else {
      const data = await response.json();
      url = data.url;
    }
  } catch {
    error = true;
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold">URL no encontrada</h1>
        <p>El código {code} no existe.</p>
      </div>
    );
  }

  if (url) {
    redirect(url);
  }

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Error</h1>
      <p>Ocurrió un error al procesar tu solicitud.</p>
    </div>
  );
}
