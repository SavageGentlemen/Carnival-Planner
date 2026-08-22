import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

// Initialize Firebase Admin
// Ensure GOOGLE_APPLICATION_CREDENTIALS env var points to your service account key
admin.initializeApp();
const db = admin.firestore();

const PREVIEW_MODE = process.argv.includes('--preview');

async function seedArticles() {
  try {
    const articlesPath = path.join(__dirname, 'articles.json');
    const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

    console.log(`[Seeder] Found ${articlesData.length} articles to seed.`);

    if (PREVIEW_MODE) {
      console.log('\n--- PREVIEW MODE (no Firestore writes) ---\n');
      for (const article of articlesData) {
        console.log(`📄 ${article.title}`);
        console.log(`   Slug: ${article.slug}`);
        console.log(`   Category: ${article.category || article.island}`);
        console.log(`   Meta: ${article.metaDescription}`);
        console.log(`   Content length: ${article.content.length} chars`);
        console.log(`   Affiliate links: ${(article.content.match(/tag=vivalmap-20/g) || []).length}`);
        console.log('');
      }
      console.log('Run without --preview to publish to Firestore.');
      return;
    }

    const batch = db.batch();
    
    for (const article of articlesData) {
      const docRef = db.collection('seoArticles').doc(article.id);
      const docData = {
        ...article,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      batch.set(docRef, docData);
      console.log(`[Seeder] Prepared: ${article.title}`);
    }

    await batch.commit();
    console.log(`\n✅ Successfully seeded ${articlesData.length} articles to Firestore.`);
  } catch (error) {
    console.error('[Seeder] Error:', error.message);
    if (error.message.includes('GOOGLE_APPLICATION_CREDENTIALS')) {
      console.log('\nℹ️  Set GOOGLE_APPLICATION_CREDENTIALS env var to your Firebase service account key file.');
      console.log('   Or run with --preview to see what would be published.');
    }
  }
}

seedArticles();
