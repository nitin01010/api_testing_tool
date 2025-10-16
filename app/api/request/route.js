import axios from "axios";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import History from "@/models/History";

export async function POST(req) {
    try {
        const { method, url, data } = await req.json();

        if (!url || !method) {
            return NextResponse.json({ error: "Missing method or url" }, { status: 400 });
        }

        await connectDB();
        const response = await axios({ method, url, headers: { "Content-Type": "application/json" }, data });
        await History.create({ method, url });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch external data" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const history = await History.find()
        return NextResponse.json({ history });
    } catch (error) {
        console.error("Error fetching history:", error.message);
        return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();

        const { id } = await req.json(); // Optional: pass { id } to delete a specific record

        if (id) {
            // Delete specific history item
            await History.findByIdAndDelete(id);
            return NextResponse.json({ message: "History item deleted" });
        } else {
            // Delete all history if no id provided
            await History.deleteMany({});
            return NextResponse.json({ message: "All history deleted" });
        }
    } catch (error) {
        console.error("Error deleting history:", error.message);
        return NextResponse.json({ error: "Failed to delete history" }, { status: 500 });
    }
}