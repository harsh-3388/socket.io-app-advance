import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "WebSocket server is running on port 3001" });
}
