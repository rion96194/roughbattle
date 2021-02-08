var itemname = "";
var hp = mp = hp_sta = mp_sta = 0;

window.onload = function(){
  var sentence = "ああ、君か…" + localStorage.getItem("c_name") + "か。" + "\n" + "\n";
  sentence += "今の所持金は　" + localStorage.getItem("c_gold") + "　ゴールドだぞ。"
  sentence = sentence.replace(/\n/g,"<br>");
  document.getElementById("result").innerHTML = sentence;
}

//メイン
function shop(){
  itemname = $(".itemselect").data("item");
  if(itemname == "全回復"){
    hp = localStorage.getItem("c_hp");
    mp = localStorage.getItem("c_mp");
    hp_sta = localStorage.getItem("c_hp_sta");
    mp_sta = localStorage.getItem("c_mp_sta");
    if(hp == hp_sta && mp == mp_sta){
      hpmp_recovery_none();
    }
    else{
      hpmp_recovery();
    }
  }
}

//買った後
function sentenceresult(){
  var sentence = "「" + itemname + "」、買ってくれたんだな。" + "\n" + "\n";
  sentence += "今の所持金は　" + localStorage.getItem("c_gold") + "　ゴールドだぞ。"
  sentence = sentence.replace(/\n/g,"<br>");
  document.getElementById("result").innerHTML = sentence;
}

//アイテム「全回復」
function hpmp_recovery(){
  popup = "#popup_recovery";
  $(popup).css("display", "block");
  $.magnificPopup.open({
    items:{src: popup},
    type: 'inline',
    closeOnBgClick: false,
    showCloseBtn: false,
    closeBtnInside: true,
  });
  //「いいえ」を押して戻ってきたときのために、オンオフを行っておく
  $(".recoveryselect").on("click");
  $(".recoveryselect").off("click");

  $("#recovery_yes").on("click", function(e){
    var gold = localStorage.getItem("c_gold");
    gold = gold - 10;
    localStorage.setItem("c_hp_sta", hp);
    localStorage.setItem("c_mp_sta", mp);
    localStorage.setItem("c_gold", gold);
    sentenceresult();
    e.preventDefault();
    $.magnificPopup.close();
  });

  $("#recovery_no").on("click", function(e){
    $(".recoveryselect").on("click");
    $(".recoveryselect").off("click");
    e.preventDefault();
    $.magnificPopup.close();
  });
}

//アイテム「全回復」を買わなくていい場合
function hpmp_recovery_none(){
  popup = "#popup_recovery_none";
  $(popup).css("display", "block");
  $.magnificPopup.open({
    items:{src: popup},
    type: 'inline',
    closeOnBgClick: false,
    showCloseBtn: false,
    closeBtnInside: true,
  });
  $("#recovery_none").on("click", function(e){
    $("#recovery_none").on("click");
    $("#recovery_none").off("click");
    e.preventDefault();
    $.magnificPopup.close();
  });
}
