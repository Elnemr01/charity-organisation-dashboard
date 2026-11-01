import { getFamilyDocumentFn } from '@/services/documents/services';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const useGetDocument = (id) => {
    const {
        data: blob,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['getDocument', id],
        queryFn: () => getFamilyDocumentFn(id),
    });

    const [fileUrl, setFileUrl] = useState(null);

    useEffect(() => {
        if (!blob) {
        setFileUrl(null);
        return;
        }
        const url = URL.createObjectURL(blob);
        setFileUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [blob]);

    return {
        file: blob,
        fileUrl,
        mime: blob?.type,
        isLoading,
        isError,
    };
};

export default useGetDocument;