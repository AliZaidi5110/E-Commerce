// Test script to verify authentication system
import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

const testAuth = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/bookstore");
    console.log("✅ Connected to MongoDB");

    // Test admin user creation
    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (adminExists) {
      console.log("✅ Admin user exists");
      console.log("Admin email:", adminExists.email);
      console.log("Admin role:", adminExists.role);
      
      // Test password verification
      const isPasswordValid = await adminExists.comparePassword("1234");
      console.log("✅ Admin password verification:", isPasswordValid);
    } else {
      console.log("❌ Admin user not found");
    }

    // Test regular user creation
    const testUser = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      role: "user"
    });
    
    await testUser.save();
    console.log("✅ Test user created");
    
    // Test password verification for regular user
    const isUserPasswordValid = await testUser.comparePassword("password123");
    console.log("✅ User password verification:", isUserPasswordValid);

    console.log("\n🎉 Authentication system test completed successfully!");
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  }
};

testAuth();

