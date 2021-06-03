import { motion } from "framer-motion";
import { useState } from "react";
import useSWR from "swr";
import { API_BASE } from "../../../helpers";

type FileChooserProps = {
    selectedAction: (urls: string[]) => void,
    staticFetchPath: string,
}

type ImagesApiResponse = {
    ok: boolean,
    images: {
        md5: string,
        name: string,
        url: string,
        __v: number,
        _id: string,
    }[],
}

const FileChooser: React.FC<FileChooserProps> = ({ selectedAction, staticFetchPath }) => {
    const { data, mutate, isValidating, error } = useSWR<ImagesApiResponse, any>(API_BASE + staticFetchPath);
    const loading = (!data && !error) || isValidating;
    console.log(data);
    if (data) data.images = !loading ? ([...Array(120).keys()].map(_ => data.images[0])) : [];
    return (
        <>
            <motion.div
                className="chooser_wrapper"
                style={{ paddingLeft: 75, display: 'flex', width: '100%', flexWrap: 'wrap' }}
            >
                {
                    !loading &&
                    data.images.map(i => (
                        <motion.div 
                            key={i.name}
                            style={{
                                width: 50,
                                height: 50,
                                background: `url(${API_BASE}/${i.url}) no-repeat`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                            className="m-2"
                        >

                        </motion.div>
                    ))
                }
            </motion.div>
        </>
    );
}

export default FileChooser;

