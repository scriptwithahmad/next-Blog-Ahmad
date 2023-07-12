import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const RichTextEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <div className="richTextEditor">
      <JoditEditor
        ref={editor}
        value={content}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {newContent}}
      />
    </div>
  );
};

export default RichTextEditor;
