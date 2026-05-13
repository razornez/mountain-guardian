import { NextResponse } from 'next/server';

export function apiSuccess(data, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiFailure(code, message, status = 400) {
  return NextResponse.json({ success: false, code, message }, { status });
}
