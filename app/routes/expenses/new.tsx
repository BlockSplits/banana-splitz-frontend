import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { createGroup } from "~/server/models/groups.server";
import { requireUserId } from "~/server/session.server";

interface ActionData {
  errors: {
    name?: string;
    description?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");

  if (typeof name !== "string" || name.length === 0) {
    return json({ errors: { name: "Name is required" } }, { status: 400 });
  }

  if (typeof description !== "string") {
    return json(
      { errors: { description: "Description is required" } },
      { status: 400 }
    );
  }

  const group = await createGroup({
    name,
    description,
    userId,
  });

  if (group) {
    return redirect(`/dashboard`);
  }
};

export default function NewExpensePage() {
  const actionData = useActionData() as ActionData;
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef?.current?.focus();
    }

    if (actionData?.errors?.description) {
      descriptionRef?.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex h-full w-full justify-center">
      <div className="mt-24 h-fit w-3/5 rounded-md bg-yellow-50 py-8 px-5 ring-2 ring-yellow-500 md:px-12">
        <div className="prose mb-4">
          <h3>Create group</h3>
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
          <div className="flex">
            <div className="h-full w-2/5">
              <div className="mr- flex h-[130px] w-[130px] items-center justify-center rounded-2xl bg-orange-200">
                <div className="text-[48px]">🇨🇴</div>
              </div>
            </div>
            <div className="w-3/5">
              <div>
                <label className="text-sm font-medium" htmlFor="name">
                  <span className="block text-gray-700">Name</span>
                </label>
                <input
                  className="w-full rounded-lg border border-gray-200 px-2 py-1 text-lg"
                  type="name"
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
              <div className="mt-3">
                <label className="text-sm font-medium" htmlFor="description">
                  <span className="block text-gray-700">Description</span>
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={1}
                  className="w-full rounded-lg border border-gray-200 px-2 py-1 text-lg"
                  ref={descriptionRef}
                ></textarea>
              </div>
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
