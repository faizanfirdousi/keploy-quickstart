import { ImageResponse } from 'next/og';

export const alt = 'Keploy Go Quickstart Tutorial';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 64,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <p style={{ fontSize: 28, opacity: 0.85, marginBottom: 16 }}>
          Hands-on tutorial
        </p>
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 900,
            margin: 0,
          }}
        >
          Keploy Go Quickstart
        </h1>
        <p style={{ fontSize: 26, marginTop: 24, opacity: 0.9, maxWidth: 800 }}>
          Record &amp; replay API tests with Echo + PostgreSQL
        </p>
      </div>
    ),
    { ...size },
  );
}
