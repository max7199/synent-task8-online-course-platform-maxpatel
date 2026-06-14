require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');
const User = require('./models/User');

const courses = [
  {
    title: 'Full Stack Web Development',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB.',
    price: 4999,
    instructorName: 'John Smith',
    category: 'Development',
    thumbnail: '/images/fullstack.png'
  },
  {
    title: 'React Mastery',
    description: 'Advanced React, Hooks, Context API, Redux, Routing, and Projects.',
    price: 2999,
    instructorName: 'Sarah Wilson',
    category: 'Development',
    thumbnail: '/images/react.png'
  },
  {
    title: 'Node.js and MongoDB Bootcamp',
    description: 'Build scalable backend applications using Express and MongoDB.',
    price: 3999,
    instructorName: 'David Miller',
    category: 'Development',
    thumbnail: '/images/node_mongodb.png'
  },
  {
    title: 'Java Programming Masterclass',
    description: 'Learn Core Java, OOP, Collections, Multithreading, JDBC, and Projects.',
    price: 3499,
    instructorName: 'James Anderson',
    category: 'Development',
    thumbnail: '/images/java.png'
  },
  {
    title: 'Complete C++ Development',
    description: 'Learn C++, STL, Data Structures, Algorithms, OOP, and Competitive Programming.',
    price: 3299,
    instructorName: 'Michael Brown',
    category: 'Development',
    thumbnail: '/images/cpp.png'
  }
];

const seedCourses = async () => {
  try {
    // 1. Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // 2. Delete existing courses
    console.log('🗑️ Deleting existing courses...');
    await Course.deleteMany({});
    console.log('✅ Existing courses deleted');

    // 3. Prepare courses with instructor IDs
    const preparedCourses = [];

    for (const courseData of courses) {
      const { instructorName, ...courseInfo } = courseData;

      // Find or create the instructor user
      let instructor = await User.findOne({ name: instructorName, role: 'instructor' });

      if (!instructor) {
        console.log(`👤 Instructor "${instructorName}" not found. Creating...`);
        instructor = await User.create({
          name: instructorName,
          email: `${instructorName.toLowerCase().replace(' ', '.')}@example.com`,
          password: 'Password@123', // Default password
          role: 'instructor'
        });
      }

      preparedCourses.push({
        ...courseInfo,
        instructor: instructor._id
      });
    }

    // 4. Insert new courses
    console.log('📥 Inserting sample courses...');
    await Course.insertMany(preparedCourses);
    console.log('✅ Sample courses inserted successfully');

    // 5. Success and Exit
    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedCourses();
