export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

const UTM_STORAGE_KEY = "utm_params";
const SITE_ENTER_STORAGE_KEY = "utm_site_entered";

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

function parseUtm(search: string): UtmParams {
  const searchParams = new URLSearchParams(search);
  const utm: UtmParams = {};

  UTM_KEYS.forEach((key) => {
    const value = searchParams.get(key);
    if (value) utm[key] = value;
  });

  return utm;
}

function readStoredUtm(): UtmParams {
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}

/**
 * 현재 URL에 UTM 파라미터가 있으면 세션에 저장(가장 최근 유입 기준)하고,
 * 없으면 세션에 저장된 값을 반환합니다. 클라이언트 라우팅으로 URL에서
 * UTM이 사라져도 세션 동안 유입 정보를 유지하기 위함입니다.
 */
export function resolveUtm(): UtmParams {
  const utm = parseUtm(window.location.search);

  if (Object.keys(utm).length === 0) return readStoredUtm();

  try {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
  } catch {}

  return utm;
}

/** 세션당 최초 1회만 true를 반환합니다. */
export function markSiteEntered(): boolean {
  try {
    if (sessionStorage.getItem(SITE_ENTER_STORAGE_KEY)) return false;
    sessionStorage.setItem(SITE_ENTER_STORAGE_KEY, "1");
  } catch {}

  return true;
}

export function pushDataLayer(event: DataLayerEvent) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}
