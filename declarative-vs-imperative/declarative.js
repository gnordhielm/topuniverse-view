// file upload
import uploadService from "./uploadService";

let inputElement = $("#input");
let uploadButtonElement = $("#button");
let progressReportElement = $("#progressReport");

let state = {
  filesToUpload: [],
  didStartUpload: false,
  didFinishUpload: false,
  uploadProgress: {
    completed: 0,
    total: 0,
  },
  hasError: false,
};

let setState = (newState) => {
  // disable button

  if (newState.didStartUpload && !newState.didStartUpload) {
    inputElement.disabled = true;
    uploadButtonElement.disabled = true;
  } else {
    inputElement.disabled = false;
    uploadButtonElement.disabled = false;
  }

  // progress report

  if (newState.hasError) progressReportElement.innerText = "Error :(";
  else if (newState.didFinishUpload) progressReportElement.innerText = "Done!";
  else
    progressReportElement.innerText = `Progress: ${newState.uploadProgress.completed}/${newState.uploadProgress.total}`;

  state = newState;
};

let onProgressReport = (progress) => {
  if (progress.done) {
    setState({
      ...state,
      didFinishUpload: true,
      hasError: false,
      uploadProgress: {
        completed: 0,
        total: 0,
      },
    });
  } else if (progress.error) {
    setState({
      ...state,
      didFinishUpload: true,
      hasError: true,
      uploadProgress: {
        completed: 0,
        total: 0,
      },
    });
  } else if (progress.data) {
    setState({
      ...state,
      didStartUpload: true,
      uploadProgress: progress.data,
    });
  }
};

let onStartUpload = () => {
  uploadService(filesToUpload, onProgressReport);
};

inputElement.addEventListener("onchange", (event) => {
  setState({
    ...state,
    filesToUpload: files,
  });
});

uploadButtonElement.addEventListener("onclick", onStartUpload);
