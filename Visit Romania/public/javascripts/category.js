// edit category
$("#editCategoryBtn").click(function (e) {
  $("form").removeAttr("hidden");
  console.log("clicked editCategoryBtn");
});

// edit category
$("#editCategoryForm").submit(function (e) {
  e.preventDefault();

  $(".error-block").remove(); // remove the error text
  $(".success-block").remove(); // remove the succes text

  const title = $("#title").val();
  const description = $("#description").val();
  const file = $("#img")[0].files[0];

  let formData = new FormData();

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
      url: "/category",
      processData: false,
      contentType: false,
      data: formData,
      success: function (data) {
        console.log(data.result);
        if (data.result.title) {
          $("#titleCategory").text(data.result.title);
        }
        if (data.result.description) {
          $("#descriptionCategory").text(data.result.description);
        }
        if (data.result.img) {
          $("#imgCategory").attr(
            "src",
            "/images/categories/" + data.result.img
          );
        }
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

// delete category
$("#deleteCategoryBtn").click(function (e) {
  e.preventDefault();

  $(".error-block").remove(); // remove the error text
  $(".success-block").remove(); // remove the succes text

  $.ajax({
    method: "DELETE",
    url: "/category",
    data: { title },
    success: function (data) {
      console.log(data);
      $("#deleteFormResponse").append(
        '<div class="success-block">Delete successful</div>'
      );
    },
    error: function (err) {
      console.error(err);
      $("#deleteFormResponse").append('<div class="error-block">Error</div>');
    },
  });
});
