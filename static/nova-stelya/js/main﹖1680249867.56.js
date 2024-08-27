$(document).on('click', '#menu',  function(){
  	$('#hnav').toggle('show');
  	$('.menubtn').hide();
  	$('.phonebtn').hide();
  	$('.menux').show();
});

$(document).on('click', '#call',  function(){
  	$('#callbox').toggle('show');
  	$('.menubtn').hide();
  	$('.phonebtn').hide();
  	$('.menux').show();
});

$(document).on('click', '#close',  function(){
  	$('#hnav:visible').toggle('hide');
  	$('#callbox:visible').toggle('hide');
  	$('.menux').hide();
  	$('.menubtn').show();
  	$('.phonebtn').show();
  	
})


$(document).on('click', '#htoc',  function(){
  $('#toc').fadeToggle(750);
});






  // CSRF code
  function getCookie(name) {
    var cookieValue = null;
    var i = 0;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (i; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  var csrftoken = getCookie('csrftoken');

  function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }
  $.ajaxSetup({
    crossDomain: false, // obviates need for sameOrigin test
    beforeSend: function(xhr, settings) {
      if (!csrfSafeMethod(settings.type)) {
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
    }
  }); 


////////////////////////////////////////
///// callback form
////////////////////////////////////////
$(document).ready(function(){
  $('#phone').inputmask({"mask": "(999) 999-99-99"}); //specifying options
  
});


$(document).on('submit', 'form#callb_req', function(e) {
    
    
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var phone = $(this).find('#phone').val();
    var isValid = Inputmask.isValid(phone, {"mask": "(999) 999-99-99"});
    
    if (isValid) {

        $.ajax({
               type: 'GET',
               url: "/ajax/phone_submit/",
               dataType: 'json',
               data: {
                'phone' : phone
               }, // serializes the form's elements.
               
               

               success: function(data)
                  {
                    //alert('1');
                    $('form#callb_req').toggle();
                    $('p#success').toggle("slow");
                    setTimeout(function() {
                      UIkit.modal('#callback').hide();
                      $('form#callb_req').show();
                      $('p#success').hide();

                    }, 2000);



                    //console.log('conversion');

                  }
        });
    } else {
      //alert('false');
      $('#phone').toggleClass('borderblink');
    }


});