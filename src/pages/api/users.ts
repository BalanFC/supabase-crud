import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/services/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        const { data: users, error: getError } = await supabase
          .from("users")
          .select("*");

        if (getError) {
          throw new Error(getError.message);
        }

        console.log("Returning Users:", users || []);

        return res.status(200).json(users || []);

      case "POST":
        const { first_name, last_name, age, dt_birth, balance } = req.body;

        if (!first_name || !last_name || !age || !dt_birth || !balance) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const { data: newUser, error: postError } = await supabase
          .from("users")
          .insert([{ first_name, last_name, age, dt_birth, balance }])
          .select()
          .single();

        if (postError) {
          throw new Error(postError.message);
        }

        console.log("New User Created:", newUser);
        return res.status(201).json(newUser);

      case "PUT":
        const { id, ...updateData } = req.body;

        if (!id) {
          return res.status(400).json({ error: "User ID is required" });
        }

        const { data: updatedUser, error: putError } = await supabase
          .from("users")
          .update(updateData)
          .eq("id", id)
          .select()
          .single();

        if (putError) {
          throw new Error(putError.message);
        }

        console.log("User Updated:", updatedUser);
        return res.status(200).json(updatedUser);

      case "DELETE":
        const { id: deleteId } = req.body;

        if (!deleteId) {
          return res.status(400).json({ error: "User ID is required" });
        }

        const { error: deleteError } = await supabase
          .from("users")
          .delete()
          .eq("id", deleteId);

        if (deleteError) {
          throw new Error(deleteError.message);
        }

        return res.status(204).end();

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res
          .status(405)
          .json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: error || "Internal Server Error" });
  }
}
