import { Response } from "express";
import { UserProfileModel } from "../models/user-profile.model";
import { UserContextRequest } from "../middleware/auth-context";

export const getMe = async (req: UserContextRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const profile = await UserProfileModel.findOne({
    userId: req.user.userId,
  });

  return res.json(profile);
};

export const updateMe = async (req: UserContextRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const profile = await UserProfileModel.findOneAndUpdate(
    { userId: req.user.userId },
    req.body,
    { upsert: true, new: true }
  );

  return res.json(profile);
};
