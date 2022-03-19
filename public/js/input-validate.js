$(document).ready(function () {
    var password = $('#password');
    var confirmPassword = $('#confirmPassword');
    var label = $('label[for="confirmPassword"]');

    console.log(password)

    password.keyup(function () {
        console.log(password.val())
        if (password.val() !== confirmPassword.val()) {
            document.getElementById('enviar').disabled = true;
        } else {
            document.getElementById('enviar').disabled = false;
            confirmPassword.css({border: '1px solid #ced4da'});
            label.css({color: 'black'});
        }
    });    

    confirmPassword.keyup(function () {
        if (password.val() !== confirmPassword.val()) {
            document.getElementById('enviar').disabled = true;
            confirmPassword.css({border: '2px solid #dc3545'});
            label.css({color: '#dc3545'});
        } else {
            document.getElementById('enviar').disabled = false;
            confirmPassword.css({border: '1px solid #ced4da'});
            label.css({color: 'black'});
        }
    });
});