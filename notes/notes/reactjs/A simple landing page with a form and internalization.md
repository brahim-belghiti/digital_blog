---
type: definition
tags:
  - reactjs
---

### What
A landing page built with Next js that present information for a transportation agency.
**Features**
Form with 'nodemailer'
internalization

### Design patterns used in the project
**clear folder structure**
   ```
├── .env
├── .gitignore
├── README.md
├── components
│   ├── Navigation
│   ├── UI (common)
│   ├── landingPage (screens)
│   └── tracking
├── constants
│   └── countries.js
├── hooks
│   ├── useGoogleFont.jsx
│   ├── useLocale.jsx
│   └── useStaticProps.jsx
├── jsconfig.json
├── next-i18next.config.js
├── next.config.js
├── package-lock.json
├── package.json
├── pages
│   ├── _app.js
│   ├── _document.js
│   ├── api
│   │   └── prospect.js
│   ├── index.js
│   └── tracking
│       └── index.js
├── pnpm-lock.yaml
├── postcss.config.js
├── public
│   ├── images
│   ├── locales
│   │   ├── ar
│   │   └── fr
│   ├── robots.txt
│   └── sitemap.xml
├── services
│   └── Api.js
├── styles
└── tailwind.config.js
```


**composing Modular Components** [^1] 
```
├── components
│   ├── Navigation
│	│  ├──  footer componet
│	│  ├──  navabar componet	   
│   ├── UI (common)
│	│  ├──  basic ui compoent like input, title, section title that are used throught the applicaion   
│   ├── section (screens)
│	│  ├──  create a component for each section of the application   

```

**custom hooks** 
used to get the local, because I need to check for the local for multiple places.so we built a custom hook that return it. [^2] 
```javascript

// custom hooks to return the local from the browser using next/router api. And return the value
import { useRouter } from 'next/router';

export default function useLocale() {
    const router = useRouter();
    const { locale } = router;
    return locale;
    } 

// to use it need to import the hook

import useLocale from "@/hooks/useLocale"
// assing to the return value of the function to a variable.
const locale = useLocale();
```

**example of component that use all this**
this example of a modulable component, that can be reused in multiple component in the application, it take advantage of the concept of props[^3], to control its behavior and functionality [^⁴] and it is used to be used with two specific third party libraries, React hook-Form and next-i18next.

``` javascript
import useLocale from "@/hooks/useLocale";
import useGoogleFont from "@/hooks/useGoogleFont";
// use of third party library
import { useTranslation } from "next-i18next";

// use of props that will be passed to the component, props like register and traslationKey are for the integration with third parties, useHook form and next-i18next.
const Input = ({
label,
type,
name,
placeholder,
value,
register,
error,
translationKey,
variant,

}) => {
// use of third party library, getting the method "t" trough object destruction
const { t } = useTranslation("landingPage");
// using custome hooks to get the local
const locale = useLocale();
const googleFont = useGoogleFont(locale);
const primaryFont = googleFont.variable;
// the varialbe min is assigned to an expression.
const min = type === "number" ? 0 : null;
return (
<div className="flex flex-col">
<label
htmlFor={name}
className={`${primaryFont} font-sans block mb-2 text-sm font-medium text-gray`}
>
{label}
</label>
// conditial rendering depending ot the variant passed to the props vairant (this is an expression not a statemnt) 

{variant === "textarea" ? (
<textarea
id={label}
rows={3}
{...register}
placeholder={placeholder}
className="block w-full p-2.5 border border-gray rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white "
/>
) : (
<input
type={type}
placeholder={placeholder}
id={label}
value={value}
min={min}
{...register}
className={`${primaryFont} font-sans block w-full p-2.5 border border-gray rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white`}
/>
)}
{error && <span className="text-red-400 text-sm">{t(`shipmentRequest.messages.ValidationInputsErros.${translationKey}`)}</span>}
</div>
);
};

export default Input;
```

**third party libraries**
React hook form
next-i18next
nodemailer
Tailwind-CSS for styling

**this references:** 
[^1]: [[in React JS components are reusable pieces of UI that can be defined as functions (or classes) that return elements, often written in JSX]]
[^2]: [[custom hooks in React abstract reusable logic and separate it from the rendering process 
[^3]: [[in React JS props are used to pass data from a parent component to a child component]], [[techniques to practice about React JS#passing props]]
[^4]: [[conditional rendering is conditioning the rendering of UI elements depending on a value]]

**this could help for the future**
the most pattern are basic patterns.
the problem that have been solved that might be faced in the future, is how to send an email without a back-end api, using nodemailer.
email service without a back end with Next JS api route and nodemailer.