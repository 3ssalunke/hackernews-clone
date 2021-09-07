import Link from "next/link";
import { HeaderNav } from "./header-nav";

export function Header(props): JSX.Element {
  return (
    <tr>
      <td style={{ backgroundColor: "#ff6600", padding: "0px" }}>
        <table
          style={{
            border: "0px",
            padding: "2px",
            borderSpacing: "0px",
            width: "100%",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{ width: "18px", padding: "0px", paddingRight: "4px" }}
              >
                <Link href="/">
                  <a>
                    <img
                      src="/static/y18.gif"
                      style={{
                        border: "1px",
                        borderColor: "white",
                        borderStyle: "solid",
                        height: "18px",
                        width: "18px",
                      }}
                    />
                  </a>
                </Link>
              </td>
              <td
                style={{ lineHeight: "12px", height: "10px", padding: "0px" }}
              >
                <HeaderNav />
              </td>
              <td
                style={{
                  textAlign: "right",
                  padding: "0px",
                  paddingRight: "4px",
                }}
              >
                <span className="pagetop">
                  <Link href={`/user?id=${11}`}>
                    <a>11</a>
                  </Link>
                  {` Bunty | `}
                  <a href="/">logout</a>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}
