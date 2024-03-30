// @ts-nocheck comment
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../utils/supabase/supaBaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nftId } = req.body;
  if (nftId === -1) {
    let { data: nft_critics, error } = await supabase
      .from("nft_critics")
      .select("*")
      .order("created_at", { ascending: false });
    if (nft_critics) {
      res.status(200).json(nft_critics);
    }

    if (error) {
      console.log(error);
      res.status(500).end();
    }
  } else {
    let { data: nft_critics, error } = await supabase
      .from("nft_critics")
      .select("*")
      .eq("nft_id", nftId)
      .order("created_at", { ascending: false });

    if (nft_critics) {
      res.status(200).json(nft_critics);
    }

    if (error) {
      console.log(error);
      res.status(500).end();
    }
  }
}
