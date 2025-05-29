import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    
    return NextResponse.json({
      status: 'success',
      message: 'Form processed successfully',
      data: data
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Server error processing form'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'active',
    message: 'API server is running'
  });
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 