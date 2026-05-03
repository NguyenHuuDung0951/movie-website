import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { connectDB } from "../config/db";

const createAdminUser = async () => {
  await connectDB();

  const adminEmail = "admin@cinemaversa.com";
  const adminPassword = "Admin@123456";

  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("✓ Admin user already exists");
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await User.create({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✓ Admin user created successfully");
    console.log(`  Email: ${adminEmail}`);
    console.log(`  Password: ${adminPassword}`);
    console.log("\n⚠️  IMPORTANT: Please change this password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("✗ Error creating admin user:", error);
    process.exit(1);
  }
};

createAdminUser();
