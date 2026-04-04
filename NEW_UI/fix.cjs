const fs = require("fs");
const path = require("path");
const fixes = {
  "Ã£": "ã", "Ã§": "ç", "Ã³": "ó", "Ã¡": "á", "Ã©": "é",
  "Ãª": "ê", "Ãµ": "õ", "Ã­": "í", "Ã‡": "Ç", "Ãƒ": "Ã",
  "Ãº": "ú", "Ã“": "Ó", "Ã‰": "É", "Ã¢": "â", "ÃŠ": "Ê",
  "Ãš": "Ú", "Âº": "º", "ÃŽ": "Î", "Ã´": "ô", "Ã": "í"
};
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if ([".tsx", ".ts", ".py", ".html"].some(ext => p.endsWith(ext))) {
      let content = fs.readFileSync(p, "utf8");
      let modified = content;
      // Also catch Âº which comes up in Python code (13Âº)
      for (const [bad, good] of Object.entries(fixes)) {
        modified = modified.split(bad).join(good);
      }
      if (modified !== content) {
        fs.writeFileSync(p, modified, "utf8");
        console.log("Fixed:", p);
      }
    }
  }
}
walk("./src");
walk("../Export");

