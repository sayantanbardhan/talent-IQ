import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export const inngest = new Inngest({id: "talent-IQ"});

const syncUser = inngest.createFunction(
    {id: "sync-User"},
    {event: "clerk/User.created"},
    async({event} ) => {
        await connectDB();

        const {id, email_addresses, first_name, last_name, profile_image_url} = event.data;

        const newUser = new User({
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            profileImage: profile_image_url,
        });

        await User.create(newUser);

    }
)

const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-from-db"},
    {event: "clerk/User.deleted"},
    async({event} ) => {
        await connectDB();

        const {id} = event.data;
        await User.deleteOne({ clerkId: id });

    }
)

export const functions = [syncUser, deleteUserFromDB];