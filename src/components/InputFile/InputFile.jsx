import './inputFile.scss';
import { useCallback, useEffect, useState } from "react";
import classNames from 'classnames';

export const InputFile = ({
  file,
  setFile,
  isError,
  setIsError,
  isVisited,
  setIsVisited,
}) => {
  const [helpTextFile, setHelpTextFile] = useState('');
  const handleFileChange = useCallback((event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setHelpTextFile('Upload your photo');
      setIsError(true);
      setFile(null);
    }
  }, []);

  const validateSelectedFile = useCallback(() => {
    const MAX_FILE_SIZE = 5120;
    const fileSizeKiloBytes = file?.size / 1024;
    const reader = new FileReader();

    if (!file && isVisited) {
      setHelpTextFile('Upload your photo');
      setIsError(true);
      return
    }

    if (!(file instanceof Blob)) {
      return;
    }

    reader.onload = function (event) {
      const img = new Image();

      img.onload = function () {
        if(img.height < 70 || img.width < 70) {
          setHelpTextFile("Photo resolution less than 70x70px");
          setIsError(true)
          return;
        }
      };
  
      img.src = event.target.result;
    };

    reader.readAsDataURL(file || {});

    if(fileSizeKiloBytes <= MAX_FILE_SIZE){
      setHelpTextFile("File is verified");
      setIsError(false)
      return;
    }
    if(fileSizeKiloBytes > MAX_FILE_SIZE){
      setHelpTextFile("File size is greater than maximum limit");
      setIsError(true)
      return;
    }
  }, [file, isVisited]);

  const handleSetVisited = useCallback(() => {
    setIsVisited(true);
  },[]);

  useEffect(() => {
    validateSelectedFile();
  }, [file, isVisited])

  return (
    <div className={classNames("input-file", 
      { "input-file--error": isError && isVisited })}>
      <label
        htmlFor="file-input"
        className={classNames("input-file__button", 
        { "input-file__button--error": isError && isVisited })}
        onClick={handleSetVisited}
      >
        Upload
      </label>

      <label
        htmlFor="file-input"
        className={classNames("input-file__field",
        { "input-file__field--name": file },
        { "input-file__field--error": isError && isVisited })}
        onClick={handleSetVisited}
      >
        { file?.name ? file?.name : "Upload your photo" }
      </label>

      <input
        className="input-file__hide"
        type="file"
        id="file-input"
        accept="image/jpg, image/jpeg"
        onChange={handleFileChange}
      />
     
      {
        <div className={classNames("input-file__helperText",
          { "input-file__helperText--error": isError && isVisited })}>
          {helpTextFile || ''}
        </div>
      }
    </div>
  )
}
