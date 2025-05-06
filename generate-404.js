import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

const distPath = resolve('./dist');

try {
  const html = await readFile(`${distPath}/index.html`, 'utf-8');
  await writeFile(`${distPath}/404.html`, html);
  console.log('✅ 404.html successfully created from index.html');
} catch (err) {
  console.error('❌ Failed to generate 404.html:', err);
}
