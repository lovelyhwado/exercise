function clickSignupBtn () {
	$.post("/signup/add",{
		name:$("#name").val(),
		email:$("#email").val(),
		password:$("#password").val()
	}, function (data) {
		if (data === "dont") {
			alert("aa");
		}
	}).done(function () {
		location.replace('/');
	});
}

function checkDublicateEmail () {
	if ($("#email").val().length <= 5) {
		$("#email").parent().removeClass("has-success");
		$("#email").parent().addClass("has-error");
	} else {
		$.post("/signup/checkmail",{email:$(this).val()}, function (data) {
			if (data === "not duplicated") {
				$("#email").parent().removeClass("has-error");
				$("#email").parent().addClass("has-success");
			} else if (data === "duplicated") {
				$("#email").parent().removeClass("has-success");
				$("#email").parent().addClass("has-error");
			}
		});
	}
}

$(document).ready(function () {
	$("#signup").click(clickSignupBtn);
	$("input").change(function () {
		$("#signup").attr("disabled", "disabled");
		if ($("#email").parent().hasClass("has-success") && $("#name").val().length >= 5 && $("#password").val().length >=5) {
			$("#signup").removeAttr("disabled");
		}
	});
	$("#email").change(checkDublicateEmail);
});