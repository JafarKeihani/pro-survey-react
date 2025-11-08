export const personFields = {
    firstName: "",
    lastName: "",
    nationalId: "",
    phone: "",
    address: "",
    username: "",
    password: "",
    role: "",       // admin, user, supervisor
    active: null,        // یا false
};

export const propertyFields = {
    propertyCode: "",
    username: "",
    addressP: "",
    area: "",
    usageType: "", // مسکونی، تجاری، اداری و ...
    ownershipType: "", // سندی، قولنامه‌ای و ...
    coordinates: {
        lat: null,
        lon: null,
    },
};

export const projectFields = {
    projectCode: "",
    projectName: "",
    projectType: "", // نقشه‌برداری، تفکیک، اصلاح، غیره
    startDate: "",
    endDate: "",
    status: "در حال انجام", // یا "تکمیل‌شده" و "در انتظار"
    relatedPerson: null, // ارتباط با person
    relatedProperty: null, // ارتباط با property
};