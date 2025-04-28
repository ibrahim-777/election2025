// app/api/election/route.js
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

// MongoDB connection
const uri = "mongodb+srv://ibrahimkarra:tRv9Tq7xqKxGYYlA@election2025.xkqutuj.mongodb.net/?retryWrites=true&w=majority&appName=Election2025";
const dbName = "Election";
const collectionName = "ElectionTripoli";

let cachedClient = null;
let cachedCollection = null;

async function connectToMongo() {
  if (cachedCollection) return cachedCollection;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 50,
  });

  await client.connect();
  cachedClient = client;
  const db = client.db(dbName);
  cachedCollection = db.collection(collectionName);
  return cachedCollection;
}

export async function GET(req) {
  try {
    // return NextResponse.json({ status: "API is working!" });

    const collection = await connectToMongo();
    const { searchParams } = new URL(req.url);

    const query = {};
    if (searchParams.get("District")) query.District = searchParams.get("District");
    if (searchParams.get("registrationNb")) query.registrationNb = parseInt(searchParams.get("registrationNb"));
    if (searchParams.get("sex")) query.sex = searchParams.get("sex");
    if (searchParams.get("sect")) query.sect = searchParams.get("sect");

    const limit = parseInt(searchParams.get("limit")) || 100;
    const page = parseInt(searchParams.get("page")) || 1;
    const skip = (page - 1) * limit;

    const projection = {
      registrationNb: 1,
      District: 1,
      sex: 1,
      RoomNb: 1,
      sect: 1,
      Center: 1,
      location:1
    };

    const results = await collection
      .find(query)
      .project(projection)
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json(results);
  } catch (error) {
    console.error("Backend error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
