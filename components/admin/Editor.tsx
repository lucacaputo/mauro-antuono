import { Editor } from "@tinymce/tinymce-react";

type SceneEditorProps = {
    title: string,
    onChange: (text: string) => void,
    initial: string,
}

const SectionEditor: React.FC<SceneEditorProps> = ({ title, onChange, initial }) => {
    return (
        <div className="mb-4">
            <h2 className="text-center p-2">{title}</h2>
            <Editor
                initialValue={initial}
                onChange={e => onChange(e.target.getContent())}
                apiKey="smxt4w157gvfatjoq3qyggnnwzpv45a7fwsjr69j64i1fl5y"
                init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic | \
                        alignleft aligncenter alignright | \
                        bullist numlist outdent indent |',
                }}
            />
        </div>
    );
}

export default SectionEditor;