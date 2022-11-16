import withHandler from "@lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import db from "@lib/server/db";
import withApiSession from "@lib/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ ok: false });
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  console.log("user joined:", user);
  if (user === null) {
    return res.status(400).json({ ok: false });
  }

  req.session.user = {
    id: user.id,
  };
  await req.session.save();

  return res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
