import { MongoClient } from 'mongodb';
import { quotes } from './quotes-seed-data';
import { categories } from './quotes-categories';

async function main() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB ?? 'random-quotes';

  if (!uri) {
    throw new Error('Missing MONGODB_URI. Run with: npm run seed');
  }

  if (quotes.length !== categories.length) {
    throw new Error(
      `Expected ${quotes.length} categories but found ${categories.length}`,
    );
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const collection = client.db(dbName).collection('quotes');

    const alreadySeeded = await collection.countDocuments({ createdBy: null });

    if (alreadySeeded > 0) {
      const result = await collection.bulkWrite(
        quotes.map(({ quote }, index) => ({
          updateOne: {
            filter: { quote, createdBy: null },
            update: { $set: { category: categories[index] } },
          },
        })),
      );
      console.log(
        `Found ${alreadySeeded} seeded quotes. Set categories on ${result.matchedCount}. Nothing inserted.`,
      );
      return;
    }

    const documents = quotes.map(({ quote, author }, index) => ({
      quote,
      author,
      category: categories[index],
      likedBy: [] as string[],
      createdBy: null as string | null,
      createdAt: new Date(),
    }));

    const result = await collection.insertMany(documents);
    console.log(`Inserted ${result.insertedCount} quotes.`);
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});