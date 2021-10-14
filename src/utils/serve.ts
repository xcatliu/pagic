// Forked from https://deno.land/std@0.111.0/http/file_server.ts
import { fileServer, httpStatus, server, path } from '../../deps.ts';

function normalizeURL(url: string): string {
  let normalizedUrl = url;

  try {
    // allowed per https://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html
    const absoluteURI = new URL(normalizedUrl);
    normalizedUrl = absoluteURI.pathname;
  } catch (e) {
    // wasn't an absoluteURI
    if (!(e instanceof TypeError)) {
      throw e;
    }
  }

  try {
    normalizedUrl = decodeURI(normalizedUrl);
  } catch (e) {
    if (!(e instanceof URIError)) {
      throw e;
    }
  }

  if (normalizedUrl[0] !== '/') {
    throw new URIError('The request URI is malformed.');
  }

  normalizedUrl = path.posix.normalize(normalizedUrl);
  const startOfParams = normalizedUrl.indexOf('?');

  return startOfParams > -1 ? normalizedUrl.slice(0, startOfParams) : normalizedUrl;
}

function serveFallback(_req: Request, e: Error): Promise<Response> {
  if (e instanceof URIError) {
    return Promise.resolve(
      new Response(httpStatus.STATUS_TEXT.get(httpStatus.Status.BadRequest), {
        status: httpStatus.Status.BadRequest,
      }),
    );
  } else if (e instanceof Deno.errors.NotFound) {
    return Promise.resolve(
      new Response(httpStatus.STATUS_TEXT.get(httpStatus.Status.NotFound), {
        status: httpStatus.Status.NotFound,
      }),
    );
  }

  return Promise.resolve(
    new Response(httpStatus.STATUS_TEXT.get(httpStatus.Status.InternalServerError), {
      status: httpStatus.Status.InternalServerError,
    }),
  );
}

interface ServeOptions {
  serveDir?: string;
  root?: string;
  port?: number;
}
const defaultServeOptions: Required<ServeOptions> = {
  serveDir: 'dist',
  root: '/',
  port: 8000,
};

export function serve(options?: ServeOptions) {
  const { serveDir, root, port } = { ...defaultServeOptions, ...options };
  const target = path.posix.resolve(serveDir);

  const handler = async (req: Request): Promise<Response> => {
    let response: Response;

    try {
      const normalizedUrl = normalizeURL(req.url);
      let fsPath = path.posix.join(target, normalizedUrl.replace(root, '/'));

      if (fsPath.indexOf(target) !== 0) {
        fsPath = target;
      }

      const fileInfo = await Deno.stat(fsPath);

      if (fileInfo.isDirectory) {
        fsPath = path.posix.join(fsPath, 'index.html');
      }
      response = await fileServer.serveFile(req, fsPath);
    } catch (e) {
      const err = e instanceof Error ? e : new Error('[non-error thrown]');
      console.error(err.message);
      response = await serveFallback(req, err);
    }

    return response!;
  };

  return listenAndServe(`127.0.0.1:${port}`, handler);
}

function listenAndServe(addr: string, handler: server.Handler, options?: server.ServeInit): server.Server {
  const serverInstance = new server.Server({ addr, handler });

  if (options?.signal) {
    options.signal.onabort = () => serverInstance.close();
  }

  serverInstance.listenAndServe();
  return serverInstance;
}
