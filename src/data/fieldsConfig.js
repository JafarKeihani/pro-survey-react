// 🔹 Users
export const fieldUser = [
    { key: "userName", label: "نام کاربری", type: "text" },
    { key: "password", label: "واژه ورود", type: "password" },
    { key: "active", label: "فعال", type: "boolean" },
    { key: "role", label: "سطح دسترسی", type: "select" }, // admin, user, guest
    { key: "fullName", label: "نام مالک", type: "text" },
    { key: "address", label: "آدرس", type: "text" },
    { key: "ownerPhone", label: "شماره تماس", type: "tel" },
    { key: "status", label: "وضعیت", type: "text" },
    { key: "cityOfUser", label: "شهر محل اقامت", type: "text" },
];

// 🔹 Projects
export const fieldProject = [
    { key: "ownerProject", label: "نام کاربری مالک پروژه", type: "text" },
    { key: "utmCoords", label: "مختصات UTM", type: "text" },
    { key: "globalCoords", label: "مختصات جهانی", type: "text" },
    { key: "allocationDate", label: "تاریخ اختصاص پروژه", type: "date" },
    { key: "finalRegisterDate", label: "تاریخ ثبت نهایی", type: "date" },
    { key: "contractEndDate", label: "تاریخ پایان قرارداد", type: "date" },
    { key: "requestType", label: "نوع درخواست", type: "text" },
    { key: "location", label: "محل احداث", type: "text" },
    { key: "serviceType", label: "نوع خدمات", type: "text" },
    { key: "cityProject", label: "شهر محل پروژه", type: "text" },
];

// 🔹 Nezam
export const fieldNezam = [
    { key: "projectCode", label: "کد رهگیری", type: "iniNumber" },
    { key: "allocationDate", label: "تاریخ اختصاص پروژه", type: "date" },
    { key: "requestType", label: "نوع درخواست", type: "text" },
    { key: "location", label: "محل احداث", type: "text" },
    { key: "serviceType", label: "نوع خدمات", type: "text" },
    { key: "cityProject", label: "شهر محل پروژه", type: "text" },
    { key: "finalRegisterDate", label: "تاریخ ثبت نهایی", type: "date" },
    { key: "coordinator", label: "هماهنگ کننده", type: "text" },
    { key: "coordinatorPhone", label: "شماره تماس هماهنگ کننده", type: "tel" },
    { key: "hasCommitment", label: "آیا تعهد دارد؟", type: "boolean" },
    { key: "allocationBasis", label: "مبنای اختصاص", type: "text" },
    { key: "tariffBasis", label: "مبنای تعرفه", type: "text" },
    { key: "separationBasis", label: "مبنای تفکیک", type: "text" },
    { key: "ceiling", label: "سقف", type: "number" },
    { key: "buildingArea", label: "مساحت زیر بنا", type: "number" },
    { key: "group", label: "گروه", type: "text" },
    { key: "calculatedArea", label: "مساحت محاسبه شده", type: "number" },
    { key: "projectCode", label: "کد رهگیری", type: "text" },
    { key: "workCount", label: "تعداد کار", type: "number" },
    { key: "withdrawal", label: "انصراف", type: "boolean" },
    { key: "absence", label: "عدم حضور", type: "boolean" },
    { key: "release", label: "آزاد سازی", type: "boolean" },
    { key: "releaseDate", label: "تاریخ آزاد سازی", type: "date" },
    { key: "releaseNotes", label: "توضیحات آزاد سازی", type: "text" },
    { key: "contractEndDate", label: "تاریخ پایان قرارداد", type: "date" },
    { key: "projectStatus", label: "وضعیت پروژه", type: "text" },
];
