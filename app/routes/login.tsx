import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";

import SplitzLogo from "../assets/banana-splitz.png";

export const meta: MetaFunction = () => {
  return {
    title: "Login | Banana splitz",
  };
};

export default function Auth() {
  return (
    <div className="flex min-h-full">
      <div
        className={`min-h-ful w-1/2 bg-[url('../assets/banana-bg-cover.png')] bg-cover bg-center bg-no-repeat`}
      ></div>
      <div className="min-h-ful flex w-1/2 items-center justify-center bg-yellow-100">
        <div className="w-3/5 rounded-md bg-white p-24">
          <Link to="/">
            <div className="h-[56px] w-[56px] rounded-full bg-yellow-50 p-2">
              <img src={SplitzLogo}></img>
            </div>
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
