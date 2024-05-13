"use client"; 
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { PartialBlock } from "@blocknote/core";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import {useEdgeStore} from "@/lib/edgestore"
interface EditorProps{
 
    initialContent?:string
    editable?:boolean
    id:Id<"documents">
}
export const Editor = ({initialContent,editable,id}:EditorProps) => {
    const {edgestore} = useEdgeStore()
    const handleUpload = async(file:File) => {
        const response = await edgestore.publicFiles.upload({
            file
        })
        return response.url
    }
   
    const update = useMutation(api.documents.update)
    const editor = useCreateBlockNote({
        initialContent:initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile:handleUpload
    });
    const onChange = () => {
        // Converts the editor's contents from Block objects to Markdown and store to state.
        const markdown = editor.document
        update({
            id:id,
            content:JSON.stringify(markdown,null,2)
        })
    };
 
  // Renders the editor instance using a React component.
    return <BlockNoteView editor={editor} editable={editable} onChange={onChange}/>;
}

