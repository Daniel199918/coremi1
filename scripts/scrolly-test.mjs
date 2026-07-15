import puppeteer from "puppeteer-core";

const out = process.env.SCRATCH ?? ".";
const browser = await puppeteer.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--no-proxy-server"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3100/", { waitUntil: "load", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));
for (const [name, y] of [["s0", 0], ["s1", 700], ["s2", 1450]]) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({ path: `${out}/v20-${name}.png` });
  console.log("saved", name, "y=" + y);
}
await browser.close();
