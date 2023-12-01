import { NextResponse } from 'next/server';

export async function GET() {
    console.log("holaaaa")
  return NextResponse.json({ ok: true });
}