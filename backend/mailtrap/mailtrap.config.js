import pkg from "mailtrap";
const { Client } = pkg;
import dotenv from "dotenv";
dotenv.config();

console.log("MAILTRAP_TOKEN:", process.env.MAILTRAP_TOKEN); // Debugging line

if (!process.env.MAILTRAP_TOKEN) {
    throw new Error("MAILTRAP_TOKEN is not defined in the environment variables");
}

export const mailtrapClient = new Client({
	apiToken: process.env.MAILTRAP_TOKEN, // Use `apiToken` instead of `token`
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Govindi Tharshika",
};

