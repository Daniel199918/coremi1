import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "@/lib/validations/auth";

describe("loginSchema", () => {
  it("accepte des identifiants valides", () => {
    const result = loginSchema.safeParse({ email: "test@example.com", password: "secret" });
    expect(result.success).toBe(true);
  });

  it("rejette un email invalide", () => {
    const result = loginSchema.safeParse({ email: "pas-un-email", password: "secret" });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  it("accepte une inscription valide", () => {
    const result = registerSchema.safeParse({
      email: "test@example.com",
      password: "motdepasse123",
      displayName: "Daniel",
    });
    expect(result.success).toBe(true);
  });

  it("rejette un mot de passe trop court", () => {
    const result = registerSchema.safeParse({
      email: "test@example.com",
      password: "court",
      displayName: "Daniel",
    });
    expect(result.success).toBe(false);
  });
});
