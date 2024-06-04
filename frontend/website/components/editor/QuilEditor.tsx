import React, { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  editable?: boolean;
  content: string;
  onChange:(value:string)=>void;
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     [{ direction: "rtl" }],
//     [{ script: "sub" }, { script: "super" }],
//     [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
//     ["blockquote", "code-block"],
//     ["link", "image", "video", "formula"],
//     [{ size: ["small", false, "large", "huge"] }],
//     [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//     [{ font: [] }],
//     [{ align: [] }],

//     [{ header: 1 }, { header: 2 }],

//     ["clean"],
//   ],
// };

const modules = {
    // 'syntax': true,
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
      [{ 'direction': 'rtl' }], 
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
    //   ["clean"]
    ],
  };
  


const QuilEditor = ({ content, editable = true ,onChange}: Props) => {
  const [value, setValue] = useState(content);
  useEffect(()=>{
    if(onChange){
      onChange(value)
    }
  },[value])
  return (
    <ReactQuill
      theme="snow"
      formats={formats}
      value={value}
      onChange={setValue}
      modules={modules}
      className="overflow-y-auto rounded-md"
    />
  );
};

export default QuilEditor;
