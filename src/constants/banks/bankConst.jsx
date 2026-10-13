
export const productTablehead = [
    'المعرف',
    'الكميه',
    'الوحده',
    'النوع',
    'الغرض',
    'تاريخ الانشاء',
    'تاريخ اخر تحديث',
    'الاجراءات',
]


export const moneyTablehead = [
    'المعرف',
    'المبلغ (حنيه)',
    'الخزنه',
    'غرض التبرع',
    'تاريخ الانشاء',
    'تاريخ اخر تحديث',
    'الاجراءات',
]


export const moneyInventories = {
    "Charity": 'الجمعيه',
    "Treasurer": 'الامين',
    "Bank": 'البنك'
}


export const moneyInventoryTypes = [
    {
        "id": "Charity",
        "name": 'الحميعيه'
    },
    {
        "id": "Treasurer",
        "name": 'الامين'
    },
    {
        "id": "Bank",
        "name": 'البنك'
    }
]


export const moneyInventoryStyle = {
    "Charity": 'bg-secondary text-white',
    "Treasurer": 'bg-primary text-white',
    "Bank": 'bg-neutral text-white'
}