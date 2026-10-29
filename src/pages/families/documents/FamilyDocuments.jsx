import Empty from '@/appComponents/models/Empty'
import React from 'react'
import { Link } from 'react-router'

const FamilyDocuments = ({familyId, documents}) => {
    return (
        <section className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">صور المرفات لهذه العائله</h2>
                <Button variant="outline"
                    className="gap-2 text-white bg-secondary hover:text-white cursor-pointer">
                    <Link to={`/families/${familyId}/documents/add`}>
                        <Plus size={16} /> إضافة مرفقات
                    </Link>
                </Button>
            </div>

            {documents && documents?.length === 0 ? (
                <Empty text={"لا توجد مرفقات لهذه العائله"} />
            ) : (
                <div className="overflow-x-auto">
                    المرفقات
                </div>
            )}
        </section>
    )
}

export default FamilyDocuments