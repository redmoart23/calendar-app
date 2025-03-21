import { calendarApi } from "../../api/calendarApi";
import { describe, test, expect } from "@jest/globals";
import process from "process";

describe("Pruebas en calendarApi", () => {
  test("debe de tener la configuración por defecto", () => {
    expect(calendarApi.defaults.baseURL).toBe(
      process.env.VITE_API_URL
    );
  });

  test("debe de tener el x-token en el header", async () => {
    const token = "ABC123";
    localStorage.setItem("token", token);
    const res = await calendarApi.get("/auth");
    expect(res.config.headers["x-token"]).toBe(token);
  });
});
