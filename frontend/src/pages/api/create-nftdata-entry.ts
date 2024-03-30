// @ts-nocheck comment
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../utils/supabase/supaBaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nftId } = req.body;
  const { data, error } = await supabase
    .from("nft_data")
    .insert([{ nft_id: nftId }])
    .select()
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    res.status(500).end();
    return;
  }

  res.status(200).send(data);
}
