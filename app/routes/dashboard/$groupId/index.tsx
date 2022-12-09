import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import type { Group } from "~/server/models/groups.server";
import { deleteGroup, getGroup } from "~/server/models/groups.server";
import { requireUserId } from "~/server/session.server";
import invariant from "tiny-invariant";
import type { Activity } from "~/server/models/activities.server";
import { getGroupActivities } from "~/server/models/activities.server";

type LoaderData = {
  group: Group;
  activities: Activity[];
};

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.groupId, "groupId not found");

  const group = await getGroup({ userId, id: Number(params.groupId) });
  if (!group) {
    throw new Response("Not Found", { status: 404 });
  }
  const activities = await getGroupActivities({ groupId: group.id });

  return json({ group, activities });
}

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.groupId, "groupId not found");

  if (request.method === "DELETE") {
    await deleteGroup({ userId, id: Number(params.groupId) });
    return redirect("/dashboard");
  }
  return redirect(`/dashboard/${params.groupId}`);
};

export default function NoteDetailsPage() {
  const { group, activities } = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div className="m-12 w-full space-y-4">
      <div className="flex w-full flex-row justify-between">
        <h3 className="text-2xl font-bold">{group.name}</h3>
        <div className="flex space-x-4">
          <Form method="post">
            <button
              type="submit"
              className="font-regular mr-2 flex h-[36px] cursor-pointer items-center rounded-lg rounded-2xl bg-orange-50 px-4 py-1 text-sm text-gray-800 ring-2 ring-yellow-400 hover:bg-orange-200 lg:px-4 lg:py-1"
            >
              Edit
            </button>
          </Form>
          <Form method="delete">
            <button
              type="submit"
              className="font-regular mr-2 flex h-[36px] cursor-pointer items-center rounded-lg rounded-2xl bg-orange-50 px-4 py-1 text-sm text-gray-800 ring-2 ring-yellow-400 hover:bg-orange-200 lg:px-4 lg:py-1"
            >
              Delete
            </button>
          </Form>
        </div>
      </div>
      <div>
        <Link to={`/dashboard/${group.id}/expenses/new`}>
          <button className="font-regular mr-2 flex h-[36px] cursor-pointer items-center rounded-lg rounded-2xl bg-orange-50 px-4 py-1 text-sm text-gray-800 ring-2 ring-yellow-400 hover:bg-orange-200 lg:px-4 lg:py-1">
            Add expense
          </button>
        </Link>
      </div>
      <div className="flex w-full">
        <div className="flex h-[400px] w-4/6 flex-col space-y-4 pr-4">
          <div className="flex h-fit w-full space-x-4">
            <div className="flex h-fit w-1/2  rounded-2xl bg-yellow-50 px-5 py-4 ring-1 ring-yellow-500">
              <h3 className="mt-0 mb-2 text-xl font-bold">Balance</h3>
            </div>
            <div className="flex h-fit w-1/2 flex-col  rounded-2xl bg-yellow-50 px-5 py-4 ring-1 ring-yellow-500">
              <h3 className="mt-0 mb-2 text-xl font-bold">Members</h3>
              <div>
                {group.groupsMembers?.length &&
                  group.groupsMembers.map((groupMember) => (
                    <div>{groupMember.user_id}</div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex h-fit w-full space-x-4">
            <div className="flex h-fit w-1/2  rounded-2xl bg-yellow-50 px-5 py-4 ring-1 ring-yellow-500">
              <h3 className="mt-0 mb-2 text-xl font-bold">You lent</h3>
            </div>
            <div className="flex h-fit w-1/2  rounded-2xl bg-yellow-50 px-5 py-4 ring-1 ring-yellow-500">
              <h3 className="mt-0 mb-2 text-xl font-bold">You borrowed</h3>
            </div>
          </div>
        </div>
        <div className="flex h-[200px] w-2/6 flex-col rounded-2xl bg-yellow-50 px-5 py-4 ring-1 ring-yellow-500">
          <h3 className="mt-0 mb-2 text-xl font-bold">Transactions</h3>
          <div className="divide-y divide-gray-400">
            {activities.length
              ? activities.map((activity) => (
                  <div key={activity.id} className="flex space-x-5">
                    <div>{activity.name}</div>
                    <div>{activity.total}</div>
                  </div>
                ))
              : "No transactions, yet."}
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
