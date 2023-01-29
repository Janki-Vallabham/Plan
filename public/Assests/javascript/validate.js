function display_none() {
    document.getElementById("alert1").style.display = "none";
    document.getElementById("alert3").style.display = "none";
    document.getElementById("alert5").style.display = "none";
}
function form_validation() {
    var uname = document.getElementById("username").value;
    var email = document.getElementById("u_email").value;
    var passwd1 = document.getElementById("psswd").value;
    var email_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (uname == "") {
        document.getElementById('alert1').style.display = "block";
        console.log("yo");
        setTimeout(display_none, 3000);
        return false;
    }
    else if (email == "") {
        document.getElementById('alert3').style.display = "block";
        setTimeout(display_none, 3000);
        return false;
    }
    else if (!email_format.test(email)) {
        document.getElementById("alert3").innerHTML = "Invalid email";
        document.getElementById("alert3").style.display = "block";
        setTimeout(display_none, 3000);
        return false;
    }
    else if (passwd1 == "") {
        document.getElementById('alert5').style.display = "block";
        setTimeout(display_none, 3000);
        return false;
    }
    else if (passwd1.length < 6) {
        document.getElementById("alert5").innerHTML = "Should be greater than 6 characters";
        document.getElementById("alert5").style.display = "block";
        setTimeout(display_none, 3000);
        return false;
    }
    else {
        window.alert("Do you want to submit this page");
        return true;
    }

    return true;
}
