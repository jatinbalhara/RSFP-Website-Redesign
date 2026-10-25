import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap center stack">
        <p className="eyebrow">404</p>
        <h1 className="page-title">This page wandered off into the hills</h1>
        <p>
          <Link href="/" className="btn btn-primary">Back home</Link>
        </p>
      </div>
    </section>
  );
}
