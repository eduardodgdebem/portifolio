import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

const projectList = await fetch(
  "https://api.github.com/users/eduardodgdebem/repos",
  {
    headers: {
      Authorization: "Bearer " + process.env.GIT_AUTH,
    },
  }
)
  .then((res) => res.json())
  .then((projects) => {
    if (!projects?.length) return;
    return projects
      ?.sort((a, b) => {
        const aDate = new Date(b.updated_at);
        const bDate = new Date(a.updated_at);
        return aDate - bDate;
      })
      .filter((project) => project?.homepage);
  });

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.setViewport({
    width: 1280,
    height: 800,
  });
  

for (let i = 0; i < projectList.length - 1; i++) {
  try {
    const project = projectList[i]
    let url = project.homepage;
    if (!url.startsWith("https://")) url = "https://" + url;

    console.log("============= " + url + " =============");

    await page.goto(url, { waitUntil: "networkidle0" });
    await page.screenshot({
      type: "jpeg",
      path: `./public/images/project-${project.name}.jpeg`,
      quality: 100
    });
  } catch (e) {
    console.log(e);
  }
}

await browser.close();

console.log("========== FINISHED ==========");
