const isISOString = (input: string): input is tISO =>
  moment(input, moment.ISO_8601, true).isValid();

export default isISOString;
