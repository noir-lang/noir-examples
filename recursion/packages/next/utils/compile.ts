import { compile, createFileManager } from '@noir-lang/noir_wasm';

export async function getCircuit(name: string) {
  const fm = createFileManager('/');
  const nr = (await fetch(`/api/readCircuitFile?filename=${name}/src/main.nr`))
    .body as ReadableStream<Uint8Array>;
  await fm.writeFile('./src/main.nr', nr);

  const nargoToml = (await fetch(`/api/readCircuitFile?filename=${name}/Nargo.toml`))
    .body as ReadableStream<Uint8Array>;
  await fm.writeFile('./Nargo.toml', nargoToml);

  const result = await compile(fm);
  if (!('program' in result)) {
    throw new Error('Compilation failed');
  }

  return result.program;
}
