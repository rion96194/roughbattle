//敵にダメージを与えた時、一瞬非表示にする関数
function damageimg(){
  setTimeout(function () {
    $("#enemyimg").hide();
    setTimeout(function () {
      $("#enemyimg").show();
    }, 300);
  }, 300);
}

//バトル終了後のステータスを保存する関数
function setparam_retention(){
  //ローカルストレージに保存
  if(my_hp < 0){
    my_hp = 0;
  }
  if(my_mp < 0){
    my_mp = 0;
  }

  localStorage.setItem("c_level_sta", my_level);
  localStorage.setItem("c_hp_sta", my_hp);
  localStorage.setItem("c_mp_sta", my_mp);
  localStorage.setItem("c_attack_sta", my_attack);
  localStorage.setItem("c_defence_sta", my_defence);
  localStorage.setItem("c_magicattack_sta", my_magicattack);
  localStorage.setItem("c_magicdefence_sta", my_magicdefence);
  localStorage.setItem("c_speed_sta", my_speed);
}

//バトルに勝った時のテキスト表示
function battlewin(){
  resultstr = "次はどうする？" + "\n" + "\n" + "<a href='battle.html'>次の戦いへ</a>";
  resultstr = resultstr + "\n" + "\n" + "<a href='character.html'>戻る</a>"
  resultstr = resultstr.replace(/\n/g,"<br>");
  document.getElementById("tb_result").innerHTML = resultstr;
}

//バトルに負けた後のテキスト表示
function battlelose(){
  resultstr = "次はどうする？" + "\n" + "\n" + "<a href='character.html'>戻る</a>";
  resultstr = resultstr + "\n" + "\n" + "<a href='job.html'>キャラクター選択画面へ(最初から)</a>"
  resultstr = resultstr.replace(/\n/g,"<br>");
  document.getElementById("tb_result").innerHTML = resultstr;
}
