import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import BananaSplitz from "../assets/banana-splitz.png";
import Diogomf from "../assets/diogomf.png";
import Split from "../assets/split.png";
import Blocks from "../assets/blocks.png";

export const meta: MetaFunction = () => {
  return {
    title: "Banana Splitz",
  };
};

export const links: LinksFunction = () => {
  return [
    { rel: "icon", type: "image/png", sizes: "16x16", href: BananaSplitz },
  ];
};

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="h-screen w-full">
        <header>
          <nav className="border-gray-200 bg-white px-4 py-2.5 pt-6 lg:px-6">
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
              <Link to={"/"}>
                <img
                  src={BananaSplitz}
                  className="mr-3 h-[50px] w-[50px]"
                  alt="Banana splitz Logo"
                  width={50}
                  height={50}
                />
              </Link>
              <div className="flex items-center lg:order-2">
                <Link to={"/"}>
                  <div className="hover:bg-orange-150 font-regular mr-2 flex cursor-pointer items-center rounded-lg rounded-2xl bg-orange-50 px-2 py-1 text-sm text-gray-800 ring-2 ring-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300 lg:px-2 lg:py-1">
                    <span className="mr-2">
                      <img src={Diogomf} alt="diogomf" width={28} height={28} />
                    </span>
                    <span>diogomf.eth</span>
                  </div>
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <section>
          <div className="mx-auto max-w-screen-xl">
            <h1
              className="mt-60 mb-10 w-full px-40 text-center text-7xl font-bold text-gray-800"
              style={{ lineHeight: "100px" }}
            >
              Easiest way to{" "}
              <span className="inline">
                <span className="absolute z-0">
                  <img src={Split} alt="split" width={129} height={106} />
                </span>
                <span className="relative">split</span>
              </span>{" "}
              bills with web3 frens
            </h1>
            <div className="flex w-full justify-center">
              <Link to="login">
              <button className="rounded-2xl bg-yellow-400 px-10 py-1 text-gray-800 ring-2 ring-gray-500 hover:bg-yellow-300">
                Login
              </button>
              </Link>
            </div>
          </div>
        </section>
        <section>
          <div className="mx-auto max-w-screen-xl">
            <div className="mt-24 flex">
              <div className="flex flex-1 justify-center">
                <div>
                  <img src={Blocks} alt="split" width={56} height={52} />
                  <h2 className="font-bold">Create Group</h2>
                  <p>Organize with a group. Add your frens.</p>
                </div>
              </div>
              <div className="flex flex-1 justify-center">
                <div>
                  <img src={Blocks} alt="split" width={56} height={52} />
                  <h2 className="font-bold">Add expense</h2>
                  <p>You can create a group. Add friends. Add expenses.</p>
                </div>
              </div>
              <div className="flex flex-1 justify-center">
                <div>
                  <img src={Blocks} alt="split" width={56} height={52} />
                  <h2 className="font-bold">Settle debts</h2>
                  <p>You can settle debts with 1 transaction. USDC or DAI.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
