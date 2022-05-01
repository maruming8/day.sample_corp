$(function(){

  //wow
  new WOW().init();

  //ドロワーメニュー
  $(".js-drawerIcon").on("click",function(e){
    e.preventDefault();
    $(".p-drawerIcon").toggleClass("is-active");
    $(".p-drawer__bg").toggleClass("is-active");
    $(".p-drawer__menu").toggleClass("is-active");
	  return false;
  });

  //スワイパー
  const mySwiper = new Swiper ('.swiper', {
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 20,
      freeMode: true,
      freeModeSticky: true,
      touchRatio: .03,
      grabCursor: true,
      breakpoints: {
        768: {
          spaceBetween: 40,
        },
      },
  
      //pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
  });
  
  

  //スムーススクロール
    // #から始まるURLがクリックされた時
  $('a[href^="#"]').on('click',function() {
    // .headerクラスがついた要素の高さを取得
    let header = $(".js-header").innerHeight();
    // 移動速度を指定（ミリ秒）
    let speed = 300;
    // hrefで指定されたidを取得
    let id = $(this).attr("href");
    // idの値が#のみだったらターゲットをhtmlタグにしてトップへ戻るようにする
    let target = $("#" == id ? "html" : id);
    // ページのトップを基準にターゲットの位置を取得
    let position = $(target).offset().top;
    // ターゲットの位置までspeedの速度で移動
    if (window.matchMedia('(max-width: 767px)').matches) {
      $("html, body").animate({
        scrollTop: position - header
        },speed
      );} else {
        $("html, body").animate({
          scrollTop: position
          },speed
        );
    }
    return false;
  });

  // スクロール検知
  $(window).on("scroll", function() {
    // トップから100px以上スクロールしたら
    if (100 < $(this).scrollTop()) {
    // is-showクラスをつける
    $('.js-toTop').addClass('is-show');
    } else {
    // 100pxを下回ったらis-showクラスを削除
    $('.js-toTop').removeClass('is-show');
    }
    });

  //ヘッダーナビゲーション
  $('.js-nav').click(function() {
    $(this).removeClass('is-active');
    $(this).addClass('is-active');
    return false;
  });

  //Q & A
  $('.js-question').click(function() {
    $(this).toggleClass('is-active');
    $(this).next().slideToggle();
    $(this).children('.js-answer').toggleClass('is-active');
  });

  $( '.js-question' ).keydown(function (e) {
    if ( e.keyCode == 13 ) {
      $(this).trigger("click");
      return false;
    }
  });

  //form
  $('#js-form').submit(function (event) {
    let formData = $('#js-form').serialize();
    $.ajax({
      url: $('#js-form').attr('action'),
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          $(".is-success").slideDown();
          $("#js-submit").fadeOut();
          //window.location.href = "thanks.html";
        },
        200: function () {
          $(".is-error").slideDown();
        }
      }
    });
    event.preventDefault();
  });

  let $submit = $('#js-submit');
  $('#js-form input, #js-form textarea').on('change', function(){
    if(
      $('#js-form input[name="entry.802820339"]').val() !== "" &&
      $('#js-form input[name="entry.254137370"]').val() !== "" &&
      $('#js-form input[name="entry.1792261356"]').prop('checked') === true
    ){
      $submit.prop('disabled', false)
      //$submit.addClass('is-active')
    } else{
      $submit.prop('disabled', true)
      //$submit.removeClass('is-active')
    }
  });


  //ラジオボタン・チェックポタン

  let radios = $('input:radio'); //要素を取得する
  let checked = $('input:radio:checked').val();   //読み込み時に「:checked」の疑似クラスを持っているinputの値を取得する
  radios.on('click', function(){   //要素がクリックされたら
      if($(this).val() === checked) { //クリックされたinputとcheckedを比較
          $(this).prop('checked', false); //inputの「:checked」をfalse
          checked = ''; //checkedを初期化
      } else {
          $(this).prop('checked', true); //inputの「:checked」をtrue
          checked = $(this).val(); //inputの値をcheckedに代入
      }
    });

  $( 'input:radio,input:checkbox' ).keydown(function (e) {
    if ( e.keyCode == 13 ) {
      $(this).trigger("click");
      return false;
    }
  });

  $('input:radio').on("keydown", function(e) {
    let n = $("input:radio").length;
    if (e.shiftKey) {
      if (e.keyCode == 9) {
        e.preventDefault();
        let Index = $('input:radio').index(this);            // 現在の要素
        let prevIndex = $('input:radio').index(this) - 1;    // 前の要素
        if (prevIndex < 0) {
          $('input:radio')[Index].blur();         // 最後の要素ではフォーカスを外す
        } else {
          $('input:radio')[prevIndex].focus();    // 前の要素へフォーカスを移動
        }
      }
    } else if (e.keyCode == 9) {
        e.preventDefault();
        let Index = $('input:radio').index(this);            // 現在の要素
        let nextIndex = $('input:radio').index(this) + 1;    // 次の要素
        if (nextIndex < n) {
            $('input:radio')[nextIndex].focus();    // 次の要素へフォーカスを移動
        } else {
             $('input:radio')[Index].blur();         // 最後の要素ではフォーカスを外す
        }
    }
    return false;
  });
  
});

