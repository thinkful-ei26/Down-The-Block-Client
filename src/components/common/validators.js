export const required = value => (value ? undefined : 'Required');

export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

export const isTrimmed = value =>
value.trim() === value ? undefined : 'Cannot start or end with whitespace';

export const length = length => value => {
    if (length.min && value.length < length.min) {
        return `Must be at least ${length.min} characters long`;
    }
    if (length.max && value.length > length.max) {
        return `Must be at most ${length.max} characters long`;
    }
};

export const matches = field => (value, allValues) =>
    field in allValues && value.trim() === allValues[field].trim()
        ? undefined
        : 'Does not match';

export const unSelected = value => {
  if (value === undefined) value = '';
  return value.trim() !== '' ? undefined : 'Please select';
}

export const sizeLimit = value => {
    console.log('in validate', value);
    return value.length===0 ? undefined : value[0].size > 5000000 ? 'Image exceeds 5MB limit. Please try again.' : undefined;
}

export const imageNotEmpty = value =>{
    console.log('in validate', value);
    return value.length===0 ? 'Please upload an image or click cancel' : undefined; 
}