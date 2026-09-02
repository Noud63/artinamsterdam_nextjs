import ContinueButton from "./ContinueButton";

export const dynamic = "force-dynamic";

export default async function VerifyPage({ searchParams }) {
  const { url } = await searchParams;

  if (typeof url !== "string") {
    return <p className="p-8 text-center">This sign-in link is incomplete.</p>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6">
      <section className="w-full max-w-md space-y-5 text-center text-white">
        <h1 className="text-3xl font-semibold">Continue signing in</h1>
        <p>Tap the button to finish signing in to Art in Amsterdam.</p>
        <ContinueButton url={url} />
      </section>
    </main>
  );
}