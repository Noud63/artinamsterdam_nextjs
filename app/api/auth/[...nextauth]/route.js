import dbConnect from "@/lib/dbConnect";

import { handlers } from "@/auth";

export const dynamic = "force-dynamic"; // prevent caching

dbConnect();

export const { GET, POST } = handlers;