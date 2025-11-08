
export function parseGlobalCoords(coordString) {
  if (!coordString) return null;

  // پشتیبانی از هر دو نوع جداکننده
  const parts = coordString.includes(",")
    ? coordString.split(",")
    : coordString.split("/");

  const [lon, lat] = parts.map((p) => parseFloat(p.trim()));

  // اگر هرکدام NaN بود، یعنی داده معتبر نیست
  if (isNaN(lon) || isNaN(lat)) return null;

  return { lon, lat };
}

// 📄 Summary:
// - فایل SurveyMath.jsx ساخته شد.
// - parseGlobalCoords   به فرمت مختصات استفاده می شود برای تبدیل string  به فرمت مختصات استفاده می شود 
//  وابستگی ندارد و فقط برای تبدیل به فرمت مورد نیاز استفاده می شود
// - نیاز به اضافه کردن بخش های جدید دارد