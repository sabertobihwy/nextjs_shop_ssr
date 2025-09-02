#!/usr/bin/env node
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const names = process.argv.slice(2);
if (names.length === 0) {
    console.error('Usage: pnpm port useCart [useAuth useTheme ...]');
    process.exit(1);
}

const root = process.cwd();
const portsDir = path.join(root, 'host-ports');           // 端口源码（proxy）目录
const outDir = path.join(root, 'public', 'externals');   // 浏览器可访问的 ESM 产物目录
fs.mkdirSync(portsDir, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

// 根据你的项目结构，默认从 src/redux/hooks/<name>.ts 转口
const hookSource = (name) => `./src/redux/hooks/${name}`;

const isValid = (name) => /^use[A-Z]\w*$/.test(name);

(async () => {
    for (const raw of names) {
        const name = raw.trim();
        if (!isValid(name)) {
            console.error(`✖ Invalid hook name: ${name} (expect like "useCart")`);
            continue;
        }

        // 1) 生成 proxy（不存在才写入）
        const proxyPath = path.join(portsDir, `${name}.proxy.ts`);
        if (!fs.existsSync(proxyPath)) {
            const content = `export { ${name} } from '${hookSource(name)}';\n`;
            fs.writeFileSync(proxyPath, content, 'utf8');
            console.log(`• Created ${path.relative(root, proxyPath)}`);
        } else {
            console.log(`• Reusing ${path.relative(root, proxyPath)}`);
        }

        // 2) 构建为浏览器 ESM
        const outfile = path.join(outDir, `${name}.mjs`);
        await build({
            entryPoints: [proxyPath],
            outfile,
            bundle: true,
            format: 'esm',
            platform: 'browser',
            target: ['esnext'],
            minify: true,
            sourcemap: false,
            jsx: 'automatic',
            legalComments: 'none',
            external: ['react', 'react-dom', 'react/jsx-runtime', 'react-redux'],
            banner: { js: '/* eslint-disable */' }, // 👈 加这一行
        });

        console.log(`✔ Built ${path.relative(root, outfile)}`);
        console.log(`   Import map → "@ss/${name}": "/externals/${name}.mjs"\n`);
    }
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
