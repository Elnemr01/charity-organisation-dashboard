import Layout from '@/appComponents/layout/Layout';
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { addNewFamilyDocument } from '@/constants/schemas/familySchema';
import useAddDocument from '@/hooks/documents/useAddDocument';
import toast from 'react-hot-toast';
import { buildDocumentsFormData } from '@/utlis/formDataHelper';

const AddNewDocument = () => {

    const {id}=useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { addDocument, isPending: addPending } = useAddDocument();


    const initialDocument = useMemo(()=> {
        return {
            File: null,
            Name: null,
        };
    },[])

    const formik = useFormik({
        initialValues: {
            documents: [],
        },
        validationSchema: addNewFamilyDocument,
        onSubmit: (values) => {

        if(values.documents.length === 0 || !values.documents){
            toast.error('برجاء اضافه مرفق واحد علي الاقل');
            return;
        }

        const formData= buildDocumentsFormData(values.documents);
        addDocument({id, data: formData},{
            onSuccess: () => {
                resetData();
            }
        });
            
        },
    });

    const resetData =useCallback(()=> {
        navigate(-1);
        queryClient.invalidateQueries({ queryKey: ['familyById'] });
        formik.resetForm();
    },[]);


    const addDocumentItem = () => {
        formik.setFieldValue('documents', [...formik.values.documents, initialDocument]);
    };

    const removeDocumentItem = (index) => {
        const newItems = formik.values.documents.filter((_, i) => i !== index);
        formik.setFieldValue('documents', newItems);
    };


    return (
        <Layout headerText={'اداره العائلات'}>
            <div className="container pt-10 my-10">
                <div className="flex items-center gap-4 mb-8">
                    <Button onClink={() => navigate(-1)} type="button"
                    className="flex items-center gap-2 text- bg-transparent">
                        <ArrowLeft size={20} />
                        <span>العودة للقائمة</span>
                    </Button>
                </div>

                {/* add form */}
                <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6" dir="rtl">
                    <div className="space-y-4 my-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">اضافه مرفقات للعائله</h3>
                            <Button type="button" variant="outline" onClick={addDocumentItem} className="gap-2">
                                <Plus size={16} /> إضافة مرفق
                            </Button>
                        </div>

                        {
                            formik.values.documents.map((item, index) => (
                                <div key={index} className="border rounded-lg p-4 bg-gray-50 my-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium">صوره #{index + 1}</h4>
                                    <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeDocumentItem(index)}
                                    className="text-red-500 hover:text-red-500"
                                    >
                                    <Trash2 size={16} />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                    <label className="block mb-2">اسم الصوره</label>
                                    <Input
                                    placeholder="اسم الصوره"
                                        {...formik.getFieldProps(`documents[${index}].Name`)}
                                        className={`${formik.touched.documents?.[index]?.Name && formik.errors.documents?.[index]?.Name ? 'border-red-500' : ''} p-2 py-1`}
                                    />
                                    {formik.touched.documents?.[index]?.Name && formik.errors.documents?.[index]?.Name && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.documents[index].Name}</p>
                                    )}
                                    </div>

                                    <div>
                                    <label className="block mb-2">رفع الصوره</label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        name={`documents[${index}].File`}
                                        onChange={(e) =>
                                        formik.setFieldValue(`documents[${index}].File`, e.currentTarget.files[0])
                                        }
                                        onBlur={formik.handleBlur}
                                        className={`cursor-pointer ${
                                        formik.touched.documents?.[index]?.File && formik.errors.documents?.[index]?.File
                                            ? 'border-red-500'
                                            : ''
                                        } p-2 py-1`}
                                    />
                                    {formik.touched.documents?.[index]?.File && formik.errors.documents?.[index]?.File && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.documents[index].File}</p>
                                    )}
                                    </div>
                                </div>
                                </div>
                            ))
                            }

                    </div>

                    <div className="flex items-center justify-end gap-4 pt-4 border-t mt-20">
                        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                            إلغاء
                        </Button>
                        <Button type="submit"
                        disabled={addPending}
                        className="bg-secondary hover:bg-secondary">
                            {
                                addPending ? 'جاري الحفظ...' : 'حفظ'
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default AddNewDocument