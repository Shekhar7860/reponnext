
var UserNameRegEx = /^[a-zA-Z ]{0,60}$/;
var NumericNumberRegEx = /^[0-9]{0,20}$/;
var NameRegEx = /^[a-zA-Z0-9 \s()-]{2,60}$/;
var NumberRegEx = /^[0]?[789]\d{9}$/;
var IndNumberRegEx = /^((\+91)?|91)?[789][0-9]{9}/;
var FoodLicenseRegEx = /^[0-9]{5,10}$/;
var DrugLicenseRegEx = /^[0-9]{5,10}$/;
var PincodeRegEx = /^\d{6}$/;
var AddressRegEx = /^[a-zA-Z0-9\s,'-]*$/;
var LatLngRegEx = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/;
var GstRegEx = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;
var CountryRegEx = "India";
var UUIDRegEx = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export const numberDataTypeValidation = (str) => {
    return typeof (str) === "number";
}
export const nameValidation = (str) => {
    return NameRegEx.test(String(str).trim());
}
export const UserNameValidation = (str) => {
    return UserNameRegEx.test(String(str).trim());
}
export const MobileNumberValidation = (str) => {
    return NumberRegEx.test(str);
}
export const NumberValidation = (str) => {
    return NumericNumberRegEx.test(str);
}
export const MobileNumberWithInValidation = (str) => {
    return IndNumberRegEx.test(str);
}
export const FoodLicenseValidation = (str) => {
    // return FoodLicenseRegEx.test(str);
    return str
}
export const DrugLicenseValidation = (str) => {
    // return DrugLicenseRegEx.test(str);
    return str
}
export const GstValidation = (str) => {
    return GstRegEx.test(str);
}
export const CustomerCategoryValidation = (str) => {
    return customerCategory().has(String(str).trim())
}
export const paymentTypeValidation = (str) => {
    return paymentCategory().has(String(str).trim())
}
export const AddressValidation = (str) => {
    // return (String(str).length > 10) ? AddressRegEx.test(str) : false
    return (String(str).trim().length > 10) ? str : false
}
export const PincodeValidation = (str) => {
    return PincodeRegEx.test(str);
}
export const LatLngValidation = (str) => {
    return LatLngRegEx.test(str);
}
export const StateValidation = (str) => {
    return mapValueStateOfIndia().has(String(str).trim());
}
export const CountryValidation = (str) => {
    return str === CountryRegEx;
}
export const UuidValidation = (str) => {
    return UUIDRegEx.test(str);
}

export const StringValidation = (str) => {
    return (typeof (str) === 'undefined') ? false : (String(str).trim().length >= 3) ? nameValidation(str) : false
}
export const ObjectValidation = (str) => {
    return (typeof (str) === 'object')
}
export const LengthValidation = (str, length) => {
    return (String(str).trim().length > length)
}
// Map
export const ProductCategoryValidation = (str) => {
    return productCategory().has(String(str).trim())
}
export const ProductGstValidation = (str) => {
    return mapValueGstOfProduct().has(`${str}`)
}
export const capitalizeFirstLetter = (string) => {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);        
    }else{
        return `_`
    }
}