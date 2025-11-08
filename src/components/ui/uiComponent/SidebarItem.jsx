export default function SidebarItem({ label }) {
  return (
    <div
      style={{
        padding: "10px",
        cursor: "pointer",
        borderRadius: "6px",
        marginBottom: "6px",
      }}
      onMouseEnter={(e) => (e.target.style.background = "#ddd")}
      onMouseLeave={(e) => (e.target.style.background = "transparent")}
    >
      {label}
    </div>
  );
}
