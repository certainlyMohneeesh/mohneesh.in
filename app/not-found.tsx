import Link from "next/link";
import { Mark } from "@/components/Mark";

export default function NotFound() {
  return (
    <section className="shell pt-28">
      <h1 className="text-4xl leading-tight">
        <Mark type="crossed-off" on="mount" delay={300} padding={4}>
          404
        </Mark>
        <br />
        This thread ends here.
      </h1>
      <p className="mt-5 max-w-md text-muted">
        The page you asked for was never stitched in, or it has since been unpicked.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to the index
      </Link>
    </section>
  );
}
