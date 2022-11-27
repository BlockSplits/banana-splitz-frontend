import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { Group } from "~/server/models/groups.server";
import { getGroupItems } from "~/server/models/groups.server";
import { requireUserId } from "~/server/session.server";
import { useUser } from "~/utils";

import BananaSplitz from "../assets/banana-splitz.png";
import Diogomf from "../assets/diogomf.png";

// type LoaderData = {
//   groupListItems: Group[];
// };

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const groupListItems = await getGroupItems({ userId });
  return json({ groupListItems });
}

export default function NotesPage() {
  

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <main className="flex h-full">
        {/* <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Group
          </Link>

          <hr />

          {data.groupListItems.length === 0 ? (
            <p className="p-4">No groups yet</p>
          ) : (
            <ol>
              {data.groupListItems.map((group) => (
                <li key={group.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={`${group.id}`}
                  >
                    📝 {group.name}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div> */}


          <Outlet />
        
      </main>
    </div>
  );
}

function Header() {
  const user = useUser();
  return (
    <>
      <header>
        <nav className="border-b px-4 py-2.5 pt-6 lg:px-6">
          <div className="mx-auto flex flex-wrap items-center justify-between">
            <Link to={"/dashboard"}>
              <img
                src={BananaSplitz}
                className="mr-3 h-[50px] w-[50px]"
                alt="Banana splitz Logo"
                width={50}
                height={50}
              />
            </Link>
            <div className="flex items-center lg:order-2">
              <Link to={"/dashboard"}>
                <div className="hover:bg-orange-200 font-regular mr-2 flex h-[36px] cursor-pointer items-center rounded-lg rounded-2xl bg-orange-50 px-2 py-1 text-sm text-gray-800 ring-2 ring-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300 lg:px-2 lg:py-1">
                  <span className="mr-2">
                    <img src={Diogomf} alt="diogomf" width={28} height={28} />
                  </span>
                  <span>{user.email}</span>
                </div>
              </Link>
              <Form action="/login/logout" method="post">
                <button
                  type="submit"
                  className="hover:bg-orange-200 font-regular ml-2 mr-2 flex h-[36px] cursor-pointer items-center rounded-lg rounded-2xl bg-orange-50 px-4 py-1 text-sm text-gray-800 ring-2 ring-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300 lg:px-4 lg:py-1"
                >
                  Logout
                </button>
              </Form>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
