import {build} from 'esbuild';
import {mkdir,copyFile} from 'node:fs/promises';
await mkdir('public',{recursive:true});
await build({entryPoints:['src/main.tsx'],bundle:true,minify:true,outfile:'public/app.js',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},loader:{'.css':'css'}});
await copyFile('index.html','public/index.html');
