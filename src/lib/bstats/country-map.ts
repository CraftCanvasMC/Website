const MAP_NAME_OVERRIDES: Record<string, string> = {
  US: "United States of America",
  GB: "United Kingdom",
  KR: "South Korea",
  KP: "North Korea",
  RU: "Russia",
  CZ: "Czech Republic",
  MK: "North Macedonia",
  LA: "Laos",
  SY: "Syria",
  VE: "Venezuela",
  IR: "Iran",
  TR: "Turkey",
  MD: "Moldova",
  VN: "Vietnam",
};

const regionNames =
  typeof Intl !== "undefined" && "DisplayNames" in Intl
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

export function countryCodeToMapName(code: string): string {
  const normalizedCode = code.trim().toUpperCase();

  if (MAP_NAME_OVERRIDES[normalizedCode]) {
    return MAP_NAME_OVERRIDES[normalizedCode];
  }

  if (!regionNames) {
    return normalizedCode;
  }

  try {
    return regionNames.of(normalizedCode) ?? normalizedCode;
  } catch {
    return normalizedCode;
  }
}
