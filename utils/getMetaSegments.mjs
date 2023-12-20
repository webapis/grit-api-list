import walkSync from "./walkSync.mjs";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

export default function getMetaSegments({folder}) {
  //const unrelatedData =require(path.join(process.cwd(),'data-meta/unrelatedData.json') )

  const files = [];

  walkSync(path.join(process.cwd(), `data-meta/${folder}`), (filepath) => {
    const current = path.parse(filepath).name.split("_");
    if (current.length === 3) {
      files.push(current);
    }
  });

  return files;
}
