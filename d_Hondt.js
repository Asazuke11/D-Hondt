'use strict';

/*********************************
*@param {number} seat:比例区改選数
*********************************/

const seats = 48;


/*************************************************
*@param {Array} party_name: 政党と得票数を入れた配列
*@param {string} name:政党名
*@param {number} vetes:得票数
*************************************************/
const party_name = [
  { name: '自民', votes: 20_114_788.264 },
  { name: '民進', votes: 11_751_015.174 },
  { name: '公明', votes: 7_572_960.308 },
  { name: '維新', votes: 5_153_584.348 },
  { name: '共産', votes: 6_016_194.559 },
  { name: '社民', votes: 1_536_238.752 },
  { name: '生活', votes: 1_067_300.546 },
  { name: '日本', votes: 734_024.218 },
  { name: '改革', votes: 580_653.416 },
  { name: '怒り', votes: 466_706.136 },
  { name: '幸福', votes: 366_815.451 },
  { name: '支持', votes: 647_071.670 }
];

/************************************************************
*@param {Map} D_HondtMap:ドント式の計算結果を入れる連想配列
*@param {string} key:政党名 + division　(同じ党での上書きを避けるためdivsion文字列追加してます)
*@param {number} division:ドント式で使う除法の係数
*@param {number} value:ドント式計算結果数
*↓実行後の連想配列
*{"自民1" => 20114788.264, "自民2" => 10057394.132,...}
************************************************************/
let D_HondtMap = new Map();
for (let i = 0; i < party_name.length; i++) {
  for (let division = 1; division <= seats; division++) {
    D_HondtMap.set(party_name[i].name + division, party_name[i].votes / division);
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
    return pair2[1] - pair1[1];
  });

//各党、獲得議席数をカウントするオブジェクト
let counter = {
  jimin: 0,
  minsin: 0,
  koumei: 0,
  isin: 0,
  kyousan: 0,
  syamin: 0,
  seikatu: 0,
  nihon: 0,
  kaikaku: 0,
  ikari: 0,
  koufuku: 0,
  siji: 0
}

/*******************************************************************************
*@param {string} voteList:innerHTMLに送る変数。
*↓これを次々プッシュ。
*"<p>" + (i + 1) + "." + rankingArray[i][0].slice(0, 2) + "：" + rankingArray[i][1] + "</p>";
*  ブラウザ表示　→　1.自民：20114788.264
*******************************************************************************/
let voteList = ("<p><b>ドント計算内訳</b></p>");


/****各政党の獲得議席をカウント
        & innerHTMLに送る変数の値を追加していくfor文**
*==memo==
*rankingArrayの中身
*[["自民1", 20114788.264]...]
*rankingArray[i][0] → "自民1"
*slice(0,2)で"自民"に変換後、if文で該当プロパティに+1。
****************************************************/
for (let i = 0; i < seats; i++) {

  if (rankingArray[i][0].slice(0, 2) === '自民') {
    counter.jimin++;
  }
  if (rankingArray[i][0].slice(0, 2) === '民進') {
    counter.minsin++;
  }
  if (rankingArray[i][0].slice(0, 2) === '公明') {
    counter.koumei++;
  }
  if (rankingArray[i][0].slice(0, 2) === '維新') {
    counter.isin++;
  }
  if (rankingArray[i][0].slice(0, 2) === '共産') {
    counter.kyousan++;
  }
  if (rankingArray[i][0].slice(0, 2) === '社民') {
    counter.syamin++;
  }
  if (rankingArray[i][0].slice(0, 2) === '生活') {
    counter.seikatu++;
  }
  if (rankingArray[i][0].slice(0, 2) === '日本') {
    counter.nihon++;
  }
  if (rankingArray[i][0].slice(0, 2) === '改革') {
    counter.kaikaku++;
  }
  if (rankingArray[i][0].slice(0, 2) === '怒り') {
    counter.ikari++;
  }
  if (rankingArray[i][0].slice(0, 2) === '幸福') {
    counter.koufuku++;
  }
  if (rankingArray[i][0].slice(0, 2) === '支持') {
    counter.siji++;
  }
  //innerHTML用
  //<p>--</p><p>--</p><p>--</p>...
  //ただ後ろに文字列をつなげてるだけ。
  voteList += ("<p>" + (i + 1) + "." + rankingArray[i][0].slice(0, 2) + "：" + rankingArray[i][1] + "</p>");
}


/*****************************************************************
*@param {Array} counterArray:オブジェクト型を配列型に変換(ソートする為)
*@param {Array} rankingCounterArray:各政党別獲得議席数ソート済み配列
******************************************************************/
const counterArray = Object.entries(counter);
const rankingCounterArray = Array.from(counterArray)
  .sort((pair1, pair2) => {
    return pair2[1] - pair1[1];
  });


/*****************************************************************
*@param {string} seatList:innerHTMLで画面に表示される文字列
*for文でプロパティ名を政党の正式名称に変換してseatListへ代入
******************************************************************/
let seatList = ("<p><b>各政党獲得議席</b></p>");
for (let i = 0; i < rankingCounterArray.length; i++) {
  if (rankingCounterArray[i][0] === `jimin`) {
    ;
    seatList += ("<p>自由民主党" + "<br>" + rankingCounterArray[i][1] + "</p><hr>");
  };
  if (rankingCounterArray[i][0] === `minsin`) {
    ;
    seatList += ("<p>民進党" + "<br>" + rankingCounterArray[i][1] + "</p><hr>");
  };
  if (rankingCounterArray[i][0] === `koumei`) {
    ;
    seatList += ("<p>公明党" + "<br>" + rankingCounterArray[i][1] + "</p><hr>");
  };
  if (rankingCounterArray[i][0] === `isin`) {
    ;
    seatList += ("<p>おおさか維新の会" + "<br>" + rankingCounterArray[i][1] + "</p><hr>");
  };
  if (rankingCounterArray[i][0] === `kyousan`) {
    ;
    seatList += ("<p>日本共産党" + "<br>" + rankingCounterArray[i][1] + "</p><hr>");
  };
  if (rankingCounterArray[i][0] === `syamin`) {
    ;
    seatList += ("<p>社会民主党" + "<br>" + rankingCounterArray[i][1] + "</p><hr>");
  };
  if (rankingCounterArray[i][0] === `seikatu`) {
    ;
    seatList += ("<p>生活の党と山本太郎となかまたち" + "<br>" + rankingCounterArray[i][1] + "</p><hr>");
  };
  if (rankingCounterArray[i][0] === `nihon`) {
    ;
    seatList += ("<p>日本のこころを大切にする党" + "<br>" + rankingCounterArray[i][1] + "</p><hr>");
  };
  if (rankingCounterArray[i][0] === `kaikaku`) {
    ;
    seatList += ("<p>新党改革" + "<br>" + rankingCounterArray[i][1] + "</p><hr>");
  };
  if (rankingCounterArray[i][0] === `ikari`) {
    ;
    seatList += ("<p>国民怒りの声" + "<br>" + rankingCounterArray[i][1] + "</p><hr>");
  };
  if (rankingCounterArray[i][0] === `koufuku`) {
    ;
    seatList += ("<p>幸福実現党" + "<br>" + rankingCounterArray[i][1] + "</p><hr>");
  };
  if (rankingCounterArray[i][0] === `siji`) {
    ;
    seatList += ("<p>支持政党なし" + "<br>" + rankingCounterArray[i][1] + "</p><hr>");
  };
};

/*****************************************************************
*@param {string} list_plain:innerHTMLで画面に表示される文字列
*forEachで配列内の name と votes をlist_plainに出力
******************************************************************/
let list_plain = ("<p><b>党派別得票数結果</b></p>");
party_name.forEach((value,index) => {
 list_plain += ("<p>" + value.name + `<br>` + value.votes +"</p><hr>");
});

//値をHTMLへ描画
document.getElementById("list-plain").innerHTML = list_plain;
document.getElementById("list").innerHTML = voteList;
document.getElementById("seat").innerHTML = `<p><b>第24回参議院議員通常選挙<br>比例区改選数：${seats}</b></p>`;
document.getElementById("result-seat").innerHTML = seatList;





//各数値確認テスト//

//改選数と各党獲得議席総数の合致確認テスト
let total_seat = 0;
for (let seat in counter) {
  total_seat += counter[seat];
}
if (total_seat === seats) {
  console.log('改選議席数合計の確認:true');
} else {
  console.log('改選議席数合計の確認:false');
}


//総票数確認テスト//
let total = 0;
Object.keys(party_name).forEach((key) => {
  total += party_name[key].votes;
})

if ((Math.round(total * 1000) / 1000) === 56_007_352.842) {
  // 総務省データが小数点３位で四捨五入してるため↑↑//
  // Math.round *1000) / 1000 使用してます    　//
  console.log('総票数確認テスト:true');
} else {
  console.log('総票数確認テスト:false');
}

