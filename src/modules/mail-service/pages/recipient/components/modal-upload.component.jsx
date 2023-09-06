import { Console, Toastify } from "ems-component"
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import recipient from "../../../services/recipient";
import { saveAs } from "file-saver";

const ModalUpload = ({ isOpen, onChange }) => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [isUpload, setIsUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(0);
  const [error, setError] = useState(0);
  const [errorData, setErrorData] = useState([]);
  const [information, setInformation] = useState(false);

  const fileTypes = ["CSV"];
  const downloadFile = () => {
    const url = 'https://staging-upload.identix.events/examples/recipient_example.csv'
    const link = document.createElement("a");
    link.href = url
    link.click();
  }
  const handleChange = (file) => {
    setFile(file);
  };
  const handleError = (err) => {
    Toastify({
      text: err,
      type: 'error'
    });
  }

  const removeFile = () => {
    setFile(null)
  }

  const onUpload = async () => {
    setIsUpload(true)
    const config = {
      onUploadProgress: (progressEvent) => {
        let percentComplete = progressEvent.loaded / progressEvent.total
        percentComplete = parseInt(percentComplete * 100);
        setProgress(percentComplete)
      }
    }
    const formData = new FormData()
    formData.append('recipients_id', isOpen.id)
    formData.append('users', file)

    await recipient.uploadFile(formData, config).then((res) => {
      Toastify({
        text: 'Success, Recipient has been uploaded',
        type: 'success'
      });
      setSuccess(res.data.success)
      setError(res.data.errors)
      setInformation(true)
      setFilename(file.name)
      setFile(null)
      if (res.errors.length > 0) {
        setErrorData(res.errors)
      }
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
    setIsUpload(false)
  }

  useEffect(() => {
    console.log(progress)
  }, [progress])

  const convertToCSV = (arr) => {
    const array = [Object.keys(arr[0])].concat(arr)

    return array.map(it => {
      return Object.values(it).toString()
    }).join('\n')
  }

  const downloadError = () => {
    const errorD = []
    errorData.map((v) => {
      let data = {}
      Object.keys(v.user).map((v2) => {
        data[v2] = v.user[v2]
      })
      errorD.push({
        ...data,
        error: v.error
      })
    })
    const csvContent = "data:text/csv;charset=utf-8," + convertToCSV(errorD)
    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, `${filename.replace('.csv', '')}_upload_failed.csv`)

  }

  return (
    <Console.Dialog
      staticBackdrop={true}
      open={isOpen.modal}
      onClose={() => {
        onChange({ modal: false, id: undefined });
      }}
      size="xl"
    >
      <Console.Dialog.Panel>
        <Console.Dialog.Description className="p-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 border rounded-md p-4">
              <div className="text-lg font-bold text-slate-700">Download template file Excel</div>
              <p></p>
              <div className="mt-4">
                <Console.Button variant="outline-primary" className="px-8" onClick={downloadFile}>
                  Download Template
                </Console.Button>
              </div>
            </div>
            <div className="col-span-8 border rounded-md p-4">
              <div className="text-lg font-bold text-slate-700">Upload file Excel</div>
              <p></p>
              <div className="mt-4">
                <div className="h-[200px] border border-gray-500 border-dashed bg-slate-100 rounded flex flex-col items-center justify-center">
                  {isUpload ? <div className="w-full h-full flex flex-col items-center justify-center relative">
                    <div className="w-20 h-20">
                      <Console.LoadingIcon icon="bars" iconClass='text-primary' />
                    </div>
                    <span className="h-fit text-xl font-bold text-dark">{progress}%</span>
                  </div> :
                    file ? <div className="w-full h-full flex flex-col items-center justify-center relative group">
                      <div className="bg-green-800 p-2 rounded-full">
                        <Console.Lucide icon="FileX2" className="text-white" />
                      </div>
                      {file.name}
                      <div className="w-full h-0 transition-all absolute opacity-0 bg-red-50 flex flex-col justify-center items-center bg-opacity-10 group-hover:h-full group-hover:opacity-100 group-hover:bg-red-500 group-hover:bg-opacity-90 cursor-pointer active:bg-red-600" onClick={removeFile}>
                        <Console.Lucide icon="Trash" className="text-white w-20 h-20 transition-all -rotate-180 group-hover:rotate-0" />
                        <span className="text-white transition-all opacity-0 group-hover:opacity-100">Remove File</span>
                      </div>
                    </div> :
                      <FileUploader classes="!w-full !h-full !max-w-none cursor-pointer" handleChange={handleChange} onTypeError={handleError} name="file" types={fileTypes}>
                        <div className="w-full h-full flex flex-col items-center justify-center">
                          <div className="mb-4">
                            <Console.Lucide icon="UploadCloud" className="w-8 h-8" />
                          </div>
                          <div className="flex gap-4 items-center">
                            <div className="px-4 bg-green-800 hover:bg-green-700 text-white rounded-md py-2 shadow">
                              Select File
                            </div>
                            <span>Or Drag and Drop</span>
                          </div>
                        </div>
                      </FileUploader>
                  }
                </div>
              </div>
            </div>
          </div>
          {information &&
            <div className="mt-4">
              <div className="p-4 mb-4 text-sm border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                <div className="flex items-center gap-2">
                  <Console.Lucide icon="Info" />
                  <span className="font-medium">Upload Information!</span>
                </div>
                <div className="pl-12 mt-2">
                  <ul className="list-disc">
                    <li className="text-green-800">
                      <span className="font-medium">Success</span> {success} items saved successfully.
                    </li>
                    <li className="text-red-800">
                      <span className="font-medium text-red-800">Failed!</span> {error} items failed to save.
                      <span className="ml-1 underline text-red-800 font-medium" onClick={downloadError}>Download</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          }
        </Console.Dialog.Description>
        <Console.Dialog.Footer>
          <Console.Button
            type="button"
            variant="dark"
            className="w-20 mr-1"
            onClick={() => {
              onChange({ modal: false, id: undefined });
              setInformation(false)
              setFilename('')
            }}>
            Close
          </Console.Button>
          <Console.Button
            variant="primary"
            type="button"
            className="px-8"
            onClick={onUpload}
            disabled={isUpload || !file}
            isLoading={isUpload}>
            Upload
          </Console.Button>
        </Console.Dialog.Footer>
      </Console.Dialog.Panel>
    </Console.Dialog>
  )
}

export default ModalUpload
