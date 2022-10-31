// put all places for the selected category in selectPlace
$("#selectCategory").change(function (e) {
  $("#selectPlace").html("");
  $("#selectPlace").removeAttr("disabled");
  $("#title").removeAttr("disabled");
  $("#description").removeAttr("disabled");
  $("#img").removeAttr("disabled");
  for (const key in titlePlace) {
    if (this.value == key) {
      titlePlace[key].map((item) => {
        $("#selectPlace").append(`<option value="${item}">${item}</option>`);
      });
    }
  }
});

// edit place
$("#editPlaceForm").submit(function (e) {
  e.preventDefault();

  $(".error-block").remove(); // remove the error text
  $(".success-block").remove(); // remove the succes text

  const category = $("#selectCategory option:selected").val();
  const place = $("#selectPlace option:selected").val();
  const title = $("#title").val();
  const description = $("#description").val();
  const file = $("#img")[0].files[0];

  let formData = new FormData();

  formData.append("category", category);
  formData.append("place", place);

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
      url: "/category/place/edit-place",
      processData: false,
      contentType: false,
      data: formData,
      success: function (data) {
        console.log(data.result);
        $("#formResponse").append(
          '<div class="success-block">Update successful</div>'
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

  console.log("submited");
});
