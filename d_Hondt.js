'use strict';

/*************************************************
*@param {number} seat:比例区改選数
*@param {Array} party_name: 政党と得票数を入れた配列
*@param {string} name:政党名
*@param {number} counter:議席数カウント用
*@param {number} vetes:得票数
*@param {Map} D_HondtMap:ドント式の計算結果を入れる連想配列
*{{"自民1" => Object}
*key: "自民1"
*value: {D_Hond_result: 20114788.264, name: "自由民主党"}}
*@param {string} key:政党名 + division　(同じ党での上書きを避けるためdivsion文字列追加してます)
*@param {number} division:ドント式で使う除法の係数
*@param {number} value:ドント式計算結果数

*@param {array} rankingArray:
*D_HondtMapを配列に変換、獲得票上位順にソートした物が入る配列
*実行後の配列
*[["自民1", 20114788.264],["民進1", 11751015.174],...]

*各政党の獲得議席をカウント
*innerHTMLに送る変数の値を追加していくfor文
*@param {string} voteList:innerHTMLに送る変数。

*@param {string} seatList:innerHTMLで画面に表示される文字列
*@param {Array} ranking_party_name:counter数で上位順ソート
**************************************************************/


const seats = 48;
const party_name = [
  { name: '自由民主党', counter: 0, votes: 20_114_788.264 },
  { name: '民進党', counter: 0, votes: 11_751_015.174 },
  { name: '公明党', counter: 0, votes: 7_572_960.308 },
  { name: 'おおさか維新の会', counter: 0, votes: 5_153_584.348 },
  { name: '日本共産党', counter: 0, votes: 6_016_194.559 },
  { name: '社会民主党', counter: 0, votes: 1_536_238.752 },
  { name: '生活の党と山本太郎となかまたち', counter: 0, votes: 1_067_300.546 },
  { name: '日本のこころを大切にする党', counter: 0, votes: 734_024.218 },
  { name: '新党改革', counter: 0, votes: 580_653.416 },
  { name: '国民怒りの声', counter: 0, votes: 466_706.136 },
  { name: '幸福実現党', counter: 0, votes: 366_815.451 },
  { name: '支持政党なし', counter: 0, votes: 647_071.670 },
];

let D_HondtMap = new Map();
for (let i = 0; i < party_name.length; i++) {
  for (let division = 1; division <= seats; division++) {
    D_HondtMap.set(party_name[i].name + division, {
      D_Hond_result: party_name[i].votes / division,
      name: party_name[i].name
    });
  };
};

const rankingArray = Array.from(D_HondtMap)
  .sort((pair1, pair2) => {
    return pair2[1].D_Hond_result - pair1[1].D_Hond_result;
  });


let voteList = ("<p><b>ドント計算内訳</b></p>");
for (let i = 0; i < seats; i++) {
  if (rankingArray[i][0].slice(0, 2) === '自由') {
    party_name[0].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '民進') {
    party_name[1].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '公明') {
    party_name[2].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === 'おお') {
    party_name[3].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '日本') {
    party_name[4].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '社会') {
    party_name[5].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '生活') {
    party_name[6].counter++;
  }
  if (rankingArray[i][0].slice(0, 3) === '日本の') {
    party_name[7].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '新党') {
    party_name[8].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '国民') {
    party_name[9].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '幸福') {
    party_name[10].counter++;
  }
  if (rankingArray[i][0].slice(0, 2) === '支持') {
    party_name[11].counter++;
  }
  voteList += ("<p>" + (i + 1) + "." + rankingArray[i][1].name + "：" + rankingArray[i][1].D_Hond_result + "</p>");
}

let seatList = ("<p><b>各政党獲得議席</b></p>");

const ranking_party_name = Array.from(party_name)
  .sort((pair1, pair2) => {
    return pair2.counter - pair1.counter;
  });

ranking_party_name.forEach((value, index) => {
  seatList += ("<p>" + value.name + `<br>` + value.counter + "</p><hr>");
});

let list_plain = ("<p><b>開票結果</b></p>");
party_name.forEach((value) => {
  list_plain += ("<p>" + value.name + `<br>` + value.votes + "</p><hr>");
});

document.getElementById("seat").innerHTML = `<p><b>第24回参議院議員通常選挙比例区改選数：${seats}</b></p>`;
document.getElementById("list-plain").innerHTML = list_plain;
document.getElementById("list").innerHTML = voteList;
document.getElementById("result-seat").innerHTML = seatList;


//総票数確認テスト//
//　HPで公表されている総票数=56_007_352.842

let total = 0;
party_name.forEach((value) => {
  total += value.votes;
});

if((Math.round(total * 1000) /1000) === 56_007_352.842){
// 総務省データが小数点３位で四捨五入してるため↑↑//
// Math.round *1000) / 1000 使用してます    　//
  console.log('総票数確認テスト:true');
}else{
  console.log('%c総票数確認テスト:false','color: red');
}

//改選数とカウント総数の確認テスト
//改選議席４８
if(48 === seats){
  console.log('改選議席数の確認:true');
}else{
  console.log('%c改選議席数の確認:false','color: red');
}

let total_seat = 0;
party_name.forEach((value) => {
  total_seat += value.counter;
});
if(total_seat === seats){
  console.log('改選議席数合計の確認:true');
}else{
  console.log('%c改選議席数合計の確認:false','color: red');
}