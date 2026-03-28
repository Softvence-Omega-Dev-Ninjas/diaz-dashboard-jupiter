/* eslint-disable @typescript-eslint/no-explicit-any */
// Utility functions for form data processing

export const formatMeasurement = (
  ft?: number | string,
  inches?: number | string,
): string | undefined => {
  if (ft === undefined && inches === undefined) return undefined;

  const ftNum = typeof ft === 'string' ? parseInt(ft) : ft;
  const inNum = typeof inches === 'string' ? parseInt(inches) : inches;

  const ftPart = ftNum ? `${ftNum}ft` : '';
  const inPart = inNum ? `${inNum}in` : '';

  return `${ftPart} ${inPart}`.trim();
};

export const combineMeasurements = (data: any) => {
  return {
    ...data,
    length: formatMeasurement(data.lengthFt, data.lengthIn),
    beamSize: formatMeasurement(data.beamFt, data.beamIn),
    maxDraft: formatMeasurement(data.maxDraftFt, data.maxDraftIn),
  };
};
