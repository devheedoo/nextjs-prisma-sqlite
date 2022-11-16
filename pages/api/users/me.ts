import { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/server/db";
import { User } from "@prisma/client";
import withApiSession from "@lib/server/withSession";
import withHandler from "@lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user: User | null = await db.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });

  return res.status(200).json({ ok: true, user });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
