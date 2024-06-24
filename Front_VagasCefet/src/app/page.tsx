import Link from "next/link";

export default function DashboardPage() {
  return(
      <main className="flex min-h-screen flex-col items-center p-24">
  <Link className="text-blue-500" href="/login"> Realize seu login</Link>
</main>
  )
}