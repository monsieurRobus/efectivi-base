import ProtectedLayout from "@/context/ProtectedLayout";


export default function Home() {
  return (
    <main>
      <ProtectedLayout>
        <h1>Home</h1>
      </ProtectedLayout>
    </main>
  );
}
