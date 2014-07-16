$(document).ready(function () {
	$("#login").click(function () {
		$.post("/login", { email: $("#email").val(), password: $("#password").val()}, function (data) {
			if (data === "success") {
				location.reload();
			} else if (data === "fail"){
				alert("wrong");
			}
		});
	});
	$("#logout").click(function () {
		$.ajax({
			url:"/logout",
			method:"post"
		}).done(function () {
			location.reload();
		});
	});
});