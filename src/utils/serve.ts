// Forked from https://deno.land/std@0.72.0/http/file_server.ts

import { path, server } from '../../deps.ts';
const { extname, posix } = path;

const encoder = new TextEncoder();

const MEDIA_TYPES: Record<string, string> = {
  '.md': 'text/markdown',
  '.html': 'text/html',
  '.htm': 'text/html',
  '.json': 'application/json',
  '.map': 'application/json',
  '.txt': 'text/plain',
  '.ts': 'text/typescript',
  '.tsx': 'text/tsx',
  '.js': 'application/javascript',
  '.jsx': 'text/jsx',
  '.gz': 'application/gzip',
  '.css': 'text/css',
  '.wasm': 'application/wasm',
  '.mjs': 'application/javascript',
  '.svg': 'image/svg+xml'
};
/** Returns the content-type based on the extension of a path. */
function contentType(path: string): string | undefined {
  return MEDIA_TYPES[extname(path)];
}

async function serveFile(req: server.ServerRequest, filePath: string): Promise<server.Response> {
  const [file, fileInfo] = await Promise.all([Deno.open(filePath), Deno.stat(filePath)]);
  const headers = new Headers();
  headers.set('content-length', fileInfo.size.toString());
  const contentTypeValue = contentType(filePath);
  if (contentTypeValue) {
    headers.set('content-type', contentTypeValue);
  }
  req.done.then(() => {
    file.close();
  });
  return {
    status: 200,
    body: file,
    headers
  };
}

function serveFallback(req: server.ServerRequest, e: Error): Promise<server.Response> {
  if (e instanceof Deno.errors.NotFound) {
    return Promise.resolve({
      status: 404,
      body: encoder.encode('Not found')
    });
  } else {
    return Promise.resolve({
      status: 500,
      body: encoder.encode('Internal server error')
    });
  }
}

interface ServeOptions {
  serveDir?: string;
  root?: string;
  port?: number;
}
const defaultServeOptions: Required<ServeOptions> = {
  serveDir: 'dist',
  root: '/',
  port: 8000
};

/** Serve dir as static server */
export function serve(options?: ServeOptions) {
  const { serveDir, root, port } = { ...defaultServeOptions, ...options };

  const handler = async (req: server.ServerRequest) => {
    let normalizedUrl = posix.normalize(req.url);
    try {
      normalizedUrl = decodeURIComponent(normalizedUrl);
    } catch (e) {
      if (!(e instanceof URIError)) {
        throw e;
      }
    }
    let fsPath = posix.join(serveDir, normalizedUrl.replace(root, '/'));

    let response: server.Response | undefined;
    try {
      const fileInfo = await Deno.stat(fsPath);
      if (fileInfo.isDirectory) {
        fsPath = posix.join(fsPath, 'index.html');
      }
      response = await serveFile(req, fsPath);
    } catch (e) {
      response = await serveFallback(req, e);
    } finally {
      try {
        await req.respond(response!);
      } catch (e) {
        console.error(e.message);
      }
    }
  };

  return listenAndServe(`127.0.0.1:${port}`, handler);
}

// https://github.com/denoland/deno/issues/5060
export function listenAndServe(
  addr: string | server.HTTPOptions,
  handler: (req: server.ServerRequest) => void
): server.Server {
  const serverInstance = server.serve(addr);

  const handleRequests = async () => {
    for await (const request of serverInstance) {
      handler(request);
    }
  };
  handleRequests();
  return serverInstance;
}
