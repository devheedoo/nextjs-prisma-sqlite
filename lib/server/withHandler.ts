import { NextApiHandler } from "next";

export interface IResponse {
  ok: boolean;
  [key: string]: any;
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "HEAD" | "DELETE";

interface IHandlerConfig {
  methods: Method[];
  isPrivate: boolean;
  handler: NextApiHandler;
}

export default function withHandler({
  methods,
  isPrivate = true,
  handler,
}: IHandlerConfig): NextApiHandler {
  return function (req, res) {
    // Method Not Allowed
    if (req.method && !methods.includes(req.method as Method)) {
      return res.status(405).end();
    }
    // Unauthorized
    if (isPrivate && !req.session.user?.id) {
      return res.status(401).end();
    }
    try {
      return handler(req, res);
    } catch (error) {
      // Internal Server Error
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
