
export const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/300";

    // Eski localhost linklerini düzelt
    if (path.startsWith("http://localhost:3000")) {
        path = path.replace("http://localhost:3000", "");
    }

    // Eğer dış kaynaklı bir link ise (https://imgur.com vb.) olduğu gibi döndür
    if (path.startsWith("http")) return path;

    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
};
