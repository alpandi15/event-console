import DropdownFormData from "./Dropdown";
import TextFormData from './Text';
import UploadFormData from "./Upload";

export default function RenderFormType ({type, index}) {
  if (type === 'select' || type === 'checkbox') {
    return <DropdownFormData type={type} index={index} />
  }
  if (type === 'file') {
    return <UploadFormData type={type} index={index} />
  }
  return <TextFormData index={index} />
}