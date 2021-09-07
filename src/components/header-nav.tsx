import Link from "next/link";

export function HeaderNav(props): JSX.Element {
  return (
    <span className="pagetop">
      <b className="hnname">
        <Link href="/" as="/news">
          <a>Hacker News</a>
        </Link>
      </b>
      &nbsp;
      <Link href="/">
        <a>Welcome</a>
      </Link>
      {" | "}
      <Link href="/">
        <a className="topsel">new</a>
      </Link>
      {" | "}
      <Link href="/">
        <a>show</a>
      </Link>
      {" | "}
      <Link href="/">
        <a>ask</a>
      </Link>
      {" | "}
      <Link href="/">
        <a>jobs</a>
      </Link>
      {" | "}
      <Link href="/">
        <a>submit</a>
      </Link>
      {" | "}
      <Link href="/">
        <a>best</a>
      </Link>
    </span>
  );
}
