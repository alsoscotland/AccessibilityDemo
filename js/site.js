$(function() {

  $('#clickable_div, #clickable_button').on('click', function() {
    alert('You just clicked a button-like element');
  });

  $("button.submit").on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
  });

  $("#bad_show_errors, #good_show_errors").on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var form = $(this).closest('form'),
        $inputs = form.find('input, textarea');;

    if (form.hasClass('error-state')) {
      form.toggleClass('error-state');
      if (form.hasClass('good-form')) {
        $inputs.removeAttr('aria-describedby');
        $inputs.removeAttr('aria-invalid');
      }
      return;
    }

    form.toggleClass('error-state');

    if (form.hasClass('good-form')) {

      $inputs.each(function(index, elem){
        var $item = $(elem),
            itemId,
            $error;

        $error = $item.siblings('.error');
        itemId = $item.attr('id');
        $item.attr('aria-describedby', itemId + '_error');
        $item.attr('aria-invalid', true);
      });
      $inputs.first().focus();

    }
  });


});
