export interface FormProps {
    onSubmit: (formData: FormValue) => any;
    values?: any;
    sectionTitle:string
}

export interface FormValue {
    title?:string;
    excerpt?:string;
    description?: string;
}


export interface ErrorType extends Error {
    response: {
        data:{
            message:string[];
        }
    }
}