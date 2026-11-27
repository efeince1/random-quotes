import { ObjectId } from 'mongodb';
import type { WithId } from 'mongodb';
import { Collections, getDb } from '@/lib/db';
import type { Quote } from '@/types/quotes';

type QuoteDocument = {
  quote: string;
  author: string;
  category?: string;
  likedBy: string[];
  createdBy: string | null;
  createdAt: Date;
};

type QuoteFields = {
  quote: string;
  author: string;
  category: string;
};

async function getCollection() {
  const db = await getDb();
  return db.collection<QuoteDocument>(Collections.quotes);
}

function toObjectId(id: string) {
  return /^[a-f\d]{24}$/i.test(id) ? new ObjectId(id) : null;
}

function toQuote(doc: WithId<QuoteDocument>): Quote {
  return {
    id: doc._id.toString(),
    quote: doc.quote,
    author: doc.author,
    category: doc.category,
    likedBy: doc.likedBy,
    createdBy: doc.createdBy,
  };
}

export async function getQuotes(): Promise<Quote[]> {
  const collection = await getCollection();
  const documents = await collection
    .find()
    .sort({ createdAt: 1, _id: 1 })
    .toArray();
  return documents.map(toQuote);
}
export async function getLikedQuotes(userId: string): Promise<Quote[]> {
  const collection = await getCollection();
  const documents = await collection
    .find({ likedBy: userId })
    .sort({ createdAt: 1, _id: 1 })
    .toArray();
  return documents.map(toQuote);
}
export async function getQuotesByCreator(userId: string): Promise<Quote[]> {
  const collection = await getCollection();
  const documents = await collection
    .find({ createdBy: userId })
    .sort({ createdAt: -1, _id: -1 })
    .toArray();
  return documents.map(toQuote);
}

export async function getQuoteById(id: string): Promise<Quote | null> {
  const objectId = toObjectId(id);
  if (!objectId) return null;

  const collection = await getCollection();
  const document = await collection.findOne({ _id: objectId });
  return document ? toQuote(document) : null;
}

export async function createQuote(
  fields: QuoteFields,
  createdBy: string,
): Promise<Quote> {
  const collection = await getCollection();
  const document: QuoteDocument = {
  ...fields,
  likedBy: [],
  createdBy,
  createdAt: new Date(),
};
  const result = await collection.insertOne(document);
  return toQuote({ _id: result.insertedId, ...document });
}

export async function addLike(id: string, userId: string): Promise<boolean> {
  const objectId = toObjectId(id);
  if (!objectId) return false;

  const collection = await getCollection();
  const result = await collection.updateOne(
    { _id: objectId },
    { $addToSet: { likedBy: userId } },
  );
  return result.matchedCount === 1;
}

export async function removeLike(
  id: string,
  userId: string,
): Promise<boolean> {
  const objectId = toObjectId(id);
  if (!objectId) return false;

  const collection = await getCollection();
  const result = await collection.updateOne(
    { _id: objectId },
    { $pull: { likedBy: userId } },
  );
  return result.matchedCount === 1;
}

export async function updateQuote(
  id: string,
  fields: QuoteFields,
  userId: string,
): Promise<boolean> {
  const objectId = toObjectId(id);
  if (!objectId) return false;

  const collection = await getCollection();
  const result = await collection.updateOne(
    { _id: objectId, createdBy: userId },
    { $set: fields },
  );
  return result.matchedCount === 1;
}

export async function deleteQuote(
  id: string,
  userId: string,
): Promise<boolean> {
  const objectId = toObjectId(id);
  if (!objectId) return false;

  const collection = await getCollection();
  const result = await collection.deleteOne({
    _id: objectId,
    createdBy: userId,
  });
  return result.deletedCount === 1;
}