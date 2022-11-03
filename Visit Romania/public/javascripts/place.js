// edit place
$("#editPlaceBtn").click(function (e) {
  $("form").removeAttr("hidden");
  console.log("clicked editPlaceBtn");
});

// edit on place
$("#editPlaceForm").submit(function (e) {
  e.preventDefault();

  $(".error-block").remove(); // remove the error text
  $(".success-block").remove(); // remove the succes text

  const title = $("#title").val();
  const description = $("#description").val();
  const file = $("#img")[0].files[0];

  let date = new Date().toDateString().split(" ");
  date = `Edited: ${date[2]} ${date[1]} ${date[3]}`;

  let formData = new FormData();
  formData.append("place", titlePlace);
  formData.append("date", date);

  if (title) {
    formData.append("title", title);
  }
  if (description) {
    formData.append("description", description);
  }
  if (file) {
    formData.append("img", file);
  }

  if (title || description || file) {
    $.ajax({
      method: "PATCH",
      url: "/category/place/edit-on-place",
      processData: false,
      contentType: false,
      data: formData,
      success: function (data) {
        console.log(data);
        $("#formResponse").append(
          '<div class="success-block">Update successfully</div>'
        );
      },
      error: function (err) {
        console.error(err);
        $("#formResponse").append('<div class="error-block">Error</div>');
      },
    });
  } else {
    $("#formResponse").append(
      '<div class="error-block">All fields are empty</div>'
    );
  }
});

// delete place
$("#deletePlaceBtn").click(function (e) {
  e.preventDefault();

  $(".error-block").remove(); // remove the error text
  $(".success-block").remove(); // remove the succes text

  $.ajax({
    method: "DELETE",
    url: "/category/place",
    data: { place: titlePlace },
  }).done(() => {
    window.location = "../../";
  });
});
