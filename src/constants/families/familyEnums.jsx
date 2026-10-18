export const relationToFamilyOptions = [
  { id: 1, name: 'Father', label: 'أب' },
  { id: 2, name: 'Mother', label: 'أم' },
  { id: 3, name: 'Husband', label: 'زوج' },
  { id: 4, name: 'Wife', label: 'زوجة' },
  { id: 5, name: 'Son', label: 'ابن' },
  { id: 6, name: 'Daughter', label: 'ابنة' },
];

export const maritalStatusOptions = [
  { id: 1, name: 'Single', label: 'أعزب' },
  { id: 2, name: 'Married', label: 'متزوج' },
  { id: 3, name: 'Divorced', label: 'مطلق' },
  { id: 4, name: 'Widowed', label: 'أرمل' },
];

export const educationStatusOptions = [
  { id: 1, name: 'PrimaryOrPreparatory', label: 'ابتدائي أو إعدادي' },
  { id: 2, name: 'SecondaryOrUniversity', label: 'ثانوي أو جامعي' },
  { id: 3, name: 'NoEducation', label: 'بدون تعليم' },
];

export const genderOptions = [
  { id: 1, name: 'Male', label: 'ذكر' },
  { id: 2, name: 'Female', label: 'أنثى' },
];

export const genderObj= {
  "Male": "ذكر",
  "Female": "أنثى"
}

export const educationStatusObj= {
  "PrimaryOrPreparatory": "ابتدائي أو إعدادي",
  "SecondaryOrUniversity": "ثانوي أو جامعي",
  "NoEducation": "بدون تعليم"
}


export const relationToFamiltObj= {
  "Father": "أب",
  "Mother": "أم",
  "Husband": "زوج",
  "Wife": "زوجة",
  "Son": "ابن",
  "Daughter": "ابنة"
}


export const maritalStatusObj= {
  "Single": "أعزب",
  "Married": "متزوج",
  "Divorced": "مطلق",
  "Widowed": "أرمل"
}









export const getRelationToFamilyLabel = (id) => {
  const option = relationToFamilyOptions.find((opt) => opt.id === id);
  return option ? option.label : '';
};

export const getMaritalStatusLabel = (id) => {
  const option = maritalStatusOptions.find((opt) => opt.id === id);
  return option ? option.label : '';
};

export const getEducationStatusLabel = (id) => {
  const option = educationStatusOptions.find((opt) => opt.id === id);
  return option ? option.label : '';
};

export const getGenderLabel = (id) => {
  const option = genderOptions.find((opt) => opt.id === id);
  return option ? option.label : '';
};