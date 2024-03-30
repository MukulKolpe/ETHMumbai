// @ts-nocheck comment
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../utils/supabase/supaBaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nftId } = req.body;
  if (nftId === -1) {
    console.log("followed this");
    let { data: nft_data, error } = await supabase.from("nft_data").select("*");
    if (nft_data) {
      res.status(200).json(nft_data);
    }
    if (error) {
      console.log(error);
      res.status(500).end();
    }
  } else {
    let { data: nft_data, error } = await supabase
      .from("nft_data")
      .select("*")
      .eq("nft_id", nftId)
      .order("created_at", { ascending: false });

    if (nft_data) {
      res.status(200).json(nft_data);
    }

    if (error) {
      console.log(error);
      res.status(500).end();
    }
  }
}
