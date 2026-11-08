export const palettes={
  harbor:{name:'블루 · 코럴',ink:'#17243b',deep:'#1d314d',steel:'#425982',fog:'#a4b5cc',amber:'#f7b08f',light:'#f1e3ca',mint:'#a9dfd6',rust:'#b56b78',bands:['#1b2947','#23375b','#304b72','#415f89','#577399','#77869f','#a995a0','#c7a3a4'],moon:['#f5c7a1','#e4a89b'],ui:{bg:'#131c2e',panel:'#1d2c43',text:'#e8eced',muted:'#9cafc3',border:'#354b69',accent:'#b5e1db'}},
  dusk:{name:'자주 · 살구',ink:'#2b203b',deep:'#352844',steel:'#635477',fog:'#c4b2c5',amber:'#ffbda4',light:'#f6e3ce',mint:'#efce9e',rust:'#a56178',bands:['#312442','#3c2c50','#50365e','#69476e','#845679','#a76988','#c38096','#dfa3a7'],moon:['#ffe0ac','#f4bba1'],ui:{bg:'#241d32',panel:'#352840',text:'#f2e7e4',muted:'#b9a6bc',border:'#59425f',accent:'#f3c4ac'}},
  grove:{name:'청록 · 라임',ink:'#153338',deep:'#20434a',steel:'#3d7277',fog:'#a5c8b9',amber:'#f4d38c',light:'#eef0cd',mint:'#b9e4a0',rust:'#9a8c65',bands:['#20464e','#285b60','#397175','#518886','#6d9d95','#8caf9f','#adc3a6','#cfcca3'],moon:['#f8e2a4','#e6c98c'],ui:{bg:'#122b30',panel:'#1c3a3d',text:'#e2eee0',muted:'#99b8ae',border:'#396366',accent:'#c4e0a0'}}
};
export type PaletteId=keyof typeof palettes;
