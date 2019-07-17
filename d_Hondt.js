'use strict';

/*********************************
*@param {number} seat:比例区改選数
*********************************/
//////////////////
const seats = 48;
//////////////////



/*************************************************
*@param {Array} party_name: 政党と得票数を入れた配列
*@param {string} name:政党名
*@param {number} vetes:得票数
*************************************************/
const party_name = [
  {name:'自民',votes:20_114_788.264},
  {name:'民進',votes:11_751_015.174},
  {name:'公明',votes:7_572_960.308},
  {name:'維新',votes:5_153_584.348},
  {name:'共産',votes:6_016_194.559},
  {name:'社民',votes:1_536_238.752},
  {name:'生活',votes:1_067_300.546},
  {name:'日本',votes:734_024.218},
  {name:'改革',votes:580_653.416},
  {name:'怒り',votes:466_706.136},
  {name:'幸福',votes:366_815.451},
  {name:'支持',votes:647_071.670}
];



/************************************************************
*@param {Map} D_HondtMap:ドント式で計算した結果を入れる連想配列
*@param {string} key:政党名 + division
*@param {number} division:ドント式で使う除法の係数
*@param {number} value:ドント式計算結果数
************************************************************/

let D_HondtMap = new Map();
for (let i = 0; i < party_name.length; i++){
  for(let division = 1; division <= seats ; division++){
    D_HondtMap.set(party_name[i].name + division, party_name[i].votes / division);
  };
};

/*********************************************************************
*@param {array} rankingArray:D_HondtMapを配列に変換、獲得票上位順にソート
**********************************************************************/
const rankingArray = Array.from(D_HondtMap)
.sort((pair1, pair2) => {
  return pair2[1] - pair1[1];
});



//獲得議席数をカウントするオブジェクト
let counter = {
  jimin:0,
  minsyu:0,
  koumei:0,
  isin:0,
  kyousan:0,
  syamin:0,
  seikatu:0,
  nihon:0,
  kaikaku:0,
  ikari:0,
  koufuku:0,
  siji:0
}


let voteList = "";
//獲得議席集計
for (let i = 0; i < seats; i++){
  
  if(rankingArray[i][0].slice(0,2) === '自民'){
    counter.jimin++;
  }
  if(rankingArray[i][0].slice(0,2) === '民進'){
    counter.minsyu++;
  }
  if(rankingArray[i][0].slice(0,2) === '公明'){
    counter.koumei++;
  }
  if(rankingArray[i][0].slice(0,2) === '維新'){
    counter.isin++;
  }
  if(rankingArray[i][0].slice(0,2) === '共産'){
    counter.kyousan++;
  }
  if(rankingArray[i][0].slice(0,2) === '社民'){
    counter.syamin++;
  }
  if(rankingArray[i][0].slice(0,2) === '生活'){
    counter.seikatu++;
  }
  if(rankingArray[i][0].slice(0,2) === '日本'){
    counter.nihon++;
  }
  if(rankingArray[i][0].slice(0,2) === '改革'){
    counter.kaikaku++;
  }
  if(rankingArray[i][0].slice(0,2) === '怒り'){
    counter.ikari++;
  }
  if(rankingArray[i][0].slice(0,2) === '幸福'){
    counter.koufuku++;
  }
  if(rankingArray[i][0].slice(0,2) === '支持'){
    counter.siji++;
  }
  voteList += ("<p>" + (i +1) + "." + rankingArray[i][0].slice(0,2) + "：" + rankingArray[i][1] + "</p>");
}

const counterArray = Object.entries(counter);
const rankingCounterArray = Array.from(counterArray)
.sort((pair1, pair2) => {
  return pair2[1] - pair1[1];
});

console.log(rankingCounterArray);


document.getElementById("list").innerHTML = voteList;
document.getElementById("seat").innerHTML = `<p>比例区改選数<br>${seats}`;

//改選数とカウント総数の確認テスト
let total_seat = 0;
for(let seat in counter){
 total_seat += counter[seat];
}
if(total_seat === seats){
  console.log('改選議席数合計の確認:true');
}else{
  console.log('改選議席数合計の確認:false');
}

//総票数確認テスト//
let total = 0;
Object.keys(party_name).forEach((key) =>{
 total += party_name[key].votes;
})

if((Math.round(total * 1000) /1000) === 56_007_352.842){
// 総務省データが小数点３位で四捨五入してるため↑↑//
// Math.round *1000) / 1000 使用してます    　//
  console.log('総票数確認テスト:true');
}else{
  console.log('総票数確認テスト:false');
}

