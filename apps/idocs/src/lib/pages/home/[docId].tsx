import { useCallback, useEffect, useRef, useState } from "react";
import RichTextEditor, {
  type RichTextEditorProps,
  type Editor,
} from "@mantine/rte";
// import {
//   ref as storageRef,
//   uploadBytes,
//   getDownloadURL,
// } from "firebase/storage";
// import { onValue, set } from "firebase/database";
// import { useParams } from "react-router-dom";
// import { useErrorHandler } from "react-error-boundary";
import { saveAs } from "file-saver";
import { Config, generateWord } from "quill-to-word";

// import { storage } from "$lib/modules/firebase";
// import { useAuth } from "$lib/store/auth";
// import { getDocRef } from "$lib/services/database";

type Delta = Exclude<RichTextEditorProps["value"], string>;

const quillToWordConfig: Config = {
  exportAs: "blob",
};

const initialValue =
  "<p>Welcome to <b>iDocs</b>. Remove this text to start editing.</p>";

const DocumentPage = () => {
  const [delta, setDelta] = useState<Delta | string>(initialValue);
  const editorRef = useRef<Editor>(null);
  // const user = useAuth((state) => state.user);
  // const params = useParams<"docId">();
  // const handleError = useErrorHandler();

  // const handleImageUpload = useCallback(
  //   async (file: File) => {
  //     try {
  //       const imageRef = storageRef(storage, `idocs/${user?.uid}/${file.name}`);
  //       await uploadBytes(imageRef, file);

  //       const url = await getDownloadURL(imageRef);
  //       return url;
  //     } catch (error) {
  //       handleError(error);
  //       throw error;
  //     }
  //   },
  //   [user?.uid, handleError]
  // );

  // const handleEditorChange = useCallback<RichTextEditorProps["onChange"]>(
  //   async (str, delta, src, editor) => {
  //     try {
  //       const docDelta = editor.getContents();
  //       if (user?.uid && params.docId)
  //         await set(getDocRef(user?.uid, params.docId), docDelta);
  //     } catch (error) {
  //       handleError(error);
  //     }
  //   },
  //   [user?.uid, params.docId, handleError]
  // );

  const handleSave = useCallback(async () => {
    const delta = editorRef.current?.editor?.getContents();

    const docAsBlob = await generateWord(delta as any, quillToWordConfig);
    saveAs(docAsBlob as Blob, "word-export.docx");
  }, []);

  useEffect(() => {
    editorRef.current?.focus();
  }, []);

  // useEffect(() => {
  //   if (user?.uid && params.docId) {
  //     return onValue(
  //       getDocRef(user?.uid, params.docId),
  //       (snapshot) => {
  //         const docDelta = snapshot.val();
  //         //   editorRef.current?.editor?.setContents(docDelta);
  //         setDelta(docDelta);
  //       },
  //       handleError
  //     );
  //   }
  // }, [user?.uid, params.docId, handleError]);

  return (
    <RichTextEditor
      id="editor-el"
      value={delta}
      onChange={(str, delta, src, editor) => setDelta(editor.getContents())}
      // onImageUpload={handleImageUpload}
      ref={editorRef}
      controls={[
        ["bold", "italic", "underline", "strike"],
        ["h1", "h2", "h3", "h4"],
        ["unorderedList", "orderedList"],
        ["link", "image", "blockquote", "codeBlock"],
        ["sup", "sub"],
        ["alignLeft", "alignCenter", "alignRight"],
      ]}
      sx={(theme) => {
        console.log(theme.colorScheme);
        return {};
      }}
    />
  );
};

export default DocumentPage;
