import toast from "react-hot-toast";


export const addDonationValidate = (values,donationType) => {
        const errors = {};

        if (!values.donorId) {
            errors.donorId = 'اسم المتبرع مطلوب';
        }
        

        if (donationType === 'عينى' || donationType === 'معا') {
            if (!values.donationProductItems || values.donationProductItems.length === 0) {
                // toast.error('يجب إضافة صنف واحد على الأقل للتبرع العيني');
            } else {
                const productItemsErrors = [];
                values.donationProductItems.forEach((item, index) => {
                    const itemErrors = {};
                    if (!item.categoryId) itemErrors.categoryId = 'الصنف مطلوب';
                    if (!item.unitId) itemErrors.unitId = 'الوحدة مطلوبة';
                    if (!item.donationPurposeId) itemErrors.donationPurposeId = 'الغرض مطلوب';
                    if (!item.amount) {
                        itemErrors.amount = 'الكمية مطلوبة';
                    } else if (!/^\d+$/.test(item.amount)) {
                        itemErrors.amount = 'الكمية يجب أن تكون رقمًا صحيحًا';
                    } else if (parseInt(item.amount, 10) <= 0) {
                        itemErrors.amount = 'الكمية يجب أن تكون أكبر من صفر';
                    }
                    if (Object.keys(itemErrors).length > 0) {
                        productItemsErrors[index] = itemErrors;
                    }
                });
                if (productItemsErrors.length > 0) {
                    errors.productItems = productItemsErrors;
                }
            }
        }

        if (donationType === 'نقدى' || donationType === 'معا') {
            if (!values.paymentMethod) {
                errors.paymentMethod = 'طريقة الدفع مطلوبة';
            }
            if (!values.cashAmount) {
                errors.cashAmount = 'المبلغ مطلوب';
            } else if (values.cashAmount <= 0) {
                errors.cashAmount = 'المبلغ يجب أن يكون أكبر من صفر';
            }
            if (!values.cashDonationPurposeId) {
                errors.cashDonationPurposeId = 'غرض التبرع النقدي مطلوب';
            }
            if (!values.cashInventoryType) {
                errors.cashInventoryType = 'نوع الخزنة مطلوب';
            }
        }

        return errors;
    };