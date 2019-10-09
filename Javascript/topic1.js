class Product{
  
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.checked = false;
  }
}


function clearErrors() {
    //clear form
    //document.getElementById("order_form").reset();
    //clear error messages
    if (document.getElementById("error_phone").style.display === "block") {
      document.getElementById("error_phone").style.display = "none";
    }
    if (document.getElementById("error_cc_num").style.display === "block") {
      document.getElementById("error_cc_num").style.display = "none";
    }
    if (document.getElementById("error_cc_date").style.display === "block") {
      document.getElementById("error_cc_date").style.display = "none";
    }
  }

  function totalPayment() {
    var item_0 = document.getElementById("item_0").checked;
    var item_1 = document.getElementById("item_1").checked;
    var item_2 = document.getElementById("item_2").checked;
    var item_3 = document.getElementById("item_3").checked;

    var price_0 = 6;
    var price_1 = 8;
    var price_2 = 16;
    var price_3 = 6;
    var total_payment = 0;

    //check each item_0-3 if they are checked
    if (item_0) {
      total_payment = total_payment + price_0;
    }
    if (item_1) {
      total_payment = total_payment + price_1;
    }
    if (item_2) {
      total_payment = total_payment + price_2;
    }
    if (item_3) {
      total_payment = total_payment + price_3;
    }
    //each one that is checked add to the total_payment
    //display the total_payment
    document.getElementById("total_payment").innerHTML = total_payment.toFixed(2);

  }
  function validateForm() {
    validatePhone();
    validateNumber();
    validateExpDate();
  }

  function validatePhone() {
         //Phone Validation
    var phone = document.getElementById("phone").value;
    var phonePattern = /^\d{3}[-\/]{0,1}\d{3}[-\/]{0,1}\d{4}$/;

    if (!phonePattern.test(phone)) {
      document.getElementById("error_phone").innerHTML = "Invalid Input. Must be in this format \"208-497-3657\"";
      document.getElementById("phone").focus();
      var correctPhone = false;
    } else {
      document.getElementById("error_phone").innerHTML = "";
      correctPhone = true;
    }
  }

  function validateNumber() {
    //Credit Card Number Validation
    var cc_num = document.getElementById("credit_card").value;
    var ccNum = parseInt(cc_num);

    var ccPattern = /^[0-9]{16}$/;
    if (!ccPattern.test(ccNum)) {
      document.getElementById("error_cc_num").innerHTML = "Invalid Input. Must be 16 digits";

      var correctCC = false;
    } else {
      document.getElementById("error_cc_num").innerHTML = "";
      correctPhone = true;

      window.clearErrors();
    }
  }

  function validateExpDate() {
    //Credit Card Expiration Date Validation
    var exp_date = document.getElementById("exp_date").value;
    var expDatePattern1 = /^(\d\d)[-]{0,1}(\d\d\d\d)$/;
    var expDatePattern2 = /^(\d\d)[\/]{0,1}(\d\d\d\d)$/;

    //Test which seperator is used '/' or '-'
    if (expDatePattern1.test(exp_date)) {
      var pdate = exp_date.split('-');
    } else if (expDatePattern2.test(exp_date)) {
      var pdate = exp_date.split('/');
    } else {
      document.getElementById("error_cc_date").innerHTML =
        "Invalid Input. Must be a valid month(01-12) and year (2020-2030)";
      document.getElementById("exp_date").focus();
      var correctExpDate = false;
    }

    var mm = parseInt(pdate[0], 10);
    var yy = parseInt(pdate[1], 10);

    if (mm > 12) {
      document.getElementById("error_cc_date").innerHTML =
        "Invalid Input. Must be a valid month(01-12) and year (2020-2030)";
      document.getElementById("exp_date").focus();
      var correctExpDate = false;
    } else if (mm < 1) {
      document.getElementById("error_cc_date").innerHTML =
        "Invalid Input. Must be a valid month(01-12) and year (2020-2030)";
      document.getElementById("exp_date").focus();
      var correctExpDate = false;
    } else if (yy < 2020) {
      document.getElementById("error_cc_date").innerHTML =
        "Invalid Input. Must be a valid month(01-12) and year (2020-2030)";
      document.getElementById("exp_date").focus();
      var correctExpDate = false;
    } else {
      document.getElementById("error_cc_date").innerHTML = "";
      clearErrors();
      correctExpDate = true;
    }
  }


  function showCCInfo() {
    var type_cc = document.getElementById("type_cc");

    var cc_info = document.getElementById("credit_card_info");
    if (type_cc.checked) {
      cc_info.style.display = "block";
    }
  }

  function hideCCInfo() {
    var type_cash = document.getElementById("type_cash");
    var type_check = document.getElementById("type_check");
    var cc_info = document.getElementById("credit_card_info");

    if (type_cash.checked || type_check.checked) {
      cc_info.style.display = "none";

    }

  }