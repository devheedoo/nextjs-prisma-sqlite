import withHandler from "@lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/server/db";
import withApiSession from "@lib/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email } = req.body;
  if (!(name && email)) {
    return res.status(400).json({ ok: false });
  }

  const user = await db.user.upsert({
    where: {
      email,
    },
    create: {
      name,
      email,
    },
    update: {
      name,
    },
  });
  console.log("user joined:", user);

  res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
