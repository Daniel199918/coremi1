import { describe, expect, it } from "vitest";
import { cn, getErrorMessage, formatDate } from "@/utils";

describe("cn", () => {
  it("concatène les classes valides", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("ignore les valeurs falsy", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });
});

describe("getErrorMessage", () => {
  it("extrait le message d'une Error", () => {
    expect(getErrorMessage(new Error("boom"))).toBe("boom");
  });

  it("extrait le message d'un objet { message }", () => {
    expect(getErrorMessage({ message: "oops" })).toBe("oops");
  });

  it("retourne un message par défaut sinon", () => {
    expect(getErrorMessage(42)).toBe("Une erreur inattendue est survenue");
  });
});

describe("formatDate", () => {
  it("formate une date ISO en français", () => {
    expect(formatDate("2026-07-14T00:00:00Z")).toContain("juillet");
  });
});
