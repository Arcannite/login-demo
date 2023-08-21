import Editor from "../../components/editor"

export default function page() {
  
  return (
    <Editor post={{
      id: "",
      postDate: "",
      lastEditDate: "",
      title: "",
      content: "",  
      authorId: ""
    }} mode='create'/>
  )
}