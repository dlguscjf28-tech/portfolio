import {GROUND} from './world-physics.mjs';
import {palettes, type PaletteId} from './palettes';

export function drawWorld(ctx:CanvasRenderingContext2D,world:any,p:any,camera:number,t:number,near:any,collected:Set<number>,images:Map<string,HTMLImageElement>,games:any[],reduced:boolean,paletteId:PaletteId='harbor'){const C=palettes[paletteId];const W=ctx.canvas.width,H=480;ctx.imageSmoothingEnabled=false;const rect=(x:number,y:number,w:number,h:number,c:string)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),w,h)};const text=(v:string,x:number,y:number,size=10,c:string=C.fog)=>{ctx.fillStyle=c;ctx.font=size+'px Galmuri11, monospace';ctx.fillText(v,Math.round(x),Math.round(y))};
// Reset every pixel, including the area between the skyline and the ground.
// Without this full repaint, the moving sprite leaves old pixels behind.
ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';rect(0,0,W,H,C.ink);
// Banded dusk, a finite palette and hand-placed dither between the bands.
const bands=C.bands;bands.forEach((c,i)=>rect(0,i*36,W,37,c));for(let y=32;y<280;y+=36)for(let x=0;x<W;x+=8)rect(x+((y/36|0)%2)*4,y,2,2,bands[Math.max(0,(y/36|0)-1)]);
const mx=W*.76-camera*.035;for(const [off,w] of [[0,58],[6,70],[16,78],[28,82],[40,78],[52,66],[60,50]])rect(mx-w/2,55+off,w,7,off<28?C.moon[0]:C.moon[1]);for(let yy=61;yy<114;yy+=4)for(let xx=mx-37;xx<mx+38;xx+=4)if(((xx+yy)|0)%3===0)rect(xx,yy,1,1,C.rust);
// Far skyline at a slower camera rate.
for(let i=Math.floor(camera*.17/74)-2;i<Math.floor(camera*.17/74)+Math.ceil(W/74)+4;i++){const x=i*74-camera*.17;const h=44+((i*37+117)%7)*13;rect(x,250-h,47,h,C.steel);rect(x+6,240-h,33,10,C.steel);if(i%3===0)rect(x+21,212-h,2,30,'#38474a');for(let row=0;row<h/13-1;row++)for(let col=0;col<3;col++)if((i*7+row*3+col)%5===0)rect(x+7+col*12,260-h+row*13,3,4,'#7a7560')}
rect(0,241,W,2,'#6e6454');rect(0,250,W,1,'#3c4746');
// Warehouses and the repeating elevated rail.
for(let i=Math.floor(camera*.38/290)-1;i<Math.floor(camera*.38/290)+Math.ceil(W/290)+3;i++){const x=i*290-camera*.38;rect(x,254,248,97,C.deep);rect(x+12,261,224,4,C.steel);rect(x+18,278,57,38,C.ink);rect(x+83,278,57,38,C.ink);rect(x+148,278,57,38,C.ink);for(let j=0;j<8;j++)rect(x+19+j*28,276,2,45,C.steel);rect(x+17,317,190,3,C.mint);rect(x+227,264,7,72,C.steel);}
rect(0,349,W,4,'#101c22');for(let i=Math.floor(camera*.65/62)-1;i<Math.floor(camera*.65/62)+Math.ceil(W/62)+3;i++){const x=i*62-camera*.65;rect(x,315,3,40,'#14232b');rect(x,315,62,2,'#334a4b');rect(x,332,62,2,'#293f42')}
ctx.save();ctx.translate(-Math.round(camera),0);
// Physical architecture: continuous walkable floor plus optional upper routes.
rect(0,GROUND,world.width,78,C.deep);rect(0,GROUND,world.width,5,C.amber);rect(0,GROUND+5,world.width,6,C.steel);rect(0,GROUND+20,world.width,2,C.ink);for(let x=Math.max(0,Math.floor(camera/36)*36-36);x<Math.min(world.width,camera+W+36);x+=36){rect(x,GROUND+12,1,9,C.fog);rect(x+4,GROUND+13,24,1,C.steel);rect(x,GROUND+43,30,2,C.steel);rect(x+8,GROUND+61,16,3,C.ink)}
for(let x=Math.max(0,Math.floor(camera/140)*140-140);x<Math.min(world.width,camera+W+140);x+=140){rect(x+6,GROUND-7,18,3,C.light);rect(x+34,GROUND-7,18,3,C.light)}
for(const f of world.platforms.filter((q:any)=>q.y<GROUND&&q.x+q.w>camera-30&&q.x<camera+W+30)){rect(f.x,f.y,f.w,4,C.light);rect(f.x,f.y+4,f.w,f.h-4,C.steel);rect(f.x+6,f.y+f.h,f.w-12,3,C.ink);for(let x=f.x+10;x<f.x+f.w;x+=24)rect(x,f.y+5,7,3,C.amber);rect(f.x+12,f.y+f.h,5,GROUND-f.y-f.h,C.deep);rect(f.x+f.w-17,f.y+f.h,5,GROUND-f.y-f.h,C.deep)}
// Entry gate and architectural details.
rect(28,224,6,GROUND-224,'#3b4e4c');rect(28,224,200,7,'#3b4e4c');rect(222,224,6,GROUND-224,'#3b4e4c');rect(41,242,174,42,'#14242a');rect(42,244,172,1,'#6e8171');rect(101,250,7,25,C.light);rect(124,250,7,25,C.light);rect(108,260,16,6,C.amber);rect(37,357,32,45,'#293c3d');rect(42,361,22,3,C.rust);rect(42,367,22,3,C.rust);text('→',164,367,28,C.amber);
for(let i=0;i<world.stops.length;i++){const s=world.stops[i],x=s.x;if(x<camera-180||x>camera+W+180)continue;const active=near?.id===s.id;const accent=s.kind==='game'?C.mint:s.kind==='empty'?C.fog:C.amber;const game=s.kind==='game'?games[s.index]:null;
// Light mast, overhead label and cable. Each terminal is a real map destination.
rect(x-89,181,4,GROUND-181,C.steel);rect(x-87,181,62,4,C.steel);rect(x-39,186,20,5,accent);rect(x-35,191,12,2,accent);rect(x-57,218,114,21,'#15252b');rect(x-57,218,114,1,'#56695e');text(s.kind==='about'?'소개':s.kind==='contact'?'연락처':s.kind==='empty'?'준비 중':'게임 '+String(s.index+1).padStart(2,'0'),x-47,232,12,C.light);
rect(x-47,GROUND-9,96,9,C.steel);rect(x-40,GROUND-14,82,5,C.fog);rect(x-31,309,62,78,C.deep);rect(x-36,309,72,7,C.fog);rect(x-32,316,64,3,C.steel);rect(x-29,321,58,37,'#0d1c23');rect(x-25,325,50,29,active?'#263e38':'#1a3033');
const img=game?.image?images.get(game.image):null;if(img?.complete&&img.naturalWidth){ctx.save();ctx.beginPath();ctx.rect(x-25,325,50,29);ctx.clip();ctx.drawImage(img,x-25,325,50,29);ctx.restore()}else{for(let yy=0;yy<5;yy++)rect(x-19,331+yy*4,yy%2?27:36,1,active?accent:'#4b6a5d');if(s.kind==='empty'){text('—',x-4,346,12,'#779283')}else if(s.kind==='about'){rect(x-3,331,7,7,accent);rect(x-8,340,17,9,accent)}else if(s.kind==='contact'){ctx.strokeStyle=accent;ctx.strokeRect(x-14,332,28,16);ctx.beginPath();ctx.moveTo(x-14,332);ctx.lineTo(x,341);ctx.lineTo(x+14,332);ctx.stroke()}}
rect(x-22,365,45,4,C.steel);rect(x-23,375,22,3,'#172c30');rect(x+15,373,5,5,accent);if(active){ctx.strokeStyle=accent;ctx.lineWidth=1;ctx.strokeRect(x-38,305,76,85);rect(x-6,287+(reduced?0:Math.sin(t*3)*2),12,3,accent);text('E',x-4,280,10,accent)}
// Station stencil and floor light.
text(String(i+1).padStart(2,'0'),x+50,392,23,C.steel);rect(x-48,GROUND+6,96,2,active?accent:'#4e6658');
}
for(const sig of world.signals){if(collected.has(sig.id))continue;const bob=reduced?0:Math.sin(t*2+sig.id)*2;rect(sig.x-3,sig.y-6+bob,6,12,C.mint);rect(sig.x-6,sig.y-3+bob,12,6,C.mint);rect(sig.x-1,sig.y-2+bob,2,4,'#f0eed2')}
// The traveller: hand-pixelled coat, backpack, visor and a four-frame walk.
const px=Math.round(p.x),py=Math.round(p.y);const phase=p.grounded&&Math.abs(p.vx)>5?Math.floor(p.walk/7)%4:0;const off=[0,2,0,-2][phase];ctx.save();ctx.translate(px+(p.facing<0?p.w:0),py);ctx.scale(p.facing*1.18,1.18);rect(-3,33,26,3,'#142629');rect(1,14,5,13,'#5f7b6e');rect(3,3,14,11,'#d2c7a1');rect(1,5,18,7,'#c4b58e');rect(5,7,14,5,'#1e343c');rect(13,8,5,2,'#c1dfb3');rect(6,14,11,13,'#c0c2aa');rect(6,15,10,3,'#e0ddbe');rect(16,18,4,9,'#95a38c');rect(4,18,4,9,'#9aab91');rect(7,27,5,5+off,'#536d62');rect(14,27,5,5-off,'#536d62');rect(6,31+off,7,3,C.amber);rect(13,31-off,7,3,C.amber);ctx.restore();ctx.restore();
// Restrained vignette, the scene keeps its central readable value range.
const v=ctx.createLinearGradient(0,0,0,H);v.addColorStop(0,'#080d1420');v.addColorStop(.7,'#080d1400');v.addColorStop(1,'#080d1444');ctx.fillStyle=v;ctx.fillRect(0,0,W,H);
}
