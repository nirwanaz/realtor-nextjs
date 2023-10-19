import { connectToMongoDB } from "@/backend/config/db";
import { registerUser } from "@/backend/controllers/authController";
import errors from "@/backend/middleware/errors";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

connectToMongoDB();

router
    .use(async (req, res, next) => {
        await next()
    })
    .post(registerUser)

export default router.handler({
    onError: errors
})