import { fieldUser, fieldProject, fieldNezam } from "./fieldsConfig";

const DB_NAME = "NezamSakhtemanDB";
const DB_VERSION = 1;
// پیکربندی جداول دیتابیس
export const STORES = [
  { name: "users", fields: fieldUser, keyPath: "id" },
  { name: "projects", fields: fieldProject, keyPath: "id" },
  { name: "nezam", fields: fieldNezam, keyPath: "id" },
];
let dbInstance = null;

// ایجاد یا باز کردن دیتابیس
/**
 * ایجاد و یا باز کردن دیتابیس در مرورگر با استفاده از IndexedDB.
 * در صورتی که دیتابیس وجود نداشته باشد، آن را ایجاد می‌کند. همچنین، جداول و ایندکس‌ها را نیز ایجاد می‌کند.
 * @returns {Promise<IDBDatabase>} یک Promise که پس از باز شدن دیتابیس، دیتابیس را برمی‌گرداند.
 * @throws {Error} اگر در هنگام باز کردن دیتابیس خطایی پیش بیاید.
 */
export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      dbInstance = event.target.result;

      console.log("⚙️ ایجاد یا بروزرسانی دیتابیس...");

      // تابع کمکی برای ساخت هر جدول از روی آرایه فیلدها
      const createStore = (storeName, fields, KeyField) => {
        if (!dbInstance.objectStoreNames.contains(storeName)) {
          const store = dbInstance.createObjectStore(storeName, {
            keyPath: "id",
            autoIncrement: true,
          });
          if (KeyField !== "") {
            store.createIndex(KeyField, KeyField, { unique: true });
          }
          // فیلدها فقط به‌صورت کلید در رکوردها ذخیره می‌شن
          fields.forEach((field) => {
            // بررسی می‌کنیم که آیا ایندکس با این نام قبلاً وجود دارد یا نه
            if (
              !store.indexNames.contains(field.key) &&
              !(field.key === KeyField)
            ) {
              store.createIndex(field.key, field.key, { unique: true });
              console.log(
                `✅ ایندکس ${field.key} به جدول ${storeName} اضافه شد`
              );
            } else {
              console.log(`🔄 ایندکس ${field.key} قبلاً موجود است`);
            }
          });

          console.log(`✅ جدول ${storeName} ساخته شد`);
        }
      };

      // ساخت سه جدول بر اساس فیلدها
      createStore("list_users", fieldUser, "userName");
      createStore("list_projects", fieldNezam, "");
      createStore("list-nezams", fieldProject, "projectCode");
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      console.log("✅ دیتابیس با موفقیت باز شد:", DB_NAME);
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.error("❌ خطا در باز کردن دیتابیس:", event.target.error);
      reject(event.target.error);
    };
  });
};

// افزودن رکورد جدید
/**
//  * افزودن یک رکورد جدید به جدول مشخص در دیتابیس.
//  * @param {string} storeName - نام جدول مورد نظر برای افزودن رکورد.
//  * @param {Object} record - شیء رکوردی که باید به جدول افزوده شود.
//  * @returns {Promise<boolean>} یک Promise که پس از موفقیت در افزودن رکورد، `true` و در صورت خطا، `false` را برمی‌گرداند.
//  * @throws {Error} اگر در هنگام افزودن رکورد یا تراکنش خطایی پیش بیاید.
 */
export const addRecord = (storeName, record) => {
  return new Promise(async (resolve) => {
    try {
      // اطمینان از اینکه دیتابیس باز شده
      if (!dbInstance) {
        console.log("📂 دیتابیس باز نشده، تلاش برای باز کردن آن...");
        const opened = await openDB();
        if (!opened || !dbInstance) {
          console.warn("⚠️ خطا در باز کردن دیتابیس. عملیات افزودن انجام نشد.");
          return resolve(false);
        }
      }

      // آغاز تراکنش
      const tx = dbInstance.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const request = store.add(record);

      // موفقیت در افزودن
      request.onsuccess = () => {
        console.log(`✅ رکورد جدید با موفقیت به جدول ${storeName} اضافه شد.`);
        resolve(true);
      };

      // خطا در عملیات add
      request.onerror = (e) => {
        console.error(
          `❌ خطا در افزودن رکورد به ${storeName}:`,
          e.target.error
        );
        resolve(false); // برنامه متوقف نشود
      };

      // خطا در تراکنش کلی
      tx.onerror = (e) => {
        console.error("⚠️ خطا در تراکنش دیتابیس:", e.target.error);
        resolve(false);
      };
    } catch (err) {
      // خطای غیرمنتظره (مثلاً async یا مرورگر)
      console.error("🚫 خطای غیرمنتظره در addRecord:", err);
      resolve(false);
    }
  });
};

// دریافت تمام رکوردها از هر جدول
export const getAllRecords = (storeName) => {
  return new Promise(async (resolve, reject) => {
    try {
      // اگر دیتابیس هنوز باز نشده بود، بازش کن
      if (!dbInstance) {
        const opened = await openDB();
        if (!opened || !dbInstance) {
          console.warn("⚠️ دیتابیس باز نشد یا در دسترس نیست");
          return resolve([]); // برگرداندن آرایه خالی به جای خطا
        }
      }
      // ساخت تراکنش فقط برای خواندن
      const tx = dbInstance.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = (event) => {
        const data = event.target.result || [];
        resolve(data);
      };

      request.onerror = (e) => {
        console.error("❌ خطا در دریافت داده‌ها از", storeName, e);
        resolve([]); // برگرداندن آرایه خالی به جای reject
      };

      tx.onerror = (e) => {
        console.error("⚠️ خطا در تراکنش دیتابیس:", e);
        resolve([]); // باز هم برگردوندن آرایه خالی
      };
    } catch (err) {
      console.error("🚫 خطای غیرمنتظره در getAllRecords:", err);
      resolve([]); // برای پایداری بیشتر reject نمی‌کنیم
    }
  });
};

export const deleteRecord = (storeName, recordId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // اگر دیتابیس هنوز باز نشده، آن را باز کن
      if (!dbInstance) {
        console.log("📂 دیتابیس باز نشده، در حال تلاش برای باز کردن آن...");
        await openDB(); // صدا زدن openDB برای باز کردن دیتابیس
      }
      // شروع تراکنش
      const tx = dbInstance.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const request = store.delete(recordId); // متد delete برای حذف رکورد

      // مدیریت موفقیت
      request.onsuccess = () => {
        console.log(`✅ رکورد با موفقیت از جدول ${storeName} حذف شد.`);
        resolve(true);
      };
      // مدیریت خطا
      request.onerror = (e) => {
        console.error(
          `❌ خطا در حذف رکورد از جدول ${storeName}:`,
          e.target.error
        );
        reject(e);
      };
      // مدیریت خطا در تراکنش
      tx.onerror = (e) => {
        console.error("❌ خطا در تراکنش دیتابیس:", e.target.error);
        reject(e);
      };
    } catch (err) {
      // خطای کل فرآیند
      console.error("❌ خطا در هنگام حذف رکورد:", err);
      reject(err);
    }
  });
};

export const updateRecord = (storeName, record) => {
  return new Promise(async (resolve, reject) => {
    try {
      // اگر دیتابیس هنوز باز نشده، آن را باز کن
      if (!dbInstance) {
        console.log("📂 دیتابیس باز نشده، در حال تلاش برای باز کردن آن...");
        await openDB(); // صدا زدن openDB برای باز کردن دیتابیس
      }
      // شروع تراکنش
      const tx = dbInstance.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const request = store.put(record); // از put برای ویرایش استفاده می‌کنیم
      // مدیریت موفقیت
      request.onsuccess = () => {
        console.log(`✅ رکورد با موفقیت به روز شد در جدول ${storeName}.`);
        resolve(true);
      };
      // مدیریت خطا
      request.onerror = (e) => {
        console.error(
          `❌ خطا در ویرایش رکورد در جدول ${storeName}:`,
          e.target.error
        );
        reject(e);
      };
      // مدیریت خطا در تراکنش
      tx.onerror = (e) => {
        console.error("❌ خطا در تراکنش دیتابیس:", e.target.error);
        reject(e);
      };
    } catch (err) {
      // خطای کل فرآیند
      console.error("❌ خطا در هنگام ویرایش رکورد:", err);
      reject(err);
    }
  });
};

export const deleteAll = (storeName) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!dbInstance) {
        console.log("📂 دیتابیس باز نشده، در حال تلاش برای باز کردن آن...");
        await openDB(); // صدا زدن openDB برای باز کردن دیتابیس
      }

      // شروع تراکنش
      const tx = dbInstance.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const request = store.clear(); // اینجا از متد clear() استفاده می‌کنیم که همه رکوردها رو حذف می‌کنه

      // مدیریت موفقیت
      request.onsuccess = () => {
        console.log(`✅ همه رکوردها از جدول ${storeName} حذف شدند.`);
        resolve(true);
      };

      // مدیریت خطا
      request.onerror = (e) => {
        console.error(
          `❌ خطا در حذف رکوردها از جدول ${storeName}:`,
          e.target.error
        );
        reject(e);
      };

      // مدیریت خطا در تراکنش
      tx.onerror = (e) => {
        console.error("❌ خطا در تراکنش دیتابیس:", e.target.error);
        reject(e);
      };
    } catch (err) {
      console.error("❌ خطا در هنگام حذف تمام رکوردها:", err);
      reject(err);
    }
  });
};

export const getOneByIndex = (storeName, indexName, indexValue) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!dbInstance) {
        console.log("📂 دیتابیس باز نشده، در حال تلاش برای باز کردن آن...");
        await openDB(); // صدا زدن openDB برای باز کردن دیتابیس
      }

      // شروع تراکنش
      const tx = dbInstance.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const index = store.index(indexName); // ایندکس رو دریافت می‌کنیم
      const request = index.get(indexValue); // استفاده از مقدار ایندکس برای جستجو

      // مدیریت موفقیت
      request.onsuccess = () => {
        if (request.result) {
          console.log(`✅ رکورد با ${indexName}: ${indexValue} پیدا شد.`);
          resolve(request.result);
        } else {
          console.log(`❌ رکوردی با ${indexName}: ${indexValue} پیدا نشد.`);
          resolve(null); // اگر رکوردی پیدا نشد، null برمی‌گردانیم
        }
      };

      // مدیریت خطا
      request.onerror = (e) => {
        console.error(
          `❌ خطا در جستجو برای ایندکس ${indexName}:`,
          e.target.error
        );
        reject(e);
      };

      // مدیریت خطا در تراکنش
      tx.onerror = (e) => {
        console.error("❌ خطا در تراکنش دیتابیس:", e.target.error);
        reject(e);
      };
    } catch (err) {
      console.error("❌ خطا در هنگام جستجو با ایندکس:", err);
      reject(err);
    }
  });
};

export const searchByField = (storeName, fieldName, fieldValue) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!dbInstance) {
        console.log("📂 دیتابیس باز نشده، در حال تلاش برای باز کردن آن...");
        await openDB(); // اگر باز نیست، باز کن
      }

      const tx = dbInstance.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const results = [];

      // چون ممکن است فیلد مورد نظر ایندکس نداشته باشد، از cursor استفاده می‌کنیم
      const request = store.openCursor();

      request.onsuccess = (event) => {
        const cursor = event.target.result;

        if (cursor) {
          const record = cursor.value;
          // مقایسه مقدار فیلد با مقدار مورد نظر
          if (
            record[fieldName] &&
            record[fieldName]
              .toString()
              .toLowerCase()
              .includes(fieldValue.toString().toLowerCase())
          ) {
            results.push(record);
          }
          cursor.continue(); // ادامه جستجو
        } else {
          console.log(
            `🔍 جستجو در ${storeName} تمام شد. ${results.length} نتیجه پیدا شد.`
          );
          resolve(results);
        }
      };

      request.onerror = (e) => {
        console.error(
          `❌ خطا در جستجو بر اساس فیلد ${fieldName}:`,
          e.target.error
        );
        reject(e);
      };

      tx.onerror = (e) => {
        console.error("❌ خطا در تراکنش دیتابیس:", e.target.error);
        reject(e);
      };
    } catch (err) {
      console.error("❌ خطا در هنگام جستجو:", err);
      reject(err);
    }
  });
};

export const searchMultipleFields = (storeName, searchFields) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!dbInstance) {
        console.log("📂 دیتابیس باز نشده، در حال تلاش برای باز کردن آن...");
        await openDB(); // اگر باز نیست، باز کن
      }

      const tx = dbInstance.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const results = [];

      // چون ممکن است فیلدها ایندکس نداشته باشند، از cursor استفاده می‌کنیم
      const request = store.openCursor();

      request.onsuccess = (event) => {
        const cursor = event.target.result;

        if (cursor) {
          const record = cursor.value;
          let isMatch = true;

          // جستجو در هر فیلد موجود در searchFields
          for (const field of searchFields) {
            const { fieldName, fieldValue } = field;

            if (
              record[fieldName] &&
              !record[fieldName]
                .toString()
                .toLowerCase()
                .includes(fieldValue.toString().toLowerCase())
            ) {
              isMatch = false;
              break;
            }
          }

          // اگر رکورد با تمام شرایط تطابق داشت، آن را ذخیره می‌کنیم
          if (isMatch) {
            results.push(record);
          }

          cursor.continue(); // ادامه جستجو
        } else {
          console.log(
            `🔍 جستجو در ${storeName} تمام شد. ${results.length} نتیجه پیدا شد.`
          );
          resolve(results);
        }
      };

      request.onerror = (e) => {
        console.error(`❌ خطا در جستجو در چند فیلد:`, e.target.error);
        reject(e);
      };

      tx.onerror = (e) => {
        console.error("❌ خطا در تراکنش دیتابیس:", e.target.error);
        reject(e);
      };
    } catch (err) {
      console.error("❌ خطا در هنگام جستجو:", err);
      reject(err);
    }
  });
};

export const filterField = (storeName, fieldName, filterType, filterValue) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!dbInstance) {
        console.log("📂 دیتابیس باز نشده، در حال تلاش برای باز کردن آن...");
        await openDB(); // اگر باز نیست، باز کن
      }

      const tx = dbInstance.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const results = [];

      const request = store.openCursor();

      request.onsuccess = (event) => {
        const cursor = event.target.result;

        if (cursor) {
          const record = cursor.value;
          let isMatch = false;

          // اعمال فیلتر بر اساس نوع فیلتر
          switch (filterType) {
            case "exact":
              // مقدار باید دقیقاً برابر باشد
              isMatch = record[fieldName] === filterValue;
              break;
            case "includes":
              // مقدار باید شامل رشته باشد
              isMatch = record[fieldName]
                .toString()
                .toLowerCase()
                .includes(filterValue.toLowerCase());
              break;
            case "startsWith":
              // مقدار باید با رشته شروع شود
              isMatch = record[fieldName]
                .toString()
                .toLowerCase()
                .startsWith(filterValue.toLowerCase());
              break;
            case "endsWith":
              // مقدار باید با رشته تمام شود
              isMatch = record[fieldName]
                .toString()
                .toLowerCase()
                .endsWith(filterValue.toLowerCase());
              break;
            default:
              isMatch = false;
          }

          // اگر فیلتر برقرار شد، رکورد را ذخیره کن
          if (isMatch) {
            results.push(record);
          }

          cursor.continue(); // ادامه جستجو
        } else {
          console.log(
            `🔍 جستجو در ${storeName} تمام شد. ${results.length} نتیجه پیدا شد.`
          );
          resolve(results);
        }
      };

      request.onerror = (e) => {
        console.error(
          `❌ خطا در فیلتر کردن فیلد ${fieldName}:`,
          e.target.error
        );
        reject(e);
      };

      tx.onerror = (e) => {
        console.error("❌ خطا در تراکنش دیتابیس:", e.target.error);
        reject(e);
      };
    } catch (err) {
      console.error("❌ خطا در هنگام فیلتر کردن:", err);
      reject(err);
    }
  });
};
