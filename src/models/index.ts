import mongoose from "mongoose";
import PromoCode from "./promoCode";

import User from "./user";

declare const process: NodeJS.Process;

const connectDb = async () => {
  return mongoose.connect(process.env.DATABASE_URL as string, {
    useNewUrlParser: true
  });
};

const models = {
  User,
  PromoCode
};

export { connectDb };
export default models;
