// file upload
import uploadService from "./uploadService";

let inputElement = $("#input");
let uploadButtonElement = $("#button");
let progressReportElement = $("#progressReport");

let filesToUpload = [];

inputElement.addEventListener("onchange", (event) => {
  let files = event.target.files;
  filesToUpload = files;
});

uploadButtonElement.addEventListener("onclick", () => {
  let onProgressReport = (progress) => {
    uploadButtonElement.disabled = true;
    if (progress.done) {
      progressReportElement.innerText = "Done!";
      uploadButtonElement.disabled = false;
    } else if (progress.error) {
      progressReportElement.innerText = "Error :(";
      uploadButtonElement.disabled = false;
    } else if (progress.data) {
      let { completed, total } = data;
      progressReportElement.innerText = `Progress: ${completed}/${total}`;
    }
  };
  uploadService(filesToUpload, onProgressReport);
});
