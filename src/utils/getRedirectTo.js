export default function getRedirectTo(user, location, action, requestedPath) {
  // کاربر Logout کرد
  if (user && action === "logout") {
    if (location.pathname === "/") {
      return null; // هیچ کاری نکن
    }

    return {
      redirect: true,
      to: "/",
    };
  }

  // کاربر لاگین نیست و وارد صفحه حفاظت‌شده شده
  if (!user) {
    if (location.pathname === "/auth-required") {
      return {
        redirect: true,
        to: requestedPath || "/",
      };
    }

    return {
      modal: {
        type: "auth-required",
        from: location.pathname,
      },
    };
  }

  // کاربر لاگین هست ولی نقش ندارد
  if (user && action === "unauthorized") {
    return {
      modal: {
        type: "unauthorized",
        from: location.pathname,
      },
    };
  }

  // شرایط خاص: اگر redirect باشد
  if (requestedPath) {
    return {
      redirect: true,
      to: requestedPath,
    };
  }

  return null;
}
