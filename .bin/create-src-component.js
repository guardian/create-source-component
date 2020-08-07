#!/usr/bin/env node

const execa = require("execa")
const fs = require("fs")
const fsPromises = fs.promises

const camelize = (s) =>
  s
    .replace(/-./g, (x) => x.toUpperCase()[1])
    .replace(/^./g, (x) => x.toUpperCase()[0])

let packageName = "."
let componentName = "."
let tmpDirectory = "."

if (process.argv.length >= 3) {
  packageName = process.argv[2]
  componentName = camelize(packageName)
  tmpDirectory = `tmp-${packageName}`
  if (!fs.existsSync(tmpDirectory)) {
    fs.mkdirSync(tmpDirectory)
  }
}

const replacePackageName = () => {
  const files = [
    "index.tsx",
    "package.json",
    "README.md",
    "rollup.config.js",
    "styles.ts",
    "stories.tsx",
    "stories/default.tsx",
  ]

  return Promise.all(
    files.map((filename) => {
      return fsPromises
        .readFile(`${packageName}/${filename}`, "utf8")
        .then((contents) => {
          const packageNameRegex = /__PACKAGE_NAME__/g
          const componentNameRegex = /__COMPONENT_NAME__/g
          const replacedContents = contents
            .replace(packageNameRegex, packageName)
            .replace(componentNameRegex, componentName)

          return fsPromises.writeFile(
            `${packageName}/${filename}`,
            replacedContents
          )
        })
    })
  )
}

execa("git", [
  "clone",
  "https://github.com/guardian/create-src-component.git",
  tmpDirectory,
])
  .then(() => execa("cp", ["-r", `${tmpDirectory}/component/.`, packageName]))
  .then(() => execa("rm", ["-rf", tmpDirectory]))
  .then(() => replacePackageName())
  .then(() => {
    console.log(`${packageName} component successfully created`)
  })
  .catch((err) => {
    console.error(`ERROR: ${err}`)
    process.exit(1)
  })
