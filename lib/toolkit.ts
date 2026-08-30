export const TOOLKIT_BUCKET = "toolkit";
export const TOOLKIT_FILE = "toolkit_compressed.pdf";

// Public URL — safe to ship to the client (EXPO_PUBLIC_).
export const TOOLKIT_URL = process.env.EXPO_PUBLIC_TOOLKIT_PDF_URL!;

// react-native-pdf source: fetch + on-device caching handled by the viewer.
export const toolkitSource = {
  uri: TOOLKIT_URL,
  cache: true,
};

// Optional helper if you ever need the raw bytes (e.g. share sheet).
export async function fetchToolkitPdf(): Promise<Blob> {
  const res = await fetch(TOOLKIT_URL);
  if (!res.ok) throw new Error(`Toolkit fetch failed: ${res.status}`);
  return res.blob();
}
