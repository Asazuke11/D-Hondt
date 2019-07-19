'use strict';

/*********************************
*@param {number} seat:比例区改選数
*********************************/

const seats = 48;

/*************************************************
*@param {Array} party_name: 政党と得票数を入れた配列
*@param {string} name:政党名
*@param {number} counter:議席数カウント用
*@param {number} vetes:得票数
*@param {string} official:正式名
*************************************************/
const party_name = [
  { name: '自民', counter: 0, votes: 20_114_788.264, official: "自由民主党" },
  { name: '民進', counter: 0, votes: 11_751_015.174, official: "民進党" },
  { name: '公明', counter: 0, votes: 7_572_960.308, official: "公明党" },
  { name: '維新', counter: 0, votes: 5_153_584.348, official: "おおさか維新の会" },
  { name: '共産', counter: 0, votes: 6_016_194.559, official: "日本共産党" },
  { name: '社民', counter: 0, votes: 1_536_238.752, official: "社会民主党" },
  { name: '生活', counter: 0, votes: 1_067_300.546, official: "生活の党と山本太郎となかまたち" },
  { name: '日本', counter: 0, votes: 734_024.218, official: "日本のこころを大切にする党" },
  { name: '改革', counter: 0, votes: 580_653.416, official: "新党改革" },
  { name: '怒り', counter: 0, votes: 466_706.136, official: "国民怒りの声" },
  { name: '幸福', counter: 0, votes: 366_815.451, official: "幸福実現党" },
  { name: '支持', counter: 0, votes: 647_071.670, official: "支持政党なし" }
];

/************************************************************
*@param {Map} D_HondtMap:ドント式の計算結果を入れる連想配列
*{{"自民1" => Object}
*key: "自民1"
*value: {D_Hond_result: 20114788.264, official: "自由民主党"}}
*@param {string} key:政党名 + division　(同じ党での上書きを避けるためdivsion文字列追加してます)
*@param {number} division:ドント式で使う除法の係数
*@param {number} value:ドント式計算結果数
************************************************************/
let D_HondtMap = new Map();
for (let i = 0; i < party_name.length; i++) {
  for (let division = 1; division <= seats; division++) {
    D_HondtMap.set(party_name[i].name + division, {

      D_Hond_result: party_name[i].votes / division,
      official: party_name[i].official

    });
  };
};

/********************************************************
*@param {array} rankingArray:
*D_HondtMapを配列に変換、獲得票上位順にソートした物が入る配列
*↓実行後の配列
*[["自民1", 20114788.264],["民進1", 11751015.174],...]
********************************************************/
const rankingArray = Array.from(D_HondtMap)
  .sort((pair1, pair2) => {
    return pair2[1].D_Hond_result - pair1[1].D_Hond_result;
  });

/**********************************************
*各政党の獲得議席をカウント
*innerHTMLに送る変数の値を追加していくfor文
*@param {string} voteList:innerHTMLに送る変数。
***********************************************/
let voteList = ("<p><b>ドント計算内訳</b></p>");

for (let i = 0; i < seats; i++) {
  if (rankingArray[i][0].slice(0, 2) === '自民') {
    party_name[0].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '民進') {
    party_name[1].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '公明') {
    party_name[2].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '維新') {
    party_name[3].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '共産') {
    party_name[4].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '社民') {
    party_name[5].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '生活') {
    party_name[6].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '日本') {
    party_name[7].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '改革') {
    party_name[8].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '怒り') {
    party_name[9].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '幸福') {
    party_name[10].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '支持') {
    party_name[11].counter++;
  }
  voteList += ("<p>" + (i + 1) + "." + rankingArray[i][1].official + "：" + rankingArray[i][1].D_Hond_result + "</p>");
}

/*****************************************************************
*@param {string} seatList:innerHTMLで画面に表示される文字列
*@param {Array} ranking_party_name:counter数で上位順ソート
******************************************************************/
let seatList = ("<p><b>各政党獲得議席</b></p>");

const ranking_party_name = Array.from(party_name)
  .sort((pair1, pair2) => {
    return pair2.counter - pair1.counter;
  });

ranking_party_name.forEach((value, index) => {
  seatList += ("<p>" + value.official + `<br>` + value.counter + "</p><hr>");
});

let list_plain = ("<p><b>開票結果</b></p>");
party_name.forEach((value, index) => {
  list_plain += ("<p>" + value.official + `<br>` + value.votes + "</p><hr>");
});

document.getElementById("seat").innerHTML = `<p><b>第24回参議院議員通常選挙比例区改選数：${seats}</b></p>`;
document.getElementById("list-plain").innerHTML = list_plain;
document.getElementById("list").innerHTML = voteList;
document.getElementById("result-seat").innerHTML = seatList;