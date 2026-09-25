const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const readline = require("readline");

const prisma = new PrismaClient();

function ask(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function askHidden(question) {
  return new Promise((resolve) => {
    process.stdout.write(question);

    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    let password = "";

    const onData = (char) => {
      if (char === "\r" || char === "\n") {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.removeListener("data", onData);
        process.stdout.write("\n");
        resolve(password);
      } else if (char === "\u0003") {
        process.exit();
      } else if (char === "\u007f") {
        password = password.slice(0, -1);
      } else {
        password += char;
      }
    };

    stdin.on("data", onData);
  });
}

async function main() {
  console.log("\n🔐 AASRA SUPER ADMIN SETUP\n");

  const name = await ask("Admin name: ");
  const email = (await ask("Admin email: ")).toLowerCase();

  const password = await askHidden("Admin password: ");
  const confirmPassword = await askHidden("Confirm password: ");

  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required.");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: {
      email,
    },
    update: {
      name,
      passwordHash,
      role: "SUPER_ADMIN",
    },
    create: {
      name,
      email,
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  console.log("\n✅ SUPER_ADMIN created successfully!");
  console.log(`Email: ${admin.email}`);
  console.log(`Role: ${admin.role}`);
  console.log("\n🔒 Your password was stored only as a bcrypt hash.\n");
}

main()
  .catch((error) => {
    console.error("\n❌ Admin creation failed:");
    console.error(error.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });