mpemptyflg = 0;

function magic(){
  if(mystatusflg == 1 || enemystatusflg == 1){
    return;
  }
  var job = document.getElementById("tb_job").innerHTML;
  //戦士だったら魔法がないポップアップを出す
  if(job == "戦士"){
    //ポップアップ
    popup = "#popup_none_magic";
    $(popup).css("display", "block");
    $.magnificPopup.open({
      items:{src: popup},
      type: 'inline',
    },0);
  }
  else{
    magicpopup();
  }
}

//魔法リストポップアップ
function magicpopup(){
  document.getElementById("mpemptyresult").innerHTML = "";

  popup = "#popup_magic";
  $(popup).css("display", "block");
  $.magnificPopup.open({
    items:{src: popup},
    type: 'inline',
    closeOnBgClick: false,
    showCloseBtn: false,
    closeBtnInside: true,
  });

  //閉じるボタンを押して戻ってきたときのために、オンオフを行っておく
  $(".magicselect").on("click");
  $(".magicselect").off("click");

  $(".magicselect").on("click", function(e){
    // alert($(this).data("magic") + "が押された");
    magicname = $(this).data("magic");
    mpcheck(magicname);
    if(mpemptyflg == 1){
      mpemptyflg = 0;
    }
    else{
      $(".magicselect").off("click");
      e.preventDefault();
      $.magnificPopup.close();
      magicattackfnc(magicname);
    }
  });

  $(".popupclose").on("click", function(e){
    $(".magicselect").on("click");
    $(".magicselect").off("click");
    e.preventDefault();
    $.magnificPopup.close();
  });
}

//魔法攻撃メイン関数
function magicattackfnc(magicname){
  //自キャラと敵の素早さ比較
  if(parseInt(my_speed) > parseInt(e_speed)){
    setTimeout(function(){
      mymagicattack(magicname);
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
        mymagicattack(magicname);
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

function mpcheck(magicname){
  if(magicname == "ファイア"){
    magicpower = 10;
    my_mp = document.getElementById("tb_mp").innerHTML;
    my_mp = my_mp - 2;
    if(my_mp < 0){
      document.getElementById("mpemptyresult").innerHTML = "MPが足りない！";
      mpemptyflg = 1;
      // return magicpopup();
    }
    else{
      document.getElementById("tb_mp").innerHTML = my_mp;
    }
  }
  else if(magicname == "サンダー"){
    magicpower = 20;
    my_mp = document.getElementById("tb_mp").innerHTML;
    my_mp = my_mp - 4;
    if(my_mp < 0){
      document.getElementById("mpemptyresult").innerHTML = "MPが足りない！";
      mpemptyflg = 1;
    }
    else{
      document.getElementById("tb_mp").innerHTML = my_mp;
    }
  }
}

//自キャラ魔法攻撃
function mymagicattack(magicname){
  damage = 0;

  resultstr = "";
  resultstr = e_name + "は　" + magicname + "を唱えた！";

  //ダメージにランダム要素を追加　０～２の乱数生成、０～１の乱数生成 (Math.random() * ( ( max + 1 ) - min ) ) + min)
  var damagernd = Math.floor(Math.random() * ((2 + 1) - 0)) + 0;
  var damageflg = Math.floor(Math.random() * ((1 + 1) - 0)) + 0;
  //フラグが0だったらダメージからマイナス、1だったらダメージにプラスする。
  if(damageflg == 0 && damagernd != 0){
    damage = damage - damagernd;
  }
  else if(damageflg == 1 && damagernd != 0){
    damage = damage + damagernd;
  }

  if(parseInt(my_magicattack) > parseInt(e_magicdefence)){
    //（魔法攻撃＋威力 / 敵魔法防御）　＋ランダムダメージ
    // console.log("defence:" + e_magicdefence);
    // sum = parseInt(my_magicattack) + magicpower
    // console.log("足し算後:" + sum);
    // var division = sum / e_magicdefence;
    // console.log("割り算後:" + division);
    // var num = Math.floor(division) * 100 / 100;
    // console.log("100掛け割る後：" + num);

    damage = damage + Math.floor((parseInt(my_magicattack) + magicpower) / e_magicdefence);
    // console.log("damage：" + damage);
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
    //0～1までの乱数生成
    damage = Math.floor(Math.random() * ((1 + 1) - 0)) + 0;
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
