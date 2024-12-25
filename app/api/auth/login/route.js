import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // TODO: Implement actual authentication logic here
    // This is a placeholder response
    if (email && password) {
      // For demo purposes, accept any non-empty email/password
      return NextResponse.json(
        { message: 'Login successful' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
