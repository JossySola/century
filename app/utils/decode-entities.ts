export default function decodeEntities(obj: any): any {
  if (typeof obj === "string") {
    return obj.replace(/&amp;/g, "&");
  }
  if (Array.isArray(obj)) {
    return obj.map(decodeEntities);
  }
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, decodeEntities(v)])
    );
  }
  return obj;
}