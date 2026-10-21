export const housingTypeOptions = [
    { id: 'Owned', name: 'ملك' },
    { id: 'Rented', name: 'إيجار' },
    { id: 'Hosted', name: 'سكن عائلي/مستضاف' },
];

export const pensionTypeOptions = [
    { id: 'تكافل وكرامة', name: 'تكافل وكرامة' },
    { id: 'ضمان اجتماعي', name: 'ضمان اجتماعي' },
    { id: 'معاش عسكري', name: 'معاش عسكري' },
    { id: 'معاش مدني', name: 'معاش مدني' },
    { id: 'أخرى', name: 'أخرى' },
];

export const yesNoOptions = [
    { id: true, name: 'نعم' },
    { id: false, name: 'لا' },
];

export const getHousingTypeLabel = (id) => {
    const option = housingTypeOptions.find((opt) => opt.id === id);
    return option ? option.name : '';
};

export const getPensionTypeLabel = (id) => {
    const option = pensionTypeOptions.find((opt) => opt.id === id);
    return option ? option.name : '';
};
