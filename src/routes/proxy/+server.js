import { error } from '@sveltejs/kit';
import { Readable } from 'stream';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, fetch, setHeaders }) {
  const targetUrl = 'https://studentadmin.manchester.ac.uk/psp/CSPROD_8/EMPLOYEE/SA/c/UM_CUSTOM.UM_SS_REG_LAUNCH.GBL?&skipcnav=1';

  try {
    const response = await fetch(targetUrl);
    const headers = new Headers(response.headers);
    
    // Remove headers that prevent framing
    headers.delete('X-Frame-Options');
    headers.delete('Content-Security-Policy');
    
    // Remove content encoding header to prevent compression issues
    headers.delete('Content-Encoding');
    
    // Convert the response body to a readable stream
    const body = Readable.from(Buffer.from(await response.arrayBuffer()));

    setHeaders({
      'Content-Type': headers.get('Content-Type') || 'text/html'
    });

    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers
    });
  } catch (err) {
    console.error('Proxy error:', err);
    throw error(500, 'Proxy server error');
  }
}