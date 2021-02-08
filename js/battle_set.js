var enemystatusall = [];
var enemystatus = [];
var enemycnt = 0;
var resultstr = "";
var my_name = e_name = "";
var my_level = 1;
var my_hp = my_mp = my_attack = my_defence = my_magicattack = my_magicdefence = my_speed = 0;
var e_hp = e_mp = e_attack = e_defence = e_magicattack = e_magicdefence = e_speed = e_exp = e_gold = 0;

window.onload = function(){
  getenemyCSV();
  paramset();
  enemyset();
}

//敵情報をCSVファイルから取得
function getenemyCSV(){
  var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequest
  req.open("get", "./csv/enemy.csv", true);
  req.send(null); // HTTPリクエストの発行
  //レスポンスが返ってきたら、関数を呼ぶ
  req.onload = function(){
    convertCSVtoArray(req.responseText);
  }
}
function convertCSVtoArray(str){
  var tmp = str.split("\n");
  for(var i=0 ; i<tmp.length ; ++i){
    enemystatusall[i] = tmp[i].split(',');
  }
  console.log(enemystatusall);
  getenemy(enemystatusall);
}
function getenemy(enemystatusall){
  //0～2までの乱数生成
  var num = Math.floor(Math.random() * ((2 + 1) - 0)) + 0;

  for(i=0 ; i<enemystatusall[num].length ; i++){
    enemystatus.push(enemystatusall[num][i]);
  }
}

//自キャラをセット
function paramset(){
  document.getElementById("tb_name").innerHTML = localStorage.getItem("c_name");
  document.getElementById("tb_job").innerHTML = localStorage.getItem("c_job");
  document.getElementById("tb_level").innerHTML = localStorage.getItem("c_level_sta");
  document.getElementById("tb_hp").innerHTML = localStorage.getItem("c_hp_sta");
  document.getElementById("tb_mp").innerHTML = localStorage.getItem("c_mp_sta");
  my_level = localStorage.getItem("c_level_sta");
  my_name = localStorage.getItem("c_name");
  my_hp = localStorage.getItem("c_hp_sta");
  my_mp = localStorage.getItem("c_mp_sta");
  my_attack = localStorage.getItem("c_attack_sta");
  my_defence = localStorage.getItem("c_defence_sta");
  my_magicattack = localStorage.getItem("c_magicattack_sta");
  my_magicdefence = localStorage.getItem("c_magicdefence_sta");
  my_speed = localStorage.getItem("c_speed_sta");
}

//敵をセット
function enemyset(){
  //敵表示
  setTimeout(function(){
    console.log(enemystatus);
    e_name = enemystatus[1];
    e_hp = enemystatus[2];
    e_mp = enemystatus[3];
    e_attack = enemystatus[4];
    e_defence = enemystatus[5];
    e_magicattack = enemystatus[6];
    e_magicdefence = enemystatus[7];
    e_speed = enemystatus[8];
    var enemyimg = document.getElementById("enemyimg");
    enemyimg.src = enemystatus[9];
    e_exp = enemystatus[10];
    e_gold = enemystatus[11];

    resultstr = resultstr + enemystatus[1] + "が　あらわれた！" + "\n" + "\n" + "どうする？";
    resultstr = resultstr.replace(/\n/g,"<br>");
    document.getElementById("tb_result").innerHTML = resultstr;
  }, 2000);
}
