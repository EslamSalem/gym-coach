const imagePicker = document.querySelector("#image-upload-control input");
const imagePreview = document.querySelector("#image-upload-control img");

function updateImagePreview() {
  const selectedImage = imagePicker.files[0];

  if (!selectedImage) {
    imagePreview.style.display = "none";
    return;
  }

  imagePreview.src = URL.createObjectURL(selectedImage);
  imagePreview.style.display = "block";
}

imagePicker.addEventListener("change", updateImagePreview);