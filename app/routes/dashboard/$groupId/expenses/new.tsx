import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { createActivity } from "~/server/models/activities.server";
import { createGroup } from "~/server/models/groups.server";
import { requireUserId } from "~/server/session.server";

interface ActionData {
  errors: {
    name?: string;
    total?: string;
  };
}

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const name = formData.get("name");
  const total = formData.get("total");

  if (typeof name !== "string" || name.length === 0) {
    return json({ errors: { name: "Name is required" } }, { status: 400 });
  }

  if (typeof total !== "string") {
    return json({ errors: { total: "Total is required" } }, { status: 400 });
  }

  const activity = await createActivity({
    name,
    total: Number(total),
    groupId: Number(params.groupId),
    userId,
  });

  if (activity) {
    return redirect(`/dashboard/${params.groupId}`);
  }
};

export default function NewExpensePage() {
  const actionData = useActionData() as ActionData;
  const nameRef = useRef<HTMLInputElement>(null);
  const totalRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef?.current?.focus();
    }

    if (actionData?.errors?.total) {
      totalRef?.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex h-full w-full justify-center">
      <div className="mt-24 h-fit w-3/5 rounded-md bg-yellow-50 py-8 px-5 ring-2 ring-yellow-500 md:px-12">
        <div className="prose mb-4">
          <h3>Create expense</h3>
        </div>
        <Form
          method="post"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: "100%",
          }}
        >
          <div className="prose mb-2">
            <h4>Details</h4>
          </div>
          <div className=" space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="name">
                <span className="block text-gray-700">Name</span>
              </label>
              <input
                className="w-full rounded-lg border border-gray-200 px-2 py-1 text-lg"
                type="text"
                name="name"
                id="name"
                required
                aria-invalid={actionData?.errors?.name ? true : undefined}
                aria-describedby="name-error"
                ref={nameRef}
              />
              {actionData?.errors?.name && (
                <span
                  className="block pt-1 font-medium text-red-700"
                  id="name-error"
                >
                  {actionData?.errors?.name}
                </span>
              )}
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="total">
                <span className="block text-gray-700">Total</span>
              </label>
              <input
                name="total"
                type="number"
                id="total"
                className="w-full rounded-lg border border-gray-200 px-2 py-1 text-lg"
                required
                aria-invalid={actionData?.errors?.total ? true : undefined}
                aria-describedby="total-error"
                ref={totalRef}
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full rounded-full bg-yellow-400 py-2 px-4 hover:bg-yellow-600 focus:bg-yellow-400"
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
