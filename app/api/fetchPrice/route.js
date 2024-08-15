import { NextResponse } from "next/server";
export async function GET(request) {
  const data = await fetch("https://api.nobitex.ir/v2/orderbook/ETHIRT", {
    next: { revalidate: 10 },
  })
    .then((res) => res.json())
    .then((data) => data["lastTradePrice"])
    .catch((e) => {
      const res = NextResponse.json({ e }, { status: 404 });
      return res;
    });
  const res = NextResponse.json({ data }, { status: 200 });
  return res;
}
