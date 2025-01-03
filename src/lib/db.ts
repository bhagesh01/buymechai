const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>
}

import { MongoClient } from "mongodb"

if (!process.env.MY_MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MY_MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.MY_NODE_ENV === "development") {
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}


export default clientPromise