import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="container pt-14 sm:pt-12 text-gray-600">
      <section>
        <h3>
          &copy; {new Date().getFullYear()} Designed and developed by
          <Link
            target="_blank"
            href="https://github.com/myorb"
            className="text-blue-500 pl-1"
          >
            Alex Shalaiev
          </Link>
        </h3>
      </section>
    </footer>
  );
}
