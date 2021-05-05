import { FormikConfig, FormikValues } from "formik";

export interface FormStepProps
	extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
	label: string;
}

const FormStep = ({ children }: FormStepProps) => {
	return <>{children}</>;
};

export default FormStep;
