import { NextResponse } from "next/server";
import db from "@/utils/db";

// export async function GET(request) {
//   const data = await fetch("https://api.nobitex.ir/v2/orderbook/ETHIRT", {
//     next: { revalidate: 10 },
//   })
//     .then((res) => res.json())
//     .then((data) => data["lastTradePrice"])
//     .catch((e) => {
//       const res = NextResponse.json({ e }, { status: 404 });
//       return res;
//     });
//   const res = NextResponse.json({ data }, { status: 200 });
//   return res;
// }

export const config = {
  api: {
    bodyParser: {
      type: "application/x-www-form-urlencoded",
      extended: true,
    },
  },
};

export async function POST(request) {
  const data = await request.formData();
  //   const res = await request.json();
  const id = data.get("id");
  const temporary_address = data.get("temporary_address");

  //   console.log(data);
  //   console.log(temporary_address);
  //  Query the database to find the record matching the id and temporary_address
  const record = db
    .prepare(
      `
    SELECT * FROM transactions WHERE id = ? AND temporary_address = ?
  `
    )
    .get(id, temporary_address);
  const res = NextResponse.json({ record }, { status: 200 });
  return res;
}
