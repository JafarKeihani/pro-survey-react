export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div style={{ padding: 20, color: "red" }}>
      <h2>⚠️ خطایی رخ داد!</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary} style={{ marginTop: 10 }}>
        تلاش مجدد
      </button>
    </div>
  );
}
