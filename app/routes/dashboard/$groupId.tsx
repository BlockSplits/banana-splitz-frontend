import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { Group } from "~/server/models/groups.server";
import { deleteGroup, getGroup } from "~/server/models/groups.server";
import { requireUserId } from "~/server/session.server";
import invariant from "tiny-invariant";

type LoaderData = {
  group: Group;
};

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.groupId, "groupId not found");

  const group = await getGroup({ userId, id:  Number(params.groupId) });
  if (!group) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ group });
}

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.groupId, "groupId not found");

  await deleteGroup({ userId, id: Number(params.groupId) });

  return redirect("/dashboard");
};

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div className="w-full m-12">
      <h3 className="text-2xl font-bold">{data.group.name}</h3>
      <p className="py-6">{data.group.description}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}
