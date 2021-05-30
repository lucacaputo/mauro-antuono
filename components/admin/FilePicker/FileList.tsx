import FileEntry from "./FileEntry";

type FileListProps = {
    files: [File, () => void][],
}

const FileList: React.FC<FileListProps> = ({ files }) => {
    return (
        <div className="file_picker_list">
            {
                files.map(f => (
                    <FileEntry key={f[0].name} name={f[0].name} onDelete={f[1]} />
                ))
            }
        </div>
    );
}

export default FileList;