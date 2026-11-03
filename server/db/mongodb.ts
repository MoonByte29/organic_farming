import fs from 'fs';
import path from 'path';

/**
 * Embedded MongoDB-compatible Document Store & Mongoose ODM Layer
 * Supports standard Mongoose operations: find, findOne, findById, create, updateOne, deleteOne, countDocuments
 * Automatically persists to local disk (data/*.json)
 */

export interface MongoDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export class MongoCollection<T extends Record<string, any>> {
  private name: string;
  private filePath: string;
  private documents: (T & MongoDocument)[] = [];

  constructor(collectionName: string) {
    this.name = collectionName;
    const dataDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      try {
        fs.mkdirSync(dataDir, { recursive: true });
      } catch (err) {
        // directory exists or created
      }
    }
    this.filePath = path.join(dataDir, `${collectionName}.json`);
    this.loadFromDisk();
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        this.documents = JSON.parse(raw);
      }
    } catch (err) {
      console.warn(`[MongoDB] Could not load ${this.name} from disk, initializing empty.`);
      this.documents = [];
    }
  }

  private saveToDisk() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.documents, null, 2), 'utf-8');
    } catch (err) {
      console.error(`[MongoDB] Failed to write ${this.name} to disk:`, err);
    }
  }

  public seed(initialDocs: T[]) {
    if (this.documents.length === 0) {
      const now = new Date().toISOString();
      this.documents = initialDocs.map((doc, idx) => ({
        ...doc,
        _id: doc.id || doc._id || `doc_${Date.now()}_${idx}`,
        createdAt: now,
        updatedAt: now
      }));
      this.saveToDisk();
      console.log(`[MongoDB] Seeded collection '${this.name}' with ${this.documents.length} records.`);
    }
  }

  public async find(filter?: Partial<T> | ((item: T & MongoDocument) => boolean)): Promise<(T & MongoDocument)[]> {
    if (!filter) return [...this.documents];
    if (typeof filter === 'function') {
      return this.documents.filter(filter);
    }
    return this.documents.filter((doc) => {
      for (const key of Object.keys(filter)) {
        if ((doc as any)[key] !== (filter as any)[key]) {
          return false;
        }
      }
      return true;
    });
  }

  public async findById(id: string): Promise<(T & MongoDocument) | null> {
    const found = this.documents.find((d) => d._id === id || (d as any).id === id);
    return found ? { ...found } : null;
  }

  public async findOne(filter: Partial<T> | ((item: T & MongoDocument) => boolean)): Promise<(T & MongoDocument) | null> {
    const list = await this.find(filter);
    return list.length > 0 ? list[0] : null;
  }

  public async create(data: T): Promise<T & MongoDocument> {
    const now = new Date().toISOString();
    const newDoc: T & MongoDocument = {
      ...data,
      _id: (data as any).id || (data as any)._id || `oid_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      createdAt: now,
      updatedAt: now
    };
    this.documents.unshift(newDoc);
    this.saveToDisk();
    return { ...newDoc };
  }

  public async updateOne(
    filter: Partial<T> | ((item: T & MongoDocument) => boolean),
    update: Partial<T>
  ): Promise<(T & MongoDocument) | null> {
    const target = await this.findOne(filter);
    if (!target) return null;

    const index = this.documents.findIndex((d) => d._id === target._id);
    if (index === -1) return null;

    this.documents[index] = {
      ...this.documents[index],
      ...update,
      updatedAt: new Date().toISOString()
    };
    this.saveToDisk();
    return { ...this.documents[index] };
  }

  public async deleteOne(filter: Partial<T> | ((item: T & MongoDocument) => boolean)): Promise<boolean> {
    const target = await this.findOne(filter);
    if (!target) return false;
    this.documents = this.documents.filter((d) => d._id !== target._id);
    this.saveToDisk();
    return true;
  }

  public async countDocuments(filter?: Partial<T>): Promise<number> {
    const list = await this.find(filter);
    return list.length;
  }
}

export const db = {
  products: new MongoCollection<any>('products'),
  orders: new MongoCollection<any>('orders'),
  inquiries: new MongoCollection<any>('inquiries'),
  subscribers: new MongoCollection<any>('subscribers'),
  reviews: new MongoCollection<any>('reviews'),
  users: new MongoCollection<any>('users'),
  farmers: new MongoCollection<any>('farmers'),
  batches: new MongoCollection<any>('batches'),
  coupons: new MongoCollection<any>('coupons'),
  otps: new MongoCollection<any>('otps')
};
