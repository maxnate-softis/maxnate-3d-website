// =============================================================================
// HEALTH CHECK API ENDPOINT
// Used by Cloud Run and Docker health checks
// =============================================================================

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'maxnate-3d-website',
    version: process.env.npm_package_version || '1.0.0',
  });
}
