import React, { useRef, FC } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface Props {
  content: any;
  onChange: any
}

const RichText: FC<Props> = (props) => {
  const editorRef: any = useRef(null);
  const handleEditorChange = () => {
    if (editorRef.current) {
      props.onChange(editorRef.current.getContent())
    }
  };
  
  return (
    <>
      <Editor
        apiKey="vxtjg3p7vmctlzzzhlj5oe592rkglq6tpcsj44doow5sir8b"
        onInit={(evt, editor) => (editorRef.current = editor)}
        onEditorChange={handleEditorChange}
        initialValue={String(props.content)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
};

export default RichText;
