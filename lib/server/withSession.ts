import { NextApiHandler } from "next";
import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const sessionOptions: IronSessionOptions = {
  cookieName: "carrotMarketChallenge10",
  password: "SH*p8hrJY!N#6zT7WMfQy2Te#G92Sr6q?dF#*4Sq",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export default function withApiSession(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
