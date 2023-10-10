import { NextResponse } from 'next/server';

export const GET = async () => {
  const test = 'Test-OK'
  return NextResponse.json({test});
};