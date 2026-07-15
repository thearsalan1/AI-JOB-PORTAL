import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const ATLAS_URI = process.env.ATLAS_URI || "";
const LOCAL_URI =
  process.env.LOCAL_URI || "mongodb://localhost:27017/AiJobPortal";

const COLLECTIONS = [
  "applications",
  "dashboardstats",
  "employerprofiles",
  "jobs",
  "jobmatches",
  "jobseekerprofiles",
  "jobskills",
  "resumes",
  "resumeparseddatas",
  "savedjobs",
  "skills",
  "users",
  "useractivities",
  "userskills",
];

const migrate = async () => {
  if (!ATLAS_URI) {
    console.error(
      "❌ ATLAS_URI missing. Isko .env mein daalo ya inline set karo.",
    );
    process.exit(1);
  }

  console.log("Atlas se connect ho raha hai...");
  const atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();

  console.log("Local Mongo se connect ho raha hai...");
  const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();

  for (const name of COLLECTIONS) {
    try {
      const atlasCollection = atlasConn.collection(name);
      const localCollection = localConn.collection(name);

      const docs = await atlasCollection.find({}).toArray();

      if (docs.length === 0) {
        console.log(`  ${name}: 0 documents, skip`);
        continue;
      }

      await localCollection.deleteMany({});
      await localCollection.insertMany(docs);

      console.log(`  ✔ ${name}: ${docs.length} documents copied`);
    } catch (err: any) {
      console.error(`  ✘ ${name}: failed —`, err.message);
    }
  }

  await atlasConn.close();
  await localConn.close();
  console.log("Migration complete.");
  process.exit(0);
};

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
