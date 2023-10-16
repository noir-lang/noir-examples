import { execSync } from "child_process";
import { readFileSync } from "fs";
import { copyFile, readdir, rm, rmdir, unlink } from "fs/promises";
import { extname, resolve } from "path";
import toml from "toml"

async function resolveDependencies() {
    await rm(resolve("dep"), { recursive: true, force: true })

    const depResolution = async (dependency: any) => {
        Object.keys(dependency).map(async (key : any) => {
            const folder = `dep/${key}`;
            execSync(`git clone ${dependency[key].git} ${folder}`)
            execSync(`chmod -R u+rwX ${folder}`)
            const nargoToml = readFileSync(resolve(`${folder}/Nargo.toml`)).toString();
            const { dependencies } = await toml.parse(nargoToml)
            if (dependencies) {
                depResolution(dependencies)
            }
        })
    }

    const nargoToml = readFileSync(resolve(`circuits/Nargo.toml`)).toString();
    const { dependencies } = await toml.parse(nargoToml)
    
    await depResolution(dependencies)

    // let fileExts = 0;
    // const fishNoirFiles = async (dir: string) => {
    //     const files = await readdir(dir, { withFileTypes: true })

    //     for (const file of files) {
    //         if (file.isDirectory()) {
    //             await fishNoirFiles(resolve(dir, file.name))
    //         } else {
    //             if (!file.name.endsWith(".nr")) {
    //                 await rm(resolve(dir, file.name))
    //             } else {
    //                 console.log(fileExts)
    //                 await copyFile(resolve(dir, file.name), resolve(`dep/dep_${fileExts}.nr`))
    //                 fileExts++;
    //             }
    //         }
    //     }
    // }

    // await fishNoirFiles(resolve("dep"))

    // // cleanup empty folders
    // const cleanup = async (dir: string) => {
    //     const files = await readdir(dir, { withFileTypes: true })
    //     for (const file of files) {
    //         if (file.isDirectory()) {
    //             await rm(resolve(dir, file.name), { recursive: true, force: true })
    //         }
    //     }
    // }
    // await cleanup(resolve("dep"))
}

resolveDependencies()
