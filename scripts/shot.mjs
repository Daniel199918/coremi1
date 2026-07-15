import puppeteer from "puppeteer-core";

const [url, out, width = "1440", height = "900", full = "1"] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--force-prefers-reduced-motion", "--no-proxy-server"],
});
const page = await browser.newPage();
await page.setViewport({ width: Number(width), height: Number(height) });
await page.goto(url, { waitUntil: "load", timeout: 60000 });
// déclencher les chargements différés en parcourant la page
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0;
    const step = () => {
      y += 600;
      window.scrollTo(0, y);
      if (y < document.body.scrollHeight) setTimeout(step, 90);
      else { window.scrollTo(0, 0); setTimeout(resolve, 400); }
    };
    step();
  });
});
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: out, fullPage: full === "1" });
await browser.close();
console.log("saved", out);
