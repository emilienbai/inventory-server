import mongoose from 'mongoose';

declare const process: NodeJS.Process;

const connectDb = async (): Promise<typeof mongoose> => {
    return mongoose.connect(process.env.DATABASE_URL as string, {
        useNewUrlParser: true
    });
};

export { connectDb };
