/**
 * seed.js — MongoDB seed script for Task 8
 *
 * Creates 3 instructor users and 3 sample courses.
 *
 * Usage:
 *   node seed.js          → insert sample data
 *   node seed.js --clear  → wipe courses + seed users, then insert fresh data
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Course = require('./models/Course');

// ─── Sample Data ─────────────────────────────────────────────────────────────

const instructors = [
  { name: 'John Smith',   email: 'john.smith@example.com',   password: 'Password@123', role: 'instructor' },
  { name: 'Sarah Wilson', email: 'sarah.wilson@example.com', password: 'Password@123', role: 'instructor' },
  { name: 'David Miller', email: 'david.miller@example.com', password: 'Password@123', role: 'instructor' },
];

const buildCourses = (ids) => [
  {
    title: 'Full Stack Web Development',
    description:
      'A comprehensive bootcamp covering HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB. Build real-world full-stack applications from scratch.',
    instructor: ids[0],
    category: 'Web Development',
    price: 4999,
    content: [
      { title: 'Introduction & Environment Setup',      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { title: 'HTML & CSS Fundamentals',               videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { title: 'JavaScript Deep Dive',                  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { title: 'React — Building Modern UIs',           videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { title: 'Node.js & Express REST APIs',           videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { title: 'MongoDB & Mongoose Integration',        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { title: 'Deployment & Final Project',            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
    ],
  },
  {
    title: 'React Mastery',
    description:
      'Master React from the ground up — hooks, context, Redux Toolkit, React Query, testing, and performance optimisation. Ideal for developers ready to go beyond the basics.',
    instructor: ids[1],
    category: 'Frontend Development',
    price: 2999,
    content: [
      { title: 'React Fundamentals & JSX',              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { title: 'Hooks — useState, useEffect & Custom',  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { title: 'Context API & State Management',        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { title: 'Redux Toolkit in Practice',             videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { title: 'React Query & Data Fetching',           videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { title: 'Performance & Testing',                 videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
    ],
  },
  {
    title: 'Node.js and MongoDB Bootcamp',
    description:
      'A hands-on bootcamp covering Node.js internals, building RESTful APIs with Express, advanced MongoDB queries, Mongoose ODM, authentication, and production-ready patterns.',
    instructor: ids[2],
    category: 'Backend Development',
    price: 3999,
    content: [
      { title: 'Node.js Core & Module System',          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { title: 'Building REST APIs with Express',       videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { title: 'MongoDB Queries & Aggregation',         videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { title: 'Mongoose Schemas & Middleware',         videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { title: 'JWT Authentication & Security',         videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { title: 'Error Handling & Production Patterns',  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
    ],
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
  const shouldClear = process.argv.includes('--clear');

  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Connected to: ${process.env.MONGO_URI}\n`);

    if (shouldClear) {
      await Course.deleteMany({});
      await User.deleteMany({ role: 'instructor' });
      console.log('🗑️  Cleared existing courses and instructor users.\n');
    }

    // ── Step 1: Upsert instructor users ──────────────────────────────────────
    console.log('👤 Creating instructor users...');
    const instructorIds = [];

    for (const inst of instructors) {
      const existing = await User.findOne({ email: inst.email });
      if (existing) {
        console.log(`   ↳ Already exists: ${inst.name} (${inst.email})`);
        instructorIds.push(existing._id);
      } else {
        const hashed = await bcrypt.hash(inst.password, 10);
        const created = await User.create({ ...inst, password: hashed });
        console.log(`   ✔  Created: ${created.name} (${created.email})`);
        instructorIds.push(created._id);
      }
    }

    // ── Step 2: Insert courses ────────────────────────────────────────────────
    console.log('\n📚 Inserting courses...');
    const courses = buildCourses(instructorIds);

    for (const courseData of courses) {
      const existing = await Course.findOne({ title: courseData.title });
      if (existing) {
        console.log(`   ↳ Already exists: "${courseData.title}" — skipped`);
      } else {
        const created = await Course.create(courseData);
        console.log(`   ✔  Inserted: "${created.title}" (₹${created.price})`);
      }
    }

    console.log('\n🎉 Seeding complete!\n');
  } catch (err) {
    console.error('\n❌ Seeding failed:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
  }
}

seed();
