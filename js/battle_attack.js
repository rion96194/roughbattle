var damage = 0;
var mystatusflg = 0;
var enemystatusflg = 0;

//攻撃ボタン押下
function attack(){
  if(mystatusflg == 1 || enemystatusflg == 1){
    return;
  }
  //自キャラと敵の素早さ比較
  if(parseInt(my_speed) > parseInt(e_speed)){
    setTimeout(function(){
      myattack();
      enemystatuscheck();
      if(enemystatusflg == 1){
        return;
      }
      setTimeout(function(){
        enemyattack();
        mystatuscheck();
        if(mystatusflg == 1){
          return;
        }
        setTimeout(function(){
          resultstr = "次はどうする？";
          document.getElementById("tb_result").innerHTML = resultstr;
        }, 2000);
      }, 2000);
    }, 1000);
  }
  else{
    setTimeout(function(){
      enemyattack();
      mystatuscheck();
      if(mystatusflg == 1){
        return;
      }
      setTimeout(function(){
        myattack();
        enemystatuscheck();
        if(enemystatusflg == 1){
          return;
        }
        setTimeout(function(){
          resultstr = "次はどうする？";
          document.getElementById("tb_result").innerHTML = resultstr;
        }, 2000);
      }, 2000);
    }, 1000);
  }
}

//自キャラ攻撃
function myattack(){
  damage = 0;
  resultstr = "";
  resultstr = my_name + "の　こうげき！";

  //ダメージにランダム要素を追加　０～２の乱数生成、０～１の乱数生成(Math.random() * ( ( max + 1 ) - min ) ) + min)
  var damagernd = Math.floor(Math.random() * ((2 + 1) - 0)) + 0;
  var damageflg = Math.floor(Math.random() * ((1 + 1) - 0)) + 0;
  //フラグが0だったらダメージからマイナス、1だったらダメージにプラスする。
  if(damageflg == 0 && damagernd != 0){
    damage = damage - damagernd;
  }
  else if(damageflg == 1 && damagernd != 0){
    damage = damage + damagernd;
  }

  //攻撃と防御を比較
  if(parseInt(my_attack) > parseInt(e_defence)){
    damage = damage + (my_attack - e_defence);
    if(damage <= 0){
      resultstr = resultstr + "\n" + "ミス！　ダメージはあたえられない！";
      resultstr = resultstr.replace(/\n/g,"<br>");
    }
    else{
      resultstr = resultstr + "\n" + damage + "の　ダメージをあたえた！";
      resultstr = resultstr.replace(/\n/g,"<br>");
      damageimg();
    }
    document.getElementById("tb_result").innerHTML = resultstr;
  }
  else{
    //0～2までの乱数生成
    damage = Math.floor(Math.random() * ((2 + 1) - 0)) + 0;
    if(damage <= 0){
      resultstr = resultstr + "\n" + "ミス！　ダメージはあたえられない！";
      resultstr = resultstr.replace(/\n/g,"<br>");
    }
    else{
      resultstr = resultstr + "\n" + damage + "の　ダメージをあたえた！";
      resultstr = resultstr.replace(/\n/g,"<br>");
      damageimg();
    }
    document.getElementById("tb_result").innerHTML = resultstr;
  }
}

//敵キャラ攻撃
function enemyattack(){
  damage = 0;
  resultstr = "";
  resultstr = e_name + "の　こうげき！";

  //ダメージにランダム要素を追加　０～２の乱数生成、０～１の乱数生成(Math.random() * ( ( max + 1 ) - min ) ) + min)
  var damagernd = Math.floor(Math.random() * ((2 + 1) - 0)) + 0;
  var damageflg = Math.floor(Math.random() * ((1 + 1) - 0)) + 0;
  //フラグが0だったらダメージからマイナス、1だったらダメージにプラスする。
  if(damageflg == 0 && damagernd != 0){
    damage = damage - damagernd;
  }
  else if(damageflg == 1 && damagernd != 0){
    damage = damage + damagernd;
  }

  //攻撃と防御を比較
  if(parseInt(e_attack) > parseInt(my_defence)){
    damage = damage + (e_attack - my_defence);
    if(damage <= 0){
      resultstr = resultstr + "\n" + "ミス！　ダメージはうけなかった！";
      resultstr = resultstr.replace(/\n/g,"<br>");
    }
    else{
      resultstr = resultstr + "\n" + damage + "の　ダメージをうけた！";
      resultstr = resultstr.replace(/\n/g,"<br>");
    }
    document.getElementById("tb_result").innerHTML = resultstr;
  }
  else{
    //0～2までの乱数生成
    damage = Math.floor(Math.random() * ((2 + 1) - 0)) + 0;
    if(damage <= 0){
      resultstr = resultstr + "\n" + "ミス！　ダメージはうけなかった！";
      resultstr = resultstr.replace(/\n/g,"<br>");
    }
    else{
      resultstr = resultstr + "\n" + damage + "の　ダメージをうけた！";
      resultstr = resultstr.replace(/\n/g,"<br>");
    }
    document.getElementById("tb_result").innerHTML = resultstr;
  }
}

//自キャラのステータスチェック
function mystatuscheck(){
  my_hp = my_hp - damage;
  if(my_hp <= 0){
    mystatusflg = 1;
    document.getElementById("tb_hp").innerHTML = 0;
    setTimeout(function(){
      resultstr = resultstr + "\n" + "\n" + my_name + "は　たおれた";
      resultstr = resultstr.replace(/\n/g,"<br>");
      document.getElementById("tb_result").innerHTML = resultstr;
      setTimeout(function(){
        resultstr = my_name + "は　やられてしまった・・・";
        resultstr = resultstr.replace(/\n/g,"<br>");
        document.getElementById("tb_result").innerHTML = resultstr;
        setTimeout(function () {
          setparam_retention();
          battlelose();
        }, 2000);
      }, 2000);
    }, 1000);
  }
  else{
    document.getElementById("tb_hp").innerHTML = my_hp;
  }
}

//敵キャラのステータスチェック
function enemystatuscheck(){
  e_hp = e_hp - damage;
  if(e_hp <= 0){
    enemystatusflg = 1;
    setTimeout(function(){
      resultstr = resultstr + "\n" + "\n" + e_name + "は　たおれた";
      resultstr = resultstr.replace(/\n/g,"<br>");
      document.getElementById("tb_result").innerHTML = resultstr;
      //画像フェードアウト
      $("img").fadeOut(2000);
      setTimeout(function(){
        resultstr = e_name + "を　やっつけた！";
        resultstr = resultstr.replace(/\n/g,"<br>");
        document.getElementById("tb_result").innerHTML = resultstr;
        setTimeout(function () {
          setparam_retention();
          battlewin();
        }, 2000);
      }, 2000);
    }, 1000);
  }
}
