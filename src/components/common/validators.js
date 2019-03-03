export const required = value => (value ? undefined : 'Required');

export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'can\'t be empty';

export const isTrimmed = value =>
value.trim() === value ? undefined : 'can\'t start/end with whitespace';

export const length = length => value => {
    if (length.min && value.length < length.min) {
        return `must be at least ${length.min} characters long`;
    }
    if (length.max && value.length > length.max) {
        return `must be at most ${length.max} characters long`;
    }
};

export const matches = field => (value, allValues) =>
    field in allValues && value.trim() === allValues[field].trim()
        ? undefined
        : 'do not match';

export const unSelected = value => {
  if (value === undefined) value = '';
  return value.trim() !== '' ? undefined : 'Please select';
}

export const sizeLimit = value => {
    return !value || value.length===0 ? undefined : value[0].size > 5000000 ? 'Image exceeds 5MB limit. Please try again.' : undefined;
}

export const imageNotEmpty = value =>{
    return !value || value.length===0 ? 'Please upload an image or click cancel' : undefined; 
}