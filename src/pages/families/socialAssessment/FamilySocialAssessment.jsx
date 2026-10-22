import Empty from '@/appComponents/models/Empty'
import { Button } from '@base-ui/react'
import { Edit, Plus, Trash2 } from 'lucide-react'
import React, { useMemo } from 'react'
import { Link } from 'react-router'

import DeleteModel from '@/components/customUI/DeleteModel'
import { useQueryClient } from '@tanstack/react-query'
import useDeleteSocialAssessment from '@/hooks/socialAssessment/useDeleteSocialAssessment'
import { housingTypeOpts } from '@/constants/socialAssessment/socialAssessmentConst'

/* ------------------------------------------------------------------ */
/*                         Small helpers                              */
/* ------------------------------------------------------------------ */

const money = (v) =>
    v === null || v === undefined || v === '' ? '-' : `${Number(v).toLocaleString('ar-EG')} ج.م`

const date = (v) => (v ? String(v).slice(0, 10) : '-')

const text = (v) => (v === null || v === undefined || v === '' ? '-' : v)

const yesNo = (v) => (v ? 'نعم' : 'لا')

const gridClass = 'grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-3'

const Card = ({ title, children, full = false }) => (
    <div className={`border rounded-md p-3 bg-gray-50 ${full ? 'col-span-full' : ''}`}>
        <h3 className="font-semibold text-lg text-secondary border-b pb-1 mb-2">{title}</h3>
        {children}
    </div>
)

const Row = ({ label, value }) => (
    <div className="flex items-start justify-between gap-3 text-md py-0.5">
        <span className="text-gray-500 shrink-0">{label}</span>
        <span className="font-medium text-left break-wor">{value}</span>
    </div>
)

const None = ({ children }) => <p className="text-md text-gray-500">{children}</p>

const Table = ({ head, children }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
            <thead>
                <tr className="bg-gray-100 text-gray-600">
                    {head.map((h) => (
                        <th key={h} className="px-2 py-1 font-medium whitespace-nowrap">{h}</th>
                    ))}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    </div>
)

const Td = ({ children }) => <td className="px-2 py-1 border-t">{children}</td>

/* ------------------------------------------------------------------ */
/*                           Component                                */
/* ------------------------------------------------------------------ */

const FamilySocialAssessment = ({ socialAssessment, familyId, cases, hasSocialAssessment }) => {

    const queryClient = useQueryClient();
    const { deleteSocialAssessment, isPending: deletePending } = useDeleteSocialAssessment();

    const s = socialAssessment || {};

    const caseName = useMemo(() => {
        const map = {};
        (cases || []).forEach((c) => { map[c.id] = c.name; });
        return (id) => map[id] ?? '-';
    }, [cases]);

    const housingLabel = useMemo(
        () => housingTypeOpts?.find((o) => o.id === s.housingType)?.label ?? text(s.housingType),
        [s.housingType]
    );

    return (
        <section className="social-assessment bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">البحث الاجتماعى للعائله</h2>
                <div className="flex items-center gap-2">
                    {
                        !hasSocialAssessment ?
                            <Link to={`/social-assessment/add`} state={{ cases, familyId }}>
                                <Button variant="outline"
                                    className="gap-2 text-white bg-secondary hover:text-white flex items-center rounded-md cursor-pointer p-2 py-1">
                                    <Plus size={16} /> اضافه بحث اجتماعى
                                </Button>
                            </Link>
                            :
                            <>
                                <DeleteModel
                                    message={'هل انت متأكد من حذف هذا البحث '}
                                    wait={deletePending}
                                    deleteFun={() => {
                                        deleteSocialAssessment(socialAssessment?.id, {
                                            onSuccess: () => {
                                                queryClient.invalidateQueries({ queryKey: ['familyById'] })
                                            }
                                        })
                                    }}
                                >
                                    <Button variant="outline"
                                        className="text-white bg-red-600 flex items-center  hover:text-white gap-2 rounded-md cursor-pointer p-2 py-1"
                                    >
                                        <Trash2 size={16} /> حذف
                                    </Button>
                                </DeleteModel>
                                <Link to={'/social-assessment/add'}
                                    state={{ data: socialAssessment, edit: true, familyId, cases }} >
                                    <Button variant="outline"
                                        className="text-white bg-neutral flex items-center  hover:text-white gap-2 rounded-md cursor-pointer p-2 py-1"
                                    >
                                        <Edit size={16} /> تعديل
                                    </Button>
                                </Link>
                            </>
                    }
                </div>
            </div>

            {
                !hasSocialAssessment ?
                    (<Empty text={'هذه العائله ليس لديها بحث اجتماعى'} />)
                    :
                    <div className={gridClass}>

                        <Card title="المعاش">
                            {s.hasPension ? (
                                <>
                                    <Row label="النوع" value={text(s.pensionType)} />
                                    <Row label="القيمة" value={money(s.pensionAmount)} />
                                </>
                            ) : <None>لا يوجد معاش</None>}
                        </Card>

                        <Card title="الممتلكات">
                            {s.hasProperties
                                ? <p className="text-sm">{text(s.propertiesDetails)}</p>
                                : <None>لا توجد ممتلكات</None>}
                        </Card>

                        <Card title="الأقارب الميسورين">
                            {s.hasWellOffRelatives
                                ? <Row label="صلة القرابة" value={text(s.wellOffRelativesRelationship)} />
                                : <None>لا يوجد أقارب ميسورين</None>}
                        </Card>

                        <Card title="الوصول للمتبرعين">
                            {s.canReachDonors
                                ? <p className="text-sm">{text(s.donorsAccessNotes)}</p>
                                : <None>لا يستطيع الوصول إلى متبرعين</None>}
                        </Card>

                        <Card title="المساعدات الخارجية">
                            {s.receivesExternalAid
                                ? <p className="text-sm">{text(s.externalAidDetails)}</p>
                                : <None>لا يتلقى مساعدات خارجية</None>}
                        </Card>

                        <Card title="السكن">
                            <Row label="النوع" value={housingLabel} />
                            {s.housingType === 'Rented' && (
                                <Row label="الإيجار" value={money(s.rentAmount)} />
                            )}
                        </Card>

                        <Card title="العلاج الطبي">
                            <Row label="العلاج المطلوب" value={text(s.requiredMedicalTreatment)} />
                            <Row label="التكلفة" value={money(s.medicalTreatmentCost)} />
                        </Card>

                        <Card title="الإنفاق">
                            {s.hasExcessiveSpending
                                ? <p className="text-sm">{text(s.spendingNotes)}</p>
                                : <None>لا يوجد إنفاق مفرط</None>}
                        </Card>

                        <Card title="العمل والسلوك">
                            <Row label="القدرة على العمل" value={text(s.providerWorkCapacity)} />
                            <Row label="مهنته التسول" value={yesNo(s.isBeggingProfession)} />
                            <Row label="يدخن" value={yesNo(s.isSmoking)} />
                        </Card>

                        <Card title="الديون" full>
                            {s.hasDebt && s.debts?.length > 0 ? (
                                <Table head={['المدين', 'السبب', 'المبلغ', 'الدائن', 'حالة السداد']}>
                                    {s.debts.map((d, i) => (
                                        <tr key={d.id ?? i}>
                                            <Td>{caseName(d.debtorCaseId)}</Td>
                                            <Td>{text(d.debtReason)}</Td>
                                            <Td>{money(d.debtAmount)}</Td>
                                            <Td>{text(d.creditor)}</Td>
                                            <Td>
                                                {d.isPaid
                                                    ? <span className="text-green-600">تم السداد ({date(d.paidDate)})</span>
                                                    : <span className="text-red-600">غير مسدد</span>}
                                            </Td>
                                        </tr>
                                    ))}
                                </Table>
                            ) : <None>لا توجد ديون</None>}
                        </Card>

                        <Card title="حالات الزواج" full>
                            {s.hasMarriageCase && s.marriageCases?.length > 0 ? (
                                <Table head={['العريس', 'وظيفته', 'مسافر', 'تاريخ الزواج', 'العروسة']}>
                                    {s.marriageCases.map((m, i) => (
                                        <tr key={m.id ?? i}>
                                            <Td>{text(m.groomName)}</Td>
                                            <Td>{text(m.groomJob)}</Td>
                                            <Td>{yesNo(m.isGroomTraveling)}</Td>
                                            <Td>{date(m.marriageDate)}</Td>
                                            <Td>{caseName(m.wifeId)}</Td>
                                        </tr>
                                    ))}
                                </Table>
                            ) : <None>لا توجد حالات زواج</None>}
                        </Card>

                        <Card title="من احضر اسم المستفيد الى الجمعيه">
                            <Row label="الاسم" value={text(s.referrerName)} />
                            <Row label="الهاتف" value={text(s.referrerPhone)} />
                        </Card>

                        <Card title="مصدر البيانات">
                            <Row label="الاسم" value={text(s.dataProviderName)} />
                            <Row label="الصلة" value={text(s.dataProviderRelation)} />
                            <Row label="الهاتف" value={text(s.dataProviderPhone)} />
                        </Card>

                        <Card title="الباحث الاجتماعي">
                            <Row label="الاسم" value={text(s.researcherName)} />
                        </Card>
                    </div>
            }
        </section>
    )
}

export default FamilySocialAssessment