// @ts-nocheck comment
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../utils/supabase/supaBaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nftId, updatedLikes } = req.body;
  const { data, error } = await supabase
    .from("nft_data")
    .update({ likes: updatedLikes })
    .eq("nft_id", nftId)
    .select();
  if (error) {
    console.error(error);
    res.status(500).end();
    return;
  }

  res.status(200).send(data);
}
