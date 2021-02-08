var table_all = document.getElementById("table_battle");
var level = 1;
var job = "";
var cname = "";
var hp = mp = attack = defence = magicattack = magicdefence = speed = 0;

//敵情報を格納する二次元配列
var enemystatus = [];

window.onload = function(){
  var jobtype = location.href.split("?")[1];
  if(jobtype == "warrior"){
    job = "戦士"
    localStorage.setItem("c_job", "戦士");
    warrior();
  }
  else if(jobtype == "witch"){
    job = "魔法使い";
    localStorage.setItem("c_job", "魔法使い");
    witch();
  }
  else{
    character_retention();
  }
}

//キャラクター文章表示
function sentenceresult(){
  var sentence = "こんにちは、";
  sentence += localStorage.getItem("c_name");
  sentence += "さん。"
  document.getElementById("tb_ch_result").innerHTML = sentence;
}

//戦士選択
function warrior(){
  //基本能力
  level = 1;
  hp = 10;
  mp = 0;
  attack = 10;
  defence = 8;
  magicattack = 0;
  magicdefence = 5;
  speed = 5;
  gold = 50;
  //戦士用画像を表示
  document.getElementById("mycharaimg").src = "./img/mychara02.png";
  //HP：5～10までの乱数生成(Math.random() * ( ( max + 1 ) - min ) ) + min)
  var hpnum = Math.floor(Math.random() * ((10 + 1) - 5)) + 5;
  //攻撃　1～5までの乱数生成
  var attacknum = Math.floor(Math.random() * ((5 + 1) - 1)) + 1;
  //防御　1~5までの乱数生成
  var defencenum = Math.floor(Math.random() * ((5 + 1) - 1)) + 1;
  //魔法防御　0~2までの乱数生成
  var magicdefencenum = Math.floor(Math.random() * ((2 + 1) - 0)) + 0;
  //素早さ　0～3までの乱数生成
  var speednum = Math.floor(Math.random() * ((3 + 1) - 0)) + 0;
  //基本能力に上乗せ
  hp = hp + hpnum;
  attack = attack + attacknum;
  defence = defence + defencenum;
  magicdefence = magicdefence + magicdefencenum;
  speed = speed + speednum;
  //ローカルストレージに保存（初期値）
  localStorage.setItem("c_level", level);
  localStorage.setItem("c_hp", hp);
  localStorage.setItem("c_mp", mp);
  localStorage.setItem("c_attack", attack);
  localStorage.setItem("c_defence", defence);
  localStorage.setItem("c_magicattack", magicattack);
  localStorage.setItem("c_magicdefence", magicdefence);
  localStorage.setItem("c_speed", speed);
  localStorage.setItem("c_gold", gold);
  //ローカルストレージに保存（パラメータ変動値）
  localStorage.setItem("c_level_sta", level);
  localStorage.setItem("c_hp_sta", hp);
  localStorage.setItem("c_mp_sta", mp);
  localStorage.setItem("c_attack_sta", attack);
  localStorage.setItem("c_defence_sta", defence);
  localStorage.setItem("c_magicattack_sta", magicattack);
  localStorage.setItem("c_magicdefence_sta", magicdefence);
  localStorage.setItem("c_speed_sta", speed);
  setparam();
}

//魔法使い選択
function witch(){
  //基本能力
  level = 1;
  hp = 10;
  mp = 10;
  attack = 5;
  defence = 7;
  magicattack = 10;
  magicdefence = 8;
  speed = 7;
  gold = 50;
  //魔法使い用画像を表示
  document.getElementById("mycharaimg").src = "./img/mychara01.png";
  //HP：0～3までの乱数生成(Math.random() * ( ( max + 1 ) - min ) ) + min)
  var hpnum = Math.floor(Math.random() * ((3 + 1) - 0)) + 0;
  //MP　0～3までの乱数生成
  var mpnum = Math.floor(Math.random() * ((3 + 1) - 0)) + 0;
  //攻撃　0～3までの乱数生成
  var attacknum = Math.floor(Math.random() * ((3 + 1) - 0)) + 0;
  //防御　0~3までの乱数生成
  var defencenum = Math.floor(Math.random() * ((3 + 1) - 0)) + 0;
  //魔法攻撃　1～5までの乱数生成
  var magicattacknum = Math.floor(Math.random() * ((5 + 1) - 1)) + 1;
  //魔法防御　1~3までの乱数生成
  var magicdefencenum = Math.floor(Math.random() * ((3 + 1) - 1)) + 1;
  //素早さ　0～3までの乱数生成
  var speednum = Math.floor(Math.random() * ((3 + 1) - 0)) + 0;
  //基本能力に上乗せ
  hp = hp + hpnum;
  mp = mp + mpnum;
  attack = attack + attacknum;
  defence = defence + defencenum;
  magicattack = magicattack + magicattacknum;
  magicdefence = magicdefence + magicdefencenum;
  speed = speed + speednum;
  //ローカルストレージに保存（初期値）
  localStorage.setItem("c_level", level);
  localStorage.setItem("c_hp", hp);
  localStorage.setItem("c_mp", mp);
  localStorage.setItem("c_attack", attack);
  localStorage.setItem("c_defence", defence);
  localStorage.setItem("c_magicattack", magicattack);
  localStorage.setItem("c_magicdefence", magicdefence);
  localStorage.setItem("c_speed", speed);
  localStorage.setItem("c_gold", gold);
  //ローカルストレージに保存（パラメータ変動値）
  localStorage.setItem("c_level_sta", level);
  localStorage.setItem("c_hp_sta", hp);
  localStorage.setItem("c_mp_sta", mp);
  localStorage.setItem("c_attack_sta", attack);
  localStorage.setItem("c_defence_sta", defence);
  localStorage.setItem("c_magicattack_sta", magicattack);
  localStorage.setItem("c_magicdefence_sta", magicdefence);
  localStorage.setItem("c_speed_sta", speed);
  setparam();
}

//テーブルにパラメータを表示
function setparam(){
  setTimeout(function(){
    document.getElementById("tb_ch_name").innerHTML = localStorage.getItem("c_name");
    document.getElementById("tb_ch_job").innerHTML = job;
    document.getElementById("tb_ch_level").innerHTML = level;
    document.getElementById("tb_ch_hp").innerHTML = hp;
    document.getElementById("tb_ch_mp").innerHTML = mp;
    document.getElementById("tb_ch_attack").innerHTML = attack;
    document.getElementById("tb_ch_defence").innerHTML = defence;
    document.getElementById("tb_ch_magicattack").innerHTML = magicattack;
    document.getElementById("tb_ch_magicdefence").innerHTML = magicdefence;
    document.getElementById("tb_ch_speed").innerHTML = speed;
    document.getElementById("tb_ch_gold").innerHTML = gold;
    //文章表示
    sentenceresult();
  }, 2000);
}

//パラメータを保持したまま戻ってきたときの処理
function character_retention(){
  // var charajob = localStorage.getItem("c_job");
  job = localStorage.getItem("c_job");
  if(job == "戦士"){
    document.getElementById("mycharaimg").src = "./img/mychara02.png";
  }
  else if(job == "魔法使い"){
    document.getElementById("mycharaimg").src = "./img/mychara01.png";
  }
  setTimeout(function(){
    document.getElementById("tb_ch_name").innerHTML = localStorage.getItem("c_name");
    document.getElementById("tb_ch_job").innerHTML = localStorage.getItem("c_job");
    document.getElementById("tb_ch_level").innerHTML = localStorage.getItem("c_level_sta");
    document.getElementById("tb_ch_hp").innerHTML = localStorage.getItem("c_hp_sta");
    document.getElementById("tb_ch_mp").innerHTML = localStorage.getItem("c_mp_sta");
    document.getElementById("tb_ch_attack").innerHTML = localStorage.getItem("c_attack_sta");
    document.getElementById("tb_ch_defence").innerHTML = localStorage.getItem("c_defence_sta");
    document.getElementById("tb_ch_magicattack").innerHTML = localStorage.getItem("c_magicattack_sta");
    document.getElementById("tb_ch_magicdefence").innerHTML = localStorage.getItem("c_magicdefence_sta");
    document.getElementById("tb_ch_speed").innerHTML = localStorage.getItem("c_speed_sta");
    document.getElementById("tb_ch_gold").innerHTML = localStorage.getItem("c_gold");
    //文章表示
    sentenceresult();
  }, 2000);
}
