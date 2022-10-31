$("#addCategoryBtn").click(function (e) {
  $("#addCategoryForm").removeAttr("hidden");
  console.log("clicked addCategoryBtn");
});

// submit new category
$("#addCategoryForm").submit(function (e) {
  e.preventDefault();

  $(".error-block").remove(); // remove the error text
  $(".success-block").remove(); // remove the succes text

  const title = $("#title").val();
  const description = $("#description").val();
  const file = $("#img")[0].files[0];

  let formData = new FormData();

  if (!title || !description || !file) {
    $("#formResponse").append(
      '<div class="error-block">All fields are required</div>'
    );
  } else {
    formData.append("title", title);
    formData.append("description", description);
    formData.append("img", file);

    $.ajax({
      method: "POST",
      url: "/category/add-category",
      processData: false,
      contentType: false,
      data: formData,
      success: function (data) {
        console.log(data.result);
        $("#formResponse").append(
          '<div class="success-block">Added new category successful</div>'
        );
      },
      error: function (err) {
        console.error(err);
        $("#formResponse").append('<div class="error-block">Error</div>');
      },
    });
  }

  console.log("submited");
});
