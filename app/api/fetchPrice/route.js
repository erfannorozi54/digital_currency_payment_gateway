import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const response = await fetch("https://api.nobitex.ir/v2/orderbook/ETHIRT", {
      next: { revalidate: 10 },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    
    const json = await response.json();
    const data = json["lastTradePrice"];
    
    if (!data) {
      throw new Error("Price data not found in response");
    }
    
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching price from Nobitex:", error.message);
    
    // Return a fallback price (approximate ETH price in Toman)
    // This is just for development/testing when API is unavailable
    const fallbackPrice = 286900000; // ~2,869,000 Toman
    
    return NextResponse.json({ 
      data: fallbackPrice,
      error: error.message,
      fallback: true 
    }, { status: 200 });
  }
}
