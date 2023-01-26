const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const devSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    role: {
      type: String,
      required: [true, "Please add a role"],
      enum: ["Junior", "Senior"],
    },
    stack: {
      type: String,
      required: [true, "Please add a stack"],
      enum: [
        "Frontend",
        "Backend",
        "Testing",
        "Integrations",
        "Documentation",
        "Testing",
        "Devops",
        "UiUx",
      ],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

devSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Developer", devSchema);
