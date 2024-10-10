"use client";

import { Editor } from "@tinymce/tinymce-react";
import { MutableRefObject, useRef } from "react";
import type { Editor as TinyMCEEditor } from "tinymce";

export default function EditorComponent({
	setContent,
	initContent,
}: {
	setContent: (content: string) => void;
	initContent: string;
}) {
	const handleEditorChange = (content: string) => {
		setContent(content);
	};
	const editorRef = useRef<TinyMCEEditor | null>(null);
	return (
		<Editor
			apiKey="y0f8mrjec8xssg8xszefhpq5y57p2zokazb85hdyqiraw5qm"
			onInit={(evt, editor) => (editorRef.current = editor)}
			initialValue={initContent}
			init={{
				height: 350,
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
			onEditorChange={handleEditorChange}
		/>
	);
}
