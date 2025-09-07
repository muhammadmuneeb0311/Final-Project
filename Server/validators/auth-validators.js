const { z } = require("zod");

const memberSchema = z.object({
  name: z.string().min(1, "Member name is required"),
  email: z.string().email("Invalid member email"),
});

const signupSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(3, { message: "Name must be at least 3 characters" })
      .max(255, { message: "Name must not be more than 255 characters" }),

    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email({ message: "Invalid email address" })
      .max(255, { message: "Email must not be more than 255 characters" }),

    password: z
      .string({ required_error: "Password is required" })
      .min(7, { message: "Password must be at least 7 characters" })
      .max(1024, "Password can't be greater than 1024 characters"),

    phone: z.string().optional(),

    role: z.enum(["team", "evaluator", "admin"], {
      errorMap: () => ({ message: "Role must be team, evaluator, or admin" }),
    }),

    // only for team
    teamName: z.string().optional(),
    members: z.array(memberSchema).min(1, "At least one member is required").max(5).optional(),

    // only for evaluator
    qualification: z.string().optional(),
    experience: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.role === "team") {
        return (
          data.teamName && data.teamName.length > 0 && data.members?.length > 0
        );
      }
      return true;
    },
    {
      message: "Team name and at least one member are required for team role",
      path: ["members"], // error will show under members
    }
  );

module.exports = { signupSchema };
