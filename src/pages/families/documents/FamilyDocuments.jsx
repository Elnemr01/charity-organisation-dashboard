import Empty from '@/appComponents/models/Empty'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import DocumentCard from './DocumentCard'

const FamilyDocuments = ({familyId, documents}) => {
    // console.log(documents)
    return (
        <section className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">صور المرفات لهذه العائله</h2>
                <Link to={`/families/${familyId}/documents/add`}>
                <Button variant="outline"
                    className="gap-2 text-white bg-secondary hover:text-white cursor-pointer">
                        <Plus size={16} /> إضافة مرفقات
                </Button>
                    </Link>
            </div>

            {!documents || documents?.length === 0 ? (
                <Empty text={"لا توجد مرفقات لهذه العائله"} />
            ) : (
                <div className="overflow-x-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 ">
                    {
                        documents?.map(((doc)=> <DocumentCard key={doc.id} document={doc} />))
                    }
                </div>
            )}
        </section>
    )
}

export default FamilyDocuments