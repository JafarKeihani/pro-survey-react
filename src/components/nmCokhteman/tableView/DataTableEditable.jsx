import React, { useEffect, useMemo, useState } from "react";
import { getAllRecords, addRecord, updateRecord, deleteRecord } from "../PublicComponent/indexedDBNCokhteman";
import { basicFields } from "../PublicComponent/fieldsConfig";

const STORE_NAME = "projects_basic";

const DataTableEditable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newRecord, setNewRecord] = useState({});
  const [filterText, setFilterText] = useState("");

  // ستون‌ها از basicFields می‌آیند (ترتیب نمایش)
  const columns = useMemo(() => basicFields, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const data = await getAllRecords(STORE_NAME);
      setRecords(Array.isArray(data) ? data : []);
      setError("");
    } catch (e) {
      setError("خطا در دریافت داده‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleChangeCell = (rowIndex, key, value) => {
    setRecords(prev => {
      const copy = [...prev];
      copy[rowIndex] = { ...copy[rowIndex], [key]: value };
      return copy;
    });
  };

  const handleSaveRow = async (row) => {
    try {
      // اگر id داشت، ویرایش؛ در غیر این صورت افزودن
      if (row && row.id) {
        await updateRecord(STORE_NAME, row);
      } else {
        await addRecord(STORE_NAME, row);
      }
      await fetchRecords();
    } catch (e) {
      console.error(e);
      setError("ذخیره با خطا مواجه شد");
    }
  };

  const handleDeleteRow = async (id) => {
    if (!id) return;
    try {
      await deleteRecord(STORE_NAME, id);
      await fetchRecords();
    } catch (e) {
      console.error(e);
      setError("حذف با خطا مواجه شد");
    }
  };

  const handleNewChange = (key, value) => {
    setNewRecord(prev => ({ ...prev, [key]: value }));
  };

  const handleAddNew = async () => {
    try {
      await addRecord(STORE_NAME, newRecord);
      setNewRecord({});
      await fetchRecords();
    } catch (e) {
      console.error(e);
      setError("افزودن با خطا مواجه شد");
    }
  };

  const filteredRecords = useMemo(() => {
    if (!filterText.trim()) return records;
    const q = filterText.trim().toLowerCase();
    return records.filter(r =>
      columns.some(c => (r[c.key] || "").toString().toLowerCase().includes(q))
    );
  }, [records, filterText, columns]);

  // حداقل عرض جدول بر اساس تعداد ستون‌ها برای فعال شدن اسکرول افقی
  const minTableWidth = useMemo(() => Math.max(columns.length * 160 + 160, 800), [columns.length]);

  return (
    <div className="card" dir="rtl">
      <div className="card-header d-flex flex-column flex-md-row gap-2 align-items-md-center justify-content-between">
        <h5 className="m-0">مدیریت اطلاعات پایه پروژه‌ها</h5>
        <div className="input-group" style={{ maxWidth: 320 }}>
          <span className="input-group-text">جستجو</span>
          <input
            className="form-control"
            placeholder="کد، مالک، آدرس..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
      </div>

      <div className="card-body p-0">
        {error ? (
          <div className="alert alert-danger m-3 mb-0">{error}</div>
        ) : null}
        {loading ? (
          <div className="p-3">در حال بارگذاری...</div>
        ) : (
          <div className="table-responsive" style={{ maxHeight: '70vh', overflowX: 'auto', overflowY: 'auto', width: '100%' }}>
            <table className="table table-sm table-striped table-hover align-middle mb-0" style={{ minWidth: minTableWidth }}>
              <thead className="table-light">
                <tr>
                  {columns.map((f) => (
                    <th key={f.key}>{f.label}</th>
                  ))}
                  <th style={{ width: 140 }}>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((row, i) => (
                  <tr key={row.id || i}>
                    {columns.map((f) => (
                      <td key={f.key} style={{ minWidth: 140, whiteSpace: 'nowrap' }}>
                        <input
                          className="form-control form-control-sm"
                          value={row[f.key] || ""}
                          onChange={(e) => handleChangeCell(i, f.key, e.target.value)}
                        />
                      </td>
                    ))}
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleSaveRow(row)}
                          title="ذخیره"
                        >
                          ذخیره
                        </button>
                        {row.id ? (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteRow(row.id)}
                            title="حذف"
                          >
                            حذف
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}

                {/* Row for adding new */}
                <tr>
                  {columns.map((f) => (
                    <td key={f.key} style={{ whiteSpace: 'nowrap' }}>
                      <input
                        className="form-control form-control-sm"
                        value={newRecord[f.key] || ""}
                        onChange={(e) => handleNewChange(f.key, e.target.value)}
                        placeholder={`افزودن ${f.label}`}
                      />
                    </td>
                  ))}
                  <td>
                    <button className="btn btn-success btn-sm" onClick={handleAddNew}>
                      افزودن
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTableEditable;

// import React, { useState, useEffect } from "react";
// import { openDB, addRecord, deleteRecord } from "./indexedDBNCokhteman";
// import { basicFields } from "./fieldsConfig";

// const storeName = "projects_basic";

// const EditableDataTable = () => {
//   const [records, setRecords] = useState([]);
//   const [newRecord, setNewRecord] = useState({});

//   useEffect(() => {
//     fetchRecords();
//   }, []);

//   const fetchRecords = async () => {
//     const db = await openDB();
//     const tx = db.transaction(storeName, "readonly");
//     const store = tx.objectStore(storeName);
//     const request = store.getAll();
//     request.onsuccess = () => setRecords(request.result);
//   };

//   const handleChange = (index, key, value) => {
//     const updated = [...records];
//     updated[index][key] = value;
//     setRecords(updated);
//   };

//   const handleSave = async (record) => {
//     await addRecord(storeName, record);
//     fetchRecords();
//   };

//   const handleDelete = async (id) => {
//     await deleteRecord(storeName, id);
//     fetchRecords();
//   };

//   const handleNewChange = (key, value) => {
//     setNewRecord(prev => ({ ...prev, [key]: value }));
//   };

//   const handleAddNew = async () => {
//     await addRecord(storeName, newRecord);
//     setNewRecord({});
//     fetchRecords();
//   };

//   return (
//     <div>
//       <h4>مدیریت اطلاعات پایه پروژه</h4>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             {basicFields.map(f => (
//               <th key={f.key}>{f.label}</th>
//             ))}
//             <th>عملیات</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.map((row, i) => (
//             <tr key={row.id || i}>
//               {basicFields.map(f => (
//                 <td key={f.key}>
//                   <input
//                     value={row[f.key] || ""}
//                     onChange={(e) => handleChange(i, f.key, e.target.value)}
//                   />
//                 </td>
//               ))}
//               <td>
//                 <button onClick={() => handleSave(row)}>💾 ذخیره</button>
//                 <button onClick={() => handleDelete(row.id)}>🗑 حذف</button>
//               </td>
//             </tr>
//           ))}
//           <tr>
//             {basicFields.map(f => (
//               <td key={f.key}>
//                 <input
//                   value={newRecord[f.key] || ""}
//                   onChange={(e) => handleNewChange(f.key, e.target.value)}
//                   placeholder={`افزودن ${f.label}`}
//                 />
//               </td>
//             ))}
//             <td>
//               <button onClick={handleAddNew}>➕ افزودن</button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EditableDataTable;
