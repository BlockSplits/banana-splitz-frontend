import { type LoaderArgs, json } from "@remix-run/node";
import { Link, NavLink, useLoaderData } from "@remix-run/react";
import { CaretRight } from "phosphor-react";
import { type Group, getGroupItems } from "~/server/models/groups.server";
import { requireUserId } from "~/server/session.server";

type LoaderData = {
  groupListItems: Group[];
};

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const groupListItems = await getGroupItems({ userId });
  return json({ groupListItems });
}

export default function GroupIndexPage() {
  const { groupListItems } = useLoaderData<typeof loader>() as LoaderData;

  return (
    <>
      {groupListItems.length > 0 ? (
        <div className="m-12 w-full space-y-4">
          <div className="flex">
            <Link to="#">
              <button className="font-regular mr-2 flex h-[36px] cursor-pointer items-center rounded-lg rounded-2xl bg-orange-50 px-4 py-1 text-sm text-gray-800 ring-2 ring-yellow-400 hover:bg-orange-200 lg:px-4 lg:py-1">
                Add expense
              </button>
            </Link>
            <Link to="new">
              <button className="font-regular ml-2 mr-2 flex h-[36px] cursor-pointer items-center rounded-lg rounded-2xl bg-orange-50 px-4 py-1 text-sm text-gray-800 ring-2 ring-yellow-400 hover:bg-orange-200 lg:px-4 lg:py-1">
                Create a group
              </button>
            </Link>
          </div>
          <div className="mt-10 flex w-full">
            <div className="flex h-[400px] w-4/6 flex-col pr-4">
              <div className="flex h-fit w-full flex-col rounded-2xl bg-yellow-50 px-5 py-4 ring-1 ring-yellow-500">
                <h3>Balance</h3>
                <p>You are owed</p>
                <h2>$ 0.00</h2>
              </div>
              <div className="mt-4 flex h-fit w-full">
                <div className="mr-2 flex h-fit w-1/2  rounded-2xl bg-yellow-50 px-5 py-4 ring-1 ring-yellow-500">
                  <h3>You lent</h3>
                  <p>You are owed</p>
                  <h2>$ 0.00</h2>
                </div>
                <div className="ml-2 flex h-fit w-1/2  rounded-2xl bg-yellow-50 px-5 py-4 ring-1 ring-yellow-500">
                  <h3>You</h3>
                  <p>You are owed</p>
                  <h2>$ 0.00</h2>
                </div>
              </div>
            </div>
            <div className="flex h-[200px] w-2/6 flex-col rounded-2xl bg-yellow-50 px-5 py-4 ring-1 ring-yellow-500">
              <h3 className="mt-0 mb-2 text-xl font-bold">Groups</h3>
              <div className="divide-y divide-gray-400">
                {groupListItems.map((group) => (
                  <Link
                    to={`/dashboard/${group.id}`}
                    className="flex w-full items-center pb-2 pt-1"
                    key={group.id}
                  >
                    <div>{group.name}</div>
                    <div>{group.description}</div>
                    <CaretRight className="ml-auto" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoDataDashboard items={groupListItems} />
      )}
    </>
  );
}

function NoDataDashboard({ items }: { items: unknown[] }) {
  if (items.length === 0) {
    return (
      <div className="mt-24 flex h-fit w-full justify-center">
        <div className="rounded-md bg-yellow-50 py-12 px-5 ring-2 ring-yellow-500 md:px-20">
          <div className="prose my-5 text-center">
            <h3>Welcome to Banana Splitz</h3>
            <p>To get started, add an expense or create a group.</p>
          </div>
          <div className="">
            <div className="flex items-center justify-between border-t-2 border-gray-100 py-5">
              <p>Eg. Columbia Trip</p>
              <Link to="new">
                <button className="font-regular ml-2 mr-2 flex h-[36px] cursor-pointer items-center rounded-lg rounded-2xl bg-orange-50 px-4 py-1 text-sm text-gray-800 ring-2 ring-yellow-400 hover:bg-orange-200 lg:px-4 lg:py-1">
                  Create a group
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
