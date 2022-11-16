import { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/server/db";
import { User } from "@prisma/client";
import withApiSession from "@lib/server/withSession";
import withHandler from "@lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user?.id === undefined) {
    return res.json({ ok: false });
  }
  const user: User | null = await db.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });

  if (user !== null) {
    return res.json({ ok: true, user });
  } else {
    return res.json({ ok: false });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    isPrivate: false,
    handler,
  })
);
