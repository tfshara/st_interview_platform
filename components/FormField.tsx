// import React from 'react'
// import { Controller, FieldValues, Path, Control } from 'react-hook-form'
// import { Input } from '@/components/ui/input';
// import {
//     FormControl,
//     FormDescription,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from '@/components/ui/form';

// interface FormFieldProps<T extends FieldValues> {
//     control: Control<T>;
//     name: Path<T>;
//     label: string;
//     placeholder?: string;
//     type?: 'text' | 'email' | 'password' | 'file'
// }
// const FormField = ({ control, name, label, placeholder, type = "text" }: FormFieldProps<T>) => (
//     Controller
//      name = { name }
// control = { control }
// render = {({ field })=> (
//     <FormItem>
//         <FormLabel className="label">Username</FormLabel>
//         <FormControl>
//             <Input placeholder="shadcn" {...field} />
//         </FormControl>
//         <FormDescription>
//             This is your public display name.
//         </FormDescription>
//         <FormMessage />
//     </FormItem>
// )}
                
//         )}
//     />
// )

// export default FormField
import React from 'react';
import { Controller, FieldValues, Path, Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'file';
}

// Use <T extends FieldValues> for the component itself
const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            <Input className="input" placeholder={placeholder} type={type} {...field} />
          </FormControl>
         
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;
